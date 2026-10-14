// Countdown: shows "3, 2, 1" over the code before you can type.
// The engine ignores keys while the countdown runs. It can be turned off.

const countdownElement = document.querySelector("#countdown");
const COUNTDOWN_START = 3;

let countdownEnabled = true;
let countdownTimerId = null; // id from setInterval, null when not running

function setCountdownEnabled(enabled) {
    countdownEnabled = enabled;
    if (!enabled) {
        stopCountdown();
    }
}

// Starts again from 3. Does nothing when the countdown is turned off.
function startCountdown() {
    stopCountdown();
    if (!countdownEnabled) {
        return;
    }

    let number = COUNTDOWN_START;
    countdownElement.textContent = number;
    countdownElement.hidden = false;

    countdownTimerId = setInterval(() => {
        number--;
        if (number === 0) {
            stopCountdown();
        } else {
            countdownElement.textContent = number;
        }
    }, 1000);
}

function stopCountdown() {
    clearInterval(countdownTimerId);
    countdownTimerId = null;
    countdownElement.hidden = true;
}

function isCountdownRunning() {
    return countdownTimerId !== null;
}
