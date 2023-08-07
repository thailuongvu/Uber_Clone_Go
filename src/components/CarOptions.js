import React,{useState,useEffect} from 'react'
import { ACCESS_TOKEN } from '@env'
import { ScrollView, View,StyleSheet,FlatList,ActivityIndicator,Text, TextInput, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { setDestination, setOrigin } from '../slices/navSlice'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectOrigin,selectDestination } from '../slices/navSlice'

const CarOptions = () => {
  const origin = useSelector(selectOrigin)
  const destination = useSelector(selectDestination)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');


  const getCar = async () => {

    const baseURL = 'https://api.mapbox.com/directions/v5/mapbox/driving/'
    const desQuery=destination.location[0]+','+origin.location[1]
    const oriQuery=origin.location[0]+','+destination.location[1]
    try {
      const response = await fetch(`${baseURL}${oriQuery};${desQuery}.json?access_token=${ACCESS_TOKEN}`);
      const json = await response.json();
      setData(json.routes);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCar();
  });

  return (
    
    <View classname='flex-1'>

        <View className='p-2 pl-6 pb-2 pt-2 bg-gray-300 m-2 flex-row'>
            <View className='mt-1'>
                <Text>{data.distance}</Text>
            </View>
           
        </View>

       

    </View>
  )
}

export default CarOptions

