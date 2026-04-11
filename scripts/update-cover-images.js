#!/usr/bin/env node
// Update `coverImage:` frontmatter across all locales to point to new WebP files,
// based on the slug in each post's frontmatter.
//
// Looks for files at public/assets/blog/{slug}-cover.webp and rewrites
// the coverImage field in every content/blog/{locale}/{filename}.md.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const CONTENT_DIR = path.join(ROOT, "content", "blog");
const IMAGES_DIR = path.join(ROOT, "public", "assets", "blog");

function readFrontmatter(raw) {
  const m = /^---\n([\s\S]*?)\n---/.exec(raw);
  return m ? m[1] : "";
}

function slugOf(fm) {
  const m = /^slug:\s*(.+?)\s*$/m.exec(fm);
  return m ? m[1].trim().replace(/^["']|["']$/g, "") : null;
}

function replaceCoverImage(raw, newValue) {
  // Update existing coverImage line
  if (/^coverImage:\s*/m.test(raw)) {
    return raw.replace(/^coverImage:\s*.*$/m, `coverImage: "${newValue}"`);
  }
  // Otherwise insert before closing ---
  return raw.replace(
    /^(---\n[\s\S]*?)(\n---)/,
    `$1\ncoverImage: "${newValue}"$2`,
  );
}

const locales = fs.readdirSync(CONTENT_DIR).filter((d) =>
  fs.statSync(path.join(CONTENT_DIR, d)).isDirectory(),
);

let updated = 0;
let skipped = 0;
let missingImage = 0;

for (const locale of locales) {
  const dir = path.join(CONTENT_DIR, locale);
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".md"))) {
    const filepath = path.join(dir, file);
    const raw = fs.readFileSync(filepath, "utf8");
    const fm = readFrontmatter(raw);

    // Use the markdown filename (without .md) as the slug fallback,
    // since content files are named by slug in this project.
    const slug = slugOf(fm) || file.replace(/\.md$/, "");
    const newRel = `/assets/blog/${slug}-cover.webp`;
    const newAbs = path.join(IMAGES_DIR, `${slug}-cover.webp`);

    if (!fs.existsSync(newAbs)) {
      console.warn(`  [miss] ${locale}/${file} — ${newRel} not found`);
      missingImage++;
      continue;
    }

    const currentMatch = /^coverImage:\s*["']?([^"'\n]*)["']?\s*$/m.exec(raw);
    const currentValue = currentMatch ? currentMatch[1].trim() : null;
    if (currentValue === newRel) {
      skipped++;
      continue;
    }

    const updatedRaw = replaceCoverImage(raw, newRel);
    fs.writeFileSync(filepath, updatedRaw);
    updated++;
  }
}

console.log(`\n─── Summary ───`);
console.log(`Updated coverImage: ${updated}`);
console.log(`Already correct   : ${skipped}`);
console.log(`Missing image file: ${missingImage}`);
