let drops = document.querySelectorAll(".drop");

drops.forEach((drop) => {
	drop.addEventListener("click", () => {
		const icon = drop.querySelector("img");
		if (drop.classList.contains("open")) {
			icon.src = "../assets/images/icon-plus.svg";
			drop.classList.remove("open");
		} else {
			collapseAll()
			icon.src = "../assets/images/icon-minus.svg";
			drop.classList.add("open");
		}
	});
});

function collapseAll() {
	console.log("Func called");
	let drops = document.getElementsByClassName("drop");
	n = drops.length;
	for (let i = 0; i < n; i++) {
		let drop_i = drops[i]
		const icon_i = drop_i.querySelector("img");
		// if (drop.classList.contains("open")) {
			icon_i.src = "../assets/images/icon-plus.svg";
			drop_i.classList.remove("open");
			console.log(drop_i.parentNode)
			drop_i.parentNode.open = false
			console.log(drop_i);
		// }
	}
}