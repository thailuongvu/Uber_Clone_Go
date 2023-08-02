import React from 'react'
import { Button, Text, View } from 'react-native'
import MapView, { Marker }  from 'react-native-maps'
import { useSelector } from 'react-redux'
import { selectOrigin,selectDestination } from '../slices/navSlice'
import {GOOGLE_MAPS_APIKEY} from '@env'
function CarScreen({ navigation }) {
  const origin = useSelector(selectOrigin)
  const destination = useSelector(selectDestination)
  console.log(origin.location[0],origin.location[1])
  return (



    <View className='flex-1 items-center  bg-white'>
          <MapView className='h-2/4 w-full'
    initialRegion={{
      latitude: origin.location[1],
      longitude: origin.location[0],
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
      }} >

        <MapViewDirections 
         origin={origin.location}
         destination={destination.location}
         apikey={GOOGLE_MAPS_APIKEY}
         strokeWidth={3}
         strokeColor='black'/>

   
      {origin?.location && (
        <Marker
         coordinate={{
          latitude:origin.location[1],
          longitude:origin.location[0],

        }}
          title='Origin'
          description={origin.description}
          identifier='origin'
        /> 

        
      )}
      </MapView>
      <Text>Choose Car</Text>
      <Button title='Go back' onPress={() => navigation.goBack()} />
    </View>
  )
}
export default CarScreen
