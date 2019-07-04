import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button, ToastAndroid, AsyncStorage, Text} from 'react-native';
import Dimensions from 'Dimensions';
import Meteor from 'react-native-meteor';
import * as SecureStore from 'expo-secure-store';
import Registration from './Registration';
import Home from './Home';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

/*
  Экран входа / Login screen
*/

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      user_id: '',
      email: '',
      password: '',
      logged_in: false
    }
  }

  // Сохраняет пользовательские данные в SecureStore
  saveUserCredentials = async () => {
    const { user_id, email, password, logged_in} = this.state;
    const credentials = {user_id, email, password, logged_in};
    try {
      await SecureStore.setItemAsync('user_credentials', JSON.stringify(credentials));
    } catch (error) {
      console.log(error.message);
    }
  };

  // Вход пользователя на сервер или Meteor
  signIn = () => {
    Meteor.loginWithPassword(String(this.state.email), String(this.state.password), (err) => {
      if (err) {
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
      } else {
        this.saveUserCredentials();
        this.props.navigation.navigate('Home');
      }
    });
  };

 render() {
   return (
    <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder='Email'
      autoCapitalize='none'
      autoCorrect={false}
      onChangeText={(email) => {
        this.emailInput = email;
        this.setState({email});
      }}
    />
    <TextInput
      style={styles.input}
      placeholder='Password'
      autoCapitalize='none'
      autoCorrect={false}
      onChangeText={(password) => {
        this.passwordInput = password;
        this.setState({password});
      }}
      secureTextEntry={true}
    />

    <Text style={styles.button}
          onPress={() => this.props.navigation.navigate('Registration')}>Sign up</Text>

    <View style={styles.button}>
        <Button title="Sign In" onPress={this.signIn} />
    </View>
  </View>
   );
 }
}

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
