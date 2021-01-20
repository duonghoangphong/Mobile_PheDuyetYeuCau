import React, {Component, useEffect} from 'react';
import {StyleSheet, ScrollView, View, Image, Dimensions} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
  TextInput,
} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontSize from '../componentCustom/FontSize';
import Utils from '../app/Utils';
import {nGlobalKeys} from '../app/data/globalKey';
import AsyncStorage from '@react-native-community/async-storage';
import {ROOTGlobal} from '../app/data/dataGlobal';

export default function MenuCustom(props) {
  const [tempState, setTempState] = React.useState(false);
  const [tempIndex, setTempIndex] = React.useState('');
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const [token, setToken] = React.useState('');

  const getData = async () => {
    let tempToken = await Utils.ngetStore(nGlobalKeys.loginToken);
    setToken(tempToken);
    const temp = await Utils.ngetStore(nGlobalKeys.HoTen);
    setTempIndex(temp);
  };
  useEffect(() => {
    getData();
  }, []);
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };
  signOut = async () => {
    await AsyncStorage.removeItem(nGlobalKeys.loginToken);
    props.navigation.navigate('Login');
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.userInfoSection}>
        <View>
          <TouchableOpacity onPress={props.navigation.closeDrawer}>
            <Image
              source={require('../assets/icon_close.png')}
              style={{
                width: 20,
                height: 20,
                marginTop: 5,
                left: 240,
              }}></Image>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // backgroundColor: 'yellow',
            marginTop: 5,
          }}>
          <Avatar.Image
            source={{
              uri:
                'https://i.pinimg.com/236x/4b/81/77/4b81778263d5f5f51df7e26ff40f7bb8.jpg',
            }}
            size={50}
          />
          <View style={{marginLeft: 15, flexDirection: 'column'}}>
            <Title>{tempIndex ? tempIndex : ''}</Title>
            <Caption>@phong.duong.3570</Caption>
          </View>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#5d78ff',
              width: 250,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 10,
              height: 30,
            }}
            onPress={() => props.navigation.navigate('Search')}>
            <Text style={{fontSize: 20}}> + Create respone </Text>
          </TouchableOpacity>

          {/* <View
            style={{
              flexDirection: 'row',
              width: 250,
              alignItems: 'center',
              // backgroundColor: 'yellow',
            }}>
            <TextInput
              placeholder="Search..."
              style={{
                marginVertical: 5,
                height: 30,
                width: '90%',
                borderRadius: 5,
                backgroundColor: '#66CC00',
              }}></TextInput>
            <TouchableOpacity
              style={{backgroundColor: '#66CC00', height: 30, borderRadius: 5}}>
              <Image source={require('../assets/icon_search.png')}></Image>
            </TouchableOpacity>
          </View> */}
        </View>
        <ScrollView {...props} style={styles.scrollView}>
          <View style={styles.drawerContent}>
            <View>
              <Text></Text>
              {props.data == null
                ? null
                : props.data.map((item, index) => {
                    return (
                      <Drawer.Section key={index}>
                        <TouchableOpacity
                          onPress={() => {
                            setTempState(!tempState);
                            // ,setTempIndex(item.Summary);
                          }}>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              marginLeft: 5,
                              fontSize: 20,
                            }}>
                            <Image
                              source={require('../assets/icon_next1.png')}
                              style={{
                                height: 15,
                                width: 20,
                                tintColor: '#838B8B',
                              }}></Image>
                            {item.Summary} :
                          </Text>
                        </TouchableOpacity>

                        {/* {tempState == true && item.Summary == tempIndex ? ( */}
                        <View>
                          {item.Child.map((it, index) => {
                            return (
                              <View key={index}>
                                <TouchableOpacity
                                  style={styles.preference}
                                  onPress={() => alert(it.Summary)}>
                                  <Text style={{fontSize: 18}}>
                                    {'\t'}
                                    {'\t'} {it.Summary}
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            );
                          })}
                        </View>
                        {/* ) : null} */}
                      </Drawer.Section>
                    );
                  })}
            </View>
          </View>
        </ScrollView>
      </View>
      <Drawer.Section title="Preferences">
        <TouchableRipple
          onPress={() => {
            toggleTheme();
          }}>
          <View style={[{justifyContent: 'space-between'}, styles.preference]}>
            <Image source={require('../assets/icon_darkmode.png')}></Image>
            <Text>Dark Theme</Text>
            <View pointerEvents="none">
              <Switch value={isDarkTheme} />
            </View>
          </View>
        </TouchableRipple>
      </Drawer.Section>
      <Drawer.Section style={styles.bottomDrawerSection}>
        {/* <DrawerItem
          icon={({color, size}) => (
            <Image source={require('../assets/icon_logout.png')}></Image>
          )}
          label="Sign Out"
          onPress={() => {
            signOut();
          }}
        /> */}
        <TouchableRipple
          onPress={() => {
            signOut();
          }}>
          <View style={[styles.preference, {alignItems: 'center'}]}>
            <Image source={require('../assets/icon_logout.png')}></Image>
            <Text style={{left: '200%'}}>Sign Up</Text>
          </View>
        </TouchableRipple>
      </Drawer.Section>
    </View>
  );
}
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 5,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {},
  bottomDrawerSection: {
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    paddingVertical: 2,
    paddingHorizontal: 10,
  },

  headerText: {
    fontSize: 20,
    margin: 10,
    fontWeight: 'bold',
  },
  menuContent: {
    color: '#000',
    fontWeight: 'bold',
    padding: 2,
    fontSize: 20,
  },
  scrollView: {
    height: height / 1.8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: '#CFCFCF50',
  },
});
