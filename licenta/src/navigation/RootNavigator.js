import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import SearchPlaceScreen from '../screens/SearchPlace';

const Stack = createStackNavigator();

const RootNavigator = (props) => {
  return (
      <Stack.Navigator 
        screenOptions={{ headerShown: false }} 
        initialRouteName={"Home"}
      >

        <Stack.Screen name="Home">
        {prop => <HomeScreen {...prop} 
          routeName={props.routeName} setRouteName={props.setRouteName}
          places={props.places} setPlaces={props.setPlaces}
          courses={props.courses} setCourses={props.setCourses}
          circuits={props.circuits}
          modalVisible={props.modalVisible} setModalVisible={props.setModalVisible}
          time={props.time} setTime={props.setTime}
          stops={props.stops} setStops={props.setStops}
          showOptimizeBtn={props.showOptimizeBtn} setShowOptimizeBtn={props.setShowOptimizeBtn}
          distance={props.distance} setDistance={props.setDistance}
          theme={props.theme} setTheme={props.setTheme}
          nrMinutes={props.nrMinutes} setNrMinutes={props.setNrMinutes}
        />}
        </Stack.Screen>
        <Stack.Screen name="SearchPlace" component={SearchPlaceScreen} />
      </Stack.Navigator>
  );
}
export default RootNavigator;
