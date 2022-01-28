export function getUniqueCircuitName(name, circuits) {
  var circuitsName = []
  for (let i = 0; i < circuits.length; i++){
    circuitsName.push(circuits[i].name)
  }
  var nr = 1;
  var copyName = name;
  while (circuitsName.indexOf(copyName) > -1) {
    var copyName = name + " (" + nr + ")"
    nr++;
  }
  return copyName;
}

export function secondsToHours(seconds) {
  var hours = parseInt((seconds / 60) / 60);
  var minutes = parseInt((seconds / 60) % 60);
  var result = ""
  if (hours >= 24) {
    var days = parseInt(hours / 24);
    hours = hours % 24
    result = days + " d "
    if (hours > 0)
      result += hours + " h"
  } else if (hours > 0) {
    result = " " + hours + " h"
    if (minutes > 0)
      result += " " + minutes + " m"
  }
  else
    result = minutes + " m"
  return result
}

export function metersToKm(meters) {
  var km = meters / 1000;
  return km.toFixed(1) + " km"
}

export function metersToMiles(meters) {
  var miles = meters * 0.000621371192;
  return miles.toFixed(1) + " miles"
}