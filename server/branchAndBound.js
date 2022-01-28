function getMinimum(data) {
  var min = data[0];
  for (var i = 1; i < data.length; i++) {
    if (data[i] == 0) {
      return 0
    }
    else if (data[i] < min) {
      min = data[i]
    }
  }
  return min
}

function lineReduction(distances) {
  var min = getMinimum(distances)
  if(min == 0 || min == Infinity){
    return 0
  }
  for (var i = 0; i < distances.length; i++) {
    distances[i] -= min
  }
  return min
}

function fillWithINF(distances, line, column) {
  for (var i = 0; i < distances[line].length; i++) {
    distances[line][i] = Infinity
  }
  for (var i = 0; i < distances[column].length; i++) {
    distances[i][column] = Infinity
  }
  return distances
}

function fillWithINFdiagonal(distances) {
  for (var i = 0; i < distances.length; i++) {
    distances[i][i] = Infinity
  }
}

function matrixTranspose(distances) {
  for (var i = 0; i < distances.length; i++) {
    for (var j = 0; j < i; j++) {
      const tmp = distances[i][j];
      distances[i][j] = distances[j][i];
      distances[j][i] = tmp;
    };
  }
  return distances
}

function linesReduction(distances) {
  var cost = 0
  for (var i = 0; i < distances.length; i++) {
    cost += lineReduction(distances[i])
  }
  return cost
}

function columnsReduction(distances) {
  var cost;
  matrixTranspose(distances)
  cost = linesReduction(distances)
  matrixTranspose(distances)
  return cost
}

function matrixReduction(distances, cost, start, end) {
  var currentCost = cost
  currentCost += distances[start][end]
  fillWithINF(distances, start, end)
  distances[end][0] = Infinity
  currentCost += linesReduction(distances)
  currentCost += columnsReduction(distances)
  return currentCost
}

function firstMatrixReduction(distances, visitedNodes, circuit) {
  var cost = 0
  fillWithINFdiagonal(distances)
  cost += linesReduction(distances)
  cost += columnsReduction(distances)
  circuit[0] = 0
  visitedNodes[0] = true
  return cost
}


function copyArray(array){
  var copy = []
  for (var i = 0; i < array.length; i++) {
    copy.push(array[i].slice())
  }
  return copy
}

function branchAndBoundRecursive(distances, visitedNodes, circuit, cost, level, from){
  var copyDistances = copyArray(distances)
  
  var nodes = visitedNodes.slice()
  var currentCost = cost
  
  if (level == copyDistances.length){
    if(cost < upperBound){
      finalCircuit = circuit.slice()
      upperBound = cost
    }
    return
  }

  for (var i = 1; i < copyDistances.length; i++){
    if(nodes[i] == false){
      nodes[i] = true
      currentCost += matrixReduction(copyDistances, 0, from, i)
      if (currentCost < upperBound){
        circuit[level] = i

        branchAndBoundRecursive(copyDistances, nodes, circuit, currentCost, level + 1, i)
      }

      nodes[i] = false
      copyDistances = copyArray(distances)
      currentCost = cost
    
    }
  }
}

var finalCircuit;
var upperBound;

function branchAndBound(distanceMatrix) {
  finalCircuit = []
  upperBound = Infinity
  var bound = 0;
  var circuit = Array(distanceMatrix.length).fill(0)
  var visitedNodes = Array(distanceMatrix.length).fill(false)
  var distances = copyArray(distanceMatrix)
  var cost = 0
  var level = 1

  cost = firstMatrixReduction(distances, visitedNodes, circuit, level)
  branchAndBoundRecursive(distances, visitedNodes, circuit, cost, level, 0)
  finalCircuit.push(0)
  var bestRoute = { optimizedRoute: finalCircuit, cost: upperBound }
  return bestRoute
}

module.exports = { branchAndBound };