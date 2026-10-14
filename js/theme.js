// Light and dark theme. The colours are in css/style.css:
// :root is dark, and :root[data-theme="light"] changes the colours to light.

const themeButton = document.querySelector("#theme-toggle");

let currentTheme = "dark";

// The theme of the computer, used when nothing is saved yet.
function getSystemTheme() {
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    return prefersLight ? "light" : "dark";
}

// Sets "light" or "dark" on the <html> element and updates the button.
function applyTheme(theme) {
    currentTheme = theme === "light" ? "light" : "dark";
    document.documentElement.dataset.theme = currentTheme;

    // The button shows the theme you get when you click it.
    const isDark = currentTheme === "dark";
    themeButton.textContent = isDark ? "☀ Light" : "☾ Dark";
    themeButton.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
}

function toggleTheme() {
    applyTheme(currentTheme === "dark" ? "light" : "dark");
}

function getCurrentTheme() {
    return currentTheme;
}
