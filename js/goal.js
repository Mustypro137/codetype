// Goal: what ends a game. The player chooses it in the "Goal" menu.
//   "time-60", "time-30"   – the time counts down; at 0 the game ends.
//   "words-60", "words-30" – the game ends when you have typed that many words.
//   "full"                 – the game ends when the snippet is finished.
// With a time or word goal, a finished snippet is followed by the next one,
// and the stats keep counting.

const GOALS = {
    "time-60": { seconds: 60 },
    "time-30": { seconds: 30 },
    "words-60": { words: 60 },
    "words-30": { words: 30 },
    "full": {}
};
const DEFAULT_GOAL = "time-60";

let currentGoal = DEFAULT_GOAL;

// Unknown values (for example from old saved settings) use the default.
function setGoal(goal) {
    currentGoal = GOALS[goal] ? goal : DEFAULT_GOAL;
}

function getGoal() {
    return currentGoal;
}

// 60, 30, or null when the goal has no time limit.
function getTimeLimitSeconds() {
    return GOALS[currentGoal].seconds || null;
}

// 60, 30, or null when the goal is not about words.
function getWordLimit() {
    return GOALS[currentGoal].words || null;
}

// Called by engine.js after every typed character.
function checkGoal() {
    const wordLimit = getWordLimit();

    if (wordLimit !== null) {
        updateLiveStats(); // from stats.js: show the new word count at once
        if (getTotalWordsTyped() >= wordLimit) { // from stats.js
            endGame();
            return;
        }
    }

    if (isFinished()) { // from engine.js: the snippet is finished
        if (currentGoal === "full") {
            endGame();
        } else {
            continueWithNextSnippet(); // from main.js
        }
    }
}

// The goal is reached: stop typing and show the results.
function endGame() {
    stopTyping();  // from engine.js
    finishStats(); // from stats.js
}
