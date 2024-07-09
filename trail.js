const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const colors = [
  "#800080", // Color #800080 (Purple)
  "#800080",
  "#800080",
  "#800080",
  "#800080",
  "#800080",
  "#800080",
  "#800080",
  "#800080",
  "#800080",
  "#800080",
  "#800080",
  "#800080",
  "#800080",
  "#800080",
  "#800080",
  "#800080",
  "#800080",
  "#800080",
  "#800080",
  "#800080",
  "#800080",
  "#800080",
  "#800080",
  "#800080",
  "#800080",
  "#800080",
  "#800080",
  "#800080",
  "#800080",
  "#800080",
  "#800080",
  "#800080",
  "#800080",
  "#800080",
  "#800080",
  "#800080",
  "#800080",
  "#800080",
  "#800080",
  "#800080",
];

circles.forEach((circle, index) => {
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", (e) => {
  coords.x = e.pageX;
  coords.y = e.pageY - window.scrollY; // Adjust for vertical scroll position

  // Update circle sizes based on distance from cursor
  circles.forEach((circle, index) => {
    const distance = Math.sqrt(
      Math.pow(coords.x - circle.offsetLeft, 2) +
      Math.pow(coords.y - circle.offsetTop, 2)
    );

    // Calculate scale based on distance
    const maxScale = 1; // Maximum scale for the circle under the cursor
    const minScale = 0.2; // Minimum scale for the smallest circle

    // Scale factor based on distance (inverse relation)
    const scaleFactor = 1 - (distance / 200); // Adjust 200 based on your preference for distance effect

    // Apply scale to the circle
    circle.style.transform = `scale(${minScale + scaleFactor * (maxScale - minScale)})`;
  });
});

function animateCircles() {
  let x = coords.x;
  let y = coords.y;

  circles.forEach((circle, index) => {
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.offsetLeft - x) * 0.3;
    y += (nextCircle.offsetTop - y) * 0.3;
  });

  requestAnimationFrame(animateCircles);
}

animateCircles();
