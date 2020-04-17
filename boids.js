var flock = [];
function setup() {
  createCanvas(700,700);
  for(var i = 0;i<200;i++){
    flock.push(new Boid());
  }
}

function draw() {
  background(51);
  for(let boid of flock){
    boid.edges();
    boid.flock(flock);
    boid.update();
    boid.show();
  }
}
