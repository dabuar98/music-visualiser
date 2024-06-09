function Spectrum(){
	this.name = "Spectrum";
	this.id = "spectrum";

	this.draw = function(){

		
		push();
		var spectrum = fourier.analyze();
		noStroke();

		for (var i = 0; i < spectrum.length; i++)
		{
			var g = map(spectrum[i], 0, 255, 255, 0);
			var x = map(i, 0, spectrum.length, 0, windowWidth); 
			var h = -windowHeight + map(spectrum[i], 0, 255, windowHeight, 0);
			fill(spectrum[i], g, 0);
			rect(x * 5, windowHeight, windowWidth / spectrum.length, h );
		}		
		pop();
	};
}
