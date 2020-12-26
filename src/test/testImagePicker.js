import React, {Component} from 'react';
import {StyleSheet, View, Button, Image, Text} from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileUri: '',
    };
  }

  launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: false,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('user cancelled image picker');
      } else if (response.error) {
        console.log('image picker error', response.error);
      } else if (response.customButton) {
        console.log('user tapped custom button ', response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log(source);
        this.setState({fileUri: response.uri});
      }
    });
  };

  renderFileUri() {
    if (this.state.fileUri) {
      return (
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={{uri: this.state.fileUri}} />
        </View>
      );
    } else {
      return (
        <View style={styles.imgContainer}>
          {/* <Image style={styles.img} source={require('./assets/download.png')} /> */}
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="select image"
          onPress={() => this.launchImageLibrary()}
        />
        {this.renderFileUri()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  imgContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  img: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
  },
});
