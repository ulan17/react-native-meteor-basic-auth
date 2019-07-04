import React, { Component } from 'react';
import DrawerNavigator from './navigation_drawer/NavigationDrawer';
import Login from './components/screens/Login';
import Registration from './components/screens/Registration';
import AuthLoadingScreen from './components/screens/AuthLoadingScreen';
import ConnectMeteor from './meteor/connect';
import {createAppContainer, createStackNavigator,createSwitchNavigator, StackNavigator} from 'react-navigation'

const LoginFormStackNavigator = createStackNavigator({ 
  Login: Login, Registration: Registration
},{
  headerMode: 'none',
  navigationOptions: {
    headerLeft: null,
    headerVisible: false,
  }
});

const AppSwitchNavigator = createSwitchNavigator ({
  AuthLoadingScreen: AuthLoadingScreen,
  LoginForm: LoginFormStackNavigator,
  DrawerNavigator: DrawerNavigator,
},
{
  headerMode: 'none',
  navigationOptions: {
    headerLeft: null,
    headerVisible: false,
  }
}); 

const App = createAppContainer(AppSwitchNavigator);

export default App;
