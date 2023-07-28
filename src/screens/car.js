import React from 'react'
import { Button, Text, View } from 'react-native'
import MapView  from 'react-native-maps'
import { useSelector } from 'react-redux'
import { selectOrigin } from '../slices/navSlice'
function CarScreen({ navigation }) {
  const origin = useSelector(selectOrigin)
  return (



    <View className='flex-1 items-center  bg-white'>
          <MapView className='h-2/4 w-full'
    initialRegion={{
      latitude: origin.location.lat,
      longitude: origin.location.lng,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
      }} />
      <Text>Choose Car</Text>
      <Button title='Go back' onPress={() => navigation.goBack()} />
    </View>
  )
}
export default CarScreen
