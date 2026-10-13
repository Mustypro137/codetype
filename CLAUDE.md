# CodeType – rules for Claude

CodeType is a typing practice web app for programmers. The user types real code snippets in different programming languages and sees their speed (WPM) and accuracy.

## Tech rules
- Plain HTML, CSS and JavaScript only.
- No frameworks (no React, Vue, Tailwind, jQuery, etc.).
- No build tools (no npm, bundlers, transpilers). Files must work as they are.
- Must work on GitHub Pages: `index.html` stays at the root, and all links to files use relative paths (for example `css/style.css`, not `/css/style.css`).

## Folder structure
```
index.html
css/style.css
js/            small files, one job each (main.js, snippets.js, typing.js, stats.js)
data/          code snippets and other data
images/        images and icons
README.md
CONTRIBUTION-LOG.md
CLAUDE.md
```
Keep JavaScript split into small files. Add a new file in `js/` instead of making one file very big.

## How to work with the user
- The user is learning English and front-end development.
- Use simple English and short sentences. Explain new words.
- After every task, explain what you changed in simple words, so the user can write their entry in `CONTRIBUTION-LOG.md` (columns: Date | What I did | What AI did | What I learned).
- Build one small step at a time. Do not build features the user did not ask for.
