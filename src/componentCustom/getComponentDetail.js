import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TextInput,
  Switch,
  ScrollView,
  TouchableOpacity,
  Button,
  FlatList,
} from 'react-native';
import moment from 'moment';
import RNFS from 'react-native-fs';
import postNewDetailRequest from '../apis/postNewDetailRequest';
import ImgToBase64 from 'react-native-image-base64';
import FontSize from '../componentCustom/FontSize';
import {SearchBar} from 'react-native-elements';
import getDanhSachSearch from '../apis/getDanhSachSearch';
import Utils from '../app/Utils';
import getDetail from '../apis/getDetail';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Datepicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import SelectMultiple from 'react-native-select-multiple';
import CheckBox from '@react-native-community/checkbox';
import {launchImageLibrary} from 'react-native-image-picker';
import ImagePickerCrop from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {interpolate, Value} from 'react-native-reanimated';
import getItem from '../apis/getItem';
import {ImageBackground} from 'react-native';
import {Case5, Case6, Case9} from '../componentCustom/getCase';

export default class DetailItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      uriImage: '',
      arrayUriImage: [],
      image: null,
      images: null,
      nameDocument: '',
      arrayDocument: [],
      Switch: false,
      CheckBox: false,
      arrayDecant: this.props.data,
      arrayFirst: this.props.item,
      mode: 'date',
      show: false,
      imageCase10: [],
      arrayImageCase12: [],
      arrayCase14: [],
    };
  }
  componentDidMount() {
    this.setArrayDecantOfStateFirst();
  }
  //callback
  //   setArrayPost1 = () => {
  //     this.props.onEvent(this.state.arrayDecant);
  //   };
  pickerDocument = async (index, RowID, ControlID) => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      const data64 = await RNFS.readFile(res.uri, 'base64');
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size,
        this.setState({nameDocument: res.name}),
      );
      var arrayTemp = [];
      arrayTemp['IsAdd'] = true;
      arrayTemp['Type'] = 1;
      arrayTemp['extension'] = '';
      arrayTemp['filename'] = res.name;
      arrayTemp['strBase64'] = data64;
      arrayTemp['type'] = res.type;
      this.setArrayDecantOfState(index, RowID, ControlID, arrayTemp);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  pickMultipleDocument = async (index, RowID, ControlID) => {
    // Pick multiple files
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      });
      for (const res of results) {
        console.log(
          res.uri,
          res.type, // mime type
          res.name,
          res.size,
        );
        const data64 = await RNFS.readFile(res.uri, 'base64');
        var arrayTemp = {};
        arrayTemp['IsAdd'] = true;
        arrayTemp['Type'] = 1;
        arrayTemp['extension'] = '';
        arrayTemp['filename'] = res.name;
        arrayTemp['strBase64'] = data64;
        arrayTemp['type'] = res.type;
        this.state.arrayCase14.push(arrayTemp);
      }
      this.setArrayDecantOfState(
        index,
        RowID,
        ControlID,
        this.state.arrayCase14,
      );
      this.setState({arrayDocument: results});
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  pickerImage = async (index, RowID, ControlID) => {
    let options = {
      storageOptions: {
        skipBackup: false,
        path: 'images',
      },
    };
    await launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('user cancelled image picker');
      } else if (response.error) {
        console.log('image picker error', response.error);
      } else if (response.customButton) {
        console.log('user tapped custom button ', response.customButton);
      } else {
        this.setState({uriImage: response.uri});
        var arrayTemp = [];
        arrayTemp['IsAdd'] = true;
        arrayTemp['Type'] = 1;
        arrayTemp['extension'] = '';
        arrayTemp['filename'] = response.fileName;
        arrayTemp['strBase64'] = response.data;
        arrayTemp['type'] = response.type;
        this.setState({imageCase10: arrayTemp});
        this.setArrayDecantOfState(index, RowID, ControlID, arrayTemp);
      }
    });
  };
  pickMultipleImage = async (index, RowID, ControlID) => {
    let temp = '';
    ImagePickerCrop.openPicker({
      multiple: true,
      waitAnimationEnd: false,
    })
      .then((images) => {
        images.map(async (i) => {
          temp = await ImgToBase64.getBase64String(i.path)
            .then(async (base64String) => {
              let arrayTemp = {};
              // temp = await ImgToBase64.getBase64String(i.path)
              //   .then((base64String) => {
              //     return base64String;
              //   })
              //   .catch((err) => doSomethingWith(err));
              let a = await RNFS.readFile(i.path, 'base64');
              temp = base64String;
              arrayTemp['IsAdd'] = true;
              arrayTemp['Type'] = 1;
              arrayTemp['extension'] = '';
              arrayTemp['filename'] = i.path.split('/').slice(-1) + '';
              arrayTemp['strBase64'] = a;
              arrayTemp['type'] = i.mime;
              this.state.arrayImageCase12.push(arrayTemp);
              this.setArrayDecantOfState(
                index,
                RowID,
                ControlID,
                this.state.arrayImageCase12,
              );

              return base64String;
            })
            .catch((err) => doSomethingWith(err));
        }),
          this.setState({
            image: null,
            images: images.map((i) => {
              return {
                uri: i.path,
                width: i.width,
                height: i.height,
                mime: i.mime,
              };
            }),
          });
      })
      .catch((e) => alert(e));
  };
  onSwitch() {
    this.setState({Switch: !this.state.Switch});
  }
  onCheckBox() {
    this.setState({CheckBox: !this.state.CheckBox});
  }
  setArrayDecantOfState = async (index, RowID, ControlID, value) => {
    var arrayTemp = {};
    arrayTemp['RowID'] = RowID;
    arrayTemp['ControlID'] = ControlID;
    arrayTemp['Value'] = value;
    this.state.arrayDecant[index] = arrayTemp;
    this.props.onEvent(this.state.arrayDecant); //error
  };
  setArrayDecantOfStateFirst = async (mang) => {
    this.state.arrayDecant.map((item, index) => {
      var arrayTemp = {};
      let temp = '';
      switch (item.ControlID) {
        case 3:
          temp = '10-20-2020';
          break;
        case 7:
          temp = false;
          break;
        case 8:
          temp = false;
          break;
        default:
          break;
      }
      arrayTemp['RowID'] = item.RowID;
      arrayTemp['ControlID'] = item.ControlID;
      arrayTemp['Value'] = temp;
      this.state.arrayDecant[index] = arrayTemp;
    });
    this.props.onEvent(this.state.arrayDecant); //error
    // console.log('==> test: ', this.state.arrayDecant);
  };
  takePics = () => {
    ImagePickerCrop.openPicker({
      width: 200,
      height: 200,
      compressImageMaxHeight: 400,
      compressImageMaxWidth: 400,
      cropping: true,
      multiple: true,
    }).then((response) => {
      let tempArray = [];
      console.log('responseimage-------' + response);
      this.setState({arrayUriImage: response});
      console.log('responseimagearray' + this.state.arrayUriImage);
      response.forEach((item) => {
        let image = {
          uri: item.path,
          // width: item.width,
          // height: item.height,
        };
        console.log('imagpath==========' + image);
        tempArray.push(image);

        console.log('imagpath==========' + image);
      });
    });
  };
  showDatepicker = () => {
    this.setState({show: true});
    this.setState({mode: 'date'});
  };
  showTimepicker = () => {
    this.setState({show: true});
    this.setState({mode: 'time'});
  };
  chon = (selectedDate) => {
    // const currentDate = selectedDate.format('MMM Do YY');
    // this.setState({date: selectedDate});
    console.log('==> :', selectedDate);
    console.log('==> :', currentDate);
  };
  renderImage(image) {
    return (
      <View style={{flex: 1}}>
        <Image
          style={{
            width: 100,
            height: 110,
            resizeMode: 'cover',
            borderRadius: 5,
            marginRight: 5,
            marginTop: 5,
          }}
          source={image}
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            borderRadius: 10,
            backgroundColor: '#9E9494',
          }}>
          <Image
            source={require('../assets/icon_close.png')}
            style={{
              width: 20,
              height: 20,
              tintColor: '#4C4646',
              borderRadius: 15,
            }}></Image>
        </TouchableOpacity>
      </View>
    );
  }
  renderAsset(image) {
    if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
      return this.renderVideo(image);
    }
    return this.renderImage(image);
  }

  get(temp, itemTemp) {
    switch (temp) {
      case 1:
        return (
          <TextInput
            onChangeText={
              (value) =>
                this.setArrayDecantOfState(
                  this.props.index,
                  this.props.item.RowID,
                  this.props.item.ControlID,
                  value,
                )
              // onEndEditing={(value) =>
              //   this.setArrayDecantOfState(
              //     this.props.index,
              //     this.props.item.RowID,
              //     this.props.item.ControlID,
              //     value.nativeEvent.text,
              //   )
            }
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 5,
              height: 40,
            }}></TextInput>
        );
      case 2:
        return (
          <TextInput
            onChangeText={(value) =>
              this.setArrayDecantOfState(
                this.props.index,
                this.props.item.RowID,
                this.props.item.ControlID,
                parseInt(value),
              )
            }
            keyboardType="number-pad"
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 5,
              height: 40,
            }}></TextInput>
        );
      case 3:
        return (
          <DatePicker
            date={this.state.date}
            format="MM-DD-YYYY"
            style={{
              borderColor: 'gray',
              height: 40,
              width: '50%',
            }}
            mode={'date'}
            onDateChange={(date) => {
              this.setState({date: date}),
                this.setArrayDecantOfState(
                  this.props.index,
                  this.props.item.RowID,
                  this.props.item.ControlID,
                  date,
                );
            }}></DatePicker>
          // <View style={{flexDirection: 'row', height: 40}}>
          //   <Text
          //     style={{
          //       borderWidth: 1,
          //       borderRadius: 5,
          //       textAlign: 'center',
          //       borderColor: 'gray',
          //       width: '60%',
          //     }}>
          //     {this.state.date} {this.state.time}
          //   </Text>
          //   <TouchableOpacity
          //     onPress={this.showDatepicker}
          //     style={{
          //       width: '20%',
          //       backgroundColor: 'blue',
          //       justifyContent: 'center',
          //       alignItems: 'center',
          //       borderRadius: 5,
          //     }}>
          //     <Text>Chọn ngày</Text>
          //   </TouchableOpacity>
          //   <TouchableOpacity
          //     onPress={this.showTimepicker}
          //     style={{
          //       width: '20%',
          //       backgroundColor: 'blue',
          //       justifyContent: 'center',
          //       alignItems: 'center',
          //       borderRadius: 5,
          //     }}>
          //     <Text>Chọn giờ</Text>
          //   </TouchableOpacity>
          //   {this.state.show && (
          //     <DateTimePicker
          //       testID="dateTimePicker"
          //       value={this.state.date}
          //       mode={this.state.mode}
          //       is24Hour={true}
          //       display="default"
          //       onChange={(date) => this.chon(date)}
          //     />
          //   )}
          // </View>
        );
      case 4:
        return (
          <TextInput
            onChangeText={(value) =>
              this.setArrayDecantOfState(
                this.props.index,
                this.props.item.RowID,
                this.props.item.ControlID,
                value,
              )
            }
            multiline={true}
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 5,
              height: 60,
            }}></TextInput>
        );
      case 5:
        return (
          <Case5
            item={itemTemp}
            index={this.props.index}
            onEvent={this.setArrayDecantOfState}></Case5>
        );
      case 6:
        // <SelectMultiple
        //   items={fruits}
        //   renderLabel={renderLabel}
        //   selectedItems={this.state.selectedFruits}
        //   onSelectionsChange={this.onSelectionsChange}
        // />
        return (
          <Case6
            item={itemTemp}
            index={this.props.index}
            onEvent={this.setArrayDecantOfState}></Case6>
        );
      case 7:
        return (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Switch
              style={{width: 50}}
              onValueChange={() => {
                this.onSwitch(),
                  this.setArrayDecantOfState(
                    this.props.index,
                    this.props.item.RowID,
                    this.props.item.ControlID,
                    !this.state.Switch,
                  );
              }}
              value={this.state.Switch}></Switch>
            <Text> On/Off </Text>
          </View>
        );
      case 8:
        return (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CheckBox
              style={{width: 50}}
              onValueChange={() => {
                this.onCheckBox(),
                  this.setArrayDecantOfState(
                    this.props.index,
                    this.props.item.RowID,
                    this.props.item.ControlID,
                    !this.state.CheckBox,
                  );
              }}
              value={this.state.CheckBox}></CheckBox>
            <Text> On/Off </Text>
          </View>
        );
      case 9:
        return (
          <Case9
            item={itemTemp}
            index={this.props.index}
            onEvent={this.setArrayDecantOfState}></Case9>
        );
      case 10:
        return (
          // <View style={{flexDirection: 'column'}}>
          <ScrollView>
            <TouchableOpacity
              onPress={() => {
                this.pickerImage(
                  this.props.index,
                  this.props.item.RowID,
                  this.props.item.ControlID,
                );
              }}
              style={{
                backgroundColor: '#5d78ff',
                borderRadius: 5,
                height: 30,
                width: 80,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text> Chọn hình... </Text>
            </TouchableOpacity>
            {this.state.uriImage ? (
              <View style={{flex: 1, width: 105, height: 115}}>
                <Image
                  source={{
                    uri: this.state.uriImage == '' ? null : this.state.uriImage,
                  }}
                  resizeMode={'stretch'}
                  style={{
                    marginTop: 5,
                    width: 100,
                    height: this.state.uriImage != '' ? 110 : 0,
                    borderRadius: 5,
                  }}></Image>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    borderRadius: 10,
                    backgroundColor: '#9E9494',
                  }}
                  onPress={() => this.setState({uriImage: ''})}>
                  <Image
                    source={require('../assets/icon_close.png')}
                    style={{
                      width: 20,
                      height: 20,
                      tintColor: '#4C4646',
                      borderRadius: 15,
                    }}></Image>
                </TouchableOpacity>
              </View>
            ) : null}
          </ScrollView>
          // </View>
        );
      case 11:
      case 12:
        return (
          <View style={{flexDirection: 'column'}}>
            <TouchableOpacity
              onPress={() => {
                this.pickMultipleImage(
                  this.props.index,
                  this.props.item.RowID,
                  this.props.item.ControlID,
                );
              }}
              style={{
                backgroundColor: '#5d78ff',
                borderRadius: 5,
                height: 30,
                width: 120,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text> Chọn nhiều hình... </Text>
            </TouchableOpacity>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{marginTop: 5}}>
              {/* {this.state.image ? this.renderAsset(this.state.image) : null} */}
              {this.state.images
                ? this.state.images.map((i) => (
                    <View key={i.uri}>{this.renderAsset(i)}</View>
                  ))
                : null}
            </ScrollView>
          </View>
        );
      case 13:
        return (
          <View>
            <TouchableOpacity
              onPress={() =>
                this.pickerDocument(
                  this.props.index,
                  this.props.item.RowID,
                  this.props.item.ControlID,
                )
              }
              style={{
                backgroundColor: '#5d78ff',
                borderRadius: 5,
                height: 30,
                width: 80,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text> Chọn tệp... </Text>
            </TouchableOpacity>
            {this.state.nameDocument == '' ? null : (
              <View style={{width: 170, height: 50, justifyContent: 'center'}}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'blue',
                    height: 30,
                    marginRight: 10,
                    borderRadius: 5,
                    width: 160,
                  }}>
                  <Text numberOfLines={1} style={styles.textStyle}>
                    {this.state.nameDocument}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    borderRadius: 10,
                    backgroundColor: '#9E9494',
                  }}
                  onPress={() => this.setState({uriImage: ''})}>
                  <Image
                    source={require('../assets/icon_close.png')}
                    style={{
                      width: 20,
                      height: 20,
                      tintColor: '#4C4646',
                      borderRadius: 15,
                    }}></Image>
                </TouchableOpacity>
              </View>
            )}
          </View>
        );
      case 14:
        return (
          <View style={{flexDirection: 'column'}}>
            <TouchableOpacity
              onPress={() =>
                this.pickMultipleDocument(
                  this.props.index,
                  this.props.item.RowID,
                  this.props.item.ControlID,
                )
              }
              style={{
                backgroundColor: '#5d78ff',
                borderRadius: 5,
                height: 30,
                width: 120,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text> Chọn nhiều tệp... </Text>
            </TouchableOpacity>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {/*Showing the data of selected Multiple files*/}
              {this.state.arrayDocument.map((item, key) => (
                <View
                  key={key}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 5,
                    height: 50,
                  }}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'blue',
                      height: 30,
                      marginRight: 10,
                      borderRadius: 5,
                    }}>
                    <Text style={styles.textStyle}>
                      File Name: {item.name ? item.name : ''}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 0,
                      borderRadius: 10,
                      backgroundColor: '#9E9494',
                    }}
                    onPress={() => this.setState({uriImage: ''})}>
                    <Image
                      source={require('../assets/icon_close.png')}
                      style={{
                        width: 20,
                        height: 20,
                        tintColor: '#4C4646',
                        borderRadius: 15,
                      }}></Image>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        );
      default:
    }
  }
  render() {
    let index = this.props.index;
    return (
      <View style={[styles.viewdetailitem]}>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.detail_item_tieude]}>
            {this.state.arrayFirst.Title}
          </Text>
          {this.props.item.IsRequired ? (
            <Text style={{color: 'red'}}> *</Text>
          ) : null}
        </View>
        {this.get(this.props.item.ControlID, this.props.item)}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  background: {backgroundColor: 'red'},
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#5d78ff',
    height: 50,
  },
  viewdetailitem: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  detail_item_tieude: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  detail_item_mota: {
    fontSize: 15,
    marginLeft: 10,
    color: '#696969',
  },
  touchable: {
    borderBottomColor: '#CFCFCF',
  },
  textStyle: {
    fontSize: 15,
    marginHorizontal: 5,
  },
});
