// Progress section: best WPM and average accuracy for each language,
// and a list of the most recent runs.

const progressEmpty = document.querySelector("#progress-empty");
const progressContent = document.querySelector("#progress-content");
const progressTableBody = document.querySelector("#progress-body");
const recentRunsList = document.querySelector("#recent-runs");
const RECENT_RUNS_SHOWN = 10;

// Shows the Progress section again with the saved runs.
function renderProgress() {
    const runs = getSavedRuns(); // from storage.js

    progressEmpty.hidden = runs.length > 0;
    progressContent.hidden = runs.length === 0;

    renderLanguageTable(runs);
    renderRecentRuns(runs);
}

// ===== Table: one row per language =====

// Returns for example [{ language: "Python", bestWpm: 48, averageAccuracy: 95 }].
function getLanguageSummaries(runs) {
    const groups = {};

    for (const run of runs) {
        if (!groups[run.language]) {
            groups[run.language] = { bestWpm: 0, accuracyTotal: 0, count: 0 };
        }
        const group = groups[run.language];
        group.bestWpm = Math.max(group.bestWpm, run.wpm);
        group.accuracyTotal += run.accuracy;
        group.count++;
    }

    return Object.entries(groups).map(([language, group]) => ({
        language: language,
        bestWpm: group.bestWpm,
        averageAccuracy: Math.round(group.accuracyTotal / group.count)
    }));
}

function renderLanguageTable(runs) {
    progressTableBody.textContent = "";

    for (const summary of getLanguageSummaries(runs)) {
        const row = document.createElement("tr");
        addCell(row, summary.language);
        addCell(row, summary.bestWpm);
        addCell(row, summary.averageAccuracy + "%");
        progressTableBody.appendChild(row);
    }
}

function addCell(row, text) {
    const cell = document.createElement("td");
    cell.textContent = text;
    row.appendChild(cell);
}

// ===== List: the newest runs first =====

function renderRecentRuns(runs) {
    recentRunsList.textContent = "";

    const newestFirst = runs.slice(-RECENT_RUNS_SHOWN).reverse();
    for (const run of newestFirst) {
        const item = document.createElement("li");
        item.textContent = formatRunDate(run.date) + " – " + run.language +
            " – " + run.wpm + " WPM, " + run.accuracy + "%";
        recentRunsList.appendChild(item);
    }
}

// Shows a saved date like "14 Oct, 14:05".
function formatRunDate(isoDate) {
    const date = new Date(isoDate);
    return date.toLocaleString(undefined, {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit"
    });
}
