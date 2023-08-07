import React from 'react'
import { Button, Text, View } from 'react-native'
import MapView, { Marker }  from 'react-native-maps'
import { useSelector } from 'react-redux'
import { selectOrigin,selectDestination } from '../slices/navSlice'
import {GOOGLE_MAPS_APIKEY} from '@env'
import MapViewDirections from 'react-native-maps-directions'
import CarOptions from '../components/CarOptions'

function CarScreen({ navigation }) {
  const origin = useSelector(selectOrigin)
  const destination = useSelector(selectDestination)
  console.log(origin.location[1],origin.location[0])
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
         origin={{latitude: origin.location[1],
          longitude: origin.location[0]}}
         destination={{latitude:destination.location[1] ,
          longitude:destination.location[0] }}
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
      <Marker
         coordinate={{
          latitude:destination.location[1],
          longitude:destination.location[0],

        }}
          title='Destination'
          description={destination.description[0]}
          identifier='Destination'
          pinColor='green'
        />
      </MapView>
      <CarOptions />
      <Button title='Go back' onPress={() => navigation.goBack()} />

    </View>
  )
}
export default CarScreen
