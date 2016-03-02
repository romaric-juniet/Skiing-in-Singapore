'use strict';

module.exports = class Path {
  constructor(points) {
    this.points = points;
  }
  
  length() {
    return this.points.length;
  }

  last() {
    return this.points[this.points.length - 1];
  }

  push(points) {
    return this.points.push(points);
  }

  clone() {
    const pointsCopy = this.points.slice(0);
    return new Path(pointsCopy);
  }

  drop() {
    return this.points[0].value() - this.last().value();
  }
  
  static compareDrop (a, b) {
    if (a.drop() > b.drop()) {
      return 1;
    }
    if (a.drop() < b.drop()) {
      return -1;
    }

    return 0;
  };
  
  static compareLength (a, b) {
    if (a.length() > b.length()) {
      return 1;
    }
    if (a.length() < b.length()) {
      return -1;
    }

    return 0;
  };
  
  static compare (a, b) {
    return Path.compareLength(a, b) || Path.compareDrop(a, b);
  };
}