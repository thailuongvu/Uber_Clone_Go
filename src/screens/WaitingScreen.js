import React, { useEffect, useRef, useState } from 'react'
import { Button, Text, View, TouchableOpacity, Image, FlatList, SafeAreaView, StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import MapDirection from '../components/MapDirection'
import { selectOrigin, selectDestination, selectTravelTimeInformation } from '../slices/navSlice'
import WaitingAccept from '../components/WaitingAccept'

const WaitingScreen = () => {
  const navigation = useNavigation()
  const origin = useSelector(selectOrigin)
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: origin?.location[1],
          longitude: origin?.location[0],
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        }}
      >
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
      </MapView>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialIcon className='mx-5 my-10' name='arrow-back-ios' size={37} color='black' />
      </TouchableOpacity>
      <View className='border-solid border-2 mx-2 absolute bottom-5 left-0 right-0 bg-[#eff8f3] '>
        <WaitingAccept />
      </View>
      {/* Other components */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
})
export default WaitingScreen
{
  /* <TouchableOpacity onPress={() => navigation.goBack()}>
<MaterialIcon className='mx-5 my-10' name='arrow-back-ios' size={37} color='black' />
</TouchableOpacity> */
}
