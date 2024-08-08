const entries = [
	{ name: "Alice", score: 356, avatar: 1 },
	{ name: "Bob", score: 258 },
	{ name: "Charlie", score: 312 },
	{ name: "David", score: 167 },
	{ name: "Eve", score: 481 },
	{ name: "Frank", score: 573 },
	{ name: "Grace", score: 345 },
	{ name: "Heidi", score: 254 },
	{ name: "Ivan", score: 491 },
	{ name: "Judy", score: 587 },
	{ name: "Kevin", score: 456 },
	{ name: "Linda", score: 321 },
	{ name: "Michael", score: 398 },
	{ name: "Nancy", score: 359 },
	{ name: "Oliver", score: 275 },
	{ name: "Peggy", score: 493 },
	{ name: "Quincy", score: 567 },
	{ name: "Sally", score: 342 },
	{ name: "Tom", score: 512 },
	{ name: "Victor", score: 512 },
];

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
