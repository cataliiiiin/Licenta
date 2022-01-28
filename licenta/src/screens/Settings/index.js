import React, { useState} from "react";
import { View, Text, StyleSheet, Pressable, Modal, Alert, TextInput} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { RadioButton} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { updateUserSettings } from "./../../../backend/dbFunction"
import { getUniqueId } from 'react-native-device-info';

const SettingsScreen = (props) => {
  const navigation = useNavigation();
  const [time, setTime] = useState(props.nrMinutes);
  const [distanceModalVisible, setDistanceModalVisible] = useState(false);
  const [themeModalVisible, setThemeModalVisible] = useState(false);
  const [timeModalVisible, setTimeModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => {
            updateUserSettings(getUniqueId(), props.distance, props.theme, props.nrMinutes);
            navigation.goBack()
          }
        }>
          <Icon name="arrow-back" size={30} color="#767676" />
        </Pressable>
        <Text style={{color: '#fff', fontSize: 25, marginLeft: 20}}>
          Settings
        </Text>
      </View>
      <View style={styles.settings}>

        <View style={styles.item}>
          <Text style={styles.titleItem}>Units</Text>

          <Pressable onPress={() => setDistanceModalVisible(true)} style={{marginTop: 5, marginBottom: 5}}>
            <Text style={{ color: '#fff', fontSize: 18, marginLeft: 10 }}>Distance unit</Text>
            <Text style={{ color: '#767676', fontSize: 15, marginLeft: 10 }}>{props.distance}</Text>
          </Pressable>
          
        </View>

        <View style={styles.item}>
          <Text style={styles.titleItem}>General Preferences</Text>

          <Pressable onPress={() => setThemeModalVisible(true)} style={{ marginTop: 5, marginBottom: 5 }}>
            <Text style={{ color: '#fff', fontSize: 18, marginLeft: 10 }}>Theme</Text>
            <Text style={{ color: '#767676', fontSize: 15, marginLeft: 10 }}>{props.theme}</Text>
          </Pressable>

          <Pressable onPress={() => setTimeModalVisible(true)} style={{ marginTop: 5, marginBottom: 5 }}>
            <Text style={{ color: '#fff', fontSize: 18, marginLeft: 10 }}>Average time at stop</Text>
            <Text style={{ color: '#767676', fontSize: 15, marginLeft: 10 }}>{props.nrMinutes} min</Text>
          </Pressable>

        </View>

      </View>
      <Modal
        transparent={true}
        visible={distanceModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setDistanceModalVisible(!distanceModalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={{ color: '#fff', fontSize: 18, marginLeft: 10, fontWeight: "bold",}}>Distnace Unit</Text>
          <RadioButton.Group onValueChange={newValue => props.setDistance(newValue)} value={props.distance}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton value="Kilometers" />
                <Text style={{color: '#fff'}}>Kilometers</Text>
              </View>
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton value="Miles" />
              <Text style={{ color: '#fff' }}>Miles</Text>
              </View>
            </RadioButton.Group>
          <Pressable
            onPress={() => setDistanceModalVisible(!distanceModalVisible)}
          >
            <Text style={styles.textCancel}>CANCEL</Text>
          </Pressable>
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={themeModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setThemeModalVisible(!themeModalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={{ color: '#fff', fontSize: 18, marginLeft: 10, fontWeight: "bold", }}>Theme</Text>
          <RadioButton.Group onValueChange={newValue => props.setTheme(newValue)} value={props.theme}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton value="Dark" />
              <Text style={{ color: '#fff' }}>Dark</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton value="Light" />
              <Text style={{ color: '#fff' }}>Light</Text>
            </View>
          </RadioButton.Group>
          <Pressable
            onPress={() => setThemeModalVisible(!themeModalVisible)}
          >
            <Text style={styles.textCancel}>CANCEL</Text>
          </Pressable>
        </View>
      </Modal>
      
      <Modal
        transparent={true}
        visible={timeModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setTimeModalVisible(!timeModalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={{ color: '#fff', fontSize: 18, marginLeft: 10, fontWeight: "bold", }}>Average time at stop</Text>
          <TextInput
            style={styles.input}
            onChangeText={setTime}
            placeholder="Time in minutes"
            placeholderTextColor="#fff"
            keyboardType="numeric"
          />
          <View style={{flexDirection: 'row', justifyContent: 'flex-end', padding: 10}}>
            <Pressable
              onPress={() => setTimeModalVisible(!timeModalVisible)}
              style={{ marginRight: 20 }}
            >
              <Text style={styles.textCancel}>CANCEL</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                props.setNrMinutes(time)
                setTimeModalVisible(!timeModalVisible)
              }}
            >
              <Text style={styles.textCancel}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18191A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#767676',
  },
  input: {
    height: 40,
    borderColor: '#fff',
    borderRadius: 10,
    borderWidth: 59,
    color: '#fff',
    backgroundColor: '#18191A',
    fontSize: 17,
    margin: 12,
    borderWidth: 1,
    textAlign: 'center'
  },
  item: {
    paddingLeft: 10,
    marginTop: 10,
    borderBottomWidth: 1,
    borderColor: '#767676',
  },
  titleItem: {
    color: '#767676',
    fontSize: 15,
    marginLeft: 10

  },
  placeholderTextColor: {
    color: 'black',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: '80%',
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
  textCancel: {
    color: "#0AB9EE",
    fontWeight: "bold",
    textAlign: 'right'
  },
});

export default SettingsScreen;
