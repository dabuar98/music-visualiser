
//controls
function Menu(){
	
	this.menuDisplayed = false;
	this.visuals = [];
	this.selectedVisual = null;
	var self = this;

	var menuDiv = createDiv();
	menuDiv.id("menu-container");
	var menu = createElement("ul");
	menu.parent(menuDiv);
	menu.id("visuals-menu");
	menu.style("opacity", "0");
	menu.position(0.5/6 * width, 1/10 * height);
	

	burgerIcon = createButton("");
	burgerIcon.parent(menuDiv);
	burgerIcon.id("burger-icon");
	burgerIcon.addClass("on");

	
	//styling 
	burgerIcon.size(45, 45);
	burgerIcon.position(1/16 * width, 1/10 * height);
	select(".on").style("background", "url(assets/images/menu.png)");

	this.menuDisplay = function() {
		select("#visuals-menu").style("opacity", "1");
	}

	this.menuHide = function() {
		select("#visuals-menu").style("opacity", "0");
	}

	this.menuClick = function() {
		if (burgerIcon.class() === "on") {
			burgerIcon.class("off")
			select(".off").style("background", "url(assets/images/close.png)");
			console.log("Menu displayed");
			self.menuDisplay();
		} else {
			burgerIcon.class("on")
			select(".on").style("background", "url(assets/images/menu.png)");
			console.log("Menu closed");
			self.menuHide();
		}
	}

	this.addVisual = function(vis) {
		if (!vis.hasOwnProperty('id') && !vis.hasOwnProperty('name')) {
			alert('Make sure your visualisation has an id and name!');
		}

		// Check that the vis object has a unique id.
		if (this.findVisIndex(vis.id) != null) {
			alert(`Vis '${vis.name}' has a duplicate id: '${vis.id}'`);
		}

		this.visuals.push(vis);

		var menuItem = createElement("li", vis.name);
		menuItem.addClass("menu-item");
		menuItem.id(vis.id);

		menuItem.mouseClicked( function(e) 
		{
			var menuItems = selectAll('.menu-item');
        
			for(var i = 0; i < menuItems.length; i++)
			{
				menuItems[i].removeClass('selected');
			}
			
			var el = select('#' + e.srcElement.id);
			el.addClass('selected');
			
			self.selectVisual(e.srcElement.id);			
		})

		var visMenu = select('#visuals-menu');
    	visMenu.child(menuItem);
	};

	this.findVisIndex = function(visId) {
		// Search through the visualisations looking for one with the id
		// matching visId.
		for (var i = 0; i < this.visuals.length; i++) {
		  if (this.visuals[i].id === visId) {
			return i;
		  }
		}
	
		// Visualisation not found.
		return null;
	};
	
	this.selectVisual = function(visId){

		var visIndex = this.findVisIndex(visId);

		if (visIndex != null) {
		
			// Select the visualisation in the gallery.
			this.selectedVisual = this.visuals[visIndex];

			// Enable animation in case it has been paused by the current
			// visualisation.
			loop();
		}
	};

	this.keyPressed = function(keycode){
		console.log(keycode);
		if(keycode == 32){
			txt = false;
		}
	};
}

