#!/usr/bin/env node
/**
 * Syncs book summary markdown files into BookData.json.
 * For each .md file in public/book_summaries/:
 *   - If an entry with a matching id exists, ensures summaryLink and id are set.
 *   - If no entry exists, creates one from the frontmatter.
 * Run via: node scripts/sync-book-summaries.js
 * Also runs automatically as the prebuild step.
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const SUMMARIES_DIR = path.join(__dirname, '../public/book_summaries');
const BOOK_DATA_PATH = path.join(__dirname, '../src/pages/Books/BookData.json');

const bookData = JSON.parse(fs.readFileSync(BOOK_DATA_PATH, 'utf8'));
const files = fs.readdirSync(SUMMARIES_DIR).filter(f => f.endsWith('.md'));

let added = 0, updated = 0;

for (const file of files) {
  const id = file.replace(/\.md$/, '');
  const summaryLink = `/books/${id}`;
  const filePath = path.join(SUMMARIES_DIR, file);
  const { data: fm } = matter(fs.readFileSync(filePath, 'utf8'));

  const existing = bookData.books.find(b => b.id === id);

  if (existing) {
    let changed = false;
    if (!existing.summaryLink) { existing.summaryLink = summaryLink; changed = true; }
    if (!existing.id) { existing.id = id; changed = true; }
    if (changed) {
      console.log('UPDATED:', id);
      updated++;
    }
  } else {
    bookData.books.push({
      title: fm.title || id.replace(/_/g, ' '),
      author: fm.author || '',
      genre: fm.genre || [],
      image: fm.image || '/images/Placeholder_Book_Cover.svg',
      summaryLink,
      id,
    });
    console.log('ADDED:', id);
    added++;
  }
}

fs.writeFileSync(BOOK_DATA_PATH, JSON.stringify(bookData, null, 2));
console.log(`\nDone. Added: ${added} | Updated: ${updated}`);
