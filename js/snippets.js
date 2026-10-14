// Helper functions that read the SNIPPETS data (from data/snippets.js).

// Returns a list of language names, without repeats, in the same order as the data.
function getLanguages() {
    const languages = [];
    for (const snippet of SNIPPETS) {
        if (!languages.includes(snippet.language)) {
            languages.push(snippet.language);
        }
    }
    return languages;
}

// Returns a random snippet for one language.
// lastId is the snippet shown before, so we do not show it twice in a row.
function getRandomSnippet(language, lastId) {
    let choices = SNIPPETS.filter((snippet) => snippet.language === language);

    if (choices.length > 1) {
        choices = choices.filter((snippet) => snippet.id !== lastId);
    }

    const index = Math.floor(Math.random() * choices.length);
    return choices[index];
}
