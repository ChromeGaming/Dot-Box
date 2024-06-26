function darkenColor(color) {
   if(color=='pink')
	{
		const darker = 'rgb(255, 105, 180)';
        return darker;
	}
	if(color=='skyblue')
		{
			const darker = 'rgb(0, 150, 255)';
			return darker;
		}

		if(color=='lightgreen')
		{
			const darker = 'rgb(0, 128, 0)';
			return darker;
		}
		if(color=='magenta')
			{
				const darker = 'rgb(139,0,139)';
				return darker;
			}
			if(color=='yellow')
				{
					const darker = 'rgb(253, 218, 13)';
					return darker;
				}

			if(color='orange')
				{
					const darker = 'rgb(255, 95, 21)';
					return darker;
				}
		
	

}






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
	// fill() {
	// 	if (!this.filled) {
	// 		this.filled = true
	// 		this.ui.classList.add("filled")

	// 		Game.instance.invokeEvent("edgeFill", this)
	// 	}
	// }
	fill(color) {
		if (!this.filled) {
			this.filled = true;
			this.ui.classList.add("filled");
			this.ui.style.backgroundColor = darkenColor(color) // Set the player's color

			Game.instance.invokeEvent("edgeFill", this);
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

