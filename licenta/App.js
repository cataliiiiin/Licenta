/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {View} from 'react-native';
import DrawerNavigator from './src/navigation/DrawerNavigator';

navigator.geolocation = require('@react-native-community/geolocation');

const App: () => Node = () => (
  <View style={{flex: 1}}>
    <DrawerNavigator />
  </View>
);

export default App;
