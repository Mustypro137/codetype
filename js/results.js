// Results panel: fills it with the final numbers, shows it and hides it.

const resultsPanel = document.querySelector("#results");
const resultWpm = document.querySelector("#result-wpm");
const resultAccuracy = document.querySelector("#result-accuracy");
const resultTime = document.querySelector("#result-time");
const resultMistakes = document.querySelector("#result-mistakes");
const resultKeysList = document.querySelector("#result-keys");

// Shows the panel with the results from stats.js.
function showResults(results) {
    resultWpm.textContent = results.wpm;
    resultAccuracy.textContent = results.accuracy + "%";
    resultTime.textContent = results.time;
    resultMistakes.textContent = results.mistakes;
    renderTopKeys(results.topKeys);

    resultsPanel.hidden = false;
    // Focus the panel, not a button: the player may still be typing,
    // and a Space or Enter on a button would close the results at once.
    // Keyboard users press Tab to reach "Try again" and "Next snippet".
    resultsPanel.focus({ preventScroll: true });
    resultsPanel.scrollIntoView({ block: "nearest" });
}

function hideResults() {
    resultsPanel.hidden = true;
}

// Makes the list of keys with the most mistakes.
function renderTopKeys(topKeys) {
    resultKeysList.textContent = "";

    if (topKeys.length === 0) {
        const item = document.createElement("li");
        item.textContent = "No mistakes. Perfect!";
        resultKeysList.appendChild(item);
        return;
    }

    for (const [key, count] of topKeys) {
        const item = document.createElement("li");
        const keyLabel = document.createElement("kbd");
        keyLabel.textContent = getKeyName(key);
        item.appendChild(keyLabel);
        item.append(" " + count + (count === 1 ? " mistake" : " mistakes"));
        resultKeysList.appendChild(item);
    }
}

// Space and newline are invisible, so we show a name instead.
function getKeyName(char) {
    if (char === " ") {
        return "Space";
    }
    if (char === "\n") {
        return "Enter";
    }
    return char;
}
