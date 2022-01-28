export function insertCircuit(id, name, places){
  const URL = "http://10.0.2.2:8080/insertCircuit";
  var circuit = {
    "user": id,
    "name": name,
    "places": places
  }

  fetch(URL, {
    method: "POST",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(circuit)
  }).then(response => {
    if (response.status != 200) {
      throw new Error("Server connection failed!")
    }
  }).catch(error => {
    console.log(error.message);
  })
}

export function getAllUserCircuits(user, setCircuits) {
  const URL = "http://10.0.2.2:8080/getAllUserCircuits?user=" + user;
  fetch(URL, {
    method: "GET",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(response => {
    if (response.status = 200) {
      return response.text();
    }
    else {
      throw new Error("Server connection failed!")
    }
  }).then(response => {
    setCircuits(JSON.parse(response))
  }).catch(error => {
    console.log(error.message);
  })
}

export function renameCircuit(id, name) {
  const URL = "http://10.0.2.2:8080/renameCircuit";
  fetch(URL, {
    method: "POST",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id: id, name: name})
  }).then(response => {
    if (response.status = 200) {
      return response.text();
    }
    else {
      throw new Error("Server connection failed!")
    }
  }).catch(error => {
    console.log(error.message);
  })
}

export function deleteCircuit(id) {
  const URL = "http://10.0.2.2:8080/deleteCircuit";
  fetch(URL, {
    method: "POST",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id: id})
  }).then(response => {
    if (response.status = 200) {
      return response.text();
    }
    else {
      throw new Error("Server connection failed!")
    }
  }).catch(error => {
    console.log(error.message);
  })
}


export function getUserSettings(id, setDistance, setTheme, setNrMinutes){
  const URL = "http://10.0.2.2:8080/getUserSettings?id=" + id;
  fetch(URL, {
    method: "GET",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(response => {
    if (response.status = 200) {
      return response.text();
    }
    else {
      throw new Error("Server connection failed!")
    }
  }).then(response => {
    response = JSON.parse(response)
    if (response == null)
    {
      setUserSettings(id)
      return
    }
    setDistance(response.settings.distanceUnit)
    setTheme(response.settings.theme)
    setNrMinutes(response.settings.timeAtStop)
  }).catch(error => {
    console.log(error.message);
  })
}

export function updateUserSettings(user, distance, theme, nrMinutes) {
  const URL = "http://10.0.2.2:8080/updateUserSettings";
  var settings = {
    "user": user,
    "settings": {
      distanceUnit: distance,
      theme: theme,
      timeAtStop: nrMinutes
    }
  }

  fetch(URL, {
    method: "POST",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(settings)
  }).then(response => {
    if (response.status != 200) {
      throw new Error("Server connection failed!")
    }
  }).catch(error => {
    console.log(error.message);
  })
}

export function setUserSettings(id) {
  const URL = "http://10.0.2.2:8080/insertUserSettings";
  var settings = {
    "user": id,
    "settings": { 
      distanceUnit: "Miles", 
      theme: "Light", 
      timeAtStop: 5 
    }
  }

  fetch(URL, {
    method: "POST",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(settings)
  }).then(response => {
    if (response.status != 200) {
      throw new Error("Server connection failed!")
    }
  }).catch(error => {
    console.log(error.message);
  })
}