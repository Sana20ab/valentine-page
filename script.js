const yesButton = document.getElementById("yes-btn");
const noButton = document.getElementById("no-btn");

const buttonsContainer = document.querySelector(".buttons");

function getDistance(x1, y1, x2, y2) {
    return Math.hypot(x1 - x2, y1 - y2);
}

// Store original position of "No" button
const initialNoPosition = {
    x: noButton.offsetLeft,
    y: noButton.offsetTop
};

const escapeZone = {
    minX: 0,
    maxX: 260,
    minY: 0,
    maxY: 80
};


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

    // --- NO BUTTON ESCAPE (local only) ---
if (distanceToNo < 90) {
    const containerRect = buttonsContainer.getBoundingClientRect();

    const newX =
        escapeZone.minX +
        Math.random() * (escapeZone.maxX - escapeZone.minX);

    const newY =
        escapeZone.minY +
        Math.random() * (escapeZone.maxY - escapeZone.minY);

    const clampedX = Math.min(
        newX,
        containerRect.width - noRect.width
    );

    const clampedY = Math.min(
        newY,
        containerRect.height - noRect.height
    );

    noButton.style.left = `${clampedX}px`;
    noButton.style.top = `${clampedY}px`;
}


    // --- YES BUTTON GROW ---
    const maxScale = 1.5;
    const minScale = 1;
    const influenceRadius = 200;

    const scale =
        distanceToYes < influenceRadius
            ? maxScale - (distanceToYes / influenceRadius) * (maxScale - minScale)
            : minScale;

    yesButton.style.transform = `scale(${scale})`;
});

// --- YES CLICK MESSAGE ---
yesButton.addEventListener("click", () => {
    const symbols = ["💖", "🌹", "💘", "🌷". "❤️"];
    const showerDuration = 2000;
    const interval = 40;

    const shower = setInterval(() => {
        const particle = document.createElement("div");
        particle.className = "falling";
        particle.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.fontSize = `${16 + Math.random() * 20}px`;

        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 2500);
    }, interval);

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
    }, showerDuration);
});


document.addEventListener("mousemove", (event) => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = "💗";

    heart.style.left = `${event.clientX}px`;
    heart.style.top = `${event.clientY}px`;

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 1000);
});
