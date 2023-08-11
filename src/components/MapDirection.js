import React, { useEffect, useRef, useState } from 'react'
import { Button, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { useSelector } from 'react-redux'
import { selectOrigin, selectDestination, selectTravelTimeInformation } from '../slices/navSlice'
import { GOOGLE_MAPS_APIKEY } from '@env'
import MapViewDirections from 'react-native-maps-directions'
import { Polyline } from 'react-native-maps'

const MapDirection = () => {
  const origin = useSelector(selectOrigin)
  const destination = useSelector(selectDestination)
  const [show,setShow]=useState(false)
  const [data,setData]=useState([])
  const cor=([])
  console.log("MapDi"+origin?.location)
  console.log("MapDi"+destination?.location) 
  const mapRef = useRef()
  

  const getRoute = async () => {
    try {
      const response = await fetch(
        // `${baseURL}${queryOri}.json?${limit}&country=vn&${proximity}&access_token=${ACCESS_TOKEN}`
        'https://api.mapbox.com/directions/v5/mapbox/driving/106.653805,10.797979;106.677042,10.800118?access_token=pk.eyJ1IjoibHVvbmd2dXRoYWkxc3QiLCJhIjoiY2xrNDgza2NmMGZjMjNyczE3bjd1OXY5MCJ9.xbO5OpEwi_tGDto0LhGuHA'
      )
      const json = await response.json()
      setData(json.routes[0].legs[0].steps[0].intersections)
      console.log(data)
    } catch (error) {
      console.error(error)
    } finally {
      for(let r in data){
        cor.push(data[r].location)
      }
      console.log(cor)
    }
  }
  
  useEffect(() => {
    getRoute()

    console.log(data)
    if (!origin || !destination) return
    //zoom & fit to markers
    mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }
    }) 
  }, [origin, destination,show])


  return (
    <View className='flex-1'>
      <MapView
      ref={mapRef}
        className='h-full'
        mapType='mutedStandard'
        initialRegion={{
          latitude: origin?.location[1],
          longitude: origin?.location[0],
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        }}
      >
        {/* {origin &&destination&&(<MapViewDirections
          origin={{ latitude: origin.location[1], longitude: origin.location[0] }}
          destination={{ latitude: destination.location[1], longitude: destination.location[0] }}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor='black'
        />)} */}
         <Polyline
    coordinates={[
      {latitude: origin?.location[1],
        longitude: origin?.location[0],},
      { latitude: destination.location[1],
        longitude: destination.location[0]},

    ]}
    strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider

    strokeWidth={6}
  />

        {origin?.location && (
          <Marker
            onPress={()=>setShow(!show)}
            coordinate={{
              latitude: origin.location[1],
              longitude: origin.location[0]
            }}
            title='Origin'
            description={origin.description}
            identifier='origin'
          />
        )}
        {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location[1],
            longitude: destination.location[0]
          }}
          title='Destination'
          description={destination.description[0]}
          identifier='destination'
          pinColor='green'
        />)}
      </MapView>
    </View>
  )
}
export default MapDirection
