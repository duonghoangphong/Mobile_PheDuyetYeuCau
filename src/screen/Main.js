/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {Component} from 'react';
import {View, Text} from 'react-native';

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {nGlobalKeys} from '../app/data/globalKey';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import Utils from '../app/Utils';
import HomeScreen from '../screen/HomeScreen';
import LoginScreen from '../screen/LoginScreen';
import DetailsScreen from '../screen/DetailScreen';
import NewDetailRequestScreen from '../screen/NewDetailRequestScreen';
import MenuCustom from '../componentCustom/MenuCustom';
import SearchScreen from './SearchScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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
    Utils.nlog('==>Res: ', res);
    let temp = await Utils.ngetStore(nGlobalKeys.loginToken);
    this.setState({token: temp});
  };
  render() {
    return (
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => (
          <MenuCustom
            {...props}
            data={this.state.data}
            token={this.state.token}></MenuCustom>
        )}
        // headerMode={'none'}
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
        {/* <Drawer.Screen name="Children" component={Children}></Drawer.Screen> */}
        {/* <Drawer.Screen name="Search" component={SearchScreen}></Drawer.Screen> */}
        <Drawer.Screen name="Home" component={HomeScreen}></Drawer.Screen>
        <Drawer.Screen name="Details" component={DetailsScreen}></Drawer.Screen>
        {/* <Drawer.Screen
          name="NewDetailRequest"
          component={NewDetailRequestScreen}></Drawer.Screen> */}
      </Drawer.Navigator>
    );
  }
}
const Children = () => {
  return (
    <Stack.Navigator initialRouteName="Home" headerMode={'none'}>
      <Drawer.Screen name="Home" component={HomeScreen}></Drawer.Screen>
      <Drawer.Screen name="Details" component={DetailsScreen}></Drawer.Screen>
    </Stack.Navigator>
  );
};
