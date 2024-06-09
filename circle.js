/*This code has been adapted from 'Code an Audio Visualizer in p5js' 
https://www.youtube.com/watch?v=uk96O7N1Yo0*/


function Circle() {
    this.name = "Circle";
    this.id = "circle";

    var minRad = width/10;
    var maxRad = minRad + 100;
    var particles = [];
    var amp;

    this.draw = function() {
        push();
        angleMode(DEGREES);
        background(0);
        var wave = fourier.waveform();
    
        fourier.analyze();
        amp = fourier.getEnergy("bass"); 
        var gb = map(amp, 0, 255, 255, 0);

        translate(width/2, height/2);
        noFill();
        
        stroke(255, gb, gb);
        strokeWeight(1);

        beginShape();
        for (var i = 0; i < wave.length + 1; i++) {
            var angle =  map(i, 0, wave.length, 0, 360);
            var r = map(wave[i], -1, 1, minRad, maxRad);
            var x = r * sin(angle);
            var y = r * cos(angle);
            vertex(x, y);
        }
        endShape();
        

        var p = new Particle();

        particles.push(p);
        for (var i  = particles.length - 1; i >= 0; i--) {
            if (!particles[i].edges()) {
              particles[i].updatePosition(amp > 250);
              particles[i].show(amp);
            } else {
              particles.splice(i, 1);
            }
        } 
        
        pop();
    }

    class Particle {
        constructor() {
            //place the particles randomly at the radius of the waveform
            /*p5.Vector.random2d() will create a vector with a length of 1, we need to
            multiply the vector by the average of min and max radius */
            this.pos = p5.Vector.random2D().mult((minRad + maxRad)/2);
            //velocity of the particle
            this.vel = createVector(0, 0);
            //acceleration of the particle
            this.acc = this.pos.copy().mult(random(0.001, 0.00001));
            //width of the particle
            this.width = random(3, 4);
        }

        show(energy) {
            noStroke();
            var red = map(energy, 0, 255, 255, 236);
            var green = map(energy, 0, 255, 255, 253);
            var blue = map(energy, 0, 255, 255, 24);
            fill(red, green, blue);
            ellipse(this.pos.x, this.pos.y, this.width);
        }
      
        updatePosition(cond) {
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            if (cond) {
              // moves the particles faster
                this.pos.add(this.vel);
                this.pos.add(this.vel);
                this.pos.add(this.vel);
                this.pos.add(this.vel);
                this.pos.add(this.vel);
            }
        }
      
        edges() {
          if (
            this.pos.x < -width/2 ||
            this.pos.x > width/2 ||
            this.pos.y < -height/2 ||
            this.pos.y > height/2) {
              return true;
            } else {
              return false;
            }
        }
    }
}


