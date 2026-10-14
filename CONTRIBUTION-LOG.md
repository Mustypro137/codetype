# Contribution Log

| Date | What I did | What AI did | What I learned |
|------|------------|-------------|----------------|
| 2026-10-13 | | Created the folder structure and empty files, wrote CLAUDE.md, README.md and this log, initialised git and made the first commit. | |
| 2026-10-13 | | Built the HTML and CSS layout of the typing screen: header, language and mode dropdowns, live stats (WPM, Accuracy, Time), code area, Restart button and a hidden results panel. Dark theme, works at 360px, 768px and 1280px. | |
| 2026-10-13 | | Created data/snippets.js with 42 code snippets (6 each for JavaScript, Python, HTML, CSS, Java, C and PHP, from easy to hard). Wrote js/snippets.js and js/main.js to fill the language dropdown from the data and show a random snippet when a language is picked. | |
| 2026-10-13 | | Built the typing engine in js/engine.js: one span per character, green/red colours, blinking cursor, Enter skips indentation, Backspace, Natural and Strict modes, blocks Tab/Space/quote browser shortcuts, Restart button. Connected it in main.js and added the colours in style.css. | |
| 2026-10-13 | | Added js/stats.js (timer, WPM and accuracy formulas, live stats every second) and js/results.js (results panel with WPM, accuracy, time, mistakes and the top 5 most-missed keys). Added "Try again" and "Next snippet" buttons. | |
| 2026-10-14 | | Added js/storage.js (saves language, mode and the last 50 finished runs in localStorage, every read and write inside try/catch), js/progress.js (Progress section: best WPM and average accuracy per language, list of recent runs) and js/custom.js ("Custom code" option: paste your own code, tabs become 4 spaces, empty lines at the end are removed). Connected them in main.js and stats.js, added HTML and CSS. | |
| 2026-10-14 | | Improved the look and feel: js/highlight.js (syntax colours with a small regex per language), js/countdown.js ("3, 2, 1" before typing, with an on/off checkbox), js/keyboard.js (symbol key row, the next key lights up), js/theme.js (light/dark button, light colours in CSS). The code box now scrolls smoothly to keep the current line in view. Countdown and theme are saved with the other settings. | |
| 2026-10-14 | | Checked the whole app (360/768/1280px, keyboard only, labels, contrast, console, Lighthouse, every button, edge cases) and fixed the problems: favicon, stronger comment and light-red colours, wavy underline for mistakes, fixed-height code box and key row in HTML (no page jump), code area reachable with Tab, Esc to leave the code, focus stays on controls when you use the keyboard, hint text kept after Restart in custom mode, WPM limit for very short snippets. Lighthouse is now 100 everywhere. | |
| 2026-10-14 | | Prepared the project for GitHub Pages: checked that all file paths are relative and that file names match exactly (GitHub Pages is case-sensitive), took 3 screenshots (images/screenshots/), wrote the full README, added the phase summary below, and wrote the steps to push and turn on GitHub Pages. | |
| 2026-10-14 | | Removed "Cascadia Code" from the font list (the browser blocked it for privacy and showed a console message), committed all the work and pushed it to GitHub. | |

## Summary of every phase

Fill in "What I did" and "What I learned" in the table above. This summary only lists what was built.

| Phase | Date | What was built | Main files |
|-------|------|----------------|------------|
| 1. Setup | 2026-10-13 | Folder structure, CLAUDE.md (rules), README, this log, git repo. | `CLAUDE.md`, `README.md` |
| 2. Layout | 2026-10-13 | The typing screen in HTML and CSS: header, settings, live stats, code area, results panel. Dark theme, responsive. | `index.html`, `css/style.css` |
| 3. Snippets | 2026-10-13 | 42 real code snippets in 7 languages, a language dropdown and a random snippet. | `data/snippets.js`, `js/snippets.js`, `js/main.js` |
| 4. Typing engine | 2026-10-13 | One span per character, green/red, cursor, Enter skips indentation, Backspace, Natural and Strict mode. | `js/engine.js` |
| 5. Stats and results | 2026-10-13 | Timer, WPM and accuracy, live stats, results panel with the most-missed keys, "Try again" and "Next snippet". | `js/stats.js`, `js/results.js` |
| 6. Saving, progress, custom code | 2026-10-14 | Settings and the last 50 runs in localStorage (safe with try/catch), Progress section, Custom code. | `js/storage.js`, `js/progress.js`, `js/custom.js` |
| 7. Look and feel | 2026-10-14 | Syntax colours, "3, 2, 1" countdown, smooth scroll, symbol key row, light/dark theme. | `js/highlight.js`, `js/countdown.js`, `js/keyboard.js`, `js/theme.js` |
| 8. Quality check | 2026-10-14 | Checked layout, keyboard use, contrast, console, Lighthouse, buttons and edge cases. Fixed: favicon, contrast, underline for mistakes, page jump, keyboard trap, focus, very fast WPM. Lighthouse 100. | many files |
| 9. GitHub Pages | 2026-10-14 | Relative paths checked, screenshots, full README, push and Pages steps. | `README.md`, `images/screenshots/` |
