// Connects the data, the engine and the page controls.

const languageSelect = document.querySelector("#language-select");
const modeSelect = document.querySelector("#mode-select");
const restartButton = document.querySelector("#restart-btn");
const tryAgainButton = document.querySelector("#try-again-btn");
const nextButton = document.querySelector("#next-snippet-btn");
const snippetElement = document.querySelector("#snippet");
const countdownToggle = document.querySelector("#countdown-toggle");
const codeAreaElement = document.querySelector("#code-area");

const CUSTOM_LANGUAGE = "custom"; // value of the "Custom code" option
const CUSTOM_LANGUAGE_NAME = "Custom code";

let currentSnippetId = null;

// Creates one <option> in the dropdown for each language in the data,
// and one more option at the end for the user's own code.
function fillLanguageSelect() {
    languageSelect.innerHTML = "";

    for (const language of getLanguages()) {
        addLanguageOption(language, language);
    }
    addLanguageOption(CUSTOM_LANGUAGE, CUSTOM_LANGUAGE_NAME);
}

function addLanguageOption(value, text) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = text;
    languageSelect.appendChild(option);
}

// Shows a random snippet for the language that is selected now.
// For "Custom code" it shows the textarea instead.
function showRandomSnippet() {
    if (languageSelect.value === CUSTOM_LANGUAGE) {
        showCustomPanel(); // from custom.js
        return;
    }

    hideCustomPanel(); // from custom.js
    const snippet = getRandomSnippet(languageSelect.value, currentSnippetId);

    loadSnippet(snippet.code, snippet.language); // from engine.js
    snippetElement.dataset.id = snippet.id;
    snippetElement.dataset.difficulty = snippet.difficulty;

    currentSnippetId = snippet.id;
}

// ===== Saved settings =====

// Puts back the settings from the last visit (if they still exist).
function applySavedSettings() {
    const settings = loadSettings(); // from storage.js

    if (hasOption(languageSelect, settings.language)) {
        languageSelect.value = settings.language;
    }
    if (hasOption(modeSelect, settings.mode)) {
        modeSelect.value = settings.mode;
    }
    if (typeof settings.countdown === "boolean") {
        countdownToggle.checked = settings.countdown;
    }
    applyTheme(settings.theme || getSystemTheme()); // from theme.js
}

function hasOption(select, value) {
    return Array.from(select.options).some((option) => option.value === value);
}

function saveCurrentSettings() {
    saveSettings({ // from storage.js
        language: languageSelect.value,
        mode: modeSelect.value,
        countdown: countdownToggle.checked,
        theme: getCurrentTheme() // from theme.js
    });
}

// ===== Finished runs =====

// Called by stats.js when a snippet is finished.
function saveFinishedRun(results) {
    const language = languageSelect.value === CUSTOM_LANGUAGE
        ? CUSTOM_LANGUAGE_NAME
        : languageSelect.value;

    addRun({ // from storage.js
        date: new Date().toISOString(),
        language: language,
        wpm: results.wpm,
        accuracy: results.accuracy
    });
    renderProgress(); // from progress.js
}

// ===== Focus =====

// Was the last input a mouse click or touch (true), or a key (false)?
let lastInputWasPointer = false;
document.addEventListener("pointerdown", () => { lastInputWasPointer = true; }, true);
document.addEventListener("keydown", () => { lastInputWasPointer = false; }, true);

// Moves the focus to the code, so the next keys go to the typing engine.
function focusCode() {
    codeAreaElement.focus({ preventScroll: true });
}

// After a dropdown, checkbox or the theme button:
// with the mouse, go to the code (or the custom textarea), so you can type at once.
// With the keyboard, stay on the control, so you do not lose your place.
function moveFocusAfterChoice() {
    if (!lastInputWasPointer) {
        return;
    }
    if (languageSelect.value === CUSTOM_LANGUAGE && typingText === "") { // typingText from engine.js
        customInput.focus(); // from custom.js
    } else {
        focusCode();
    }
}

// ===== Events =====

function onLanguageChange() {
    saveCurrentSettings();
    showRandomSnippet();
    moveFocusAfterChoice();
}

function onModeChange() {
    setTypingMode(modeSelect.value);
    saveCurrentSettings();
    moveFocusAfterChoice();
}

function onCountdownToggle() {
    setCountdownEnabled(countdownToggle.checked); // from countdown.js
    saveCurrentSettings();
    moveFocusAfterChoice();
}

function onThemeClick() {
    toggleTheme(); // from theme.js
    saveCurrentSettings();
    moveFocusAfterChoice();
}

// Restart and "Try again" both start the same snippet again.
// The buttons start typing, so the focus goes to the code (mouse and keyboard).
function onRestartClick() {
    restartTyping();
    focusCode();
}

// "Next snippet" shows a new random snippet in the same language.
// For custom code it goes back to the textarea.
function onNextClick() {
    showRandomSnippet();
    if (languageSelect.value === CUSTOM_LANGUAGE) {
        customInput.focus(); // from custom.js
    } else {
        focusCode();
    }
}

languageSelect.addEventListener("change", onLanguageChange);
modeSelect.addEventListener("change", onModeChange);
countdownToggle.addEventListener("change", onCountdownToggle);
themeButton.addEventListener("click", onThemeClick);
restartButton.addEventListener("click", onRestartClick);
tryAgainButton.addEventListener("click", onRestartClick);
nextButton.addEventListener("click", onNextClick);

// Start: fill the dropdown, put back the saved settings, build the key row,
// show the progress, then show the first snippet.
fillLanguageSelect();
applySavedSettings();
setTypingMode(modeSelect.value);
setCountdownEnabled(countdownToggle.checked);
buildKeyRow(); // from keyboard.js
renderProgress(); // from progress.js
showRandomSnippet();
