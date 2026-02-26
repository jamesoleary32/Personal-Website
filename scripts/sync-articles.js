#!/usr/bin/env node
/**
 * Syncs article markdown files into sections.json.
 * - Preserves existing entry IDs and order
 * - Adds new articles found in public/articles/
 * - Removes entries whose .md files no longer exist
 * - Skips articles with `published: false` in frontmatter
 * Run via: node scripts/sync-articles.js
 * Also runs automatically as part of the prebuild step.
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const ARTICLES_DIR = path.join(__dirname, '../public/articles');
const SECTIONS_PATH = path.join(__dirname, '../src/pages/Writing/sections.json');

const sections = JSON.parse(fs.readFileSync(SECTIONS_PATH, 'utf8'));
const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.md'));

// Index existing entries by markdownUrl for fast lookup
const existingByUrl = {};
for (const section of sections) {
  existingByUrl[section.markdownUrl] = section;
}

// Track which markdownUrls are still backed by a file
const activeUrls = new Set();

let added = 0, updated = 0, skipped = 0;
const updatedSections = [];

for (const file of files) {
  const slug = file.replace(/\.md$/, '');
  const markdownUrl = `/articles/${file}`;
  const url = `/articles/${slug}`;
  const filePath = path.join(ARTICLES_DIR, file);
  const { data: fm } = matter(fs.readFileSync(filePath, 'utf8'));

  // Skip unpublished articles
  if (fm.published === false) {
    console.log('SKIPPED (unpublished):', slug);
    skipped++;
    continue;
  }

  activeUrls.add(markdownUrl);

  // Convert date to DD/MM/YYYY.
  // gray-matter parses unquoted YAML dates (e.g. `date: 2025-05-15`) as JS Date objects.
  let date;
  if (fm.date instanceof Date) {
    const y = fm.date.getUTCFullYear();
    const m = String(fm.date.getUTCMonth() + 1).padStart(2, '0');
    const d = String(fm.date.getUTCDate()).padStart(2, '0');
    date = `${d}/${m}/${y}`;
  } else {
    date = String(fm.date || '');
    if (/^\d{4}-\d{2}-\d{2}/.test(date)) {
      const [y, m, d] = date.split('-');
      date = `${d}/${m}/${y}`;
    }
  }

  const existing = existingByUrl[markdownUrl];

  if (existing) {
    const entry = {
      ...existing,
      title: fm.title || existing.title,
      date: date || existing.date,
      category: fm.category || existing.category,
      readingTime: fm.readingTime ?? existing.readingTime,
    };
    updatedSections.push(entry);
    if (JSON.stringify(entry) !== JSON.stringify(existing)) {
      console.log('UPDATED:', slug);
      updated++;
    }
  } else {
    updatedSections.push({
      id: `section-${slug}`,
      title: fm.title || slug.replace(/_/g, ' '),
      date,
      url,
      markdownUrl,
      category: fm.category || '',
      readingTime: fm.readingTime || 0,
    });
    console.log('ADDED:', slug);
    added++;
  }
}

// Count removed entries (in sections.json but no matching .md file)
const removedEntries = sections.filter(s => !activeUrls.has(s.markdownUrl));
if (removedEntries.length > 0) {
  console.log('REMOVED:', removedEntries.map(s => s.title).join(', '));
}

fs.writeFileSync(SECTIONS_PATH, JSON.stringify(updatedSections, null, 4));
console.log(`\nDone. Added: ${added} | Updated: ${updated} | Skipped (unpublished): ${skipped} | Removed: ${removedEntries.length}`);
