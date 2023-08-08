import React,{useState} from 'react'
import { Button, Text, View,TouchableOpacity,Image,FlatList } from 'react-native'
import MapView, { Marker }  from 'react-native-maps'
import { useSelector } from 'react-redux'
import { selectOrigin,selectDestination,selectTravelTimeInformation } from '../slices/navSlice'
import {GOOGLE_MAPS_APIKEY} from '@env'
import MapViewDirections from 'react-native-maps-directions'
import CarSelected from '../components/CarSelected'

const data=[
  {
    id:'Uber-X-123',
    title:'Uber X',
    multiplier:1,
    image:'https://links.papareact.com/3pn',
  },
  {
    id:'Uber-XL-456',
    title:'Uber XL',
    multiplier:1.2,
    image:'https://links.papareact.com/5w8',
  },
  {
    id:'Uber-LUX-789',
    title:'Uber LUX',
    multiplier:1.75,
    image:'https://links.papareact.com/7pf',
  }
]

function CarScreen({ navigation }) {
  const origin = useSelector(selectOrigin)
  const destination = useSelector(selectDestination)
  return (
    <View className='flex-1'>
      <View className='h-1/2'>
            <MapView className='h-full'
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
       
      </View>
      
      <View className='h-1/2'>
        <CarSelected/>
      </View>
     
    </View>
  )
}
export default CarScreen
