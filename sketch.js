//variable for canvas
var canvas;
//global for the menu
var menu;
//store visualisations in a container
//variable for the p5 sound object
var sound = null;
//variable for p5 fast fourier transform
var fourier;
//variable for p5 amplitude;
var amplitude;
//variable for control panel
var controlPanel;
//playback button
var playButton;
//volume button
var volButton;
//fullscreen button
var fsButton;
//volume slider
var volumeSlider;
//global for the timeline
var _timeline;
//global for multiple screens in miscellaneous visualiser
var s1; var s2; var s3;
//global for burger icon
var burgerIcon;
var txt = true;

function preload(){
	sound = loadSound("assets/music/donaz.mp3");
}

function setup(){

	//canvas setup
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0);
	canvas.style("z-index", "-1");
	background(0);

	//only applicable for miscellaneous visualiser
	s1 = createGraphics(1/3 * width, windowHeight, WEBGL);
	s2 = createGraphics(1/3 * width, windowHeight);
	s3 = createGraphics(1/3 * width, windowHeight);

	menu = new Menu();

	//setup DOM for control panel
	controlPanel = new ControlPanel();

	//stores timeline element globally
	_timeline = controlPanel.timeline;

	//handles mouse presses
	playButton.mousePressed(controlPanel.playAudio);
	_timeline.mousePressed(controlPanel.clickTimeline);
	volButton.mousePressed(controlPanel.showVolumeSlider);
	fsButton.mousePressed(controlPanel.checkFsButton);
	burgerIcon.mousePressed(menu.menuClick);


	//mouse hovering
	volumeSlider.mouseOut(controlPanel.hideVolumeSlider);

	//instantiate the fft object
	fourier = new p5.FFT();
		
	//instantiate the amplitude object
	amplitude = new p5.Amplitude();

	//create a new visualisation container and add visualisations
	menu.addVisual(new Spectrum());
	menu.addVisual(new WavePattern());
	menu.addVisual(new Needles());
	menu.addVisual(new Circle());
	menu.addVisual(new Miscellaneous());
}

function draw(){
	background(0);
   
  if(txt) {
    push();
    translate(0.5 * width, 0.5 * height);
    textAlign(CENTER);
    noStroke();
    fill(255);
    textSize(25);
    text("Select a visualisation and click play. Click spacebar to close", 0, 0);
    pop();
  }

	//update volume each frame
	sound.setVolume(volumeSlider.value());

	//draw the selected visualisation
	if(menu.selectedVisual != null) {
		menu.selectedVisual.draw();
	}

	//updates track's playing time each frame
	controlPanel.timeUpdate();	
}

function keyPressed(){
	menu.keyPressed(keyCode);
}

//when the window has been resized. Resize canvas to fit 
//if the visualisation needs to be resized call its onResize method
function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
	if(vis.selectedVisual.hasOwnProperty('onResize')){
		vis.selectedVisual.onResize();
	}
}
