class Shape {
  calculateArea(): number {
    return 0;
  }
}

class Circle extends Shape {
  radius: number;
  constructor(r: number) {
    super();
    this.radius = r;
  }
  calculateArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

class Rectangle extends Shape {
  width: number;
  height: number;
  constructor(w: number, h: number) {
    super();
    this.width = w;
    this.height = h;
  }
  calculateArea(): number {
    return this.width * this.height;
  }
}
