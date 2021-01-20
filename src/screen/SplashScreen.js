import React, {Component} from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
} from 'react-native';

import Utils from '../app/Utils';
import FontSize from '../componentCustom/FontSize';
import AsyncStorage from '@react-native-community/async-storage';
import {nGlobalKeys} from '../app/data/globalKey';
import {connected} from '../apis/realtime';
import {thongBaoConnected} from '../apis/getThongBao';

const background = require('../assets/background.jpg');

const PhanTieuDe = () => {
  return (
    <View style={styles.title1}>
      <Image
        style={styles.title1_logo}
        source={require('../assets/logo.png')}></Image>
      <Text style={styles.title1_text}>ỨNG DỤNG PHÊ DUYỆT {'\n'} YÊU CẦU</Text>
    </View>
  );
};

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
  }
  state = {animating: true};

  closeActivityIndicator = () =>
    setTimeout(
      () =>
        this.setState({
          animating: false,
        }),
      5000,
    );
  componentDidMount = () => this.closeActivityIndicator();
  componentDidUpdate = async () => {
    let token = await AsyncStorage.getItem(nGlobalKeys.loginToken);
    Utils.nlog('==>Token: ', token);
    if (token == null) this.props.navigation.replace('Login');
    else {
      this.props.navigation.replace('Main');
      // connected(token);
      thongBaoConnected(this.props, token);
    }
  };

  render() {
    const animating = this.state.animating;
    return (
      <View>
        <ImageBackground source={background} style={styles.imageBackground}>
          <PhanTieuDe></PhanTieuDe>
          <ActivityIndicator
            animating={animating}
            color="#bc2b78"
            size="large"
            style={styles.activityIndicator}
          />
        </ImageBackground>
      </View>
    );
  }
}

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  title1: {
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'blue',
    height: FontSize.Height(50),
    width: FontSize.Width(100),
  },
  title1_logo: {
    width: FontSize.sizes.nImgSize187,
    height: FontSize.sizes.nImgSize187,
  },
  title1_text: {
    // margin: 10,
    textAlign: 'center',
    fontSize: FontSize.sizes.sText30,
    fontWeight: 'bold',
    color: 'white',
  },
  activityIndicator: {
    marginTop: 200,
  },
  imageBackground: {
    width: FontSize.Width(100),
    height: FontSize.Height(100),
    // justifyContent: 'center',
    alignItems: 'center',
  },
});
