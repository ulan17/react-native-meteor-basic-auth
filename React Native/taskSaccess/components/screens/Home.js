import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ToastAndroid, AsyncStorage} from 'react-native';
import Dimensions from 'Dimensions';
import Meteor, { connectMeteor, Accounts, withTracker } from 'react-native-meteor';
import * as SecureStore from 'expo-secure-store';
import ConnectMeteor from '../../meteor/connect';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

/*
  Домашняя страница / Home screen
*/

class Home extends Component {

  constructor() {
    super();

    this.state = {
      city: '',
      celcius: ''
    }
  }

  componentDidMount() {
    this.getWeather();
  }

  // Получает данные о погоде
  getWeather = () => {
    var key = 'b94c820514a98a86b584507cf5d434be';
    var city = 'Astana';
	  fetch('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + key)  
	  .then(function(resp) { return resp.json() }) 
	  .then(function(data) {
      this.setState({
        city: data.name,
        celcius: Math.round(parseFloat(data.main.temp)-273.15)
      });
	   }.bind(this));
  }

 render() {
   return (
    <View style={styles.container}>
    <Text>Text: {this.props.text}</Text>
    <Text>Weather</Text>
    <Text>City: {this.state.city}</Text>
    <Text>Celcius: {this.state.celcius}</Text>
    </View>
   );
 }
}

// Получает данные текущего пользователя
export default withTracker(params => {
  Meteor.subscribe('current_user');
  return {
    user: Meteor.userId(),
    text:  Meteor.collection('texts').findOne({
      owner: Meteor.userId()
    }, {
      fields: {
        'text': 1,
      }
    }).text
  }
})(Home);

const styles = StyleSheet.create({
 container: {
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center',
 },
 input: {
    alignItems: 'center',
    height: 40,
    width: DEVICE_WIDTH-100,  
    borderBottomWidth: 1
  },
  button: {
      paddingTop: 20
  }
});