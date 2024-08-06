document.addEventListener("DOMContentLoaded", () => {
	// Update the date dynamically
	function updateLastUpdatedDate() {
		const dateElement = document.getElementById("last-updated-date");
		const now = new Date();
		const day = now.getDate();
		const month = now.getMonth() + 1; // Months are zero-based
		const year = now.getFullYear();
		dateElement.textContent = `${day}/${month}/${year}`;
	}

	// Update the date weekly
	function updateWeekly() {
		const now = new Date();
		const dayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)
		const timeUntilNextUpdate = (7 - dayOfWeek) * 24 * 60 * 60 * 1000; // Time until next Sunday
		updateLastUpdatedDate();
		setTimeout(updateWeekly, timeUntilNextUpdate);
	}

	// Initialize weekly updates
	updateWeekly();
});
