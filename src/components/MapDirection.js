import React, { useEffect, useRef, useState } from 'react'
import { Button, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { useSelector } from 'react-redux'
import { selectOrigin, selectDestination, selectTravelTimeInformation } from '../slices/navSlice'
import { GOOGLE_MAPS_APIKEY } from '@env'
import MapViewDirections from 'react-native-maps-directions'

const MapDirection = () => {
  const origin = useSelector(selectOrigin)
  const destination = useSelector(selectDestination)
  const mapRef = useRef()

  useEffect(() => {
    if (!origin || !destination) return
    //zoom & fit to markers
    mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }
    })
  }, [origin, destination])

  return (
    <View className='flex-1'>
      <MapView
        className='h-full'
        ref={mapRef}
        initialRegion={{
          latitude: origin.location[1],
          longitude: origin.location[0],
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        }}
      >
        <MapViewDirections
          origin={{ latitude: origin.location[1], longitude: origin.location[0] }}
          destination={{ latitude: destination.location[1], longitude: destination.location[0] }}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor='black'
        />

        {origin?.location && (
          <Marker
            coordinate={{
              latitude: origin.location[1],
              longitude: origin.location[0]
            }}
            title='Origin'
            description={origin.description}
            identifier='origin'
          />
        )}
        <Marker
          coordinate={{
            latitude: destination.location[1],
            longitude: destination.location[0]
          }}
          title='Destination'
          description={destination.description[0]}
          identifier='destination'
          pinColor='green'
        />
      </MapView>
    </View>
  )
}
export default MapDirection
