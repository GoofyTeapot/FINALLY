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

updateCountdown();
setInterval(updateCountdown, 1000);
