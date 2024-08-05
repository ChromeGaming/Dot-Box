document.addEventListener("DOMContentLoaded", function () {
	const contributorsContainer = document.getElementById("contributors");

	async function fetchContributors() {
		try {
			const response = await fetch(
				"https://api.github.com/repos/ChromeGaming/Dot-Box/contributors"
			);
			const contributors = await response.json();

			contributors.forEach((contributor) => {
				const contributorCard = document.createElement("a");
				contributorCard.href = contributor.html_url;
				contributorCard.target = "_blank";
				contributorCard.className = "contributor-card";
				contributorCard.innerHTML = `
  <img src="${contributor.avatar_url}" alt="${contributor.login}">
  <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">${contributor.login}</h2>
  <p class="text-gray-700 dark:text-gray-400">Contributions: ${contributor.contributions}</p>
`;
				contributorsContainer.appendChild(contributorCard);
			});
		} catch (error) {
			console.error("Error fetching contributors:", error);
		}
	}

	fetchContributors();
});
