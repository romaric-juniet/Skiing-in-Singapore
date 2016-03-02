'use strict';

module.exports = class Point {
  constructor(x, y, array) {
    this.x = x;
    this.y = y;
    this.array = array;
  }
  
  // Return an array of possible neighbors
  neighbors() {
    const x = this.x;
    const y = this.y;
    const array = this.array;

    const options = [
      new Point(x,   y-1, array),
      new Point(x,   y+1, array),
      new Point(x-1, y,   array),
      new Point(x+1, y,   array)
    ];

    return options.filter(option => this.array[option.x] && this.array[option.y]); 
  }

  value() {
    return this._value = this.array[this.x][this.y];
  }

  isLocalSummit() {
    return this.neighbors().every(neighbor => neighbor.value() <= this.value());
  }

  isLocalGround() {
    return this.neighbors().every(neighbor => neighbor.value() >= this.value());
  }
}