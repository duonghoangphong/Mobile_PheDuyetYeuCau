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
import DetailItem from '../componentCustom/getComponentDetail';

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      arrayPost: [],
      tenyeucau: 'Phong lam nay!',
    };
  }

  componentDidMount = async () => {
    let temp = await getDetail(
      'Id_LoaiYeuCau',
      this.props.route.params.temp + '',
    );
    console.log(temp);
    this.setState({data: temp});
  };
  setArrayPost = async (array) => {
    this.setState({arrayPost: array});
  };
  guiYeuCau = async () => {
    var array = {};
    array['TenYeuCau'] = this.state.tenyeucau;
    array['Id_LoaiYeuCau'] = this.props.route.params.temp;

    var array1 = [];
    array1.push(array);

    let arrayTemp = {};
    arrayTemp['DataFields'] = this.state.arrayPost;
    arrayTemp['DataYeuCau'] = array1;

    Utils.nlog('==> Duyet yeu cau: ', await postNewDetailRequest(arrayTemp));
    Utils.nlog('==> Mang cuoi cung: ', arrayTemp);
    this.props.navigation.replace('Main');
  };
  keyExtractorNgang = (item, index) => index.toString();

  render() {
    return (
      <View
        style={{
          marginHorizontal: 20,
          marginVertical: 40,
          backgroundColor: 'white',
          height: '80%',
        }}>
        <View
          style={[
            {justifyContent: 'space-between', paddingHorizontal: 10},
            styles.title,
          ]}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              color: 'white',
            }}>
            CHI TIẾT YÊU CẦU
          </Text>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image
              source={require('../assets/icon_close.png')}
              style={{
                height: 20,
                width: 20,
                tintColor: 'white',
              }}></Image>
          </TouchableOpacity>
        </View>
        <View></View>
        <View style={[styles.viewdetailitem]}>
          <Text style={[styles.detail_item_tieude]}>Tên yêu cầu</Text>
          <TextInput
            onChangeText={(text) => this.setState({tenyeucau: text})}
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 5,
              height: 40,
            }}></TextInput>
        </View>
        <FlatList
          renderItem={({item, index}) => {
            return (
              <DetailItem
                item={item}
                index={index}
                navigation={this.props.navigation}
                onEvent={this.setArrayPost}
                data={this.state.data}
              />
            );
          }}
          keyExtractor={this.keyExtractorNgang}
          data={this.state.data}
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 5,
          }}>
          <TouchableOpacity
            onPress={() => this.guiYeuCau()}
            style={{
              height: 40,
              width: 100,
              backgroundColor: 'blue',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              Gửi yêu cầu
            </Text>
          </TouchableOpacity>
        </View>
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
