import React from 'react';
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
  TextInput,
} from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

const background = require('../assets/background.jpg');
const logo = require('../assets/logo.png');

const PhanTieuDe = () => {
  return (
    <View style={styles.title1}>
      <Image source={logo} style={styles.title1_logo}></Image>
      <Text style={styles.title1_text}>ỨNG DỤNG PHÊ DUYỆT YÊU CẦU</Text>
    </View>
  );
};
function CusTomDangNhap() {
  return (
    <View style={styles.ContainerDangNhap}>
      <View style={styles.khung}>
        <Text style={styles.Title}>
          Vui lòng sử dụng tài khoản đã đăng ký để đăng nhập
        </Text>
        <View>
          {/* tài khoản */}
          <View style={styles.khungtextinput}>
            <Icon name="person-outline" size={24} color="white" />

            <TextInput
              autoCapitalize="none"
              placeholderTextColor="white"
              placeholder="Số điện thoại đăng nhập"
              style={styles.textinput}></TextInput>
          </View>
          {/* mật khẩu */}
          <View style={styles.khungtextinputMK}>
            <Icon
              name="key-outline"
              size={24}
              color="white"
              style={{marginRight: 2}}
            />
            <TextInput
              autoCapitalize="none"
              placeholder="Nhập mật khẩu"
              placeholderTextColor="white"
              style={([styles.textinput], {width: width - 120})}></TextInput>
            <TouchableOpacity>
              <Icon
                name="eye-outline"
                size={24}
                color="#FFFFFF80"
                // style={{marginRight: 5}}
              />
            </TouchableOpacity>

            {/* <Icon name="eye-off-outline" size={26} /> */}
          </View>
        </View>
        {/* button đăng nhập */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonDangnhap}>
            <Text style={styles.textDangNhap}>ĐĂNG NHẬP</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.quenmk}>
        <Text style={styles.textChuaTK}>Bạn chưa có tài khoản?</Text>
        <Text style={styles.textDangKyTK}>Đăng ký tài khoản!</Text>
      </View>
    </View>
  );
}
export default class RegisterScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={background} style={styles.imageback}>
          <PhanTieuDe></PhanTieuDe>
          <View style={styles.footer}>
            {/* <CusTomDangNhap /> */}
            <Text>Đây là trang đăng ký</Text>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  title1: {
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'blue',
    height: height / 3,
    marginTop: 40,
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

  //======================================
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
    width: 100,
    height: 100,
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
    justifyContent: 'center',
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
    height: 60,
    marginTop: 20,
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
    flex: 3,
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
