import React from 'react';
//import MapboxGL from '@react-native-mapbox-gl/maps';
import{View,Text,StyleSheet} from 'react-native';
import{ACCESS_TOKEN} from '@env'


const MapDirection = () => {
    const origin = [-122.406417, 37.785834]; // San Francisco, CA
    const destination = [-122.419416, 37.774929]; // Oakland, CA
    return(
         
                <MapboxGL.MapView
        style={{flex: 1}}
        logoEnabled={false}
        compassEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
        scrollEnabled={true}
        attributionEnabled={false}
        region={{
            latitude: 37.785834,
            longitude: -122.406417,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
        }}>
        </MapboxGL.MapView>
        // <MapboxGL.MapView>
        //     <MapboxGL.Directions
        //         origin={origin}
        //         destination={destination}
        //         apiBaseUrl={'https://api.mapbox.com'}
        //         apiVersion={'v1'}
        //         accessToken={ACCESS_TOKEN}
        //     />
        // </MapboxGL.MapView>
         

    )

}
export default MapDirection;