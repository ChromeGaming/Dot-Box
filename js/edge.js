class Edge {
	constructor(box, position) {
		this.box = box;
		this.filled = false;
		this.position = position;
		// cached the UI element during initialization
		this.ui = this.createUI();
	}

	// getting inverse edge
	get inverseEdge() {
		return this.box.inverseEdges[this.position];
	}

	// filling edge
	fill() {
		// removed unnecessary check since fill() is only called when filled is false
		this.filled = true;
		// using classList.toggle for toggling CSS classes
		this.ui.classList.toggle("filled", this.filled);
		// Invoking event
		Game.instance.invokeEvent("edgeFill", this);
	}

	// creating UI
	createUI() {
		// used destructuring assignment for cleaner code
		const { position } = this;
		const user_interface = document.createElement("button");
		user_interface.setAttribute("data-position", position);
		user_interface.classList.add("edge", position);
		return user_interface;
	}
}
