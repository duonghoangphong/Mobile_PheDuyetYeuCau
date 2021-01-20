import React, {Component, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
  SafeAreaView,
  ImageBackground,
  Button,
  Alert,
  TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Utils from '../app/Utils';
import FontSize from '../componentCustom/FontSize';
import AsyncStorage from '@react-native-community/async-storage';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {nGlobalKeys} from '../app/data/globalKey';
import {ROOTGlobal, AppsetGlobal} from '../app/data/dataGlobal';
import {connected} from '../apis/realtime';
import {thongBaoConnected} from '../apis/getThongBao';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import postOneSignalID from '../apis/postOneSignalID';
const background = require('../assets/background.jpg');
const logo = require('../assets/logo.png');
import OneSignal from 'react-native-onesignal';
import {appConfig} from '../app/Config';

const PhanTieuDe = () => {
  return (
    <View style={styles.title1}>
      <Image source={logo} style={styles.title1_logo}></Image>
      <Text style={styles.title1_text}>ỨNG DỤNG PHÊ DUYỆT {'\n'} YÊU CẦU</Text>
    </View>
  );
};
function PhanThongTin({temp}) {
  return (
    <View style={styles.title2}>
      <Text> *Vui lòng sử dụng tài khoản đã đăng ký để đăng nhập</Text>
      <View style={styles.title2_thongtin}>
        <Image
          source={require('../assets/icon_phone.png')}
          style={{width: 20, height: 20}}></Image>
        <TextInput
          style={styles.title2_textinput}
          placeholder="Số điện thoại"
          placeholderTextColor="#CFCFCF"></TextInput>
      </View>
      <View style={styles.title2_thongtin}>
        <Image
          source={require('../assets/icon_password.png')}
          style={{width: 20, height: 20}}></Image>
        <TextInput
          style={styles.title2_textinput}
          placeholder="Mật khẩu"></TextInput>
        <TouchableOpacity>
          <Image
            source={require('../assets/icon_show_password.png')}
            style={{width: 20, height: 20}}></Image>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.title2_buttondangnhap}
        onPress={() => temp.dangNhap()}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
          ĐĂNG NHẬP
        </Text>
      </TouchableOpacity>
    </View>
  );
}
function PhanDangKy({temp}) {
  return <View style={styles.title3}></View>;
}

export default class DangNhap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      hidePass: true,
      TaiKhoan: 'phong@test',
      MatKhau: '12345678',
      userID: '',
    };
    OneSignal.setLogLevel(6, 0);

    // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
    OneSignal.init(
      // appConfig.onesignalID,
      // '58969a21-77fb-4818-a564-239691818f54',
      '7c34f9c4-f12b-4335-a0f8-4136b917414a',
      {
        kOSSettingsKeyAutoPrompt: false,
        kOSSettingsKeyInAppLaunchURL: false,
        kOSSettingsKeyInFocusDisplayOption: 2,
      },
    );
    OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.

    // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
    OneSignal.promptForPushNotificationsWithUserResponse();

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.addEventListener('ids', this.abc);
  }
  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    // OneSignal.removeEventListener('ids', this.onIds);
  }
  abc = async (a) => {
    console.log(a);
    this.setState({userID: a.userId});
    await Utils.nsetStore(nGlobalKeys.onesignalToken, a.userId);
    console.log('==>>>>', this.state.userID);
  };
  onReceived(notification) {
    console.log('=> onReceived: ', notification);
    // showMessage({
    //   message: 'OnReceived !',
    //   type: 'warning',
    // });
  }

  onOpened(openResult) {
    console.log('=> onOpened: ', openResult);
    // Utils.goscreen(this, 'Details', {
    //   temp: openResult.notification.payload.additionalData.data,
    // });
    // this.props.navigation.navigate('Modal_ThongKe');
    // console.log('Message: ', openResult.notification.payload.body);
    // console.log('Data: ', openResult.notification.payload.additionalData);
    // console.log('isActive: ', openResult.notification.isAppInFocus);
    // console.log('openResult: ', openResult);

    showMessage({
      message: 'onOpened !',
      type: 'info',
    });
  }
  onIds(device) {
    console.log('Device info: ', device);
  }
  dangNhap = async () => {
    var username = this.state.TaiKhoan;
    var password = this.state.MatKhau;
    let temp = await Utils.post_api(
      `api/Test/dangNhap?username=${username}&password=${password}`,
      'a',
    );
    if (temp.status == 1) {
      showMessage({
        message: 'Đăng nhập thành công !',
        type: 'success',
      });
      this.setState({data: temp});
      Utils.nsetStore(nGlobalKeys.loginToken, temp.data.Token);
      Utils.setGlobal(ROOTGlobal.loginToken, temp.data.Token);
      Utils.nlog('==>Token: ', await Utils.ngetStore(nGlobalKeys.loginToken));
      Utils.nlog(
        '==>OneSignal Token: ',
        await Utils.ngetStore(nGlobalKeys.onesignalToken),
      );

      thongBaoConnected(this.props, temp.data.Token);

      let abs = {};
      abs['devicestoken'] = this.state.userID;
      abs['IsLogout'] = false;
      let a = await postOneSignalID(abs);
      this.props.navigation.replace('Main');
      // connected(temp.data.Token);
    } else {
      this.setState({data: []});
      showMessage({
        message: 'Sai tài khoản hoặc mật khẩu !',
        type: 'danger',
      });
    }
  };
  render() {
    return (
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        // showsVerticalScrollIndicator={false}
        // style={{marginTop: 10, paddingHorizontal: 10}}
      >
        <ImageBackground source={background} style={styles.imagebackground}>
          <PhanTieuDe></PhanTieuDe>
          <View style={styles.title2}>
            <Text style={{textAlign: 'center'}}>
              *Vui lòng sử dụng tài khoản {'\n'}đã đăng ký để đăng nhập
            </Text>
            <View style={styles.title2_thongtin}>
              <Image
                source={require('../assets/icon_username.png')}
                style={{width: 20, height: 20}}></Image>
              <TextInput
                style={styles.title2_textinput}
                placeholder="Số điện thoại"
                placeholderTextColor="#CFCFCF"
                onChangeText={(text) =>
                  this.setState({TaiKhoan: text})
                }></TextInput>
            </View>
            <View style={styles.title2_thongtin}>
              <Image
                source={require('../assets/icon_password.png')}
                style={{width: 20, height: 20}}></Image>
              <TextInput
                style={styles.title2_textinput}
                placeholder="Mật khẩu"
                secureTextEntry={this.state.hidePass}
                placeholderTextColor="#CFCFCF"
                onChangeText={(text) =>
                  this.setState({MatKhau: text})
                }></TextInput>
              <TouchableOpacity
                onPress={() => this.setState({hidePass: !this.state.hidePass})}>
                <Image
                  source={
                    this.state.hidePass
                      ? require('../assets/icon_hide_password.png')
                      : require('../assets/icon_show_password.png')
                  }
                  style={{width: 20, height: 20}}></Image>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.title2_buttondangnhap}
              onPress={this.dangNhap}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
                ĐĂNG NHẬP
              </Text>
            </TouchableOpacity>
          </View>
          {/* <Image
            source={require('../assets/vantay.png')}
            style={{
              width: 100,
              height: 80,
              overlayColor: 'white',
              marginTop: 40,
            }}></Image> */}
          {/* Phan dang ky */}
          <PhanDangKy temp={this.props}></PhanDangKy>
        </ImageBackground>
      </KeyboardAwareScrollView>
    );
  }
}

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  imagebackground: {
    width: width,
    height: height,
    flex: 1,
  },
  title1: {
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'blue',
    height: FontSize.Height(40),
  },
  title1_logo: {
    width: 120,
    height: 120,
  },
  title1_text: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 25,
  },
  title2: {
    backgroundColor: '#FFFAF080',
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 30,
    textAlign: 'center',
    alignItems: 'center',
    height: '30%',
    // flex: 1,
  },
  title2_thongtin: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'white',
    width: width - 90,
  },
  title2_textinput: {
    marginLeft: 2,
    fontSize: 20,
    width: FontSize.Width(65),
  },
  title2_buttondangnhap: {
    backgroundColor: 'blue',
    height: 50,
    width: 140,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  title3: {
    alignItems: 'center',
    height: FontSize.Height(30),
    marginTop: 30,
  },
  title3_text: {
    color: 'white',
    fontSize: 20,
  },
  container: {
    flex: 1,
  },
  imageback: {
    resizeMode: 'cover',
    justifyContent: 'center',
    height: height,
    width: width,
    flex: 1,
  },
  header: {
    flex: 2,
    alignItems: 'center',
    paddingVertical: 50,
  },
  footer: {
    flex: 7,
  },
  textHeader: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 50,
    marginTop: 12,
  },
  imagest: {
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  ContainerDangNhap: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 30,
    marginBottom: 20,
  },
  khung: {
    backgroundColor: '#00000080',
    height: height - 530,
    width: width - 30,
    marginHorizontal: 20,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginTop: 20,
  },
  Title: {
    fontSize: 20,
    color: 'white',
    marginHorizontal: 20,
    textAlign: 'center',
    marginTop: 10,
  },
  khungtextinput: {
    borderColor: 'white',
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    color: 'white',
    width: 350,
    marginRight: 2,
    marginLeft: 10,
    marginTop: 30,
  },
  khungtextinputMK: {
    borderColor: 'white',
    borderBottomWidth: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    color: 'white',
    width: 350,
    marginRight: 2,
    marginLeft: 10,
    marginTop: 10,
  },
  textinput: {
    color: 'white',
    width: 330,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  buttonDangnhap: {
    backgroundColor: '#3180CC',
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  textDangNhap: {
    fontSize: 20,
    color: '#fff',
  },
  quenmk: {
    backgroundColor: 'green',
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textChuaTK: {
    color: 'white',
    fontSize: 15,
  },
  textDangKyTK: {
    color: 'white',
    fontSize: 18,
    textDecorationLine: 'underline',
  },
});
