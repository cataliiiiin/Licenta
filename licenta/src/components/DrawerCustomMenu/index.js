import React, { useRef} from 'react';
import { View, Text, Pressable, StyleSheet, UIManager, findNodeHandle,  ScrollView, Modal, TextInput} from 'react-native';
import {DrawerContentScrollView, DrawerItem}from '@react-navigation/drawer';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconSimple from 'react-native-vector-icons/SimpleLineIcons';
import { Drawer } from 'react-native-paper';
import { renameCircuit, deleteCircuit } from "./../../../backend/dbFunction";
import { getUniqueCircuitName } from "./../../screens/Home/functions";

var selectedItem = null;

const DrawerCustomMenu = (props) => {
  let references = []
  for (var i = 0; i < props.circuits.length; i++){
    references.push(useRef());
  }
  const showMenu = (index) => {
    selectedItem = index
    UIManager.showPopupMenu(
      findNodeHandle(references[index].current),
      ['Rename', 'Delete'],
      showError,
      showAction
    )
  } 

  const showError = () => {
    console.log('Popup Error')
  }
  const onRename = () => {
    props.setRenameRoute(props.circuits[selectedItem]["name"])
    props.setModalVisibleRenameRoute(!props.modalVisibleRenameRoute);
  }
  
  const onDelete = () => {
    props.setModalVisibleDeleteRoute(!props.modalVisibleDeleteRoute);
  }

  const showAction = (eventName, index) => {
    if (eventName !== 'itemSelected') return
    if (index === 0) 
      onRename()
    else
      onDelete()
  }
  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: 'black', paddingHorizontal: 5 }}>
      <View style={{ fontSize: 30 }}>
        <Text style={{ fontSize: 30, color: 'white', borderBottomWidth: 1, borderColor: '#fff' }}>Menu</Text>
      </View>
      <Drawer.Section style={{ borderBottomWidth: 1, borderColor: '#fff' }}>
        <DrawerItem
          icon={() => (
            <IconSimple
            name="home" 
            size={20} 
            color="#2296F3"
            />
          )}
          label="Home"
          onPress={() => props.navigation.navigate('Home')}
          style={{ backgroundColor: '#fff'}}
        />
        <DrawerItem
          icon={() => (
            <IconSimple
              name="plus"
              size={20}
              color="#2296F3"
            />
          )}
          label="New Route"
          onPress={() => {
            props.navigation.closeDrawer()
            props.setModalVisible(true);
          }}
          style={{ backgroundColor: '#fff' }}
        />
        <DrawerItem
          icon={() => (
            <IconSimple
              name="settings"
              size={20}
              color="#2296F3"
            />
          )}
          label="Settings"
          onPress={() => props.navigation.navigate('Settings')}
          style={{ backgroundColor: '#fff' }}
        />
      </Drawer.Section>

      <Text style={{ fontSize: 18, color: 'white' }}>My Routes</Text>
      <ScrollView style={{ fontSize: 30 }}>
        {
          props.circuits.map((circuit, index) => {
            return <View style={styles.routeItem} key={index}>
                      <Pressable onPress={() => {
                        props.navigation.closeDrawer();
                        props.setCourses([])
                        props.setRouteName(circuit.name);
                        props.setPlaces(circuit.places);
                        props.setShowOptimizeBtn(true);
                        props.setStops(0);
                      }} 
                      style={styles.route}
                      >
                          <IconFontAwesome5 name="route" size={20} color="#2296F3" />
                          <Text style={styles.routeName}>{circuit.name}</Text>
                      </Pressable>
                      <Pressable onPress={() => showMenu(index)} style={styles.editIcon}>
                        <IconEntypo ref={references[index]} name="dots-three-vertical" size={20} color="#2296F3" />
                      </Pressable>
                    </View>
          })
        }
      </ScrollView>
      <Modal
        transparent={true}
        visible={props.modalVisibleRenameRoute}
        onRequestClose={() => {
          props.setModalVisibleRenameRoute(!props.modalVisibleRenameRoute);
        }}
      >
        <View style={styles.modalView}>
          <Text style={{ color: '#fff', fontSize: 18, marginLeft: 10, fontWeight: "bold", }}>Rename route</Text>
          <TextInput
            style={styles.input}
            value={props.renameRoute}
            onChangeText={props.setRenameRoute}
            placeholderTextColor="#fff"
          />
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 10 }}>
            <Pressable
              onPress={() => {
                props.setModalVisibleRenameRoute(!props.modalVisibleRenameRoute)

              }}
            >
              <Text style={styles.textCancel}>CANCEL</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                let cicuitId = props.circuits[selectedItem]["_id"]
                var uniqueName = getUniqueCircuitName(props.renameRoute, props.circuits)
                renameCircuit(props.circuits[selectedItem]["_id"], uniqueName)
                props.setCircuits(props.circuits.map((circuit) => {
                  if (circuit._id === cicuitId) {
                    circuit.name = uniqueName
                    return circuit
                  }
                  return circuit
                }))
                props.setModalVisibleRenameRoute(!props.modalVisibleRenameRoute);
              }}
              style={{ marginLeft: 20 }}
            >
              <Text style={styles.textCancel}>RENAME</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={props.modalVisibleDeleteRoute}
        onRequestClose={() => {
          props.setModalVisibleDeleteRoute(!props.modalVisibleDeleteRoute);
        }}
      >
        <View style={styles.modalView}>
          <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>Are you sure you want to delete the route?</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
            <Pressable
              onPress={() => {
                props.setModalVisibleDeleteRoute(!props.modalVisibleDeleteRoute)
              }}
            >
              <Text style={styles.textDelete}>No</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                deleteCircuit(props.circuits[selectedItem]["_id"])
                props.setModalVisibleDeleteRoute(!props.modalVisibleDeleteRoute)
              }}
              style={{ marginLeft: 20 }}
            >
              <Text style={styles.textDelete}>Yes</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </DrawerContentScrollView>
  );
}
const styles = StyleSheet.create({
  route: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5
  }
  ,
  routeIcon: {
    
  },
  routeName: {
    marginLeft: 10,
    marginRight: 20,
    color: '#fff',
    fontSize: 17
  },
  editIcon: {
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },

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
      textAlign: 'left'
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
    textDelete: { 
      textAlign: 'center', 
      fontWeight: "bold", 
      fontSize: 20, 
      color: "#0AB9EE"
    }

});

export default DrawerCustomMenu;
