import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, Image,Alert } from 'react-native';
import BackgroundImage from '../../../assets/theme.png';
import Logo from '../../../assets/logo.jpg';
import { NavigationActions, StackActions } from 'react-navigation';
import Button from '../../Components/button';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';
const HomeAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Home' })],
});

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      token: '',
    }
  }

  getInfoFromToken = token => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id,name,first_name,last_name',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      { token, parameters: PROFILE_REQUEST_PARAMS },
      (error, user) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          this.setState({ userInfo: user, token: token });
          console.log('result:', user);
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };


  _loginWithFB = () => {
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithPermissions(['public_profile']).then(
      login => {
        if (login.isCancelled) {
          Alert.alert("Error",
            'Login cancelled ');
          console.log('Login cancelled');
        } else {
          console.log(login.grantedPermissions.toString())
          AccessToken.getCurrentAccessToken().then(data => {
            const accessToken = data.accessToken.toString();
            this.props.navigation.dispatch(HomeAction)
            //  this.getInfoFromToken(accessToken);
          });
        }
      },
      error => {
        Alert.alert("Error",
          'Login fail with error: ' + error);
        console.log('Login fail with error: ' + error);
      },
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={BackgroundImage}
          style={styles.backgroundStyle}
        >
          <View style={styles.logoContainer}>
            <Image
              style={styles.logoImg}
              resizeMode={'contain'}
              source={Logo} />
          </View>
          <Button name={'Login With Facebook'} containerWidth={{ width: '80%', marginTop: 10 }}
            buttonPress={() => { this._loginWithFB() }} />
        </ImageBackground>
      </View>
    );
  }
}

const { width, height } = Dimensions.get('window')
const IMAGE_WIDTH = width * 0.5
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: { alignSelf: 'center' },
  logoImg: {
    height: 100,
    width: IMAGE_WIDTH,
    // resizeMode: 'contain',
  },
  backgroundStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
export default Login;

