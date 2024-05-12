class Box {
	constructor(row, column) {
		this.row = row;
		this.column = column;
		this.remainingEdges = 4;
		this.edges = {
			top: new Edge(this, "top"),
			right: new Edge(this, "right"),
			bottom: new Edge(this, "bottom"),
			left: new Edge(this, "left")
		};
		this.inverseEdges = {
			top: null,
			right: null,
			bottom: null,
			left: null
		};
		this.adjacentBoxes = {};
		this.filled = false;
		this.ui = this.createUI();
	}

	getEdge(edgePosition) {
		return this.edges[edgePosition];
	}

	getAdjacentBox(edgePosition) {
		return this.adjacentBoxes[edgePosition];
	}

	getLastRemainingEdge() {
		return Object.values(this.edges).find(edge => !edge.filled) || null;
	}

	fillEdge(edge) {
		edge.fill();
	}

	fill(color) {
		if (!this.filled) {
			this.filled = true;
			this.remainingEdges = 0;
			this.ui.style.background = color;
			this.ui.classList.add("filled");
			Game.instance.invokeEvent("boxFill", this);
		}
	}

	createUI() {
		const ui = document.createElement("div");
		ui.classList.add("box");
		ui.dataset.row = this.row;
		ui.dataset.column = this.column;

		Object.values(this.edges).forEach(edge => ui.appendChild(edge.ui));

		return ui;
	}
}
