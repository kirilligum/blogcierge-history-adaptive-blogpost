import fetch from 'node-fetch';
import { load } from 'cheerio';
import TurndownService from 'turndown';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';

const urls = readFileSync('docs/astro.build/urls.txt', 'utf-8')
  .split(/\r?\n/).filter(Boolean);
const td = new TurndownService();

async function main() {
  mkdirSync('docs/astro.build/pages', { recursive: true });

  for (const url of urls) {
    console.log(`Fetching ${url}`);
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'text/html' }
    });
    if (!res.ok) {
      console.error(`Failed to fetch ${url}: ${res.status}`);
      continue;
    }
    const html = await res.text();
    const $ = load(html);
    const bodyHtml = $('main[data-pagefind-body]').html();
    if (!bodyHtml) {
      console.error(`No <main data-pagefind-body> for ${url}`);
      continue;
    }
    const markdown = td.turndown(bodyHtml);

    // derive output path
    const match = url.match(/https:\/\/docs\.astro\.build\/en\/(.+?)(?:\/)?$/);
    let out;
    if (match && match[1]) {
      out = `docs/astro.build/pages/${match[1]}/index.md`;
    } else {
      out = `docs/astro.build/pages/${encodeURIComponent(url)}.md`;
    }
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, markdown);
    console.log(`Saved markdown to ${out}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
