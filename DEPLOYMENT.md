# Deploying to a VPS

This guide puts the site on a Linux server (Ubuntu 22.04 or 24.04) with Docker, nginx and a free
Let's Encrypt HTTPS certificate. It takes about 30 minutes the first time.

```
Visitor ──HTTPS──▶ nginx (ports 80/443) ──▶ Docker container on 127.0.0.1:3000 (Next.js)
```

**Server size:** 1 vCPU and 2 GB RAM is comfortable. With 1 GB, add swap (step 2) because the build
needs more memory than running the site.

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

Check it is running and healthy (the status should become `healthy` within about 30 seconds):

```bash
docker compose ps
curl -I http://127.0.0.1:3000
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

| Task                              | Command                                                        |
| --------------------------------- | -------------------------------------------------------------- |
| View app logs (incl. form errors) | `docker compose logs -f web`                                   |
| Restart the app                   | `docker compose restart web`                                   |
| Stop the app                      | `docker compose down`                                          |
| Check nginx errors                | `sudo tail -f /var/log/nginx/error.log`                        |
| Change a setting                  | Edit `.env.production`, then rerun the `up -d --build` command |

Failed contact form deliveries are logged with the prefix `[contact]`.

**Backups:** the site has no database. Everything is in git except `.env.production` — keep a copy of
that file somewhere safe (for example a password manager).

**Security updates:** run `sudo apt update && sudo apt upgrade -y` monthly, or enable
[unattended-upgrades](https://help.ubuntu.com/community/AutomaticSecurityUpdates). Rebuild the
container occasionally (`up -d --build`) to pick up Node.js security fixes.

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
Environment=NODE_ENV=production PORT=3000 HOSTNAME=127.0.0.1
ExecStart=/usr/bin/node --env-file=/opt/benchmack/.env.production server.js
Restart=always

[Install]
WantedBy=multi-user.target
```

Then `sudo chown -R www-data: /opt/benchmack/.next && sudo systemctl enable --now benchmack`, and
continue from step 6. To update: `git pull && npm ci && npm run build && sudo systemctl restart benchmack`.
