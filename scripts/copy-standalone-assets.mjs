// Runs after `next build` (npm "postbuild"). The standalone server in
// .next/standalone does not include static files, so copy them in.
// See https://nextjs.org/docs/app/api-reference/config/next-config-js/output
import { cpSync, existsSync } from 'node:fs'

const standalone = '.next/standalone'

if (!existsSync(standalone)) {
  console.error(`${standalone} not found. Is output: 'standalone' set in next.config.mjs?`)
  process.exit(1)
}

cpSync('public', `${standalone}/public`, { recursive: true })
cpSync('.next/static', `${standalone}/.next/static`, { recursive: true })
console.log('Copied public/ and .next/static/ into .next/standalone/')
