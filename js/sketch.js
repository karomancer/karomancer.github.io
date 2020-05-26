const GRAY_RGB = [234, 234, 234];

const DARK_TEAL_RGB = [69, 156, 131];
const DARK_TEAL_HEX = "#459c83";

const TEAL_RGB = [81, 179, 154];
const TEAL_HEX = "#51b39a";

class Circuit {
  constructor(p) {
    this.p = p;
    this.readyToDraw = [];
    this.turningPoints = [];
    this.angles = [];
    this.vertices = [];

    this.constructTurns();
  }

  constructTurns() {
    const numTurns = Math.max(3, Math.round(this.p.random(5)));
    for (let i = 0; i < numTurns; i++) {
      const point = this.constructPoint();
      this.turningPoints.push(point);
      this.readyToDraw.push(false);
      this.angles.push({ current: 0, start: 0, end: 100 });
    }
  }

  constructPoint() {
    return this.p.createVector(
      this.p.random(this.p.width * 2),
      this.p.random(this.p.height * 2)
    );
  }

  constructLine(startIndex, endIndex) {
    const { current, start, end } = this.angles[startIndex];
    const startPoint = this.turningPoints[startIndex];
    const endPoint = this.turningPoints[endIndex];

    const tempX = this.p.map(current, start, end, startPoint.x, endPoint.x, 1);
    const tempY = this.p.map(current, start, end, startPoint.y, endPoint.y, 1);

    if (!this.vertices[startIndex]) {
      this.vertices[startIndex] = [];
    }
    this.vertices[startIndex].push(this.p.createVector(tempX, tempY));
    this.angles[startIndex].current += 0.5;
  }

  drawDot(point, diameter) {
    this.p.fill(...TEAL_RGB);
    //   p.stroke(...GRAY_RGB);
    this.p.strokeWeight(0);
    this.p.circle(point.x, point.y, diameter || 30);
  }

  drawLine(index) {
    const { x: turnX, y: turnY } =
      index + 1 < this.turningPoints.length
        ? this.turningPoints[index + 1]
        : {};

    this.p.stroke(...TEAL_RGB);
    this.p.strokeWeight(10);
    this.p.noFill();

    this.p.beginShape();
    for (let i = 0; i < this.vertices[index].length; i++) {
      const { x, y } = this.vertices[index][i];
      this.p.vertex(x, y);

      if (x === turnX && y === turnY) {
        this.readyToDraw[index + 1] = true;
      }
    }
    this.p.endShape();
  }

  draw() {
    this.readyToDraw[0] = true;

    this.drawDot(this.turningPoints[0]);
    for (let i = 0; i + 1 < this.turningPoints.length; i++) {
      if (this.readyToDraw[i]) {
        this.constructLine(i, i + 1);
        this.drawLine(i);
      }
    }
    if (this.readyToDraw[this.turningPoints.length - 1]) {
        this.drawDot(this.turningPoints[this.turningPoints.length - 1]);
    }
  }
}

// const _drawLine = p => (x1, y1, x2, y2) => {
//     p.createVertex(x, y)
// }

// const _drawCircle = (p) => (x, y) => {
//   p.fill(...TEAL_RGB);
//   //   p.stroke(...GRAY_RGB);
//   p.strokeWeight(0);
//   p.circle(x, y, 30);
// };

// const _constructPoint = (p) => ({
//   x: p.random(p.windowWidth),
//   y: p.random(p.windowHeight),
// });

const sketch = (p) => {
  const circuits = [];

  drawCircle = (x, y) => _drawCircle(p)(x, y);
  drawLine = (x1, y1, x2, y2) => _drawLine(p)(x1, y1, x2, y2);
  constructPoint = () => _constructPoint(p);

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(GRAY_RGB);
    // p.background(100, 100, 100);
  };

  p.draw = () => {
    const num = Math.round(p.random(401));

    if (num % 401 === 0) {
      const circuit = new Circuit(p);
      circuits.push(circuit);
    }

    for (let i = 0; i < circuits.length; i++) {
      circuits[i].draw();
    }
    // p.line(30, 20, 85, 20);
    // p.stroke(126);
    // p.line(85, 20, 85, 75);
    // p.stroke(255);
    // p.line(85, 75, 30, 75);
  };
};

new p5(sketch, document.querySelector("#splash_sketch"));
