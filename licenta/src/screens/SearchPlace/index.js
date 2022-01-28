import React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/Ionicons';
import { Pressable } from "react-native";
import PlaceRow from './../../components/PlaceRow';
import { useNavigation, useRoute } from '@react-navigation/native';

const SearchPlace = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <GooglePlacesAutocomplete
          placeholder='Search place'
          onPress={(data, details = null) => {
            const place = {
              description: details.formatted_address,
              coordinate: {
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng
              }
            };

            if (route.params.showOptimizeBtn == false){
              route.params.setShowOptimizeBtn(true)
            }
            route.params.setStops(0)
            route.params.setPlaces(prev => [...prev, place]);
            navigation.navigate('Home', { places: route.params.places})
          }}
          fetchDetails={true}
          suppressDefaultStyles
          query={{
            key: 'YOUR API KEY',
            language: 'en',
          }}
          GooglePlacesSearchQuery={{
            rankby: 'distance',
          }}
          styles={{
            container: {
              flex: 1,
            },
            textInputContainer: {
              flexDirection: 'row',
            },
            textInput: {
              backgroundColor: '#767676',
              width: '100%',
              color: 'white',
              borderRadius: 0,
              paddingLeft: 60,
              height: 70,
              fontSize: 20,
            },
            poweredContainer: {
              backgroundColor: '#202020',
              justifyContent: 'flex-end',
              alignItems: 'center',
              borderTopWidth: 0,
            },
          }}
          renderRow={(data) => <PlaceRow data={data} />}
        />
        <Pressable onPress={() => navigation.navigate('Home')} style={styles.presseble}>
          <Icon name="arrow-back" size={30} color="white" style={styles.icon} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#202020',

  },
  presseble: {
    position: 'absolute', 
    height: 70, 
    width: 55, 
    justifyContent: 'center', 
    alignItems: 'center',
    
  },
  icon: {

  }
});


export default SearchPlace;