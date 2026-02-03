const yesButton = document.getElementById("yes-btn");
const noButton = document.getElementById("no-btn");

function getDistance(x1, y1, x2, y2) {
    return Math.hypot(x1 - x2, y1 - y2);
}

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

    if (distanceToNo < 80) {
        const maxX = window.innerWidth - noRect.width;
        const maxY = window.innerHeight - noRect.height;

        noButton.style.left = `${Math.random() * maxX}px`;
        noButton.style.top = `${Math.random() * maxY}px`;
    }

    const maxScale = 1.5;
    const minScale = 1;
    const influenceRadius = 200;

    const scale =
        distanceToYes < influenceRadius
            ? maxScale - (distanceToYes / influenceRadius) * (maxScale - minScale)
            : minScale;

    yesButton.style.transform = `scale(${scale})`;
});

yesButton.addEventListener("click", () => {
    document.body.innerHTML = "<h1>💖 Yay! 💖</h1>";
});
