'use strict';

let loadMap = function (filename) {
  return new Promise(function (resolve, reject) {
    // Data that will be read from the file
    let dimensions = null;
    let array = [];

    // Create the fileStream
    let readLine = require('readline').createInterface({
      input: require('fs').createReadStream(filename)
    });

    // When reading a new line
    readLine.on('line', (line) => {
      if (line.split(' ').length === 2) {
        const dimensionArray = line.split(' ').map(Number);
        dimensions = { x:dimensionArray[0], y:dimensionArray[1] };
      } else {
        array.push(line.split(' ').map(Number));
      }
    });

    // When EOF
    readLine.on('close', function() {
      resolve({ dimensions, array });
    });
  });
}

module.exports = {
  loadMap: loadMap
};