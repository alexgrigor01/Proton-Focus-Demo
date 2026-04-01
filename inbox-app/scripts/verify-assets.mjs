#!/usr/bin/env node
/**
 * Ensures every path in src/constants/emailAvatars.ts exists under public/.
 * Run after adding avatars: npm run verify:assets
 *
 * Railway / production: only files in the repo are served — never reference
 * figma.com/api/mcp/asset URLs in app code (they expire). Export from Figma
 * to PNG/SVG, commit under public/media/email-avatars/, then register in EMAIL_AVATAR.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const tsPath = path.join(root, 'src/constants/emailAvatars.ts');
const ts = fs.readFileSync(tsPath, 'utf8');
const paths = [...ts.matchAll(/'(\/media\/[^']+)'/g)].map((m) => m[1]);

let missing = 0;
for (const p of paths) {
  const full = path.join(root, 'public', p);
  if (!fs.existsSync(full)) {
    console.error('Missing asset:', p, '→ expected file:', full);
    missing++;
  }
}

if (missing > 0) {
  process.exit(1);
}
console.log(`verify-assets: OK (${paths.length} files under public/)`);
