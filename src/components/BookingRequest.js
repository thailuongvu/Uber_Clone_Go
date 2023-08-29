import React from 'react';
import { BASE_URL } from '../../config'
import { AuthContext } from '../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

const BookingRequest = async () => {
    let profileuser = await AsyncStorage.getItem("profile");
    profileuser = JSON.parse(profileuser);
    const phone = profileuser.phone;
    const name = profileuser.name;
    const pickupLocation = profileuser.pickupLocation;
    const destination = profileuser.destination;
    console.log(profileuser.phone)
    if (
        phone.length !== 10 ||
        name.length === 0 ||
        pickupLocation.length === 0 ||
        destination.length === 0 ||
        typeVehicle.length === 0
     
    ) {
        alert('Your information is not valid!');
    } else {
        const data = {
            pickupLocation: 'Hanoi',
            destination: "hcm",
            name: 'thai',
            phone: '0123456789',
            typeVehicle: 'car',
        };
        fetch(`${BASE_URL}/booking/booking-service`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.access_token}`,
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('response');
                console.log(data.message);
                setBookingSuccess(true);
                AsyncStorage.setItem('bookingSuccess', JSON.stringify(true));
            })
            .catch((error) => {
                console.error(error);
                alert('Error!');
            });
    }
};
export default BookingRequest;