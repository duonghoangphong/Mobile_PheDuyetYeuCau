/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import 'react-native-gesture-handler';

import SplashScreen from './src/screen/SplashScreen';
import LoginScreen from './src/screen/LoginScreen';
import RegisterScreen from './src/screen/RegisterScreen';
import NewDetailRequestScreen from './src/screen/NewDetailRequestScreen';
import Main from './src/screen/Main';
import FlashMessage from 'react-native-flash-message';
import SearchScreen from './src/screen/SearchScreen';

const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          headerMode={'none'}
          screenOptions={{
            headerShown: false,
            cardStyle: {backgroundColor: 'transparent'},
            // cardOverlayEnabled: true,
            cardStyleInterpolator: ({current: {progress}}) => ({
              cardStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 0.5, 0.9, 1],
                  outputRange: [0, 0.25, 0.7, 1],
                }),
              },
              overlayStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.2],
                  extrapolate: 'clamp',
                }),
              },
            }),
          }}
          mode="modal">
          {/* <Stack.Screen name="Children" component={Children}></Stack.Screen> */}
          <Stack.Screen name="Splash" component={SplashScreen}></Stack.Screen>
          <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
          <Stack.Screen name="Search" component={SearchScreen}></Stack.Screen>
          <Stack.Screen
            name="NewDetailRequest"
            component={NewDetailRequestScreen}></Stack.Screen>
          <Stack.Screen name="Main" component={Main}></Stack.Screen>
          <Stack.Screen
            name="Register"
            component={RegisterScreen}></Stack.Screen>
        </Stack.Navigator>
        <FlashMessage position="top" style={{borderRadius: 10}} />
      </NavigationContainer>
    );
  }
}
const Children = () => {
  return (
    <Stack.Navigator initialRouteName="Splash" headerMode={'none'}>
      <Stack.Screen name="Splash" component={SplashScreen}></Stack.Screen>
      <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};
