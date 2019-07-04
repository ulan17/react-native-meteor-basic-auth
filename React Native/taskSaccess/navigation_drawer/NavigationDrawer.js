import { createStackNavigator, createAppContainer, createDrawerNavigator, DrawerItems, withNavigation } from "react-navigation";
import Home from '../components/screens/Home';
import ControlPanel from '../components/screens/ControlPanel';
import NavigationDrawerStructure from './NavigationDrawerStructure'
import React, { Component } from 'react';
import * as SecureStore from 'expo-secure-store';
import { SafeAreaView, View, Text, TouchableOpacity, Alert } from 'react-native';
import Meteor, { connectMeteor, Accounts, withTracker } from 'react-native-meteor';
import connect from '../meteor/connect';

// Настройка navigator drawer-а 
navStackOptions = (navigation, title) => ({
    title: title,
    headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
    headerStyle: {
      backgroundColor: '#FF9800',
    },
    headerTintColor: '#fff',
  });

// Удаляет текущего пользователя из SecureStore
deleteUser = async () => {
    try {
      await SecureStore.deleteItemAsync('user_credentials');
      Meteor.logout();
    } catch (e) {
      console.log(e);
    }
  };

const HomeStackNavigator = createStackNavigator({
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => navStackOptions(navigation, 'Home'),
    },
  });

const ControlPanelStackNavigator = createStackNavigator({ 
  ControlPanel: {
    screen: ControlPanel,
    navigationOptions: ({ navigation }) => navStackOptions(navigation, 'Control Panel'),
  },
});
  
const DrawerNavigator = createDrawerNavigator({
    Home: {
      screen: HomeStackNavigator,
      navigationOptions: {
        drawerLabel: 'Home',
      },
    }, 
    ControlPanel: {
      screen: ControlPanelStackNavigator,
      navStackOptions: {
        drawerLabel: 'Control Panel'
      },
    }
  }, {
    contentComponent: (props) => (
      <View style={{flex:1}}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerItems {...props} />
            <TouchableOpacity onPress={()=>
              Alert.alert(
                'Log out',
                'Do you want to logout?',
                [
                  {text: 'Cancel', onPress: () => {return null}},
                  {text: 'Confirm', onPress: () => {
                    this.deleteUser();
                    props.navigation.navigate('Login')
                  }},
                ],
                { cancelable: false }
              )  
            }>
              <Text style={{margin: 16, fontWeight: 'bold'}}>Log out</Text>
            </TouchableOpacity>
          </SafeAreaView>
      </View>
    ),
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    drawerWidth: 250,
    useNativeAnimations: true,
});

export default createAppContainer(DrawerNavigator);

