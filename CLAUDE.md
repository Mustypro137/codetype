# CodeType – rules for Claude

CodeType is a typing practice web app for programmers. The user types real code snippets in different programming languages and sees their speed (WPM) and accuracy.

## Tech rules
- Plain HTML, CSS and JavaScript only.
- No frameworks (no React, Vue, Tailwind, jQuery, etc.).
- No build tools (no npm, bundlers, transpilers). Files must work as they are.
- Use normal `<script>` tags, not ES modules (`import` / `export`). Then `index.html` also works when you open it directly from disk.
- Must work on GitHub Pages: `index.html` stays at the root, and all links to files use relative paths (for example `css/style.css`, not `/css/style.css`).

## How the code fits together
All JS files share one global scope. Files call each other's functions directly.

The load order in `index.html` matters. A new file must go in the right place:
`data/snippets.js` → `js/snippets.js` → `js/storage.js` → `js/highlight.js` → `js/theme.js` → `js/stats.js` → `js/results.js` → `js/progress.js` → `js/custom.js` → `js/countdown.js` → `js/keyboard.js` → `js/engine.js` → `js/main.js`

| File | Job |
|------|-----|
| `data/snippets.js` | `SNIPPETS` array. Each item: `id`, `language`, `difficulty`, `code`. |
| `js/snippets.js` | Reads the data: `getLanguages()`, `getRandomSnippet()`. |
| `js/engine.js` | One `<span>` per character, keyboard, cursor, Natural/Strict mode, keeps the current line in view. Public: `loadSnippet(code, language)`, `restartTyping`, `setTypingMode`, `countCorrectChars`. |
| `js/highlight.js` | Syntax colours: `getTokenTypes(code, language)` gives "comment", "string", "keyword", "number" or null per character. Rules per language in `HIGHLIGHT_RULES`. |
| `js/theme.js` | Light/dark: `applyTheme`, `toggleTheme`, `getCurrentTheme`, `getSystemTheme`. Light colours are in `:root[data-theme="light"]`. |
| `js/countdown.js` | "3, 2, 1" before typing: `startCountdown`, `stopCountdown`, `isCountdownRunning`, `setCountdownEnabled`. |
| `js/keyboard.js` | Symbol key row: `buildKeyRow`, `highlightNextKey`. The `<kbd>` keys are written in `index.html` (no layout jump on load). |
| `js/stats.js` | Timer, WPM = (correct chars / 5) / minutes, accuracy, live stats. The engine calls `recordKeyPress`, `finishStats`, `resetStats`. |
| `js/storage.js` | localStorage, always inside try/catch: `loadSettings`, `saveSettings(settings)` (language, mode, countdown, theme), `getSavedRuns`, `addRun` (keeps the last 50). |
| `js/results.js` | Results panel: `showResults`, `hideResults`. |
| `js/progress.js` | Progress section (best WPM, average accuracy per language, recent runs): `renderProgress`. |
| `js/custom.js` | "Custom code" textarea: `cleanCustomCode`, `showCustomPanel`, `hideCustomPanel`. |
| `js/main.js` | Connects dropdowns and buttons, restores saved settings, `saveFinishedRun` (called by stats.js). Runs last. |

- Mark a call to another file with a comment, for example `// from stats.js`.
- Global names must be unique in all files. Check before you add a new `const` or `function`.
- `js/typing.js` is empty and not loaded. Ignore it.
- Keep JavaScript split into small files, one job each. Add a new file in `js/` instead of making one file very big.

## Code style (match the existing code)
- JS: 4 spaces, double quotes, semicolons, `function name()` declarations, `const` / `let` (never `var`), `document.querySelector("#id")`.
- HTML and CSS: 2 spaces.
- Colours, fonts and spacing are CSS variables in `:root` in `css/style.css`. Reuse them. Do not hard-code colours.
- Use `textContent`, not `innerHTML`, for text from the snippets.
- Comments: short, simple English. Section headers look like `// ===== Timer =====`.
- The layout must work at 360px, 768px and 1280px wide.

## Accessibility rules (checked on 2026-10-14, Lighthouse 100)
- Text contrast at least 4.5:1 in both themes. Check new colours before you add them.
- Never only colour: a mistake is red **and** has a wavy underline.
- Keyboard: `#code-area` has `tabindex="0"`; typing works there. Tab is blocked only during a run; Esc moves focus to Restart.
- Focus: buttons that start typing call `focusCode()` (main.js). Dropdowns, the checkbox and the theme button move focus to the code only after a mouse click, never after a key.
- The code box has a fixed height, so the page does not jump (CLS 0). Do not fill visible parts of the page with JS on load if you can write them in HTML.

## Snippet data
Follow the rules in the comment at the top of `data/snippets.js`: 5–15 lines, 4 spaces for indentation (never tabs), a unique id like `js-7`, and escape `\\`, `` \` `` and `\${`.

## How to run and test
- Open `index.html` in a browser, or use VS Code Live Server (port 5501).
- There are no automated tests. After a change, check by hand:
  pick a language, type right and wrong keys, Backspace, Enter skips indentation, both modes, Restart, the results panel, "Try again" and "Next snippet".
- The browser console must show no errors.

## Git
- The git repo is inside `codetype/`. The parent `HTML-CSS` folder is not a repo.
- Commit only when the user asks. Use short commit messages in simple English, like "Add HTML and CSS layout for the typing screen".

## How to work with the user
- The user is learning English and front-end development.
- Use simple English and short sentences. Explain new words.
- Build one small step at a time. Do not build features the user did not ask for.
- After every task, explain what you changed in simple words.
- Then add a row to `CONTRIBUTION-LOG.md` (columns: Date | What I did | What AI did | What I learned). Fill in only "Date" and "What AI did". Leave the other columns empty for the user.
- When a feature is finished, update the "Status" part of `README.md`.
