import React from 'react';
import { createAppContainer } from 'react-navigation';
import Home from '../Screens/Home/home';
import Login from '../Screens/Login/login';
import { createStackNavigator } from 'react-navigation-stack';
import SplashScreen from '../Screens/Splash/splash';

const HomeStack = createStackNavigator({
    home: {
        screen: Home,
        navigationOptions: () => ({
            headerShown: false,
        }),
    }
}, {
    navigationOptions: () => ({
        headerShown: false
    }),
});
const AuthStack = createStackNavigator({
    login: {
        screen: Login,
        navigationOptions: () => ({
            headerShown: false
        }),
    },
}, {
    navigationOptions: () => ({
        headerShown: false
    }),
});


const Navigator = createStackNavigator({

    Splash: {
        screen: SplashScreen,
        navigationOptions: () => ({
            headerShown: false
        }),
    },
    Auth: AuthStack,
    Home: HomeStack

})
export default createAppContainer(Navigator);

