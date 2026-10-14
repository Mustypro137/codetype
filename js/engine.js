// Typing engine: shows the snippet as one <span> per character,
// checks each key the user presses, and moves the cursor.

const typingArea = document.querySelector("#snippet");
const codeScrollBox = typingArea.parentElement; // the <pre> that scrolls

let typingText = "";        // the snippet the user must type
let charSpans = [];         // one <span> for each character of typingText
let cursorIndex = 0;        // position of the next character to type
let typingMode = "natural"; // "natural" or "strict"
let typingLanguage = "";    // used for the syntax colours
let lastCursorTop = null;   // top of the cursor's line, to see when the line changes
let wordEnds = [];          // index of the last character of each word (for word goals)

// ===== Public functions (used by main.js) =====

// Loads a new snippet and starts from the beginning.
// "language" is for the colours. Without it (custom code) there are no colours.
function loadSnippet(code, language) {
    typingText = code;
    typingLanguage = language || "";
    restartTyping();
}

// Starts the same snippet again: all colours and counters are reset.
function restartTyping() {
    cursorIndex = 0;
    renderSnippet();
    updateCursor();
    resetStats();  // from stats.js
    hideResults(); // from results.js

    if (typingText === "") {
        stopCountdown(); // from countdown.js
    } else {
        startCountdown(); // from countdown.js
    }
}

// The next snippet in the same game (time or word goal).
// The stats keep counting: no reset, no countdown.
function continueWithSnippet(code, language) {
    keepSnippetProgress(); // from stats.js
    typingText = code;
    typingLanguage = language || "";
    cursorIndex = 0;
    renderSnippet();
    updateCursor();
}

// Called when the game is over: hides the cursor and the key light.
// The keys stop working because hasRunEnded() is now true.
function stopTyping() {
    const cursor = typingArea.querySelector(".cursor");
    if (cursor) {
        cursor.classList.remove("cursor");
    }
    highlightNextKey(null); // from keyboard.js
}

// Changes the mode: "natural" or "strict".
function setTypingMode(mode) {
    typingMode = mode;
}

// ===== Showing the snippet =====

// Puts every character in its own <span>, so we can colour each one.
// The syntax type (for example "keyword") becomes a class like "tok-keyword".
function renderSnippet() {
    typingArea.textContent = "";
    charSpans = [];
    lastCursorTop = null;
    codeScrollBox.scrollTop = 0;

    const tokenTypes = getTokenTypes(typingText, typingLanguage); // from highlight.js

    for (let i = 0; i < typingText.length; i++) {
        const char = typingText[i];
        const span = document.createElement("span");
        span.className = char === "\n" ? "char newline" : "char";
        if (tokenTypes[i]) {
            span.classList.add("tok-" + tokenTypes[i]);
        }
        span.textContent = char;
        typingArea.appendChild(span);
        charSpans.push(span);
    }

    wordEnds = findWordEnds(typingText);
}

// A word is text between spaces or new lines.
// Returns the index of the last character of each word.
function findWordEnds(text) {
    const ends = [];
    for (let i = 0; i < text.length; i++) {
        const isWordChar = text[i].trim() !== "";
        const nextIsSpace = i + 1 === text.length || text[i + 1].trim() === "";
        if (isWordChar && nextIsSpace) {
            ends.push(i);
        }
    }
    return ends;
}

// Sets the colour of one character: "correct", "wrong", "auto" or null (not typed).
function markChar(index, status) {
    const span = charSpans[index];
    span.classList.remove("correct", "wrong", "auto");
    if (status) {
        span.classList.add(status);
    }
}

// Moves the blinking cursor to the character at cursorIndex.
function updateCursor() {
    const oldCursor = typingArea.querySelector(".cursor");
    if (oldCursor) {
        oldCursor.classList.remove("cursor");
    }

    if (isFinished()) {
        highlightNextKey(null); // from keyboard.js
        return;
    }

    const span = charSpans[cursorIndex];
    span.classList.add("cursor");
    highlightNextKey(typingText[cursorIndex]); // from keyboard.js
    keepLineInView(span);
}

// When the cursor goes to a new line, scroll the code box smoothly,
// so the current line stays in the top third of the box.
// The smooth movement comes from "scroll-behavior: smooth" in style.css.
function keepLineInView(span) {
    const lineTop = span.offsetTop;
    if (lineTop === lastCursorTop) {
        return;
    }

    lastCursorTop = lineTop;
    codeScrollBox.scrollTo({ top: lineTop - codeScrollBox.clientHeight / 3 });
}

function isFinished() {
    return cursorIndex >= charSpans.length;
}

// How many characters are green now (used for WPM in stats.js).
// Spaces skipped by Enter ("auto") are not counted: the user did not type them.
function countCorrectChars() {
    return charSpans.filter((span) => span.classList.contains("correct")).length;
}

// How many words of this snippet the cursor has passed (used for word goals).
function countWordsTyped() {
    return wordEnds.filter((end) => end < cursorIndex).length;
}

// ===== Typing logic =====

// Checks one typed character against the expected one.
function typeCharacter(typed) {
    if (isFinished()) {
        return;
    }

    const expected = typingText[cursorIndex];
    recordKeyPress(expected, typed === expected); // from stats.js

    if (typed === expected) {
        markChar(cursorIndex, "correct");
        cursorIndex++;
        if (typed === "\n") {
            skipIndentation();
        }
    } else {
        markChar(cursorIndex, "wrong");
        // Natural mode moves on. Strict mode waits for the right key.
        // At the end of a line, only Enter moves on (in both modes).
        if (typingMode === "natural" && expected !== "\n") {
            cursorIndex++;
        }
    }

    updateCursor();
    checkGoal(); // from goal.js: end the game, go to the next snippet, or go on
}

// After Enter: jumps over the spaces at the start of the new line.
function skipIndentation() {
    while (typingText[cursorIndex] === " ") {
        markChar(cursorIndex, "auto");
        cursorIndex++;
    }
}

// Backspace: goes back one character and removes its colour.
function moveBack() {
    if (cursorIndex === 0) {
        return;
    }

    // Clear the character under the cursor (it can be red in strict mode).
    if (!isFinished()) {
        markChar(cursorIndex, null);
    }

    cursorIndex--;

    // Also jump back over spaces that were skipped automatically.
    while (cursorIndex > 0 && charSpans[cursorIndex].classList.contains("auto")) {
        markChar(cursorIndex, null);
        cursorIndex--;
    }

    markChar(cursorIndex, null);
    updateCursor();
}

// ===== Keyboard =====

// True when the key is pressed inside a dropdown, button or text field.
// Then the browser handles the key, not the engine.
function isOnFormControl(event) {
    return event.target instanceof Element &&
        event.target.closest("select, button, input, textarea") !== null;
}

// True after the first key and before the end (last character or time over).
function isRunActive() {
    return hasRunStarted() && !hasRunEnded(); // from stats.js
}

// Esc: move the focus to the Restart button, so keyboard users can leave the code.
function leaveCodeArea() {
    document.querySelector("#restart-btn").focus();
}

// True for shortcuts like Ctrl+R or Ctrl+C. We let the browser handle them.
// AltGr is allowed, because some keyboards need it for { } [ ].
function isShortcut(event) {
    const ctrlOrCmd = event.ctrlKey || event.metaKey;
    return ctrlOrCmd && !event.getModifierState("AltGraph");
}

function handleKeydown(event) {
    if (isOnFormControl(event) || isShortcut(event) || event.isComposing) {
        return;
    }

    const key = event.key;

    if (key === "Escape") {
        leaveCodeArea();
        return;
    }

    // While you type, Tab does nothing, so the focus does not jump away by mistake.
    // Before the first key and after the end, Tab moves the focus as normal.
    if (key === "Tab") {
        if (isRunActive()) {
            event.preventDefault();
        }
        return;
    }

    // After the end (time over), the keys do nothing until Restart.
    if (hasRunEnded()) { // from stats.js
        return;
    }

    // During "3, 2, 1" the keys do nothing.
    if (isCountdownRunning()) { // from countdown.js
        if (key.length === 1 || key === "Enter" || key === "Backspace") {
            event.preventDefault();
        }
        return;
    }

    if (key === "Backspace") {
        event.preventDefault();
        moveBack();
        return;
    }

    const typed = key === "Enter" ? "\n" : key;

    // Keys like Shift, Arrow keys or F5 have long names: ignore them.
    if (typed.length !== 1) {
        return;
    }

    // Stop Space from scrolling and ' or / from opening quick search.
    event.preventDefault();
    typeCharacter(typed);
}

document.addEventListener("keydown", handleKeydown);
