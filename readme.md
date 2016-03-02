# Skiing in Singapore 

This program solves [Redmart's challenge](http://geeks.redmart.com/2015/01/07/skiing-in-singapore-a-coding-diversion/) using javascript and running on node.js.

### Running

The code uses the ES6 currently supported by default by node (developped using v5.6.0). Just run:

```sh
$ node ski-main
```

### Algorithm

0. (Load the data from the file)
1. Find the "local summits", points higher than their neighbors. The longest path can only start from one of them
2. Recursively find all the paths than can be made from each point
3. Gets the best of these paths
