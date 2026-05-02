/* ============================
   COUNTDOWN TO BIRTHDAY
============================ */

const birthday = new Date("2026-05-01T00:00:00"); // <-- change if needed

function updateCountdown() {
    const now = new Date();
    const diff = birthday - now;

    if (diff <= 0) {
        document.getElementById("days").textContent = "🎉";
        document.getElementById("time").textContent = "HAPPY BIRTHDAY NOAH!";
        startConfetti();
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("days").textContent = days;
    document.getElementById("time").textContent =
        hours + "h " + minutes + "m " + seconds + "s";

    updateRing(days);
}

setInterval(updateCountdown, 1000);
updateCountdown();


/* ============================
   LIVE CLOCK
============================ */

function updateClock() {
    const now = new Date();

    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    if (m < 10) m = "0" + m;
    if (s < 10) s = "0" + s;

    document.getElementById("live-clock").textContent = h + ":" + m + ":" + s;
}

setInterval(updateClock, 1000);
updateClock();


/* ============================
   LIVE DATE
============================ */

function updateDate() {
    const now = new Date();
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    document.getElementById("live-date").textContent =
        now.toLocaleDateString(undefined, options);
}

updateDate();


/* ============================
   DAILY PROGRESS BAR
============================ */

function updateDayProgress() {
    const now = new Date();
    const secondsToday =
        now.getHours() * 3600 +
        now.getMinutes() * 60 +
        now.getSeconds();

    const percent = (secondsToday / 86400) * 100;
    document.getElementById("day-progress-fill").style.width = percent + "%";
}

setInterval(updateDayProgress, 1000);
updateDayProgress();


/* ============================
   SPARKLES (subtle background)
============================ */

function createSparkle() {
    const sparkle = document.createElement("div");
    sparkle.classList.add("sparkle");

    sparkle.style.left = Math.random() * 100 + "vw";
    sparkle.style.top = Math.random() * 100 + "vh";
    sparkle.style.opacity = Math.random();

    document.getElementById("sparkles").appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 3000);
}

setInterval(createSparkle, 400);


/* ============================
   PROGRESS RING AROUND DAYS
============================ */

function updateRing(daysLeft) {
    const totalDays = 365;
    const percent = ((totalDays - daysLeft) / totalDays);
    const circumference = 440;
    const offset = circumference - (percent * circumference);

    document.getElementById("ring-progress").style.strokeDashoffset = offset;
}


/* ============================
   CONFETTI (simple version)
============================ */

const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confettiPieces = [];

function startConfetti() {
    for (let i = 0; i < 150; i++) {
        confettiPieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 6 + 4,
            speed: Math.random() * 3 + 2,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`
        });
    }
}

function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confettiPieces.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);

        p.y += p.speed;

        if (p.y > canvas.height) {
            p.y = -10;
        }
    });

    requestAnimationFrame(drawConfetti);
}

drawConfetti();
