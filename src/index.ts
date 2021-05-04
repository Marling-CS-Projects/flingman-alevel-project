import * as p5 from 'p5';

let sketch = function(p: p5) {
  let position:p5.Vector; // has x, y, AND maths for vectors

  p.setup = function() {
    p.createCanvas(700, 410);
    position = p.createVector(200, 200);
  };

  p.draw = function() {
    p.background(0);
    p.circle(position.x, position.y, 30);
  };
  p.keyPressed = function() {
    if (p.keyCode === p.LEFT_ARROW) {
      position.x -= 5;
    } else if (p.keyCode === p.RIGHT_ARROW) {
      position.x += 5;
    }
    if (p.keyCode === p.UP_ARROW) {
      position.y -= 5;
    } else if (p.keyCode === p.DOWN_ARROW) {
      position.y += 5;
    }
  }
};

let myp5 = new p5(sketch);

