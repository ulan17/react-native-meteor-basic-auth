import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ToastAndroid, AsyncStorage} from 'react-native';
import Dimensions from 'Dimensions';
import Meteor, { connectMeteor, Accounts, withTracker} from 'react-native-meteor';
import * as SecureStore from 'expo-secure-store';
import ConnectMeteor from '../../meteor/connect'
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

/*
  Экран панель управлении / Control panel screen
*/

class ControlPanel extends Component {

  constructor() {
    super();

    this.state = {
      text: ''
    }
  }

  
  // Cохраняет пользовательский текст и отправляет на сервер
  insertText = () => {
    data = {
      text: this.state.text,
      owner: this.props.userId
    };
    Meteor.call('insert_update_text', (data), function(err) {
      if(err) console.log(err);
      else ToastAndroid.show('Saved successfully', ToastAndroid.SHORT);
    });
  }

  render() {
      return (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(text) => { this.setState({text});}}
            value={this.state.text.value}  />

          <View style={styles.button}>
            <Button title="Save" onPress={this.insertText} />
          </View>
         </View>
      );
    }
}

// Получает данные текущего пользователя
export default withTracker(params => {
  Meteor.subscribe('current_user');
  return {
    userId: Meteor.userId(),
    text:  Meteor.collection('texts').findOne({
      owner: Meteor.userId()
    }, {
      fields: {
        'text': 1,
      }
    }).text
  }
})(ControlPanel);

     
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    paddingTop: 20
  },
  input: {
    alignItems: 'center',
    height: 40,
    width: DEVICE_WIDTH-100,  
    borderBottomWidth: 1
  },
});