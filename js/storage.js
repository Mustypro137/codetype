// Storage: saves the settings and the finished runs in localStorage.
// localStorage can be blocked (private mode, browser settings), so every
// read and write is inside try/catch. Then the app still works, it only forgets.

const SETTINGS_KEY = "codetype-settings";
const RUNS_KEY = "codetype-runs";
const MAX_SAVED_RUNS = 50;

// ===== Safe read and write =====

// Reads a value and turns the JSON text back into data.
// Returns "fallback" when there is nothing saved or storage is blocked.
function readStorage(key, fallback) {
    try {
        const text = localStorage.getItem(key);
        return text === null ? fallback : JSON.parse(text);
    } catch (error) {
        return fallback;
    }
}

// Turns the data into JSON text and saves it. Does nothing if storage is blocked.
function writeStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        // Storage is blocked or full. The app keeps working without it.
    }
}

// ===== Settings (language, mode, countdown, theme) =====

// Returns for example { language: "Python", mode: "strict", countdown: true, theme: "dark" },
// or {} when nothing is saved.
function loadSettings() {
    const settings = readStorage(SETTINGS_KEY, {});
    return typeof settings === "object" && settings !== null ? settings : {};
}

function saveSettings(settings) {
    writeStorage(SETTINGS_KEY, settings);
}

// ===== Finished runs =====

// We also keep the runs in memory, so Progress works in this visit
// even when storage is blocked.
let savedRuns = readStorage(RUNS_KEY, []);
if (!Array.isArray(savedRuns)) {
    savedRuns = [];
}

// All saved runs, oldest first. Each run: { date, language, wpm, accuracy }.
function getSavedRuns() {
    return savedRuns;
}

// Adds one run and keeps only the last 50.
function addRun(run) {
    savedRuns.push(run);
    savedRuns = savedRuns.slice(-MAX_SAVED_RUNS);
    writeStorage(RUNS_KEY, savedRuns);
}
