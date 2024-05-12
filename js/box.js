class Box {

	constructor(row, column) {
		this.row = row
		this.column = column

		this.remainingEdges = 4
		this.edges = {
			top: new Edge(this, "top"),
			right: new Edge(this, "right"),
			bottom: new Edge(this, "bottom"),
			left: new Edge(this, "left"),
		}
		this.inverseEdges = {
			top: null,
			right: null,
			bottom: null,
			left: null,
		}
		this.adjacentBoxes = {}
		this.filled = false

		this.ui = this.createUI()
	}

	getEdge(edgePosition) {
		return this.edges[edgePosition]
	}

	getAdjacentBox(edgePosition) {
		return this.adjacentBoxes[edgePosition]
	}

	getLastRemainingEdge() {
		for (const [position, edge] of Object.entries(this.edges))
			if (!edge.filled) return this.edges[position]

		return null
	}

	fillEdge(edge) {
		edge.fill()
	}




	
// AKASH UPDATES START
	fill() {
		if (!this.filled) {
				this.filled = true;
				this.remainingEdges = 0;
				// Determine the color based on the current player
				let color = Game.instance.currentPlayer.name === "Player 1" ? "pink" : "skyblue";
				this.ui.style.background = color;
				this.ui.classList.add("filled");
				this.ui.style.animation = 'pulseBox 1s forwards'; // Continue using the animation for visual feedback
				Game.instance.invokeEvent("boxFill", this);
		}
}

// AKASH UPDATES END






	createUI() {
		const ui = document.createElement("div")

		ui.setAttribute("class", "box")
		ui.setAttribute("data-row", this.row)
		ui.setAttribute("data-column", this.column)

		ui.appendChild(this.edges.top.ui)
		ui.appendChild(this.edges.right.ui)
		ui.appendChild(this.edges.bottom.ui)
		ui.appendChild(this.edges.left.ui)

		return ui
	}

}
