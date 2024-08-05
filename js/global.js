// Render Loader
const loader = document.createElement("div");
loader.id = "loader";
loader.innerHTML = `<div class="spinner"></div>`;
document.body.appendChild(loader);

// Loader.js-->
setTimeout(() => {
	const loader = document.getElementById("loader");
	if (loader) {
		loader.style.display = "none";
	} else {
		console.error("Element with ID 'loader' not found.");
	}
}, 500);

//Render Cursor effect
const circleContainer = document.createElement("div");
circleContainer.className = "circle-container";
for (let i = 0; i < 30; i++) {
	let circle = document.createElement("div");
	circle.className = "circle";
	circleContainer.appendChild(circle);
}
document.body.appendChild(circleContainer);

// Cursor.js -->
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

circles.forEach(function (circle) {
	circle.x = 0;
	circle.y = 0;
});

window.addEventListener("mousemove", function (e) {
	coords.x = e.pageX;
	coords.y = e.pageY - window.scrollY;
});

function animateCircles() {
	let x = coords.x;
	let y = coords.y;

	circles.forEach(function (circle, index) {
		circle.style.left = `${x - 12}px`;
		circle.style.top = `${y - 12}px`;
		circle.style.transform = `scale(${
			(circles.length - index) / circles.length
		})`;

		const nextCircle = circles[index + 1] || circles[0];
		circle.x = x;
		circle.y = y;

		x += (nextCircle.x - x) * 0.3;
		y += (nextCircle.y - y) * 0.3;
	});

	requestAnimationFrame(animateCircles);
}

animateCircles();
