// Random Data
const entries = [
	{ name: "Alice", score: 356, avatar: 1 },
	{ name: "Bob", score: 258, avatar: 2 },
	{ name: "Charlie", score: 312, avatar: 17 },
	{ name: "David", score: 167, avatar: 4 },
	{ name: "Eve", score: 481, avatar: 9 },
	{ name: "Frank", score: 573, avatar: 8 },
	{ name: "Grace", score: 345, avatar: 7 },
	{ name: "Heidi", score: 254, avatar: 6 },
	{ name: "Ivan", score: 491, avatar: 5 },
	{ name: "Judy", score: 587, avatar: 10 },
	{ name: "Jassi", score: 342, avatar: 18 },
	{ name: "Kevin", score: 456, avatar: 11 },
	{ name: "Michael", score: 398, avatar: 13 },
	{ name: "Nancy", score: 359, avatar: 14 },
	{ name: "Oliver", score: 275, avatar: 15 },
	{ name: "Peggy", score: 493, avatar: 16 },
	{ name: "Quincy", score: 567, avatar: 3 },
	{ name: "Robert", score: 321, avatar: 12 },
	{ name: "Tom", score: 512, avatar: 19 },
	{ name: "Victor", score: 512, avatar: 20 },
];

// Sort entries by score
entries.sort((a, b) => b.score - a.score);

const ranking = document.getElementById("ranking");

entries.forEach((entry, index) => {
	const template = document.createElement("div");
	template.classList.add("entry");
	template.innerHTML = `
        <div class="rank">${index + 1}</div>
        <div class="name">
        <img src="/assets/avatars/${
					entry.avatar
				}.png" alt="avatar" class="avatar">
        ${entry.name}</div>
        <div class="score">${entry.score}</div>
    `;

	ranking.appendChild(template);

	if (index == 0) {
		template.id = "gold";
	}
	if (index == 1) {
		template.id = "silver";
	}
	if (index == 2) {
		template.id = "bronze";
	}
});
