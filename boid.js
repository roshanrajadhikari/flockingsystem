class Boid{
    constructor(){
      this.position = createVector(random(width),random(height));
      this.velocity = p5.Vector.random2D();
      this.velocity.setMag(random(2,4));
      this.acceleration = createVector();
      this.maxForce = 1;
      this.maxSpeed = 4;
      this.color = color(random(100,255),random(100,255),random(150));;
    }

    flock(boids){
      var alignment = this.align(boids);
      var cohesion = this.cohesion(boids);
      var seperation = this.seperation(boids);
      this.acceleration.add(alignment);
      this.acceleration.add(cohesion);
      this.acceleration.add(seperation);
    }

    edges(){
      if(this.position.x > width){
        this.position.x = 0;
      }else if (this.position.x < 0){
        this.position.x = width;
      }
      if(this.position.y > height){
        this.position.y = 0;
      }else if (this.position.y < 0){
        this.position.y = height;
      }
    }

    align(boids){
      var preception = 50;
      var steering = createVector();
      var total = 0;
      for(let other of boids){
        var d = dist(this.position.x,this.position.y,other.position.x,other.position.y);
        if(other != this && d < preception){
          steering.add(other.velocity);
          total++;
        }
      }
      if(total > 0){
        steering.div(total);
        steering.setMag(this.maxSpeed);
        steering.sub(this.velocity);
        steering.limit(this.maxForce);
        return steering;
      }
      return steering;
    }

    cohesion(boids){
      var preception = 70;
      var steering = createVector();
      var total = 0;
      for(let other of boids){
        var d = dist(this.position.x,this.position.y,other.position.x,other.position.y);
        if(other != this && d < preception){
          steering.add(other.position);
          total++;
        }
      }
      if(total > 0){
        steering.div(total);
        steering.sub(this.position);
        steering.setMag(this.maxSpeed);
        steering.sub(this.velocity);
        steering.limit(this.maxForce);
        return steering;
      }
      return steering;
    }

    seperation(boids){
      var preception = 100;
      var steering = createVector();
      var total = 0;
      for(let other of boids){
        var d = dist(this.position.x,this.position.y,other.position.x,other.position.y);
        if(other != this && d < preception){
          var diff = p5.Vector.sub(this.position,other.position);
          diff.div(d);
          steering.add(diff);
          total++;
        }
      }
      if(total > 0){
        steering.div(total);
        steering.setMag(this.maxSpeed + 1);
        steering.sub(this.velocity);
        steering.limit(this.maxForce);
        return steering;
      }
      return steering;
    }


    update(){
      this.position.add(this.velocity);
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxSpeed);
      this.acceleration.mult(0);

    }

    show(){
      strokeWeight(6);
      stroke(this.color);
      point(this.position.x,this.position.y);
      // line(this.position.x,this.position.y,this.position.x,this.position.y)
    }
}
