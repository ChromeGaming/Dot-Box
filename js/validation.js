document.addEventListener("DOMContentLoaded", () => {
    const rowsInput = document.getElementById("rows");
    const columnsInput = document.getElementById("columns");
    const playersInput = document.getElementById("players-count");
    const startBtn = document.querySelector(".start-btn");
    const validationMessage = document.getElementById("validation-message");

    const validateInput = (input, min, max) => {
        const value = parseInt(input.value, 10);
        return value >= min && value <= max;
    };

    const showValidationMessage = (show) => {
        validationMessage.style.display = show ? "block" : "none";
    };

    const validateAllInputs = () => {
        const invalidRows = !validateInput(rowsInput, 5, 30);
        const invalidColumns = !validateInput(columnsInput, 5, 30);
        const invalidPlayers = !validateInput(playersInput, 2, 6);
        
        if (invalidRows || invalidColumns || invalidPlayers) {
            startBtn.disabled = true;
            showValidationMessage(true);
        } else {
            startBtn.disabled = false;
            showValidationMessage(false);
        }
    };

    rowsInput.addEventListener("input", validateAllInputs);
    columnsInput.addEventListener("input", validateAllInputs);
    playersInput.addEventListener("input", validateAllInputs);

    startBtn.addEventListener("click", (event) => {
        if (startBtn.disabled) {
            event.preventDefault();
        }
    });

    // Initial validation
    validateAllInputs();
});
