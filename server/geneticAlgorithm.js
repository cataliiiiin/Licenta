function shuffle(cities) {
  var result = [...cities]
  for (var i = 0; i < result.length; i++) {
    const j = Math.floor(Math.random() * result.length - 1) + 1;
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function createPopulation(nrCities, sizePopulation) {
  var population = [[...Array(nrCities).keys()]]
  population[0].shift()
  for (var i = 1; i < sizePopulation; i++) {
    population.push(shuffle(population[0]));
  }
  return population;
}

function calculateFitness(population, distancesMatrix) {
  var fitness = [];

  for (var i = 0; i < population.length; i++) {
    var distance = distancesMatrix[0][population[i][0]];
    for (var j = 0; j < population[i].length - 1; j++) {
      distance += distancesMatrix[population[i][j]][population[i][j + 1]];
    }
    distance += distancesMatrix[population[i][population[i].length - 1]][0]
    fitness[i] = distance;
  }
  return fitness;
}

function sortPopulation(population, fitness, bestRoute) {
  var populationSort = []
  var sort = []
  for (var i = 0; i < population.length; i++) {
    populationSort.push({ fitness: fitness[i], population: population[i] })
  }
  populationSort.sort((a, b) => parseFloat(a.fitness) - parseFloat(b.fitness));
  for (var i = 0; i < population.length; i++) {
    sort.push(populationSort[i]["population"]);
  }
  return sort;
}

function getBestRoute(bestRoute, bestGenerationRoute, distances) {
  var distance = distances[0][bestGenerationRoute[0]];
  for (var j = 0; j < bestGenerationRoute.length - 1; j++) {
    distance += distances[bestGenerationRoute[j]][bestGenerationRoute[j + 1]];
  }
  distance += distances[bestGenerationRoute[bestGenerationRoute.length - 1]][0]
  if (bestRoute["fitness"] > distance) {
    bestRoute["fitness"] = distance;
    bestRoute["population"] = bestGenerationRoute;
  }
  return bestRoute;
}


function crossoverPopulation(population) {
  var half = Math.floor(population.length / 2)
  var bestPopulation = population.slice(0, half);
  for (var i = Math.floor(population.length / 2); i < population.length; i++) {
    var ind1 = Math.floor(Math.random() * half)
    var ind2 = Math.floor(Math.random() * half)
    while (ind1 == ind2) {
      ind2 = Math.floor(Math.random() * half)
    }
    bestPopulation.push(crossover(bestPopulation[ind1], bestPopulation[ind2]))
  }
  return bestPopulation
}

function crossover(parentA, parentB) {
  var randNr = Math.floor(Math.random() * (parentA.length - 2)) + 2;
  var child = parentA.slice(0, randNr);
  for (var i = randNr; i < parentB.length; i++) {
    if (!child.includes(parentB[i])) {
      child.push(parentB[i])
    }
  }
  for (var i = 0; i < randNr; i++) {
    if (!child.includes(parentB[i])) {
      child.push(parentB[i])
      if (child.length == parentB.length) {
        break;
      }
    }
  }
  return child;
}

function mutatePopulation(population, mutateRate) {
  var result = population.slice()
  for (var i = 0; i < result.length; i++) {
    if (Math.random() < mutateRate) {
      result[i] = mutate(result[i])
    }
  }
  return result;
}

function mutate(population) {
  var temp;
  var ind1 = Math.floor(Math.random() * population.length)
  var ind2 = Math.floor(Math.random() * population.length)
  while (ind1 == ind2) {
    ind2 = Math.floor(Math.random() * population.length)
  }
  temp = population[ind1];
  population[ind1] = population[ind2];
  population[ind2] = temp;
  return population;
}

function geneticAlgorithm(populationSize, generation, mutateRate, distances) {
  var population = [];
  var fitness = []
  var bestRoute = { fitness: Infinity, population: [] }
  population = createPopulation(distances.length, populationSize);
  for(var i = 0; i < generation; i++)
  {
      fitness = calculateFitness(population, distances)
      population = sortPopulation(population, fitness, bestRoute)
      bestRoute = getBestRoute(bestRoute, population[0], distances)
      population = crossoverPopulation(population);
      population = mutatePopulation(population, mutateRate)
  }
  return bestRoute;
}

module.exports = { geneticAlgorithm };