import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

export class Modal_Fitter extends Component {
  render() {
    return (
      <View
        // onTouchEnd={() => alert(1)}
        style={{flex: 1, backgroundColor: 'transparent'}}>
        <View
          style={{backgroundColor: 'transparent', height: '10%'}}
          onTouchEnd={() => this.props.navigation.goBack()}></View>
        <View style={styles.title1}>
          <Text> This is fitter </Text>
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
    height: '80%',
    backgroundColor: 'white',
  },
});
export default Modal_Fitter;
