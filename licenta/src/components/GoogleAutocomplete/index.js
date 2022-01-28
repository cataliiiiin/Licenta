import React from "react";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const GoogleAutocomplete = (props) => {
  return (
    <GooglePlacesAutocomplete
      ref={ref}
      placeholder='Search'
      style={{
        flexDirection: 'row',
        position: 'absolute',
        padding: '5%'
      }}
      onPress={(data, details = null) => {
        const place = {
          description: data.description,
          coordinate: {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng
          }
        };
        setPlaces(prev => [...prev, place]);
        ref.current?.setAddressText('');
      }}
      fetchDetails={true}
      query={{
        key: 'YOUR API KEY',
        language: 'en',
      }}
      GooglePlacesSearchQuery={{
        rankby: 'distance',
      }}
    />
  );
};

export default GoogleAutocomplete;