import React from 'react'
import { Button, Text, View } from 'react-native'
import MapView  from 'react-native-maps'
import { useSelector } from 'react-redux'
import { selectOrigin } from '../slices/navSlice'
function CarScreen({ navigation }) {
  const origin = useSelector(selectOrigin)
  console.log(origin.location[0],origin.location[1])
  return (



    <View className='flex-1 items-center  bg-white'>
          <MapView className='h-2/4 w-full'
    initialRegion={{
      latitude: origin.location[1],
      longitude: origin.location[0],
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
      }} />
      <Text>Choose Car</Text>
      <Button title='Go back' onPress={() => navigation.goBack()} />
    </View>
  )
}
export default CarScreen
