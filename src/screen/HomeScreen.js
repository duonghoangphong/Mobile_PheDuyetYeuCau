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
    keyNgang: '1',
    DuLieu: 'Tất cả',
  },
  {
    keyNgang: '2',
    DuLieu: 'Đến lượt duyệt',
  },
  {
    keyNgang: '3',
    DuLieu: 'Qua hạn duyệt',
  },
  {
    keyNgang: '4',
    DuLieu: 'Đang chở duyệt',
  },
  {
    keyNgang: '5',
    DuLieu: 'Đã chấp thuận',
  },
  {
    keyNgang: '6',
    DuLieu: 'Đã từ chối',
  },
  {
    keyNgang: '7',
    DuLieu: 'Đã đánh dấu',
  },
  {
    keyNgang: '8',
    DuLieu: 'Đã lưu nháp',
  },
  {
    keyNgang: '9',
    DuLieu: 'Đã lưu nháp',
  },
];
// const [isSelected, setSelection] = React.useState(false);
const connection = signalr.hubConnection(appConfig.domain);
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    // this.showAddModal = this.showAddModal.bind(this);z
    this.state = {
      modal: false,
      array: [],
    };
  }
  renderItemNgang = ({item}) => {
    return (
      <View style={styles.title1}>
        <TouchableOpacity>
          <Text style={{marginHorizontal: 10, fontSize: 15, color: 'white'}}>
            {item.DuLieu}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  renderTest = () => {
    return <DetailItem></DetailItem>;
  };
  componentDidMount = async () => {
    //This is the server under /example/server published on azure.
    var _token = Utils.getRootGlobal(ROOTGlobal.loginToken);
    console.log('_token: ', _token);

    connection.logging = true;

    const proxy = connection.createHubProxy('pheDuyetYeuCauHub');
    //receives broadcast messages from a hub function, called "helloApp"
    proxy.on('checkAllOnlineDSYeuCau', (temp) => {
      console.log('message-from-server', temp);
      //Here I could response by calling something else on the server...
    });

    connection.qs = {Token: _token};

    // atempt connection, and handle errors
    connection
      .start()
      .done(() => {
        console.log('Now connected, connection ID=' + connection.id);
        proxy
          .invoke('helloServer', 'Hello Server, how are you?')
          .done((directResponse) => {
            console.log('direct-response-from-server', directResponse);
          })
          .fail(() => {
            console.warn(
              'Something went wrong when calling server, it might not be up and running?',
            );
          });
      })
      .fail(() => {
        console.log('Failed');
      });

    //connection-handling
    connection.connectionSlow(() => {
      console.log(
        'We are currently experiencing difficulties with the connection.',
      );
    });

    connection.error((error) => {
      const errorMessage = error.message;
      let detailedError = '';
      if (error.source && error.source._response) {
        detailedError = error.source._response;
      }
      if (
        detailedError ===
        'An SSL error has occurred and a secure connection to the server cannot be made.'
      ) {
        console.log(
          'When using react-native-signalr on ios with http remember to enable http in App Transport Security https://github.com/olofd/react-native-signalr/issues/14',
        );
      }
      console.debug('SignalR error: ' + errorMessage, detailedError);
    });
    // connection.stop();
    this.setState({array: await getDetailHomeScreen()});
    console.log('==> array ò: ', this.state.array);
  };
  showModal = () => {
    // this.props.navigation.navigate('Search');
    // this.setState({modal: !this.state.modal});
    // showMessage({
    //   message: 'aaaaaaaaaaaaaaaaaaaaaaaaaa',
    //   type: 'danger',
    // });
    //   this.connection.qs = { "Token": _token };
    // this.connection.stop()
    var _token = Utils.getRootGlobal(ROOTGlobal.loginToken);
    // const connection = signalr.hubConnection(appConfig.domain);
    connection.qs = {Token: _token};
    let a = connection.stop();
    console.log('dskjfbdskhfdsfgkjdsfgksdjfgkjsdfdsf: ', a);
  };
  keyExtractorNgang = (item, index) => index.toString();
  render() {
    const modal = this.state.modal;
    return (
      // <View>
      <View style={{flex: 1}}>
        <View>
          {/* {modal == true ? <ModalCustom temp={true}></ModalCustom> : null} */}
          {/* <ModalCustom></ModalCustom> */}
          <HeaderCustom temp={this.props}></HeaderCustom>
          <FlatList
            horizontal={true}
            renderItem={this.renderItemNgang}
            keyExtractor={this.keyExtractorNgang}
            data={dataFLNgang}
          />
          {/* abc */}
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
          {/* <FlatList renderItem={this.renderTest}></FlatList> */}
          {/* {'123456789'.split('').map(({item, index}) => (
            <DetailItem key={index}></DetailItem>
          ))} */}
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
      // </View>
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
  render() {
    return (
      <TouchableOpacity
        style={{
          // backgroundColor: this.props.index % 2 == 0 ? '#DDDDDD' : 'null',
          // backgroundColor: '#CFCFCF50',
          borderBottomWidth: 2,
          borderColor: '#CFCFCF',
          // marginBottom: 5,
        }}
        onPress={() =>
          Utils.goscreen(this, 'Details', {
            temp: this.props.item.RowID,
          })
        }>
        <View style={styles.background}>
          <View style={styles.checkbox}>
            <CheckBox
              value={this.props.index % 2 == 0 ? true : this.state.boolean}
              onValueChange={() =>
                this.setState({boolean: !this.state.boolean})
              }></CheckBox>
          </View>
          <View>
            {console.log(this.props)}
            <View style={styles.datetime}>
              <Text style={styles.title}>Đề xuất nghĩ phép</Text>
              <Text>{this.props.item.NgayTao}</Text>
            </View>
            <Text style={{color: 'gray'}}>Bộ phận: IT - Phòng kỹ thuật</Text>
            <View style={styles.nguoiyeucau}>
              <Avatar.Image
                source={{
                  uri:
                    'https://i.pinimg.com/236x/4b/81/77/4b81778263d5f5f51df7e26ff40f7bb8.jpg',
                }}
                size={30}
              />
              <View>
                <Text>
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
                <View style={styles.nguoiduyet}>
                  <Avatar.Image
                    source={{
                      uri:
                        'https://i.ndh.vn/2020/07/23/capture-png4-4179-1595475143.png',
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
                </View>
                <View style={styles.nguoiduyet}>
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
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
// const height = Dimensions.get('screen').height;
// const width = Dimensions.get('screen').width;
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
});
