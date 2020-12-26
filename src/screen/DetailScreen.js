import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    state = {};
  }
  render() {
    return (
      <View>
        {console.log(this.props.route.params.temp)}
        <ImageBackground
          source={require('../assets/background_update.jpg')}
          style={{width: '100%', height: '100%'}}>
          <Text> This is Details Screen</Text>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Text>back</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}
