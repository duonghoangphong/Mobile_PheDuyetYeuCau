import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {Touchable} from 'react-native';

export default class Modal_Fitter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chonGuiDenToi: this.props.route.params.idmau1,
      chonToiGuiDi: this.props.route.params.idmau2,
    };
  }
  chonToiGuiDi = async () => {
    await this.setState({chonToiGuiDi: !this.state.chonToiGuiDi});
  };
  chonGuiDenToi = async () => {
    await this.setState({chonGuiDenToi: !this.state.chonGuiDenToi});
  };
  sosanh = () => {
    if (this.state.chonToiGuiDi) {
      if (this.state.chonGuiDenToi)
        this.props.route.params.onEvent(
          this.props.route.params.idmau,
          1,
          1,
          this.state.chonGuiDenToi,
          this.state.chonToiGuiDi,
        );
      else
        this.props.route.params.onEvent(
          this.props.route.params.idmau,
          1,
          0,
          this.state.chonGuiDenToi,
          this.state.chonToiGuiDi,
        );
    } else {
      if (this.state.chonGuiDenToi)
        this.props.route.params.onEvent(
          this.props.route.params.idmau,
          0,
          1,
          this.state.chonGuiDenToi,
          this.state.chonToiGuiDi,
        );
      else
        this.props.route.params.onEvent(
          this.props.route.params.idmau,
          0,
          0,
          this.state.chonGuiDenToi,
          this.state.chonToiGuiDi,
        );
    }
    this.props.navigation.goBack();
  };
  render() {
    const {chonTatCa, chonGuiDenToi, chonToiGuiDi} = this.state;
    const idmau = this.props.route.params.idmau;
    return (
      <View style={{flex: 1, backgroundColor: 'transparent'}}>
        <View
          style={{backgroundColor: 'transparent', height: '7%'}}
          onTouchEnd={() => this.props.navigation.goBack()}></View>
        <View style={styles.title1}>
          <View style={{width: '30%', backgroundColor: 'transparent'}}></View>
          <View
            style={{
              backgroundColor: 'white',
              width: '70%',
              borderRadius: 10,
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 10,
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  marginHorizontal: 5,
                }}>
                <Image
                  source={require('../../assets/icon_close.png')}
                  style={{width: 15, height: 15}}></Image>
              </TouchableOpacity>
              <Text style={{fontSize: 25, marginLeft: 20}}>LỌC DANH SÁCH</Text>
            </View>
            <View
              style={{
                borderTopWidth: 4,
                borderTopColor: '#E9E9E9',
                borderBottomWidth: 4,
                borderBottomColor: '#E9E9E9',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 10,
                }}>
                <CheckBox
                  value={chonGuiDenToi}
                  onValueChange={() => this.chonGuiDenToi()}></CheckBox>
                <Text> Gửi đến tôi </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 10,
                }}>
                <CheckBox
                  value={chonToiGuiDi}
                  onValueChange={() => this.chonToiGuiDi()}></CheckBox>
                <Text> Tôi gửi đi </Text>
              </View>
            </View>

            <View style={{alignItems: 'center', marginTop: 5}}>
              <TouchableOpacity
                onPress={() => this.sosanh()}
                style={{
                  backgroundColor: 'blue',
                  width: 80,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>LỌC</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{backgroundColor: 'transparent', height: '10%'}}
          onTouchEnd={() => this.props.navigation.goBack()}></View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  title1: {
    // marginLeft: 200,
    height: '60%',
    // backgroundColor: 'white',
    flexDirection: 'row',
  },
});
