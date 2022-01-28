import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, Pressable, Modal, TextInput } from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import GoogleMap from './../../components/GoogleMap/GoogleMap';
import DestinationRow from './../../components/DestinationRow';
import FinishRow from './../../components/FinishRow';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import { LogBox } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import LottieView from 'lottie-react-native';
import { secondsToHours, metersToKm, metersToMiles} from './functions';
navigator.geolocation = require('@react-native-community/geolocation');

LogBox.ignoreAllLogs();

const HomeScreen = (props) => {
  const navigation = useNavigation();
  var d = new Date();
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const [routeNameTemp, setRouteNameTemp] = useState(days[d.getDay()] + " " + months[d.getMonth()] + " " + d.getDate());
  const [startRoute, setStartRoute] = useState(0);
  const [modalVisibleSetStart, setModalVisibleSetStart] = useState(false);
  const [modalVisibleLoading, setModalVisibleLoading] = useState(false);
  const [circuitDistance, setCircuitDistance] = useState(0);
  const [circuitTime, setCircuitTime] = useState(0);
  const mapRef = useRef(null)
  const setCurrentMapPosition = (place) => {
    mapRef.current.animateToRegion({
      latitude: place.coordinate.latitude,
      longitude: place.coordinate.longitude,
      latitudeDelta: 0.025,
      longitudeDelta: 0.025,
    })
  }

  const goToSearchPlace = () => {
    navigation.navigate('SearchPlace', { places: props.places, setPlaces: props.setPlaces, 
                                         showOptimizeBtn: props.showOptimizeBtn, setShowOptimizeBtn: props.setShowOptimizeBtn,
                                         setStops: props.setStops})
  }

  const fetchDistanceBetweenPoints = (i, j, start, finish) => {
    var urlToFetchDistance = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=' +
      start.latitude + ',' + start.longitude + '&destinations=' +
      finish.latitude + '%2C' + finish.longitude + '&key=' + "YOUR API KEY";
    let prom = fetch(urlToFetchDistance).then(res => {
      return res.json()
    });

    prom = prom.then(res => {
      return { 
        i: i, 
        j: j, 
        distance: res.rows[0].elements[0].distance.value, 
        duration: res.rows[0].elements[0].duration.value
      };
    });
    return prom;
  }

  
  function getDistanceMatrix(){
    var i, j;
    var places = [...props.places]
    var start = places[startRoute]
    places.splice(startRoute, 1)
    places.unshift(start)
    var distance_matrix = Array(places.length).fill(0).map(row => new Array(places.length).fill(0))
    var duration_matrix = Array(places.length).fill(0).map(row => new Array(places.length).fill(0))
    let promises = []
    for (i = 0; i < distance_matrix.length; i++) {
      for (j = 0; j < distance_matrix.length; j++) {
        if (i != j) {
          promises.push(fetchDistanceBetweenPoints(i, j, places[i].coordinate, places[j].coordinate, places[i].description, places[j].description))
        }
      }
    }

    let big_promise = Promise.all(promises);
    big_promise.then((res) => {
      res.map(el => {
        distance_matrix[el.i][el.j] = el.distance;
        duration_matrix[el.i][el.j] = el.duration;
      });
    }).then(() => {
      calculateRoute(distance_matrix, duration_matrix);
    })
  }

  function calculateRoute(distanceMatrix, durationMatrix){
    let URL = ""
    if (distanceMatrix.length <= 20){
      URL = "http://10.0.2.2:8080/branchAndBound";
    }else{
      URL = "http://10.0.2.2:8080/geneticAlgorithm";
    }

    fetch(URL, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(distanceMatrix)
    }).then(response => {
      if (response.status = 200) {
        return response.json();
      }
      else {
        throw new Error("Server connection failed!")
      }
    }).then(response => {
      showCourse(response["optimizedRoute"], distanceMatrix, durationMatrix)
    }).catch(error => {
      console.log(error.message);
    })
  }

  function showCourse(circuit, distanceMatrix, durationMatrix){
    var routes = []
    var copyPlaces = []
    var places = [...props.places]
    var start = places[startRoute]
    var totalDistance = 0
    var totalDuration = 0
    places.splice(startRoute, 1)
    places.unshift(start)

    for (var i = 0; i < circuit.length - 1; i++){
      copyPlaces.push(places[circuit[i]])
      routes.push({
        origin: places[circuit[i]].coordinate,
        destination: places[circuit[i + 1]].coordinate
      })
      totalDistance += distanceMatrix[circuit[i]][circuit[i + 1]]
      totalDuration += durationMatrix[circuit[i]][circuit[i + 1]]
    }
    copyPlaces.push({ description: places[0].description, coordinate: places[0].coordinate })

    for (var i = 0; i < circuit.length; i++) {
      copyPlaces[i]["isDone"] = false
      if(i == 0){
        copyPlaces[i]["distance"] = 0
        copyPlaces[i]["duration"] = 0
      } else if(i != circuit.length - 1){
        copyPlaces[i]["distance"] = distanceMatrix[circuit[i - 1]][circuit[i]]
        copyPlaces[i]["duration"] = durationMatrix[circuit[i - 1]][circuit[i]] + props.nrMinutes * 60
      }else{
        copyPlaces[i]["distance"] = distanceMatrix[circuit[i - 1]][circuit[i]]
        copyPlaces[i]["duration"] = durationMatrix[circuit[i - 1]][circuit[i]]
      }
    }

    props.setCourses(routes)
    props.setPlaces(copyPlaces)    
    props.setShowOptimizeBtn(false)
    setModalVisibleLoading(false)

    setCircuitDistance(totalDistance)
    setCircuitTime(totalDuration + (props.nrMinutes * 60 * (copyPlaces.length - 2)))
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: '55%' }}>
        <GoogleMap places={props.places} courses={props.courses} mapRef={mapRef}/>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            borderRadius: 15,
            margin: 10,
            backgroundColor: '#202020'
          }}
        >
          <Pressable style={{padding: 3}}>
            <IconEntypo name="menu" size={33} color="black" onPress={() => navigation.openDrawer()} />
          </Pressable>
          <Pressable onPress={goToSearchPlace} style={{ backgroundColor: '#424242', flex: 1, borderRadius: 15, marginRight: 1}}>
            <Text style={{color: '#fff', fontSize: 20, marginLeft: 15, padding:5}}>Add or find place</Text>
          </Pressable>
          
        </View>
      </View>
      <View style={styles.bottomPanel}>
        <View style={styles.container}>
          <View style={styles.topPanel}>
            <View>
              <Text style={styles.routeName}>{props.routeName}</Text>
              <View style={styles.info}>
                {
                  props.showOptimizeBtn ? (
                    <View>
                      <Text style={styles.stopsText}>Stops: {props.places.length}</Text>
                    </View>
                  ) : 
                  (
                    <>
                    <View>
                      <Text style={styles.stopsText}>Stops: {props.stops}/{props.places.length}</Text>
                    </View>
                    <View style={{marginLeft: 10}}>
                          <Text style={styles.stopsText}>Dist: {(props.distance === 'Kilometers') ? metersToKm(circuitDistance) : metersToMiles(circuitDistance)}</Text>
                    </View>
                    <View style={{ marginLeft: 10 }}>
                          <Text style={styles.stopsText}>Time: {secondsToHours(circuitTime)}</Text>
                    </View>
                    </>
                  )
                }
              </View>
            </View>
            <View style={styles.editView}>
              <Pressable onPress={() => 
                {
                  props.setPlaces(props.places.filter((element, index) => index < props.places.length - 1))
                  props.setShowOptimizeBtn(true)
                }}>
                <View style={styles.editButton}>
                  <Text style={styles.editText}>Edit route</Text>
                </View>
              </Pressable>
            </View>
          </View>
          
          <ScrollView style={styles.listLocations}>
            {
              props.places.map((place, index) => {
                  return <>
                          <Pressable onPress={() => setCurrentMapPosition(place)}>
                            <DestinationRow key={index} place={place} 
                                            id={index} showButtons={props.showOptimizeBtn} 
                                            places={props.places} setPlaces={props.setPlaces}
                                            stops={props.stops} setStops={props.setStops}
                                            circuitDistance={circuitDistance} setCircuitDistance={setCircuitDistance}
                                            circuitTime={circuitTime} setCircuitTime={setCircuitTime}/>
                          </Pressable>
                        </>
              })
            }
            {
              !props.showOptimizeBtn ? <FinishRow places={props.places} setPlaces={props.setPlaces} 
                                            setShowOptimizeBtn={props.setShowOptimizeBtn} setTime={props.setTime} 
                                            routeName={props.routeName} setRouteName={props.setRouteName}
                                            setCourses={props.setCourses} circuits={props.circuits}
                                 /> 
                               : null
            }
          </ScrollView>
        </View>
        {
          props.showOptimizeBtn ? (
            <View style={{ position: "absolute", bottom: 5, right: 5 }}>
              <Pressable onPress={() => {
                  if(props.places.length > 1)
                    setModalVisibleSetStart(true)
                }}>
                <View style={styles.optimizeButton}>
                  <Text style={styles.optimizeText}>Optimize route</Text>
                </View>
              </Pressable>
            </View>
          ) : null
        }
      </View>

      <Modal
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
          props.setModalVisible(!props.modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={{ color: '#fff', fontSize: 18, marginLeft: 10, fontWeight: "bold", }}>New route</Text>
          <TextInput
            style={styles.input}
            value={routeNameTemp}
            onChangeText={setRouteNameTemp}
            placeholderTextColor="#fff"
          />
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 10 }}>
            <Pressable
              onPress={() => props.setModalVisible(!props.modalVisible)}
            >
              <Text style={styles.textCancel}>CANCEL</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                props.setModalVisible(!props.modalVisible);
                props.setRouteName(routeNameTemp)
                props.setPlaces([])
                props.setCourses([])
                props.setShowOptimizeBtn(true);
                props.setStops(0);
              }}
              style={{ marginLeft: 20 }}
            >
              <Text style={styles.textCancel}>ADD ROUTE</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={modalVisibleSetStart}
        onRequestClose={() => {
          props.setModalVisibleSetStart(!modalVisibleSetStart);
        }}
      >
        <View style={styles.modalView}>
          <Text style={{ color: '#fff', fontSize: 18, marginLeft: 10, fontWeight: "bold", }}>Select start and finish place</Text>
          <Picker
            selectedValue={startRoute}
            style={{ height: 60, width: "100%", borderWidth: 5, borderColor: "#ffffff", color: "#ffffff", fontSize: 18, backgroundColor: "#222B38"}}
            onValueChange={(itemValue) => setStartRoute(itemValue)} >
            {
              props.places.map((place, index) => {
                return <Picker.Item style={{backgroundColor: "#222B38" }} label={place.description} value={index} />
              })
            }
          </Picker>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 10 }}>
            <Pressable
              onPress={() => setModalVisibleSetStart(!modalVisibleSetStart)}
            >
              <Text style={styles.textCancel}>CANCEL</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setModalVisibleSetStart(false);
                setModalVisibleLoading(true)
                getDistanceMatrix()
                setStartRoute(0)
              }}
              style={{ marginLeft: 20 }}
            >
              <Text style={styles.textCancel}>SELECT</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={modalVisibleLoading}
        onRequestClose={() => {
          setModalVisibleLoading(!modalVisibleLoading);
        }}
      >
        <View style={styles.modalViewLoading}>
          <LottieView
            source={require('./../../assets/64935-map-icon.json')}
            autoPlay
            loop
          />
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{ color: 'white', fontSize: 20}}>Optimize Route</Text>
          </View>
        </View>
      </Modal>
    </View>  
  );
}
  
export default HomeScreen;


