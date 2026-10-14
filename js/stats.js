// Stats: the timer, the counters, the WPM and accuracy formulas,
// and the live stats row (WPM, Accuracy, Time).

const wpmElement = document.querySelector("#wpm");
const accuracyElement = document.querySelector("#accuracy");
const timeElement = document.querySelector("#time");

let startTime = null;   // time of the first key press (in milliseconds)
let endTime = null;     // time of the last character (in milliseconds)
let timerId = null;     // id from setInterval, so we can stop it
let totalPresses = 0;   // all typed keys (Backspace is not counted)
let correctPresses = 0; // typed keys that were right
let mistakesByKey = {}; // mistakes for each expected key, for example { ";": 2 }

// ===== Formulas =====

// WPM = (correct characters / 5) / minutes. 5 characters count as 1 word.
// Less than 1 second counts as 1 second, so a tiny snippet typed very fast
// does not give a crazy number like 12000 WPM.
function calculateWpm(correctChars, seconds) {
    const words = correctChars / 5;
    const minutes = Math.max(seconds, 1) / 60;
    return Math.round(words / minutes);
}

// Accuracy = correct presses / all presses × 100.
function calculateAccuracy(correct, total) {
    if (total === 0) {
        return 100;
    }
    return Math.round((correct / total) * 100);
}

// ===== Timer =====

function startTimer() {
    startTime = Date.now();
    timerId = setInterval(updateLiveStats, 1000); // every second
}

function stopTimer() {
    endTime = Date.now();
    clearInterval(timerId);
    timerId = null;
}

// Seconds from the first key until now (or until the end, when finished).
function getElapsedSeconds() {
    if (startTime === null) {
        return 0;
    }
    const end = endTime === null ? Date.now() : endTime;
    return (end - startTime) / 1000;
}

// Shows seconds as "42s" or "1m 5s".
function formatTime(seconds) {
    const whole = Math.floor(seconds);
    if (whole < 60) {
        return whole + "s";
    }
    return Math.floor(whole / 60) + "m " + (whole % 60) + "s";
}

// ===== Counting (called by engine.js) =====

// Called for every typed key. "expected" is the character the user should type.
function recordKeyPress(expected, isCorrect) {
    if (startTime === null) {
        startTimer(); // the first key starts the timer
    }

    totalPresses++;
    if (isCorrect) {
        correctPresses++;
    } else {
        mistakesByKey[expected] = (mistakesByKey[expected] || 0) + 1;
    }
}

// True after the first key press (until the next reset).
function hasRunStarted() {
    return startTime !== null;
}

// Called when the last character is typed.
function finishStats() {
    stopTimer();
    updateLiveStats();

    const results = getResults();
    showResults(results);     // from results.js
    saveFinishedRun(results); // from main.js
}

// Called on restart and for a new snippet: everything back to zero.
function resetStats() {
    clearInterval(timerId);
    timerId = null;
    startTime = null;
    endTime = null;
    totalPresses = 0;
    correctPresses = 0;
    mistakesByKey = {};
    updateLiveStats();
}

// ===== Showing the numbers =====

function updateLiveStats() {
    const seconds = getElapsedSeconds();
    wpmElement.textContent = calculateWpm(countCorrectChars(), seconds);
    accuracyElement.textContent = calculateAccuracy(correctPresses, totalPresses) + "%";
    timeElement.textContent = formatTime(seconds);
}

// The 5 keys with the most mistakes, for example [[";", 3], ["{", 1]].
function getTopMistakeKeys(limit) {
    return Object.entries(mistakesByKey)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit);
}

function getResults() {
    const seconds = getElapsedSeconds();
    return {
        wpm: calculateWpm(countCorrectChars(), seconds),
        accuracy: calculateAccuracy(correctPresses, totalPresses),
        time: formatTime(seconds),
        mistakes: totalPresses - correctPresses,
        topKeys: getTopMistakeKeys(5)
    };
}
