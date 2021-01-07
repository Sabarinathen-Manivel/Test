//import liraries
import React, { Component } from 'react';
import { View, Text,FlatList, ImageBackground, Alert } from 'react-native';
import * as rssParser from 'react-native-rss-parser';
import Colors from '../../Theme/Colors';
import Button from '../../Components/button';
import BackgroundImage from '../../../assets/theme.png';
import {
  LoginManager
} from 'react-native-fbsdk';
import { StackActions, NavigationActions } from 'react-navigation';
import styles from './styles';
// create a component
const ResetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Auth' })],
});
class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      news: {},
      data: [],
      refreshing: false
    }
  }

  componentDidMount() {
    this._fetchRSSData();
  }

  _fetchRSSData = () => {
    fetch('http://www.nasa.gov/rss/dyn/breaking_news.rss')
      .then((response) => response.text())
      .then((responseData) => rssParser.parse(responseData))
      .then((rss) => {
        this.setState({ news: rss, data: rss.items, refreshing: false })
      });
  }

  _naviagateToLogin = () => this.props.navigation.dispatch(ResetAction)
  logoutWithFacebook = () => {
    LoginManager.logOut();
    Alert.alert('Success', 'Successfully logout', [
      { text: "OK", onPress: () => this._naviagateToLogin() }
    ])
  };

  handleRefresh = () => {
    this.setState({ refreshing: true }, () => {
      this._fetchRSSData()
    })
  }

  _renderHeader = () => {
    return (
      <View style={{ backgroundColor: Colors.primary }}>
        <View style={{
          height: 15, flexDirection: 'row', justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 20, marginHorizontal: 10
        }}>
          <View style={{ flex: 0.2 }} />
          <View  >
            <Text style={{ fontSize: 18, color: 'white', textAlign: 'center' }}>Home</Text>
          </View>
          <View style={{ flex: 0.2 }}>
            <Button name={'Logout'} buttonPress={() => this.logoutWithFacebook()} />
          </View>
        </View>
      </View>
    )
  }

  _renderItem = ({ item, index }) => {
    return (
      <View key={index} style={styles.itemConatiner}>
        <Text style={styles.title}>{item.title}</Text>
        <Text>{item.description}</Text>
      </View>)
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderHeader()}
        <ImageBackground source={BackgroundImage} style={styles.container}>
          <FlatList
            style={{ flex: 1, }}
            refreshing={false}
            onRefresh={() => this.handleRefresh()}
            showsVerticalScrollIndicator={false}
            data={this.state.data}
            keyExtractor={(item, index) => "Rss" + index}
            renderItem={(item) => this._renderItem(item)}
          />
        </ImageBackground>
      </View>
    );
  }
}



//make this component available to the app
export default Home;
