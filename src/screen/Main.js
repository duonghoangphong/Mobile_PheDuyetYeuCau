/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {Component} from 'react';
import {View, Text, Switch, Image} from 'react-native';

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {nGlobalKeys} from '../app/data/globalKey';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import Utils from '../app/Utils';
import MenuCustom from '../componentCustom/MenuCustom';
import test from '../test/ModalComponent';
import HomeScreen from '../screen/HomeScreen';
import LoginScreen from '../screen/LoginScreen';
import DetailsScreen from '../screen/DetailScreen';
import NewDetailRequestScreen from '../screen/NewDetailRequestScreen';
import SearchScreen from './SearchScreen';
import NotificationScreen from './NotificationScreen';
import InformationScreen from '../screen/InformationScreen';
import SettingScreen from '../screen/SettingScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      token: {},
    };
  }
  componentDidMount() {
    this.data();
  }
  data = async () => {
    let res = await Utils.post_apiTokenHeader(
      `api/menu/LayMenuChucNang`,
      '',
      true,
      true,
    );
    this.setState({data: res.data});
    // Utils.nlog('==>Res: ', res);
    let temp = await Utils.ngetStore(nGlobalKeys.loginToken);
    this.setState({token: temp});
  };
  render() {
    return (
      <Drawer.Navigator
        initialRouteName="abc"
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
        mode="modal"
        drawerContent={(props) => (
          <MenuCustom
            {...props}
            data={this.state.data}
            token={this.state.token}></MenuCustom>
        )}
        // headerMode={'none'}
      >
        <Drawer.Screen name="abc" component={abc}></Drawer.Screen>
        {/* <Drawer.Screen name="Details" component={DetailsScreen}></Drawer.Screen> */}
      </Drawer.Navigator>
    );
  }
}
const abc = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarLabel: route.name == 'Search' ? 'New request' : route.name,
        tabBarIcon: ({focused, color, size}) => {
          switch (route.name) {
            case 'Home':
              return (
                <Image
                  source={require('../assets/icon_home.png')}
                  style={{
                    position: 'absolute',
                    height: focused ? 50 : 25,
                    width: focused ? 50 : 25,
                    tintColor: focused ? 'orange' : 'gray',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}></Image>
              );
              break;
            case 'Information':
              return (
                <Image
                  source={require('../assets/icon_user.png')}
                  style={{
                    height: focused ? 50 : 25,
                    width: focused ? 50 : 25,
                    tintColor: focused ? 'orange' : 'gray',
                  }}></Image>
              );
              break;
            case 'Setting':
              return (
                <Image
                  source={require('../assets/icon_settings.png')}
                  style={{
                    height: focused ? 50 : 25,
                    width: focused ? 50 : 25,
                    tintColor: focused ? 'orange' : 'gray',
                  }}></Image>
              );
              break;
            case 'Search':
              return (
                <Image
                  source={require('../assets/icon_add.png')}
                  style={{
                    height: focused ? 50 : 25,
                    width: focused ? 50 : 25,
                    tintColor: focused ? 'orange' : 'gray',
                  }}></Image>
              );
              break;
            case 'Notification':
              return (
                <Image
                  source={require('../assets/icon_notification.png')}
                  style={{
                    height: focused ? 50 : 25,
                    width: focused ? 50 : 25,
                    tintColor: focused ? 'orange' : 'gray',
                  }}></Image>
              );
              break;
            default:
              break;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: null,
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}></Tab.Screen>
      <Tab.Screen name="Search" component={SearchScreen}></Tab.Screen>
      <Tab.Screen name="Home" component={HomeScreen}></Tab.Screen>
      <Tab.Screen name="Information" component={InformationScreen}></Tab.Screen>
      <Tab.Screen name="Setting" component={SettingScreen}></Tab.Screen>
    </Tab.Navigator>
  );
};
