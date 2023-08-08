import React,{useState,useEffect} from 'react'
import { ACCESS_TOKEN } from '@env'
import { ScrollView, View,StyleSheet,FlatList,ActivityIndicator,Text, TextInput, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { setTravelTimeInformation } from '../slices/navSlice'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectOrigin,selectDestination } from '../slices/navSlice'


const DistanceMatrix = () => {
  const origin = useSelector(selectOrigin)
  const destination = useSelector(selectDestination)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');


  const getDistance = async () => {

    const baseURL = 'https://api.mapbox.com/directions/v5/mapbox/driving/'
    const desQuery=destination.location[0]+','+destination.location[1]||'106.653805,10.797979'
    const oriQuery=origin.location[0]+','+origin.location[1]||'106.653805,10.797980'
    console.log(oriQuery)
    console.log(desQuery)
    // try {
    //   const response = await fetch(`${baseURL}${oriQuery};${desQuery}.json?access_token=${ACCESS_TOKEN}`);
    //   const json = await response.json();
     
    //   dispatch(setTravelTimeInformation(data.routes));
    // } catch (error) {
    //   console.error(error);
    // } finally {
      
    // }
    fetch(`${baseURL}${oriQuery};${desQuery}.json?access_token=${ACCESS_TOKEN}`)
    .then((res) => res.json())
    .then(data=>{dispatch(setTravelTimeInformation(data.routes[0]))})
  };

  

  useEffect(() => {
    getDistance();
  }, [origin,destination]);

console.log(data[0])
  return (
    
    <View classname='flex-1'>
    </View>
  )
}

export default DistanceMatrix

