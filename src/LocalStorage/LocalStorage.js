//import liraries
import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

  const  ClearAsyncStorage = async () => {
        AsyncStorage.clear();
    }

  const  SetToken = async (token) => {
        try {
            await AsyncStorage.setItem('@Authentication:Token', token);
        } catch (error) {
            console.log("Error saving data token", error);
        }
    };

  const  GetToken = async () => {
        try {
            const value = await AsyncStorage.getItem('@Authentication:Token');
            if (value !== null) {
                console.log(" Token Return", value);
                return value;
            }
        } catch (error) {
            console.log("Error get Token")
        }
    }

 


//make this component available to the app
export default {
    ClearAsyncStorage,
    SetToken,
    GetToken

};
