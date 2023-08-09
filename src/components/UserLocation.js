import React, { useState, useEffect } from 'react'
import { Platform, Text, View, StyleSheet } from 'react-native'
import * as Location from 'expo-location'

export default function UserLocation() {
  const [location, setLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    ;(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        return
      }

      let curlocation = await Location.getCurrentPositionAsync({})
      setLocation(curlocation)
      console.log(curlocation)
    })()
  }, [])

  console.log(location)
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  paragraph: {
    fontSize: 10,
    textAlign: 'center'
  }
})
