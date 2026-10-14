// Custom code: the user pastes their own code into a textarea and practises it.

const customPanel = document.querySelector("#custom-panel");
const customInput = document.querySelector("#custom-input");
const customStartButton = document.querySelector("#custom-start-btn");
const customMessage = document.querySelector("#custom-message");

// Makes pasted code ready to type:
// tabs become 4 spaces, and empty lines at the end are removed.
function cleanCustomCode(text) {
    const lines = text
        .replace(/\r\n?/g, "\n") // Windows line endings → "\n"
        .replace(/\t/g, "    ")
        .split("\n");

    while (lines.length > 0 && lines[lines.length - 1].trim() === "") {
        lines.pop();
    }

    return lines.join("\n");
}

// Shows the textarea. The code area waits until the user presses Start.
// While it is empty, CSS shows the text from data-empty-text on #snippet.
function showCustomPanel() {
    customPanel.hidden = false;
    customMessage.textContent = "";
    loadSnippet(""); // from engine.js: nothing to type yet
}

function hideCustomPanel() {
    customPanel.hidden = true;
}

// Start: clean the pasted code and give it to the typing engine.
function onCustomStartClick() {
    const code = cleanCustomCode(customInput.value);

    if (code === "") {
        customMessage.textContent = "Please paste some code first.";
        customInput.value = "";
        customInput.focus();
        return;
    }

    customMessage.textContent = "";
    customInput.value = code; // show the cleaned code in the textarea too
    loadSnippet(code); // from engine.js
    snippetElement.dataset.id = "custom"; // from main.js
    focusCode(); // from main.js: the next keys go to the typing engine
}

customStartButton.addEventListener("click", onCustomStartClick);
