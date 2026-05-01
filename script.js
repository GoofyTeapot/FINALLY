function getNextBirthday(month, day) {
    const now = new Date();
    let year = now.getFullYear();

    let birthday = new Date(year, month - 1, day);

    if (birthday < now) {
        birthday = new Date(year + 1, month - 1, day);
    }

    return birthday;
}

// Noah's birthday: May 4
const birthday = getNextBirthday(5, 4);

function updateCountdown() {
    const now = new Date();
    const diff = birthday - now;

    if (diff <= 0) {
        document.getElementById("countdown-days").textContent = "0 Days";
        document.getElementById("countdown-hms").textContent = "0 hr 0 min 0 sec";
        return;
    }

    const totalSeconds = Math.floor(diff / 1000);

    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    document.getElementById("countdown-days").textContent =
        days + " Days";

    document.getElementById("countdown-hms").textContent =
        hours + " hr " +
        minutes + " min " +
        seconds + " sec";
}

// ----------------------
// CONFETTI ENGINE
// ----------------------
const confettiCanvas = document.getElementById("confetti-canvas");
const ctx = confettiCanvas.getContext("2d");

function resizeCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const confettiPieces = [];
const colors = ["#ff4d4d", "#4da6ff", "#ffd11a", "#66ff99", "#ff66cc"];

for (let i = 0; i < 150; i++) {
    confettiPieces.push({
        x: Math.random() * confettiCanvas.width,
        y: Math.random() * confettiCanvas.height,
        size: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 2 + 1,
        drift: Math.random() * 1 - 0.5
    });
}

function drawConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    confettiPieces.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);

        p.y += p.speed;
        p.x += p.drift;

        if (p.y > confettiCanvas.height) {
            p.y = -10;
            p.x = Math.random() * confettiCanvas.width;
        }
    });

    requestAnimationFrame(drawConfetti);
}

function updateClock() {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // pad with zeros
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;

    document.getElementById("live-clock").textContent =
        hours + ":" + minutes + ":" + seconds;
}

updateClock();
setInterval(updateClock, 1000);

drawConfetti();
updateCountdown();
setInterval(updateCountdown, 1000);
