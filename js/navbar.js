const navbar = `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />

<nav class="navbarr" style="color: white">
    <div class="logo">
        <a href="../index.html">Dots & Boxes ⚄</a>
    </div>

    <ul class="nav-links" id="nav-links-toggled">
        <li>
            <a href="../index.html"><i class="fas fa-home"></i>Home</a>
        </li>
        <li>
            <a href="../pages/about.html"><i class="fas fa-info-circle"></i>About Us</a>
        </li>
        <li>
            <a href="../pages/FAQs.html"><i class="fas fa-question-circle"></i>FAQs</a>
        </li>
        <li>
            <a href="../pages/contributors.html"><i class="fas fa-users"></i>Contributors</a>
        </li>
        <li>
            <a href="../pages/game.html"><i class="fas fa-gamepad"></i>Let's Go</a>
        </li>

    </ul>


    <nav class="mobile-menu">
        <div class="mobile-menu__trigger"><span></span></div>
        <a class="page-scroll active-link" href="../index.html">Home </a>
        <a class="page-scroll" href="../pages/about.html">About Us </a>
        <a class="page-scroll" href="../pages/FAQs.html">FAQs</a>
        <a class="page-scroll" href="../pages/contributors.html">Contributors</a>
    </nav>


    <link href="../styles/navbar.css" rel="stylesheet" />
    <script type="text/javascript" src="../js/navbar.js"></script>
</nav>`;

document.addEventListener("DOMContentLoaded", () => {
	document.getElementById("nav-placeholder").innerHTML = navbar;

	const mobile_menu = document.querySelector(".mobile-menu"),
		mobile_trigger = document.querySelector(".mobile-menu__trigger");

	let initialPoint, finalPoint;

	document.addEventListener("touchstart", function (event) {
		initialPoint = event.changedTouches[0];
	});

	document.addEventListener("touchend", function (event) {
		finalPoint = event.changedTouches[0];

		let xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX),
			yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);

		if (xAbs > 120 || yAbs > 120) {
			// 120 - SWIPE WIDTH
			if (xAbs > yAbs) {
				if (finalPoint.pageX < initialPoint.pageX) {
					// SWIPE LEFT
					mobile_menu.classList.remove("mobile-menu_open");
				} else {
					// SWIPE RIGTH
					mobile_menu.classList.add("mobile-menu_open");
				}
			} else {
				if (finalPoint.pageY < initialPoint.pageY) {
					// SWIPE UP
				} else {
					// SWIPE DOWN
				}
			}
		}
	});

	document.addEventListener("click", function (event) {
		const target = event.target.closest(".mobile-menu__trigger");
		if (target && target == mobile_trigger) {
			mobile_menu.classList.toggle("mobile-menu_open");
		} else if (
			event.target !== mobile_trigger &&
			event.target !== mobile_menu
		) {
			if (mobile_menu.classList.contains("mobile-menu_open")) {
				mobile_menu.classList.remove("mobile-menu_open");
			}
		}
	});

	mobile_menu.querySelectorAll("a").forEach(function (element) {
		element.addEventListener("click", function (event) {
			const anchor_href = event.currentTarget.getAttribute("href");
			if (anchor_href.charAt(0) === "#") {
				event.preventDefault();
				if (anchor_href.length > 1) {
					// if #hash is not empty
					const scroll_to_node = document.querySelector(
						event.currentTarget.hash
					);
					if (scroll_to_node) {
						SmoothScrollTo(scroll_to_node);
					}
				}
			}
		});
	});

	function SmoothScrollTo(element) {
		if (element) {
			element.scrollIntoView({
				behavior: "smooth",
			});
		}
	}
});
