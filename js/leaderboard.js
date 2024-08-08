// Random Data
const entries = [
	{ name: "Alice", score: 356, avatar: "/assets/avatars/1.png" },
	{ name: "Bob", score: 258, avatar: "/assets/avatars/2.png" },
	{ name: "Charlie", score: 312, avatar: "/assets/avatars/17.png" },
	{ name: "David", score: 167, avatar: "/assets/avatars/4.png" },
	{ name: "Eve", score: 481, avatar: "/assets/avatars/9.png" },
	{ name: "Frank", score: 573, avatar: "/assets/avatars/8.png" },
	{ name: "Grace", score: 345, avatar: "/assets/avatars/7.png" },
	{ name: "Heidi", score: 254, avatar: "/assets/avatars/6.png" },
	{ name: "Ivan", score: 491, avatar: "/assets/avatars/5.png" },
	{ name: "Judy", score: 587, avatar: "/assets/avatars/10.png" },
	{ name: "Jassi", score: 342, avatar: "/assets/avatars/18.png" },
	{ name: "Kevin", score: 456, avatar: "/assets/avatars/11.png" },
	{ name: "Michael", score: 398, avatar: "/assets/avatars/13.png" },
	{ name: "Nancy", score: 359, avatar: "/assets/avatars/14.png" },
	{ name: "Oliver", score: 275, avatar: "/assets/avatars/15.png" },
	{ name: "Peggy", score: 493, avatar: "/assets/avatars/16.png" },
	{ name: "Quincy", score: 567, avatar: "/assets/avatars/3.png" },
	{ name: "Robert", score: 321, avatar: "/assets/avatars/12.png" },
	{ name: "Tom", score: 512, avatar: "/assets/avatars/19.png" },
	{ name: "Victor", score: 512, avatar: "/assets/avatars/20.png" },
];

// Data after game ends
try {
	const winnerData = JSON.parse(localStorage.getItem("winnerData"));
	const winner = winnerData.find((player) => player.winner === true);
	const winnerEntry = {
		name: winner.name,
		avatar: winner.avatarID,
		score: winner.score * 20 + 100,
	};
	entries.push(winnerEntry);
} catch (e) {
	console.log("No winner data found");
}

// Sort entries by score
entries.sort((a, b) => b.score - a.score);

// Max Limit -> 25 entries
entries.splice(25);

const ranking = document.getElementById("ranking");

entries.forEach((entry, index) => {
	const template = document.createElement("div");
	template.classList.add("entry");
	template.innerHTML = `
        <div class="rank">${index + 1}</div>
        <div class="name">
        <img src="${entry.avatar}" alt="avatar" class="avatar">
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
