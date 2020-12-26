import AsyncStorage from '@react-native-community/async-storage';
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
export default class test extends Component {
  btnSave = async () => {
    try {
      //   await AsyncStorage.setItem('@Key', 'DUONG HOANG PHONG');
      await AsyncStorage.setItem('@Key', 'Hello every body');
      await AsyncStorage.setItem('@Key1', 'Phong dep trai');
      alert('save ok!!');
    } catch (error) {
      alert(error);
    }
  };
  btnGet = async () => {
    try {
      await AsyncStorage.removeItem('@Key');
      var temp = await AsyncStorage.getItem('@Key');
      var temp1 = await AsyncStorage.getItem('@Key1');
      alert(temp);
      alert(temp1);
      alert(await AsyncStorage.getAllKeys());
    } catch (error) {
      alert(error);
    }
  };
  render() {
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={() => this.btnSave()}>
          <Text>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.btnGet()}>
          <Text>Get</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // backgroundColor: 'black',
  },
});
