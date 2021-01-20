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

class Case5 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mang: [],
      isOpen: false,
      value: '',
    };
  }
  loadDS = async () => {
    let temp = await getItem(this.props.item.RowID);
    let tempmang = temp.map((item) => {
      var ritem = {};
      ritem['value'] = item.RowID + '';
      ritem['label'] = item.Title;
      return ritem;
    });
    await this.setState({mang: tempmang});
  };
  componentDidMount = async () => {
    this.loadDS();
  };
  render() {
    return (
      <View
        style={{
          minHeight: this.state.isOpen ? 50 * this.state.mang.length : 0,
        }}>
        <DropDownPicker
          onOpen={() => {
            this.setState({
              isOpen: true,
            });
          }}
          items={this.state.mang}
          style={{minHeight: 50}}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          onClose={() => {
            this.setState({isOpen: false});
          }}
          dropDownStyle={{backgroundColor: 'gray', position: 'absolute'}}
          onChangeItem={(item) => {
            this.setState({
              value: item.value,
            }),
              this.props.onEvent(
                this.props.index,
                this.props.item.RowID,
                this.props.item.ControlID,
                parseInt(item.value),
              );
          }}></DropDownPicker>
      </View>
    );
  }
}

class Case6 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFruits: [],
      isSelected: '',
      Fruits: [],
    };
  }
  renderLabel = (Title) => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{marginLeft: 10}}>
          <Text>{Title}</Text>
        </View>
      </View>
    );
  };
  onSelectionsChange = async (selectedFruits) => {
    let temp = selectedFruits.map((item, index) => {
      var ritem = {};
      ritem = item.value;
      return ritem;
    });
    await this.setState({Fruits: selectedFruits});
    this.props.onEvent(
      this.props.index,
      this.props.item.RowID,
      this.props.item.ControlID,
      temp,
    );
  };
  componentDidMount = async () => {
    let temp = await getItem(this.props.item.RowID);
    let tempmang = temp.map((item) => {
      var ritem = {};
      ritem['value'] = item.RowID + '';
      ritem['label'] = item.Title;
      return ritem;
    });
    await this.setState({selectedFruits: tempmang});
  };
  render() {
    return (
      <View>
        <SelectMultiple
          items={this.state.selectedFruits}
          renderLabel={this.renderLabel}
          selectedItems={this.state.Fruits}
          onSelectionsChange={(item) => this.onSelectionsChange(item)}
        />
      </View>
    );
  }
}

class Case9 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value3Index: '',
      mang: [],
    };
  }
  componentDidMount = async () => {
    let temp = await getItem(this.props.item.RowID);
    let tempmang = temp.map((item) => {
      var ritem = {};
      ritem['value'] = item.RowID + '';
      ritem['label'] = item.Title;
      return ritem;
    });
    await this.setState({mang: tempmang});
  };
  radioClick = (value) => {
    this.setState({value3Index: value});
    this.props.onEvent(
      this.props.index,
      this.props.item.RowID,
      this.props.item.ControlID,
      value,
    );
  };
  render() {
    const mang = this.state.mang;
    return (
      <View>
        <RadioForm formHorizontal={true} animation={true}>
          {/* To create radio buttons, loop through your array of options */}
          {mang.map((obj, i) => (
            <RadioButton labelHorizontal={true} key={i}>
              {/*  You can set RadioButtonLabel before RadioButtonInput */}
              <RadioButtonInput
                obj={obj}
                index={i}
                isSelected={this.state.value3Index == obj.value}
                // isSelected={true}
                onPress={(value) => {
                  this.radioClick(value);
                  // this.setState({value3Index: value});
                  // alert(i),
                  // alert(value);
                  // alert(obj.label);
                }}
                borderWidth={1}
                buttonInnerColor={'blue'}
                buttonOuterColor={
                  this.state.value3Index === i ? '#2196f3' : '#000'
                }
                buttonSize={20}
                buttonOuterSize={20}
                buttonStyle={{}}
                buttonWrapStyle={{marginLeft: 10}}
              />
              <RadioButtonLabel
                obj={obj}
                index={i}
                labelHorizontal={true}
                onPress={(value) =>
                  // this.setState({value3Index: value})
                  this.radioClick(value)
                }
                labelStyle={{fontSize: 20}}
                labelWrapStyle={{}}
              />
            </RadioButton>
          ))}
        </RadioForm>
      </View>
    );
  }
}

export {Case5, Case6, Case9};
