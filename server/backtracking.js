function backtrackingRecursive(distances, visitedNodes, circuit, cost, level, from) {
  if (level == distances.length) {
    cost += distances[from][0]
    if (cost < finalCost) {
      finalCircuit = circuit.slice()
      finalCost = cost
    }
    return
  }
  
  for (var i = 1; i < distances.length; i++) {
    if (visitedNodes[i] == false) {
      visitedNodes[i] = true
      circuit[level] = i
      backtrackingRecursive(distances, visitedNodes, circuit, cost + distances[from][i], level + 1, i)
      visitedNodes[i] = false
    }
  }
}

var finalCircuit;
var finalCost;

function backtracking(distanceMatrix) {
  finalCircuit = []
  finalCost = Infinity
  var circuit = Array(distanceMatrix.length).fill(0)
  var visitedNodes = Array(distanceMatrix.length).fill(false)
  visitedNodes[0] = true
  circuit[0] = 0
  backtrackingRecursive(distanceMatrix, visitedNodes, circuit, 0, 1, 0)
  finalCircuit.push(0)
  var bestRoute = { optimizedRoute: finalCircuit, cost: finalCost }
  return bestRoute
}

module.exports = { backtracking };