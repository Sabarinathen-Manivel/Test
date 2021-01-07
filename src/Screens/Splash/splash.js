//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions,Image } from 'react-native';
import BackgroundImage from '../../../assets/theme.png';

import { StackActions, NavigationActions } from 'react-navigation';

const LoginAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Auth' })],
});
const HomeAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Home' })],
});
// create a component
class SplashScreen extends Component {

    constructor(props)
    {
        super(props);
    }

    componentDidMount()
    {
        setTimeout(() => {
            this.props.navigation.dispatch(LoginAction)
        },2000)
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={BackgroundImage}
                    style={styles.backgroundStyle}
                >
                 
                </ImageBackground>
            </View>
        );
    }
}
// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundStyle: { width: null, height: null, flex: 1, justifyContent: 'center', alignItems: 'center' },
 
});

//make this component available to the app
 export default SplashScreen;
