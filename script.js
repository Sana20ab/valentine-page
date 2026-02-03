const yesButton = document.getElementById("yes-btn");
const noButton = document.getElementById("no-btn");
const buttonsContainer = document.querySelector(".buttons");

/* Utility */
function getDistance(x1, y1, x2, y2) {
    return Math.hypot(x1 - x2, y1 - y2);
}

/* -------- NO BUTTON ESCAPE -------- */

document.addEventListener("mousemove", (event) => {
    const noRect = noButton.getBoundingClientRect();
    const yesRect = yesButton.getBoundingClientRect();

    const noCenterX = noRect.left + noRect.width / 2;
    const noCenterY = noRect.top + noRect.height / 2;

    const yesCenterX = yesRect.left + yesRect.width / 2;
    const yesCenterY = yesRect.top + yesRect.height / 2;

    const distanceToNo = getDistance(
        event.clientX,
        event.clientY,
        noCenterX,
        noCenterY
    );

    const distanceToYes = getDistance(
        event.clientX,
        event.clientY,
        yesCenterX,
        yesCenterY
    );

    if (distanceToNo < 90) {
        const containerRect = buttonsContainer.getBoundingClientRect();

        const newX = Math.random() * (containerRect.width - noRect.width);
        const newY = Math.random() * (containerRect.height - noRect.height);

        noButton.style.left = `${newX}px`;
        noButton.style.top = `${newY}px`;
    }

    /* YES button grows */
    const maxScale = 1.5;
    const minScale = 1;
    const influenceRadius = 200;

    const scale =
        distanceToYes < influenceRadius
            ? maxScale -
              (distanceToYes / influenceRadius) *
                  (maxScale - minScale)
            : minScale;

    yesButton.style.transform = `scale(${scale})`;
});

/* -------- CURSOR HEARTS -------- */

document.addEventListener("mousemove", (event) => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = "💗";
    heart.style.left = `${event.clientX}px`;
    heart.style.top = `${event.clientY}px`;

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 1000);
});

/* -------- YES CLICK CELEBRATION -------- */

yesButton.addEventListener("click", () => {
    const symbols = ["💖", "🌹", "💘", "🌷" ,"❤️"];
    const duration = 2000;
    const intervalTime = 80;

    const shower = setInterval(() => {
        const particle = document.createElement("div");
        particle.className = "falling";
        particle.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.fontSize = `${18 + Math.random() * 20}px`;

        document.body.appendChild(particle);

        setTimeout(() => particle.remove(), 2500);
    }, intervalTime);

    setTimeout(() => {
        clearInterval(shower);
        document.body.innerHTML = `
            <h1 style="
                font-family: system-ui;
                text-align: center;
                margin-top: 40vh;
            ">
                💖 Happy Valentine’s Day, cutie 💖
            </h1>
        `;
    }, duration);
});
