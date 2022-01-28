import React from "react";
import { View, StyleSheet, Text, TouchableHighlight, Pressable } from 'react-native';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import LaunchNavigator from 'react-native-launch-navigator';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

const DestinationRow = ({ place, id, showButtons, places, setPlaces, stops, setStops, circuitDistance, setCircuitDistance, circuitTime, setCircuitTime}) => {
  if (Platform.OS === "android"){
    LaunchNavigator.setGoogleApiKey("YOUR API KEY");
  }
  const openNavigation = () => {
    LaunchNavigator.navigate([place.coordinate.latitude, place.coordinate.longitude])
      .then(() => console.log("Launched navigator"))
      .catch((err) => console.error("Error launching navigator: " + err));
  }

  function icon() {
    if ((id == 0 || id == places.length - 1) && showButtons == false){
      return <IconFontAwesome name="flag-checkered" size={25} color="white" />;
    }
    return <IconEntypo name="location-pin" size={25} color="#2296F3" />
  }

  function getAddressNumber(){
    if ((id == 0 || id == places.length - 1) && showButtons == false){
      return null
    }
    return <Text style = { styles.idText } > { showButtons? id + 1 : id}</Text >
  }

  function getAddresName(){
    var info = place.description.split(", ")
    var addressName = ""
    for (var i = 0; i < info.length - 2; i++){
      addressName += info[i]
      if (i != info.length - 3)
        addressName += ", "
    }
    return addressName
  }

  function getCityCountry(){
    var cityCountry = place.description.split(", ")
    return cityCountry[cityCountry.length - 2] + " " + cityCountry[cityCountry.length - 1]
  }

  function deletePlace(){
    var arr = [...places]
    arr.splice(id, 1)
    setPlaces(arr)
  }

  function setDone(){
    var arr = [...places]
    arr[id]["isDone"] = true
    setCircuitDistance(circuitDistance - arr[id]["distance"])
    setCircuitTime(circuitTime - arr[id]["duration"])
    setPlaces(arr)
    setStops(stops + 1)
  }

  return (
    <View style={styles.container} key={id}>
      <View style={styles.pin}>
        {
          icon()
        }
        {
          getAddressNumber()
        }
      </View>
      <View style={styles.info}>
        <View style={styles.description}>
          <Text style={styles.name}>{ getAddresName() }</Text>
          <Text style={styles.city}>{ getCityCountry() }</Text>
        </View>
      {
          showButtons ? null : 
            (<View style={styles.buttons}>
              <TouchableHighlight onPress={openNavigation}>
                <View style={styles.navigationButton}>
                  <IconMaterialIcons name="navigation" size={20} color="white"/>
                  <Text style={{ fontSize: 16, color: "white"}}>Start</Text>
                </View>
              </TouchableHighlight>
              {
                places[id]["isDone"] ? null : (
                  <TouchableHighlight onPress={() => setDone()}>
                    <View style={styles.doneButton}>
                      <IconEntypo name="check" size={20} color="white" />
                      <Text style={{ fontSize: 16, color: "white" }}>Done</Text>
                    </View>
                  </TouchableHighlight>
                )
              }
            </View>)
      }
      </View>
      {
        showButtons ?
          (<Pressable style={{flex: 1}} onPress={() => deletePlace()}>
            <IconAntDesign name="closecircleo" size={20} color="#F9423A"  />
          </Pressable>) : null
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: '#424242',
    borderRadius: 10,
    marginTop: 5,
  },
  navigationButton: {
    flexDirection: "row",
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
    backgroundColor: "#2296F3",
    borderRadius: 20,
  },
  doneButton: {
    flexDirection: "row",
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
    backgroundColor: '#222222',
    borderColor: '#007E7D',
    borderWidth: 1,
    borderRadius: 20,
    marginLeft: 10
  },
  name: {
    color: "white",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },
  city: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
  },
  pin: {
    flex: 1,
    alignItems: 'center',
    padding: 10
  },
  buttons: {
    flexDirection: 'row',
    paddingBottom: 5
  },
  idText: {
    color: 'white',
  },
  description: {
    justifyContent: "space-around",
    alignItems: 'flex-start'
  },
  info: {
    flex: 10,
    
  }
});

export default DestinationRow;