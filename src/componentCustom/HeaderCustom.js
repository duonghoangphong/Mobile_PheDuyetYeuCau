import React, {useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
  Modal,
  SafeAreaView,
  ImageBackground,
  Button,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontSize from '../componentCustom/FontSize';
import AlertCustom from '../componentCustom/AlertViewCustom';

const iconMenu = require('../assets/icon_menu.png');
const timkiem = require('../assets/icon_search.png');
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
const Header = ({temp}) => {
  const IPref = useRef(null);
  // console.log('temp cua ma hinh :', temp);
  const [state, setState] = React.useState(true);
  return (
    <View style={styles.bgHeader}>
      <TouchableOpacity
        style={{width: FontSize.Width(10)}}
        // onPress={() => temp.navigation.openDrawer()}
      >
        <Image source={iconMenu} style={styles.icon}></Image>
      </TouchableOpacity>
      <TextInput
        ref={IPref}
        style={styles.headerStyle}
        placeholderTextColor="white"
        placeholder="Approval request"></TextInput>
      <TouchableOpacity
        onPress={() => {
          IPref.current.focus();
        }}
        style={styles.khung_icon}>
        <Image source={timkiem} style={styles.icon}></Image>
      </TouchableOpacity>
      <TouchableOpacity style={{width: FontSize.Width(10)}}>
        <Image
          source={require('../assets/icon_ellipsis.png')}
          style={{
            height: 30,
            width: 30,
            tintColor: 'white',
            marginLeft: 10,
          }}></Image>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bgHeader: {
    backgroundColor: '#5d78ff',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 10,
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.2,
    position: 'relative',
    flexDirection: 'row',
    width: width,
    height: FontSize.Height(7),
    paddingHorizontal: 15,
    // borderBottomWidth: 1,
  },
  headerStyle: {
    fontSize: 25,
    color: 'white',
    width: FontSize.Width(60),
    marginLeft: 10,
    // backgroundColor: 'red',
  },
  khung_icon: {
    width: FontSize.Width(10),
    height: FontSize.sizes.nImgSize35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    // backgroundColor: '#4285F480',
  },
  icon: {
    width: FontSize.sizes.nImgSize25,
    height: FontSize.sizes.nImgSize25,
    tintColor: 'white',
  },
  Alert_Main_View: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#009688',
    height: 200,
    width: '90%',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 7,
  },

  Alert_Title: {
    fontSize: 25,
    color: '#fff',
    textAlign: 'center',
    padding: 10,
    height: '28%',
  },

  Alert_Message: {
    fontSize: 22,
    color: '#fff',
    textAlign: 'center',
    padding: 10,
    height: '42%',
  },

  buttonStyle: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  TextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 22,
    marginTop: -5,
  },
});

module.exports = Header;
