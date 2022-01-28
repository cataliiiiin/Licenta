import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable, Modal, TextInput } from 'react-native';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as DBFunctions from "../../../backend/dbFunction";
import {getUniqueCircuitName} from "./../../screens/Home/functions";
import { getUniqueId } from 'react-native-device-info';

const FinishRow = ({ places, setPlaces, setShowOptimizeBtn, setTime, routeName, setRouteName, setCourses, circuits}) => {
  const [modalVisibleSetRouteName, setModalVisibleSetRouteName] = useState(false);

  function saveRoute(){
    var arr = [...places]
    for(var i = 0; i < arr.length; i++){
      delete arr[i]["isDone"]
      delete arr[i]["distance"]
      delete arr[i]["duration"]
    }
    arr.pop()
    var uniqueNmae = getUniqueCircuitName(routeName, circuits)
    DBFunctions.insertCircuit(getUniqueId(), uniqueNmae, arr)
  }

  function resetValues(){
    setRouteName("")
    setTime(0)
    setPlaces([])
    setCourses([])
    setShowOptimizeBtn(true)
  }

  function finishRoute(){
    if(routeName == "")
    {
      setModalVisibleSetRouteName(true);
    }else{
      saveRoute();
      resetValues();
    }
  }

  return (
    <View style={styles.container}>
      <View style={{}}>
        <Pressable onPress={() => finishRoute()}>
          <View style={styles.button}>
            <IconFontAwesome5 name="flag-checkered" size={20} color="white" />
            <Text style={styles.text}>Finish route</Text>
          </View>
        </Pressable>
      </View>
      <Modal
        transparent={true}
        visible={modalVisibleSetRouteName}
        onRequestClose={() => {
          setModalVisibleSetRouteName(!modalVisibleSetRouteName);
        }}
      >
        <View style={styles.modalView}>
          <Text style={{ color: '#fff', fontSize: 18, marginLeft: 10, fontWeight: "bold", }}>Set the route name for saving it</Text>
          <TextInput
            style={styles.input}
            value={routeName}
            onChangeText={setRouteName}
            placeholderTextColor="#fff"
          />
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 10 }}>
            <Pressable
              onPress={() => {
                setModalVisibleSetRouteName(!modalVisibleSetRouteName)
                resetValues()
            }}
            >
              <Text style={styles.textCancel}>DO NOT SAVE</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                if (routeName != "")
                {
                  setModalVisibleSetRouteName(!modalVisibleSetRouteName);
                  resetValues();
                  saveRoute();
                }
              }}
              style={{ marginLeft: 20 }}
            >
              <Text style={styles.textCancel}>SAVE ROUTE</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: 'space-around',
    borderRadius: 10,
    paddingVertical: 10
  },
  text: {
    fontSize: 23, 
    color: "white", 
    marginLeft: 7
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
    backgroundColor: "#31C110",
    borderRadius: 20,
  },
  modalView: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: '50%',
    backgroundColor: "grey",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  input: {
    height: 40,
    borderColor: '#fff',
    borderRadius: 10,
    borderWidth: 59,
    color: '#fff',
    backgroundColor: '#18191A',
    fontSize: 17,
    margin: 10,
    borderWidth: 1,
  },
  textCancel: {
    color: "#0AB9EE",
    fontWeight: "bold",
    textAlign: 'right'
  },
});

export default FinishRow;