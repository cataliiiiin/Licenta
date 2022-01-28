import React from "react";
import MapView, { PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';



const GoogleMap = ({ places, courses, mapRef}) => {
  const GOOGLE_MAPS_APIKEY = 'YOUR API KEY';
  const mapStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#263c3f"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6b9a76"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#38414e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#212a37"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9ca5b3"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#1f2835"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#f3d19c"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2f3948"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#515c6d"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    }
  ];
  return (
    <MapView
      style={{ height: '100%', width: '100%' }}
      provider={PROVIDER_GOOGLE}
      customMapStyle={mapStyle}
      showsUserLocation={true}
      initialRegion={{
        latitude: 47.156419,
        longitude: 27.603540,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      ref={mapRef}
    >
      {
        places.map((place, index) => {
          return <Marker key={index + 1}
            pinColor={'#2296F3'}
            coordinate={place.coordinate}
            image={require('../../assets/pin.png')}
            style={{ width: 26, height: 28 }}
            resizeMode="contain"
            title={(index != 0) ? index.toString() : "Start"}
            description={place.description}
          />
        })
      }
      {
        courses.map((route, index) => {
          return <MapViewDirections
            key={index + 1}
            origin={route.origin}
            destination={route.destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            strokeColor="dodgerblue"
          />
        })
      }

    </MapView>
  );
};



export default GoogleMap;