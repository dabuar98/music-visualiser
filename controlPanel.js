/*This code was adapted from 
http://alexkatz.me/posts/building-a-custom-html5-audio-player-with-javascript/*/

function ControlPanel() {

    //variables for HTML elements in the control panel
    var divControlPanel;
    var divTimeline;
    var divPlayhead;
    var currentTime;
    var durationTime;

    //DOM elements setup

	divControlPanel = createDiv();
	divControlPanel.id("control-panel"); 

        //buttons

        //playback button element
		playButton = createButton("");
		playButton.parent(divControlPanel); 
		playButton.id("playButton");
		playButton.addClass("play");

        //volume button
        volButton = createButton("");
        volButton.parent(divControlPanel);
        volButton.id("volButton");

        //full-screen button
        fsButton = createButton("");
        fsButton.parent(divControlPanel);
        fsButton.id("fsButton");
        fsButton.addClass("fs-off");


        //timeline element
		divTimeline = createDiv(); 
		divTimeline.id("timeline"); 
		divTimeline.parent(divControlPanel); 
            //playhead
			divPlayhead = createDiv();
			divPlayhead.id("playhead");
			divPlayhead.parent(divTimeline);

        //time elements
        currentTime = createDiv("00:00");
        currentTime.parent(divControlPanel);
        currentTime.addClass("current-time");
        durationTime = createDiv("00:00");
        durationTime.parent(divControlPanel);
        durationTime.addClass("total-duration");

         
        //volume slider
		volumeSlider = createSlider(0, 1, 0.5, 0.1);
		volumeSlider.id("volume-slider");
		volumeSlider.parent(divControlPanel);
		
	//styling

    //control panel
    divControlPanel.style("z-index", "1");
    divControlPanel.style("width", `${windowWidth}px`)
    divControlPanel.style("background-color", "rgb(110, 110, 88)");
    divControlPanel.style("opacity", "1");

    //playbutton
	playButton.size(50, 50);
	select(".play").style("background", "url(assets/images/play.png)");
	playButton.position(3/16 * windowWidth + 75, 8/10 * windowHeight - 5);

    //volume button
    volButton.size(50, 50);
    select("#volButton").style("background", "url(assets/images/soundOn.png)");
    volButton.position(11/16 * width + 25, 8/10 * height - 5);

    //timeline
    select("#timeline").position(6/16 * width, 8/10 * height - 10);
    select("#timeline").style("width", `${5/16 * windowWidth}px`);

    //times
    select(".current-time").position(4/16 * width + 50, 8/10 * height + 10);
    select(".total-duration").position(4/16 * width + 100, 8/10 * height + 10);
    //volume slider
	select("#volume-slider").position(11/16 * width - 20, 8/10 * height - 90);  
    select("#volume-slider").style("transform", "rotate(-90deg)");  

    //fullscreen button
    fsButton.size(50,50);
    select("#fsButton").style("background", "url(assets/images/fsOn.png)");
    fsButton.position(12/16 * width, 8/10 * height - 5);

    //allows sketch to access timeline element
    this.timeline = select("#timeline");
    
    //variable for timeline width without margins 
    var playhead = select("#playhead");
    var timelineWidth = this.timeline.elt.offsetWidth - playhead.elt.offsetWidth;

    //methods

    //show volume slider when mouse hovers over icon
    this.showVolumeSlider = function() {
        select("#volume-slider").style("opacity", "1");
    }

    //hide volume slider when mouse hovers out the icon
    this.hideVolumeSlider = function() {
        select("#volume-slider").style("opacity", "0");
    }

    //turns on/off fullscreen mode and change icon
    this.checkFsButton = function() {
        if (fsButton.class() === "fs-off") {
            fsButton.class("fs-on");
            select(".fs-on").style("background", "url(assets/images/fsOff.png)");
            let fs = fullscreen();
            fullscreen(!fs);
        } else {
            fsButton.class("fs-off");
            select(".fs-off").style("background", "url(assets/images/fsOn.png)");
            let fs = fullscreen();
            fullscreen(!fs);
        }

    }

    //updates playButton's class/change playback icon
    this.playAudio = function() {
        if (!sound.isPlaying()) {
            sound.play();
            playButton.class("pause");
            select(".pause").style("background", "url(assets/images/pause.png)");
            loop();

    
        } else {
            sound.pause();
            playButton.class("play");
            select(".play").style("background", "url(assets/images/play.png)");
            noLoop();
        }  
    }

    //moves playhead as track advances and displays track's duration and current time
    /* timeUpdate method was adpated from 
    https://www.geeksforgeeks.org/create-a-music-player-using-javascript/*/
    
    this.timeUpdate = function () {
        
        var playPercent = timelineWidth * (sound.currentTime()/sound.duration());
        var currentMins = Math.floor(sound.currentTime() / 60);
        var currentSecs = Math.floor(sound.currentTime() - currentMins * 60);
        var durationMins = Math.floor(sound.duration() / 60);
        var durationSecs = Math.floor(sound.duration() - durationMins * 60);
        
        //format track's duration
        if (currentSecs < 10) {currentSecs = "0" + currentSecs};
        if (durationSecs < 10) {durationSecs = "0" + durationSecs};
        if (currentMins < 10) {currentMins = "0" + currentMins};
        if (durationMins < 10) {durationMins = "0" + durationMins};

        textSize(20);
        fill(255);
        stroke(255);

        //displays current time and duration
        currentTime.elt.textContent = currentMins + ":" + currentSecs  + " /";
        durationTime.elt.textContent = " " + durationMins + ":" + durationSecs;
        


        //when track ends, display play playButton
        if (playPercent === timelineWidth) {
            sound.pause();
            playButton.class("play");
            select(".play").style("background", "url(assets/images/play.png)");
        } 
        
        //moves playhead
        select("#playhead").style("margin-left", `${playPercent}px`);
        
    }

    //returns elements left position relative to top-left viewport
    this.getPosition = function(element) {
        return element.elt.getBoundingClientRect().left;
    }

    //returns click as decimal of the total timeline width
    this.clickPercent = function() {
        var click = mouseX - this.getPosition(this.timeline);
        var clickDecimal = (click / timelineWidth) * sound.duration();
        return clickDecimal;
    }

    //jumps into the clicked time of the track
    var self = this;
    this.clickTimeline = function () {
        sound.jump(self.clickPercent());
    }
   
}