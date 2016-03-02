'use strict';

const LoadMapFile = require('./load-map-file');
const Point = require('./point');
const Path = require('./path');

console.time('Total');

// Load the file
var promise = LoadMapFile.loadMap('map.txt');

// Execute the main function
promise = promise.then(data => {
  main(data.dimensions, data.array);
  console.timeEnd('Total');
});

promise = promise.catch(error => {
  console.error(error);
  console.error(error.stack);
  return Promise.reject(error);
});

function main(dimensions, array) {
  // Paths found
  let paths = [];

  // Iterate over every points
  for (let x = 0 ; x < dimensions.x ; x++) {
    for (let y = 0 ; y < dimensions.y; y++) {
      const point = new Point(x, y, array);

      // Only start from "local summits", ie. points only surrounded by lower points
      if (point.isLocalSummit()) {
        // Find child paths, ie. paths continuing from the current path
        const childPaths = childPathsFor(new Path([point]));

        // Add the child paths to the list of paths
        paths.push(...childPaths);
      }
    }
  }

  const bestPath = paths.sort(Path.compare).reverse()[0];

  console.log(bestPath);
  console.log('Drop: ' + bestPath.drop());
  console.log('Length: ' + bestPath.length());
  console.log(`Email address is ${bestPath.length()}${bestPath.drop()}@redmart.com`);
}

// Longest path found so far. 
// Use of a "global" can cause problems but dramatically increase performances
let longest = 0;

// Find child paths, ie. paths continuing from the current path
function childPathsFor(currentPath) {
  // last point of the current path
  const lastPoint = currentPath.last();

  // Nowhere to go: end of the path
  if (lastPoint.isLocalGround()) {
    longest = Math.max(currentPath.length(), longest);
    return currentPath.length() >= longest ? [currentPath] : [];
  }

  // Try all the paths continuing via each neighbors
  return lastPoint.neighbors().reduce((pathsToReturn, neighbor) => {
    if (neighbor.value() < lastPoint.value()) {
      // Build a new path (fork)
      let newPath = currentPath.clone();
      newPath.push(neighbor);

      // Try that path
      const childPaths = childPathsFor(newPath);
      pathsToReturn.push(...childPaths);
    }
    return pathsToReturn;
  }, []); 
}