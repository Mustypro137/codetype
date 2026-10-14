// On-screen keyboard row: a row of symbol keys.
// The key for the next character lights up, so you know what to look for.
// The keys are written in index.html, so the page does not jump when it loads.

const keyRowElement = document.querySelector("#key-row");

let keyElements = {}; // for example { "(": <kbd> } – one element for each symbol

// Finds the <kbd> keys in the row. Called once at the start.
function buildKeyRow() {
    keyElements = {};
    for (const key of keyRowElement.querySelectorAll(".key")) {
        keyElements[key.textContent] = key;
    }
}

// Lights up the key for "char". Letters, numbers and spaces are not in the row,
// so then nothing lights up.
function highlightNextKey(char) {
    const oldKey = keyRowElement.querySelector(".key.next");
    if (oldKey) {
        oldKey.classList.remove("next");
    }

    if (keyElements[char]) {
        keyElements[char].classList.add("next");
    }
}
