import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button, ToastAndroid} from 'react-native';
import Dimensions from 'Dimensions';
import Meteor, { connectMeteor, Accounts,} from 'react-native-meteor';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

/*
  Экран регистрации / Sign-up screen
*/

export default class Registration extends Component {
constructor() {
  super();

  this.state = {
    userId: '',
    email : '',
    password : '',
    confirm_password : ''
  }
}

// Сохраняет пользовательский текст на по умолчанию
saveDefaultText = (userId) => {
  data = {
    owner: userId,
    text: 'You can change it in control-panel'
  }
  Meteor.call('insert_update_text', (data), function(err) {
    if(err) console.log(err);
  });
}

// Проверка электронной почты
validateEmail = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Регистрация пользователя и отправляет данные пользователя на сервер или Meteor
signUp = () => {
  if(this.state.confirm_password == this.state.password && this.validateEmail(this.state.email)) {
    data = {
      email: this.state.email, 
      password: this.state.password
    }

    Meteor.call('create_user', data, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        ToastAndroid.show('Account created successfully', ToastAndroid.SHORT);
        this.saveDefaultText(result);
      }
    });
  } else {
    ToastAndroid.show('Passwords are not the same or incorrect email', ToastAndroid.SHORT);
  }
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

    <TextInput
      style={styles.input}
      placeholder='Confirm password'
      autoCapitalize='none'
      autoCorrect={false}
      onChangeText={(confirm_password) => {
        this.cpasswordInput = confirm_password;
        this.setState({confirm_password});
      }}
      secureTextEntry={true}
    />

    <View style={styles.button}>
        <Button title="Sign Up" onPress={this.signUp} />
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