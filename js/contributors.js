document.addEventListener("DOMContentLoaded", function () {
	const contributorsContainer = document.getElementById("contributors");
	const prevBtn = document.getElementById("prevBtn");
	const nextBtn = document.getElementById("nextBtn");
	const pageNoBox = document.getElementById("pageNoBox");
	let currentPage = 1;
	const perPage = 30;
	let totalContributors = [];

	async function fetchContributors() {
		try {
			let page = 1;
			const perPage = 100;
			while (true) {
				const response = await fetch(
					`https://api.github.com/repos/ChromeGaming/Dot-Box/contributors?per_page=${perPage}&page=${page}`
				);
				const contributors = await response.json();
				if (contributors.length === 0) break;
				totalContributors = totalContributors.concat(contributors);
				page++;
			}
			updateContributors();
		} catch (error) {
			console.error("Error fetching contributors:", error);
		}
	}

	function updateContributors() {
		contributorsContainer.innerHTML = "";
		const start = (currentPage - 1) * perPage;
		const end = start + perPage;
		const paginatedContributors = totalContributors.slice(start, end);

		paginatedContributors.forEach((contributor) => {
			const contributorCard = document.createElement("a");
			contributorCard.href = contributor.html_url;
			contributorCard.target = "_blank";
			contributorCard.className = "contributor-card";
			contributorCard.innerHTML = `
                <img src="${contributor.avatar_url}" alt="${contributor.login}">
                <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">${contributor.login}</h2>
                <p class="text-gray-700 dark:text-gray-400">Contributions: ${contributor.contributions}</p>
                <p class="text-gray-700 dark:text-gray-400 flex-center"><i class="fab fa-github mr-1"></i> GitHub Profile</p>
            `;
			contributorsContainer.appendChild(contributorCard);
		});

		pageNoBox.textContent = currentPage;
		prevBtn.disabled = currentPage === 1;
		nextBtn.disabled = end >= totalContributors.length;
	}

	prevBtn.addEventListener("click", () => {
		if (currentPage > 1) {
			currentPage--;
			updateContributors();
		}
	});

	nextBtn.addEventListener("click", () => {
		if ((currentPage - 1) * perPage < totalContributors.length) {
			currentPage++;
			updateContributors();
		}
	});

	fetchContributors();
});
