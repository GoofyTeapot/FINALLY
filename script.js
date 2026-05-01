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

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    document.getElementById("countdown").textContent =
        days + " days left!";
}

updateCountdown();
setInterval(updateCountdown, 1000 * 60 * 60);
