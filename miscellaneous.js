function Miscellaneous() {

    this.name = "Miscellaneous";
    this.id = "miscellaneous"

    let locX = mouseX - height / 2;
    let locY = mouseY - width / 2;

    var rot = 0;

    //left screen
    this.torus = function(energy) {

        //responsive radius
        var r = map(energy, 0, 150, 40, 1/3 * s1.width);
        //responsive background
        var bg = map(energy, 0, 150, 153, 0);
        //responsive rotation
        var rot = map(energy, 0, 150, 0.01, 0.1);
        var green = map(energy, 0, 150, 255, 128);

        s1.background(bg, bg, 255);
        s1.rotateY(rot);
        if (energy > 100) {
            s1.rotateX(rot);
            s1.rotateY(rot);
            s1.rotateZ(rot);
        }
        s1.ambientLight(60, 60, 60);
        s1.pointLight(255, 255, 255, locX, locY, 100);
        s1.ambientMaterial(255, green, 51);
        s1.torus(r, 1/3 * r, 64, 64);  
        image(s1, 0, 0);

    }

    //centred screen
    /*lines() code has been adapted from 'JavaScript Audio CRASH COURSE For Beginners'
    https://www.youtube.com/watch?v=VXWvfrmpapI
    */
    this.lines = function() {
        push(); 
        var spectrum = fourier.analyze();
        translate(width/2, height/2);
        
        for (var i = 0; i < spectrum.length; i++) {

            var h = map(spectrum[i], 0, 255, 0, 1/6 * width);
            //map angle to 2 * pi radians
            var r = map(i, 0, spectrum.length, 0, 2 * Math.PI);  
            rotate(r * 50);
            colorMode(HSB);
            // const hue = i * 15;
            noStroke();
            fill(random(0, 255), random(0, 255), random(0, 255));
            rect(0, 0, width / spectrum.length, h);
        
        }

        pop();
    }

    this.rotatingBlocks = function(energy) {
        
        if(energy > 210)
        {
            rot += 0.125;
        }
        
        var l = map(energy, 0, 255, 10, 50);

        //responsive background
        var red = map(energy, 50, 212, 255, 0);
        var green = map(energy, 50, 247, 255, 0); 
        var blue = map(energy, 50, 234, 204, 0);
        
        //responsive visual
        // var gbV = map(energy, 50, 200, 0, 255);
        var rV = map(energy, 50, 200, 0, 212);
        var gV = map(energy, 50, 200, 0, 247);
        var bV = map(energy, 50, 200, 0, 34);


        s3.push();
        s3.background(red, green, blue);
        s3.rectMode(CENTER);
        s3.translate(s3.width/2, s3.height/2);
        s3.rotate(rot);
        s3.noStroke();
        
        var incrX = s3.width / (10 - 1);
        var incrY = s3.height / (5 - 1);

        for (var i = 0; i < 50; i++) {
            //columns
            for(var j = 0; j < 50; j++) {
                s3.push();
                s3.rotate(rot);
                s3.fill(rV, gV, bV);
                s3.rect(j * incrX - s3.width , i * 0.5 * incrY - s3.height, l, l);  
                s3.pop(); 
            }  
        }
        
        image(s3, 2/3 * width, 0);
        s3.pop();   
    }

    this.draw = function() {

        //drawing
        if(sound.isPlaying()) {
            fourier.analyze();
            var b = fourier.getEnergy("bass");
            var t = fourier.getEnergy("treble");
            
            this.torus(t)
            this.lines();
            this.rotatingBlocks(b);           
        }       
    }
}