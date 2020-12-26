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

const background = require('../assets/background.jpg');
const logo = require('../assets/logo.png');

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
// const [hidePass, setHidePass] = useState(true);

export default class DangNhap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      hidePass: true,
      TaiKhoan: 'anhtuan@test',
      MatKhau: '12345678',
    };
  }
  dangNhap = async () => {
    var username = this.state.TaiKhoan;
    var password = this.state.MatKhau;
    let temp = await Utils.post_api(
      `api/Test/dangNhap?username=${username}&password=${password}`,
      'a',
    );
    if (temp.status == 1) {
      this.setState({data: temp});
      Utils.nsetStore(nGlobalKeys.loginToken, temp.data.Token);

      Utils.setGlobal(ROOTGlobal.loginToken, temp.data.Token);
      Utils.nlog(
        '==>_token LoginScreen: ',
        Utils.getGlobal(ROOTGlobal.loginToken),
      );

      Utils.nsetStore(nGlobalKeys.HoTen, temp.data.TenDayDu);
      Utils.setGlobal(ROOTGlobal.info, temp.data);
      Utils.nlog('==>Token: ', await Utils.ngetStore(nGlobalKeys.loginToken));
      this.props.navigation.navigate('Main');
    } else {
      this.setState({data: []});
      showMessage({
        message: 'Sai tài khoản hoặc mật khẩu !',
        type: 'danger',
        // position: 'center',
      });
    }
    // Alert.alert('Đăng nhập không thành công?', 'Sai tai khoan hoac mat khau');
  };
  render() {
    return (
      <View>
        <ImageBackground source={background} style={styles.imagebackground}>
          {/* Phan Tieu De */}
          <PhanTieuDe></PhanTieuDe>
          {/* Phan Dang Nhap */}
          {/* <PhanThongTin temp={this.props}></PhanThongTin> */}
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
            // source={require('../assets/vantay.png')}
            style={{
              width: 100,
              height: 80,
              overlayColor: 'white',
              marginTop: 40,
            }}></Image> */}
          {/* Phan dang ky */}
          <PhanDangKy temp={this.props}></PhanDangKy>
        </ImageBackground>
      </View>
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
    // backgroundColor: 'red',
    // justifyContent: 'center',
    alignItems: 'center',
    height: '40%',
  },
  title2_thongtin: {
    // justifyContent: 'center',
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
    marginTop: FontSize.Height(7),
  },
  title3: {
    alignItems: 'center',
    // backgroundColor: 'yellow',
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
    // backgroundColor: 'blue',
  },
  footer: {
    flex: 7,
    // backgroundColor: 'red',
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
    // height: 320,
    marginBottom: 20,
    // flex: 7,
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
    // marginBottom: 80,
    // height: 60,
    // marginTop: 20,
    alignItems: 'center',
    // flex: 1,
    // backgroundColor: 'green',
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
    // flex: 1,
    backgroundColor: 'green',
    // marginBottom: 100,
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
