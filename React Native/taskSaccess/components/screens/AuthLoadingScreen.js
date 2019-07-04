import React, { Component } from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Meteor from 'react-native-meteor';
import ConnectMeteor from '../../meteor/connect';

/*
  Загрузочный экран / Loading screen
*/

export default class AuthLoadingScreen extends Component {
  
  _isMounted = false;  // Убирает ошибку componentWillMount()

  constructor() {
      super();
      
      this.state = {
        email: '',
        password: '',
        logged_in: false
      }
    
  }

  componentDidMount() {
    this._isMounted = true;
    if(this._isMounted){
      this.getUserCredentials();
    }
  }

  componentWillMount() {
    this._isMounted = false;
  }
  
  // Проверяет текущего пользователя
  getUserCredentials = async () => {
    try {
      const credentials = await SecureStore.getItemAsync('user_credentials');
      if (credentials) {
        const myJson = JSON.parse(credentials);
        this.setState({
          email: myJson.email,
          password: myJson.password,
          logged_in: myJson.logged_in
        });
        this.signIn();
      } else {
        this.props.navigation.navigate('Login');
      }
    } catch (e) {
        console.log(e);
    }
 }

 // Удаляет текущего пользователя из SecureStore
  deleteUser = async () => {
    try {
      await SecureStore.deleteItemAsync('user_credentials');
    } catch (e) {
      console.log(e);
    }
};

  // Вход пользователя на сервер или Meteor
  signIn = () => {
    Meteor.loginWithPassword(this.state.email, this.state.password, (err) => {
      if (err) {
        this.props.navigation.navigate('Login');
      } else {
        this.props.navigation.navigate('Home');
      }
    });
  };
  
  render() {
    return (
      <View style={styles.container}> 
          <ActivityIndicator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
 });
 