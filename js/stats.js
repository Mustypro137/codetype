// Stats: the timer, the counters, the WPM and accuracy formulas,
// and the live stats row (WPM, Accuracy, and Time left / Words / Time).

const wpmElement = document.querySelector("#wpm");
const accuracyElement = document.querySelector("#accuracy");
const timeElement = document.querySelector("#time");
const timeLabelElement = document.querySelector("#time-label");

let startTime = null;   // time of the first key press (in milliseconds)
let endTime = null;     // time of the end: goal reached or time over (in milliseconds)
let timerId = null;     // id from setInterval, so we can stop it
let timeLimitId = null; // id from setTimeout that ends the game at the time limit
let totalPresses = 0;   // all typed keys (Backspace is not counted)
let correctPresses = 0; // typed keys that were right
let mistakesByKey = {}; // mistakes for each expected key, for example { ";": 2 }

// With a time or word goal, one game can have several snippets.
// These keep the numbers from the snippets that are already finished.
let earlierCorrectChars = 0;
let earlierWords = 0;

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

// One timer updates the numbers every second.
// With a time goal, a second timer ends the game exactly when the time is over.
function startTimer() {
    startTime = Date.now();
    timerId = setInterval(updateLiveStats, 1000);

    const limit = getTimeLimitSeconds(); // from goal.js
    if (limit !== null) {
        timeLimitId = setTimeout(onTimeUp, limit * 1000);
    }
}

// isTimeUp = true: the full time was used, so the end is exactly at the limit.
function stopTimer(isTimeUp) {
    endTime = isTimeUp ? startTime + getTimeLimitSeconds() * 1000 : Date.now();
    clearTimers();
}

function clearTimers() {
    clearInterval(timerId);
    clearTimeout(timeLimitId);
    timerId = null;
    timeLimitId = null;
}

// The time is over: stop the game and show the results.
function onTimeUp() {
    stopTyping(); // from engine.js: no more typing
    finishStats(true);
}

// Seconds from the first key until now (or until the end).
// With a time goal, never more than the time limit.
function getElapsedSeconds() {
    if (startTime === null) {
        return 0;
    }
    const end = endTime === null ? Date.now() : endTime;
    const seconds = (end - startTime) / 1000;
    const limit = getTimeLimitSeconds(); // from goal.js
    return limit === null ? seconds : Math.min(seconds, limit);
}

// Seconds left, rounded up: 60, 59, … 1, 0.
function getSecondsLeft() {
    return Math.ceil(getTimeLimitSeconds() - getElapsedSeconds());
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

// Called before the next snippet of the same game is shown.
function keepSnippetProgress() {
    earlierCorrectChars += countCorrectChars(); // from engine.js
    earlierWords += countWordsTyped();          // from engine.js
}

function getTotalCorrectChars() {
    return earlierCorrectChars + countCorrectChars(); // from engine.js
}

function getTotalWordsTyped() {
    return earlierWords + countWordsTyped(); // from engine.js
}

// True after the first key press (until the next reset).
function hasRunStarted() {
    return startTime !== null;
}

// True when the game is over (goal reached, or time over).
function hasRunEnded() {
    return endTime !== null;
}

// Called when the goal is reached, or when the time is over.
function finishStats(isTimeUp) {
    stopTimer(isTimeUp);
    updateLiveStats();

    const results = getResults();
    showResults(results);     // from results.js
    saveFinishedRun(results); // from main.js
}

// Called on restart and for a new game: everything back to zero.
function resetStats() {
    clearTimers();
    startTime = null;
    endTime = null;
    totalPresses = 0;
    correctPresses = 0;
    mistakesByKey = {};
    earlierCorrectChars = 0;
    earlierWords = 0;
    updateLiveStats();
}

// ===== Showing the numbers =====

function updateLiveStats() {
    const seconds = getElapsedSeconds();
    wpmElement.textContent = calculateWpm(getTotalCorrectChars(), seconds);
    accuracyElement.textContent = calculateAccuracy(correctPresses, totalPresses) + "%";
    updateGoalStat(seconds);
}

// The third box depends on the goal:
// "Time left 42s", "Words 12 / 30", or "Time 1m 5s" (full snippet).
function updateGoalStat(seconds) {
    const wordLimit = getWordLimit(); // from goal.js

    if (wordLimit !== null) {
        timeLabelElement.textContent = "Words";
        timeElement.textContent = Math.min(getTotalWordsTyped(), wordLimit) + " / " + wordLimit;
    } else if (getTimeLimitSeconds() !== null) { // from goal.js
        timeLabelElement.textContent = "Time left";
        timeElement.textContent = getSecondsLeft() + "s";
    } else {
        timeLabelElement.textContent = "Time";
        timeElement.textContent = formatTime(seconds);
    }
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
        wpm: calculateWpm(getTotalCorrectChars(), seconds),
        accuracy: calculateAccuracy(correctPresses, totalPresses),
        time: formatTime(seconds),
        mistakes: totalPresses - correctPresses,
        topKeys: getTopMistakeKeys(5)
    };
}
