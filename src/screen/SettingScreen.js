import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import {nGlobalKeys} from '../app/data/globalKey';
import LinerGradient from 'react-native-linear-gradient';
import {disconnected} from '../apis/realtime';
export default class SettingScreen extends Component {
  signOut = async () => {
    await AsyncStorage.removeItem(nGlobalKeys.loginToken);
    this.props.navigation.replace('Login');
    disconnected('123');
  };
  render() {
    return (
      <View>
        <LinerGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#5d78ff', '#00E6FF']}
          style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image
              source={require('../assets/icon_goback.png')}
              style={styles.hinh}></Image>
          </TouchableOpacity>
          <Text style={styles.title_header}> Cài đặt</Text>
        </LinerGradient>
        <View style={styles.middle}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              borderBottomWidth: 2,
              borderColor: '#E9E9E9',
            }}
            // onPress={() => this.signOut()}
          >
            <Image
              source={require('../assets/icon_translate.png')}
              style={styles.middle_iamge}></Image>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '80%',
              }}>
              <Text style={styles.middle_text}>Ngôn ngữ</Text>
              <Text style={[styles.middle_text, {fontSize: 15, color: 'gray'}]}>
                Tiếng Việt
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              borderBottomWidth: 2,
              borderColor: '#E9E9E9',
            }}
            // onPress={() => this.signOut()}
          >
            <Image
              source={require('../assets/icon_info.png')}
              style={styles.middle_iamge}></Image>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '80%',
              }}>
              <Text style={styles.middle_text}>Phiên bản</Text>
              <Text style={[styles.middle_text, {fontSize: 15, color: 'gray'}]}>
                Version 0.0.1
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              borderBottomWidth: 2,
              borderColor: '#E9E9E9',
            }}>
            <Image
              source={require('../assets/icon_password.png')}
              style={[styles.middle_iamge, {tintColor: 'yellow'}]}></Image>
            <Text style={styles.middle_text}>Đổi mật khẩu</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              borderBottomWidth: 2,
              borderColor: '#E9E9E9',
            }}
            onPress={() => this.signOut()}>
            <Image
              source={require('../assets/icon_logout.png')}
              style={[styles.middle_iamge, {tintColor: 'tomato'}]}></Image>
            <Text style={styles.middle_text}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: height / 17,
    backgroundColor: '#5d78ff',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  hinh: {width: 30, height: 30, tintColor: 'white', marginHorizontal: 15},
  title_header: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
  },
  middle: {
    marginHorizontal: 15,
    backgroundColor: 'white',
  },
  middle_iamge: {
    width: '7%',
    height: 25,
    marginHorizontal: 15,
    marginVertical: 10,
  },
  middle_text: {
    fontSize: 18,
  },
});
