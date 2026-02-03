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
    if (distanceToNo < 80) {
        const radius = 120;

        let newX =
            initialNoPosition.x +
            (Math.random() * radius * 2 - radius);

        let newY =
            initialNoPosition.y +
            (Math.random() * radius * 2 - radius);

        const containerRect = buttonsContainer.getBoundingClientRect();

        newX = Math.max(0, Math.min(newX, containerRect.width - noRect.width));
        newY = Math.max(0, Math.min(newY, containerRect.height - noRect.height));

        noButton.style.left = `${newX}px`;
        noButton.style.top = `${newY}px`;
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
    document.body.innerHTML = `
        <h1 style="font-family: system-ui; text-align: center;">
            💖 Happy Valentine’s Day, cutie 💖
        </h1>
    `;
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
