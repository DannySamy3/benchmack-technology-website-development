# Deploying to a VPS

This guide puts the site on a Linux server (Ubuntu 22.04 or 24.04) with Docker, nginx and a free
Let's Encrypt HTTPS certificate. It takes about 30 minutes the first time.

```
Visitor ──HTTPS──▶ nginx (ports 80/443) ──▶ Docker container on 127.0.0.1:3878 (Next.js)
```

**Server size:** the running site needs very little (about 45 MB of RAM idle, capped at 256 MB; see
[Resource usage](#resource-usage)), so it can share a small server with other apps. Building the image
needs more memory than running it: with 1 GB of RAM, add swap (step 2).

**Port:** the app listens on **3878** (only on `127.0.0.1`, never public). It is deliberately unusual so
it won't clash with other apps on the same server. To use a different port, add `APP_PORT=<port>` to
`.env.production` and change the `upstream` port in `deploy/nginx.conf` to match.

---

## 1. Point the domain at the server

At your domain/DNS provider, create (or update) these records with the server's public IP:

| Type | Name  | Value          |
| ---- | ----- | -------------- |
| A    | `@`   | your server IP |
| A    | `www` | your server IP |

Keep the existing **MX** records (Zoho mail). DNS changes can take up to a few hours to spread.

## 2. Prepare the server

Log in as a user with `sudo`, then:

```bash
# System updates
sudo apt update && sudo apt upgrade -y

# Docker (official install script) and the compose plugin
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER   # log out and back in for this to take effect

# nginx, certbot and git
sudo apt install -y nginx certbot git

# Firewall: allow SSH and web traffic only
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable

# Only on a 1 GB server: add 2 GB of swap
sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile
sudo mkswap /swapfile && sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

## 3. Get the code

```bash
sudo mkdir -p /opt/benchmack && sudo chown $USER: /opt/benchmack
git clone <your-repository-url> /opt/benchmack
cd /opt/benchmack
```

For a private repository, add a [deploy key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/managing-deploy-keys)
to the server first.

## 4. Configure settings

```bash
cp .env.example .env.production
nano .env.production
chmod 600 .env.production
```

Fill in at least `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` (the contact form cannot send email
without them), plus both Turnstile keys for spam protection. Leave `CONTACT_DRY_RUN` unset.

> `.env.production` holds secrets. It is ignored by git and never copied into the Docker image.

## 5. Build and start the site

```bash
docker compose --env-file .env.production up -d --build
```

Check it is running and healthy (the status should become `healthy` within a few seconds):

```bash
docker compose ps
curl -I http://127.0.0.1:3878
```

## 6. Get an HTTPS certificate

```bash
sudo certbot certonly --standalone \
  -d benchmacktech.co.tz -d www.benchmacktech.co.tz \
  --pre-hook "systemctl stop nginx" --post-hook "systemctl start nginx" \
  --agree-tos -m support@benchmacktech.co.tz --no-eff-email
```

Certbot renews the certificate automatically before it expires. The hooks pause nginx for a few seconds
during each renewal. Test renewal with `sudo certbot renew --dry-run`.

## 7. Configure nginx

```bash
sudo cp deploy/nginx.conf /etc/nginx/sites-available/benchmacktech.co.tz
sudo ln -s /etc/nginx/sites-available/benchmacktech.co.tz /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

Open **https://benchmacktech.co.tz** — the site should load with a padlock, and both
`http://` and `www.` should redirect to it.

## 8. Final checks

- Send a test message from the contact form and confirm it arrives in the inbox.
- Check the security headers at [securityheaders.com](https://securityheaders.com) and the HTTPS setup
  at [ssllabs.com/ssltest](https://www.ssllabs.com/ssltest/).
- Set up a free uptime monitor (for example [UptimeRobot](https://uptimerobot.com)) on
  `https://benchmacktech.co.tz` so you are emailed if the site goes down.
- Submit `https://benchmacktech.co.tz/sitemap.xml` in
  [Google Search Console](https://search.google.com/search-console).

---

## Updating the site

```bash
cd /opt/benchmack
git pull
docker compose --env-file .env.production up -d --build
docker image prune -f   # remove old images
```

The old container keeps serving until the new one has been built, so downtime is only a few seconds.

## Day-to-day operations

| Task                              | Command                                                                   |
| --------------------------------- | ------------------------------------------------------------------------- |
| View app logs (incl. form errors) | `docker compose logs -f web`                                              |
| Restart the app                   | `docker compose restart web`                                              |
| Stop the app                      | `docker compose down`                                                     |
| Check nginx errors                | `sudo tail -f /var/log/nginx/error.log`                                   |
| Change a setting                  | Edit `.env.production`, then rerun the `up -d --build` command            |
| Check memory and CPU use          | `docker stats benchmack-website`                                          |
| Clear nginx's asset cache         | `sudo rm -rf /var/cache/nginx/benchmack/* && sudo systemctl reload nginx` |

Failed contact form deliveries are logged with the prefix `[contact]`.

**Replacing an image:** resized images are cached for 7 days (by nginx and by visitors' browsers). Give a
replacement image a new file name in `public/` rather than overwriting the old one, or clear the nginx
cache after deploying.

**Backups:** the site has no database. Everything is in git except `.env.production` — keep a copy of
that file somewhere safe (for example a password manager).

**Security updates:** run `sudo apt update && sudo apt upgrade -y` monthly, or enable
[unattended-upgrades](https://help.ubuntu.com/community/AutomaticSecurityUpdates). Rebuild the
container occasionally (`up -d --build`) to pick up Node.js security fixes.

---

## Resource usage

The container is tuned to use as little of the server as possible:

| Setting                                            | Where                                                   | Effect                                             |
| -------------------------------------------------- | ------------------------------------------------------- | -------------------------------------------------- |
| 256 MB memory limit, no swap, 1 CPU, 64 threads    | `docker-compose.yml`                                    | The site can never starve other apps on the server |
| Small JS heap, short-lived garbage collected early | `Dockerfile` (`NODE_OPTIONS`)                           | Lower steady memory                                |
| One image-processing thread                        | `Dockerfile` (`VIPS_CONCURRENCY`, `UV_THREADPOOL_SIZE`) | Fewer threads and less memory when resizing images |
| Only image sizes the site needs, WebP only         | `next.config.mjs`                                       | Fewer resized copies to generate                   |
| No compression in Node                             | `next.config.mjs`                                       | nginx compresses once instead                      |
| Build assets and resized images cached by nginx    | `deploy/nginx.conf`                                     | Repeat requests never reach Node                   |
| Lightweight health check (BusyBox `wget`)          | `Dockerfile`                                            | No extra Node process every minute                 |
| Runtime image without npm/Yarn                     | `Dockerfile`                                            | 272 MB image instead of 315 MB                     |

Measured with 960 requests (pages and resized images, cold cache): **~43 MB idle, ~75 MB peak, ~47 MB
afterwards**, against ~44 / 114 / 87 MB before tuning. Through nginx, 200 repeat image requests used
4 ms of app CPU in total.

The container also runs with a read-only filesystem, all Linux capabilities dropped and a minimal init
process. Resized images are kept in a small in-memory area (`/app/.next/cache`, 64 MB maximum) that is
cleared on restart; nginx's disk cache keeps serving them meanwhile.

---

## Alternative: without Docker

If you prefer to run Node.js directly (Node 20.19+ required):

```bash
cd /opt/benchmack
npm ci
NEXT_PUBLIC_TURNSTILE_SITE_KEY=<site key> npm run build
```

Create `/etc/systemd/system/benchmack.service`:

```ini
[Unit]
Description=Benchmack Technology website
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/opt/benchmack/.next/standalone
Environment=NODE_ENV=production PORT=3878 HOSTNAME=127.0.0.1 NODE_OPTIONS=--max-old-space-size=128 VIPS_CONCURRENCY=1
MemoryMax=256M
ExecStart=/usr/bin/node --env-file=/opt/benchmack/.env.production server.js
Restart=always

[Install]
WantedBy=multi-user.target
```

Then `sudo chown -R www-data: /opt/benchmack/.next && sudo systemctl enable --now benchmack`, and
continue from step 6. To update: `git pull && npm ci && npm run build && sudo systemctl restart benchmack`.
