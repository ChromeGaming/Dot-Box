class Edge {

	constructor(box, position) {
		this.box = box
		this.filled = false
		this.position = position

		this.ui = this.createUI()
	}
	//Getting inverse edge
	get inverseEdge() {
		return this.box.inverseEdges[this.position]
	}

	//Filling edge
		fill() {
		const player=document.querySelector(".name").textContent
		if (!this.filled) {
			this.filled = true
			player==="Player 1"? this.ui.classList.add("Player_1"):player==="Player 2"?this.ui.classList.add("Player_2"):player==="Player 3"?this.ui.classList.add("Player_3"):player==="Player 4"?this.ui.classList.add("Player_4"):player==="Player 5"?this.ui.classList.add("Player_5"):this.ui.classList.add("Player_6")

			Game.instance.invokeEvent("edgeFill", this)
		}
	}
	//Creating UI
	createUI() {
		const user_interface = document.createElement("button")
		user_interface.setAttribute("data-position", this.position)
		user_interface.classList.add("edge")
		user_interface.classList.add(this.position)
		return user_interface
	}

}
