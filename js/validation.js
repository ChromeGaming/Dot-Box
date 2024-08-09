document.addEventListener("DOMContentLoaded", () => {
	const playersInput = document.getElementById("players-count");
	const startBtn = document.querySelector(".start-btn");
	const validationMessage = document.getElementById("validation-message");

	const validateInput = (input, min, max) => {
		const value = parseInt(input.value, 10);
		return value >= min && value <= max;
	};

	const showValidationMessage = (show) => {
		try {
			validationMessage.style.display = show ? "block" : "none";
		} catch (e) {
			console.log(e.message);
		}
	};

	const validateAllInputs = () => {
		const invalidPlayers = !validateInput(playersInput, 2, 6);

		if (invalidPlayers) {
			startBtn.disabled = true;
			startBtn.classList.add("disabled");
			showValidationMessage(true);
		} else {
			startBtn.disabled = false;
			startBtn.classList.remove("disabled");
			showValidationMessage(false);
		}
	};

	playersInput.addEventListener("input", validateAllInputs);

	startBtn.addEventListener("click", (event) => {
		if (startBtn.disabled) {
			event.preventDefault();
		}
	});

	// Initial validation

	validateAllInputs();
});
