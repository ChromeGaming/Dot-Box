let pageNo = 1;

const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const pageNoBox = document.getElementById('pageNoBox');

document.addEventListener("DOMContentLoaded", function () {
	
	async function fetchContributors(page) {
		pageNo += page;
		try {
			const response = await fetch(
				`https://api.github.com/repos/ChromeGaming/Dot-Box/contributors?page=${pageNo}`
			);
			const contributors = await response.json();
			const contributorsContainer = document.getElementById("contributors");
		
			if(contributors.length == 0 || pageNo < 1) {
				return;
			}
			contributorsContainer.innerHTML = "";
			pageNoBox.innerText = pageNo;

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

	fetchContributors(0);

	prevBtn.addEventListener('click', (e)=> {
		e.preventDefault();
		fetchContributors(-1);
	  })
	  nextBtn.addEventListener('click', (e)=> {
		e.preventDefault();
		fetchContributors(1);
	  })
});
