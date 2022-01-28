import React from "react";
import { View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PlaceRow = ({ data }) => {
  const getName = (data) =>{
    return data.split(", ")[0]
  } 
  const getRegion = (data) => {
    list = data.split(", ")
    res = ""
    for (i = 1; i < list.length - 1; i++)
      res += list[i] + ", "
    res += list[i]
    return res
  }

  return (
    <View style={styles.container}>
      <Icon name="map-marker-plus-outline" size={30} style={styles.icon} />
      <View>
        <Text style={styles.name}>{getName(data.description)}</Text>
        <Text style={styles.region}>{getRegion(data.description)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  icon: {
    color: '#767676',

  },
  name: {
    color: '#fff',
    fontSize: 17,
    marginLeft: 20
  },
  region: {
    color: '#fff',
    fontSize: 13,
    marginLeft: 20
  },
});

export default PlaceRow;