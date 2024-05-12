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

// AKASH UPDATES START
fill() {
  if (!this.filled) {
    this.filled = true;
    this.ui.classList.add("filled");
    this.ui.style.animation = 'drawEdge 0.5s forwards'; // Triggering the edge drawing animation
    Game.instance.invokeEvent("edgeFill", this);
  }
}
// AKASH UPDATES END





	//Creating UI
	createUI() {
		const user_interface = document.createElement("button");
		user_interface.setAttribute("data-position", this.position);
		user_interface.classList.add("edge", this.position);
		return user_interface;
	}

}
