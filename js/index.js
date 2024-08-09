let playersCount = document.querySelector("#players-count");
let startBtn = document.querySelector("#start-btn");
let selectedTheme = 1;
let selectedDifficulty = "Easy";

// Save selected options to local storage
startBtn.addEventListener("click", function () {
	localStorage.setItem("playersCount", playersCount.value);
	localStorage.setItem("selectedTheme", selectedTheme);
	localStorage.setItem("selectedDifficulty", selectedDifficulty);
});

// Reset form inputs
document.addEventListener("DOMContentLoaded", function () {
	var resetButton = document.getElementById("reset-btn");

	resetButton.addEventListener("click", function () {
		// Reset form inputs
		document.getElementById("players-count").value = 2; // Reset players count input to default value
	});
});

// Themes for the game
const video = document.getElementById("myVideo");
const themeSelect = document.getElementById("theme-select");

themeSelect.addEventListener("change", () => {
	selectedTheme = themeSelect.value;
	video.src = `/assets/videos/${selectedTheme}.mp4`; // Update video source based on theme
});

// Difficulty levels
const difficulty = document.querySelectorAll(".d-type");

difficulty.forEach((item) => {
	item.addEventListener("click", () => {
		selectedDifficulty = item.innerText;
		difficulty.forEach((diff) => {
			diff.classList.remove("active");
		});
		item.classList.add("active");
	});
});

// Feedback form
const formContainer = document.querySelector(".form-container");
const formContent = document.querySelector(".form-content");

let isDragging = false;
let startX, startY, initialX, initialY;

formContent.addEventListener("mousedown", startDragging);
document.addEventListener("mousemove", drag);
document.addEventListener("mouseup", stopDragging);

function startDragging(e) {
	if (e.target === formContent || e.target.closest(".sub")) {
		isDragging = true;
		formContainer.classList.add("dragging");

		startX = e.clientX - formContainer.offsetLeft;
		startY = e.clientY - formContainer.offsetTop;

		initialX = formContainer.offsetLeft;
		initialY = formContainer.offsetTop;
	}
}

function drag(e) {
	if (isDragging) {
		e.preventDefault();

		const currentX = e.clientX - startX;
		const currentY = e.clientY - startY;

		formContainer.style.left = currentX + "px";
		formContainer.style.top = currentY + "px";
	}
}

function stopDragging() {
	isDragging = false;
	formContainer.classList.remove("dragging");
}

// Prevent default drag behaviors
formContainer.addEventListener("dragstart", (e) => e.preventDefault());
document
	.getElementById("feedbackForm")
	.addEventListener("submit", function (event) {
		event.preventDefault();
		showThankYouPopup();
		this.reset();
	});

function showThankYouPopup() {
	document.getElementById("thankYouPopup").classList.remove("hidden");
}

function closeThankYouPopup() {
	document.getElementById("thankYouPopup").classList.add("hidden");
}

// Music toggle
var isPlaying = true;
function toggleMusic() {
	var audio = document.getElementById("background-music");
	var button = document.getElementById("music-toggle");
	if (isPlaying) {
		audio.pause();
		button.textContent = "Music On";
	} else {
		audio.play();
		button.textContent = "Music Off";
	}
	isPlaying = !isPlaying;
}

window.onload = function () {
	var audio = document.getElementById("background-music");
	audio.play();
	var button = document.getElementById("music-toggle");
	button.textContent = "Music Off";
};

// Cursor -->
document.addEventListener("DOMContentLoaded", function () {
	const coords = { x: 0, y: 0 };
	const circles = document.querySelectorAll(".circle");

	circles.forEach(function (circle) {
		circle.x = 0;
		circle.y = 0;
	});

	window.addEventListener("mousemove", function (e) {
		coords.x = e.pageX;
		coords.y = e.pageY - window.scrollY; // Adjust for vertical scroll position
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
});

// Loader.js -->
document.addEventListener("DOMContentLoaded", () => {
	setTimeout(() => {
		const loader = document.getElementById("loader");
		if (loader) {
			loader.style.display = "none";
		} else {
			console.error("Element with ID 'loader' not found.");
		}
	}, 500);
});
