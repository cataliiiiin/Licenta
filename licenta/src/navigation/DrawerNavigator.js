import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SettingsScreen from '../screens/Settings';
import RootNavigator from './RootNavigator';
import DrawerCustomMenu from './../components/DrawerCustomMenu/index';
import { getUniqueId } from 'react-native-device-info';
import { getAllUserCircuits, getUserSettings } from "./../../backend/dbFunction"

const Drawer = createDrawerNavigator();

const DrawerMenu = () => {

  const [routeName, setRouteName] = useState("");
  const [places, setPlaces] = useState([]);
  const [courses, setCourses] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [circuits, setCircuits] = useState([]);
  const [stops, setStops] = useState(0);
  const [time, setTime] = useState(0);
  const [modalVisibleRenameRoute, setModalVisibleRenameRoute] = useState(false);
  const [modalVisibleDeleteRoute, setModalVisibleDeleteRoute] = useState(false);
  const [renameRoute, setRenameRoute] = useState("");
  const [showOptimizeBtn, setShowOptimizeBtn] = useState(true);
  const [distance, setDistance] = useState('Kilometers');
  const [theme, setTheme] = useState('Dark');
  const [nrMinutes, setNrMinutes] = useState(0)


  useEffect(() => {
    getAllUserCircuits(getUniqueId(), setCircuits)
    getUserSettings(getUniqueId(), setDistance, setTheme, setNrMinutes)
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => (<DrawerCustomMenu {...props}
        routeName={routeName} setRouteName={setRouteName}
        places={places} setPlaces={setPlaces}
        stops={stops} setStops={setStops}
        courses={courses} setCourses={setCourses}
        modalVisible={modalVisible} setModalVisible={setModalVisible}
        circuits={circuits} setCircuits={setCircuits}
        modalVisibleRenameRoute={modalVisibleRenameRoute} setModalVisibleRenameRoute={setModalVisibleRenameRoute}
        modalVisibleDeleteRoute={modalVisibleDeleteRoute} setModalVisibleDeleteRoute={setModalVisibleDeleteRoute}
        renameRoute={renameRoute} setRenameRoute={setRenameRoute}
        showOptimizeBtn={showOptimizeBtn} setShowOptimizeBtn={setShowOptimizeBtn}
        distance={distance} setDistance={setDistance}
        theme={theme} setTheme={setTheme}
        nrMinutes={nrMinutes} setNrMinutes={setNrMinutes}
      />)}
      style={{color: 'blue'}}
      >
        <Drawer.Screen name="Home">
          {props => <RootNavigator {...props}
            routeName={routeName} setRouteName={setRouteName}
            places={places} setPlaces={setPlaces}
            courses={courses} setCourses={setCourses}
            circuits={circuits}
            modalVisible={modalVisible} setModalVisible={setModalVisible}
            time={time} setTime={setTime}
            stops={stops} setStops={setStops}
            showOptimizeBtn={showOptimizeBtn} setShowOptimizeBtn={setShowOptimizeBtn}
            distance={distance} setDistance={setDistance}
            theme={theme} setTheme={setTheme}
            nrMinutes={nrMinutes} setNrMinutes={setNrMinutes}
          />}
        </Drawer.Screen>
        <Drawer.Screen name="Settings">
          {props => <SettingsScreen 
            distance={distance} setDistance={setDistance}
            theme={theme} setTheme={setTheme}
            nrMinutes={nrMinutes} setNrMinutes={setNrMinutes}
          />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
export default DrawerMenu;
