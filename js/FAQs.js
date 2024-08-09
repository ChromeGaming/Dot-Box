let drops = document.querySelectorAll(".drop");

drops.forEach((drop) => {
	drop.addEventListener("click", () => {
		const icon = drop.querySelector("img");
		if (drop.classList.contains("open")) {
			icon.src = "../assets/images/icon-plus.svg";
			drop.classList.remove("open");
		} else {
			icon.src = "../assets/images/icon-minus.svg";
			drop.classList.add("open");
		}
	});
});
