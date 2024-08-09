document.addEventListener("DOMContentLoaded", function () {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "../components/navbar.html", true);
	xhr.onreadystatechange = function () {
		if (this.readyState !== 4) return;
		if (this.status !== 200) return;
		document.getElementById("nav-placeholder").innerHTML = this.responseText;
	};
	xhr.send();
});
