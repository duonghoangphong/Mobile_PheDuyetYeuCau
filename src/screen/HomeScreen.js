import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
  SafeAreaView,
  TextInput,
  ImageBackground,
  Button,
  FlatList,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import Utils from '../app/Utils';
import signalr from 'react-native-signalr';
import {appConfig} from '../app/Config';
import Modal from 'react-native-modal';
import getDetailHomeScreen from '../apis/getDetailHomeScreen';
import CheckBox from '@react-native-community/checkbox';
import {ScrollView} from 'react-native-gesture-handler';
import HeaderCustom from '../componentCustom/HeaderCustom';
import FontSize from '../componentCustom/FontSize';
import DetailsScreen from './DetailScreen';
import {nstyles} from '../styles/styles';
import {nGlobalKeys} from '../app/data/globalKey';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {ROOTGlobal} from '../app/data/dataGlobal';
const dataFLNgang = [
  {
    keyNgang: '0',
    DuLieu: 'Tất cả',
  },
  {
    keyNgang: '1',
    DuLieu: 'Đã Duyệt',
  },
  {
    keyNgang: '2',
    DuLieu: 'Đã Từ chối',
  },
  {
    keyNgang: '3',
    DuLieu: 'Đang chờ duyệt',
  },
  {
    keyNgang: '4',
    DuLieu: 'Đang chờ',
  },
];
const iconMenu = require('../assets/icon_menu.png');
const timkiem = require('../assets/icon_search.png');

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      array: [],
      arrayListOld: [],
      keySearch: '',
      id: 'TenYeuCau',
      filter: true,
      idmau: 0,
    };
    // StatusBar.setBackgroundColor('#5d78ff');
  }
  search = (searchText, id = 'TenYeuCau') => {
    this.setState({keySearch: searchText});
    // let filteredData = this.state.arrayList.filter(function (item) {
    //   return item.TenLoaiYeuCau.includes(searchText);
    // });
    let filteredData = this.state.array.filter((item) =>
      Utils.removeAccents(item[id])
        .toUpperCase()
        .includes(Utils.removeAccents(searchText.toUpperCase())),
    );
    if (searchText == '') filteredData = this.state.arrayListOld;
    this.setState({array: filteredData});
  };
  loadDS = async (tinhtrang = 0) => {
    // connection.stop();
    console.log(tinhtrang);
    this.setState({array: await getDetailHomeScreen(tinhtrang)});
    this.setState({arrayListOld: await getDetailHomeScreen(tinhtrang)});
    // console.log('==> array: ', this.state.array);
  };
  renderItemNgang = ({item}) => {
    return (
      <View style={styles.title1}>
        <TouchableOpacity
          onPress={() => {
            this.loadDS(item.keyNgang), console.log(item.keyNgang);
          }}>
          <Text
            style={{
              marginHorizontal: 10,
              fontSize: 15,
              color: 'white',
            }}>
            {item.DuLieu}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  renderTest = () => {
    return <DetailItem></DetailItem>;
  };
  componentDidMount = () => {
    this.loadDS(0);
  };

  showModal = () => {
    this.props.navigation.navigate('Search');
  };
  keyExtractorNgang = (item, index) => index.toString();
  render() {
    const modal = this.state.modal;
    return (
      // <View>
      <View style={{flex: 1}}>
        <View style={styles.bgHeader}>
          <TouchableOpacity
            style={{width: FontSize.Width(10)}}
            // onPress={() => temp.navigation.openDrawer()}
          >
            <Image source={iconMenu} style={styles.icon}></Image>
          </TouchableOpacity>
          <TextInput
            ref={'IPref'}
            style={styles.headerStyle}
            placeholderTextColor="white"
            placeholder="Phê duyệt yêu cầu"
            onChangeText={(value) => this.search(value)}></TextInput>
          <TouchableOpacity
            // onPress={() => {
            //   IPref.current.focus();
            // }}
            onPress={() => this.refs['IPref'].focus()}
            style={styles.khung_icon}>
            <Image source={timkiem} style={styles.icon}></Image>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({filter: !this.state.filter})}
            style={{width: FontSize.Width(10)}}>
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
        <View>
          <FlatList
            horizontal={true}
            renderItem={this.renderItemNgang}
            keyExtractor={this.keyExtractorNgang}
            data={dataFLNgang}
          />
          <FlatList
            renderItem={({item, index}) => {
              return (
                <DetailItem
                  item={item}
                  index={index}
                  navigation={this.props.navigation}
                />
              );
            }}
            refreshing={this.state.modal}
            onRefresh={() => this.setState({modal: false})}
            keyExtractor={this.keyExtractorNgang}
            data={this.state.array}
          />
        </View>

        <TouchableOpacity
          style={{position: 'absolute', right: 20, bottom: 20}}
          onPress={() => this.showModal()}>
          <Image
            source={require('../assets/icon_add.png')}
            style={[
              nstyles.nIcon50,
              {
                tintColor: '#5d78ff',
                backgroundColor: 'white',
                borderRadius: 25,
              },
            ]}></Image>
        </TouchableOpacity>
      </View>
    );
  }
}
export class DetailItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boolean: false,
      color: 'gray',
    };
  }
  abc = (tinhtrang) => {
    switch (tinhtrang) {
      case 0:
        return (
          // <Image
          //   source={require('../assets/icon_stopwatch.png')}
          //   style={{
          //     width: 15,
          //     height: 15,
          //     position: 'absolute',
          //     right: 0,
          //     bottom: 0,
          //   }}></Image>
          null
        );
        break;
      case 1:
        return (
          <Image
            source={require('../assets/icon_check.png')}
            style={{
              width: 15,
              height: 15,
              position: 'absolute',
              right: 0,
              bottom: 0,
            }}></Image>
        );
        break;
      case 2:
        return (
          <Image
            source={require('../assets/icon_uncheck.png')}
            style={{
              width: 15,
              height: 15,
              position: 'absolute',
              right: 0,
              bottom: 0,
            }}></Image>
        );
        break;
      default:
        break;
    }
  };
  getAvatar = (tinhtrang) => {
    switch (tinhtrang) {
      case 0:
        return (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              // source={require('../assets/icon_stopwatch.png')}
              style={{
                backgroundColor: 'yellow',
                width: 20,
                height: 20,
              }}></Image>
          </View>
        );
        break;
      case 1:
        return (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/icon_checked.png')}
              style={{
                backgroundColor: '#49B046',
                width: 20,
                height: 20,
              }}></Image>
          </View>
        );
        break;
      case 2:
        return (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/icon_crossed.png')}
              style={{
                backgroundColor: '#FF616B',
                width: 20,
                height: 20,
              }}></Image>
          </View>
        );
        break;
      default:
        break;
    }
  };
  render() {
    return (
      <TouchableOpacity
        style={{
          borderBottomWidth: 2,
          borderColor: '#CFCFCF',
          // marginBottom: 5,
        }}
        onPress={() => {
          console.log(this.props.item.RowID),
            Utils.goscreen(this, 'Details', {
              temp: this.props.item.RowID,
            });
        }}>
        <View style={styles.background}>
          <View style={styles.checkbox}>
            {/* <CheckBox
              value={this.props.index % 2 == 0 ? true : this.state.boolean}
              onValueChange={() =>
                this.setState({boolean: !this.state.boolean})
              }></CheckBox> */}
            {this.getAvatar(this.props.item.Id_TinhTrang)}
          </View>
          <View>
            {/* {console.log(this.props)} */}
            <View style={styles.datetime}>
              <Text style={styles.title} numberOfLines={1}>
                {this.props.item.TenYeuCau}
              </Text>
              <Text>{this.props.item.NgayTao}</Text>
            </View>
            <Text style={{color: 'gray'}}>{this.props.item.TenNhomYeuCau}</Text>
            <View style={styles.nguoiyeucau}>
              {/* <Avatar.Image
                source={{
                  uri:
                    'https://i.pinimg.com/236x/4b/81/77/4b81778263d5f5f51df7e26ff40f7bb8.jpg',
                }}
                size={30}
              /> */}
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  marginHorizontal: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#4B92E9',
                }}>
                <Text style={{fontSize: 15}}>
                  {Utils.cutAString(
                    this.props.item.NguoiTao.map((item, index) => item.HoTen),
                  )}
                </Text>
              </View>
              <View style={{width: '35%'}}>
                <Text style={{width: 120}} numberOfLines={1}>
                  {this.props.item.NguoiTao.map((item, index) => item.HoTen)}
                </Text>
                <Text style={{color: 'gray'}}>
                  {this.props.item.NguoiTao.map((item, index) => item.ChucVu)}
                </Text>
              </View>
              <Image
                source={require('../assets/icon_next.png')}
                style={{width: 20, height: 20, tintColor: '#C0C0C0'}}></Image>
              <View style={{flexDirection: 'row'}}>
                {this.props.item.danhSachNguoiDuyet.map((item, index) => {
                  if (
                    this.props.item.danhSachNguoiDuyet.length > 3 &&
                    index == 2
                  )
                    return (
                      <View>
                        <View
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: 15,
                            marginHorizontal: 2,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'gray',
                          }}>
                          <Text style={{fontSize: 10}}>
                            {this.props.item.danhSachNguoiDuyet.length - 2}+
                          </Text>
                        </View>
                      </View>
                    );
                  if (
                    this.props.item.danhSachNguoiDuyet.length > 3 &&
                    index < 3
                  )
                    return (
                      <View>
                        <View
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: 15,
                            marginHorizontal: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#4B92E9',
                          }}>
                          <Text style={{fontSize: 15}}>
                            {Utils.cutAString(item.HoTen)}
                          </Text>
                        </View>
                        {this.abc(item.Status)}
                      </View>
                    );
                  if (this.props.item.danhSachNguoiDuyet.length <= 3)
                    return (
                      <View>
                        <View
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: 15,
                            marginHorizontal: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#4B92E9',
                          }}>
                          <Text style={{fontSize: 15}}>
                            {Utils.cutAString(item.HoTen)}
                          </Text>
                        </View>
                        {this.abc(item.Status)}
                      </View>
                    );
                })}
                {/* <View style={styles.nguoiduyet}>
                  <Avatar.Image
                    source={{
                      uri:
                        'https://www.europeanceo.com/wp-content/uploads/2017/08/CEO-magic-touch.jpg',
                    }}
                    size={30}></Avatar.Image>
                  <Image
                    source={require('../assets/icon_check.png')}
                    style={{
                      height: 15,
                      width: 15,
                      position: 'absolute',
                      borderRadius: 10,
                      right: 0,
                      bottom: 0,
                    }}></Image>
                </View> */}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
// const height_logo = height * 0.28;

const styles = StyleSheet.create({
  // imagebackgroud: {
  //   width: width,
  //   height: height,
  // },
  title1: {
    borderTopWidth: 1,
    backgroundColor: '#5d78ff',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 10,
    // borderTopWidth: 1,
    // backgroundColor: 'red',
  },
  checkbox: {
    width: 40,
    // justifyContent: 'center',
  },
  nguoiyeucau: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'green',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '50%',
  },
  nguoiduyet: {
    // marginLeft: 30,
    // flexDirection: 'row',
  },
  datetime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'yellow',
    width: FontSize.Width(85),
  },
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
