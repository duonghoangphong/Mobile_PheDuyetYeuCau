import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
const api = 'http://192.168.3.92:6969/';
const api1 = 'http://192.168.1.3:6969/';
async function getAPI(strUrl, header = {}, showMsg = false) {
  var smethod = 'GET';
  var url = api + 'api/Values';
  try {
    const response = await fetch(url, {
      method: smethod,
    });
    const res = await response.json();
    if (res.ExceptionMessage != undefined) {
      // edit tuỳ từng object api
      console.log('[API]Lỗi API:', res);
      return -3;
    }
    console.log('ressssssssssssssssssssssssss', res);
    return res;
  } catch (error) {
    console.log('[API]Lỗi error:', error);
    if (showMsg)
      // Alert.alert("Lỗi mạng", "Kết nối server thất bại")
      return -1;
  }
}
async function post_api(
  strUrl,
  strBody = '',
  showMsg = false,
  chktoken = false,
) {
  var smethod = 'POST';
  if (strBody == '') smethod = 'GET';
  // let token = ROOTGlobal.loginToken;
  // if ((token == null || token.length < 3) && chktoken) {
  // 	// if (showMsg) Alert.alert('Bảo mật', 'Không tồn tại token người dùng');
  // 	return -2;
  // }
  try {
    const response = await fetch(api + strUrl, {
      method: smethod,
      headers: {
        Accept: 'application/json',
        'Accept-Encoding': 'gzip',
        'Content-Type': 'application/json',
        // InternalAPI: appConfig.InternalAPI,
      },
      body: strBody,
    });
    const res = await response.json();
    console.log('repson', res);
    if (res.ExceptionMessage != undefined) {
      // edit tuỳ từng object api
      console.log('[API]Lỗi API:', res);
      return -3;
    }
    console.log('post api res -----', res);
    return res;
  } catch (error) {
    console.log('[API]Lỗi error:', error);
    if (showMsg)
      // Alert.alert("Lỗi mạng", "Kết nối server thất bại")
      return -1;
  }
}
export default class testAPI extends Component {
  constructor(props) {
    super(props);
    this.phonenumber = '';
    this.state = {
      data: [],
      dataLogin: [],
    };
  }
  Post = async () => {
    this.phonenumber = await getAPI();
  };
  async componentDidMount() {
    var username = 'test@test';
    var password = '12345678';
    let phongdz = await post_api(
      `api/Test/dangNhap?username=${username}&password=${password}`,
      null,
    );
    console.log('phongdz---------', phongdz);
    this.setState({dataLogin: phongdz.data});
    let res = await getAPI();
    console.log('data-------------', res);
    this.setState({data: res});
    // if(res.status==1){

    // }
  }
  render() {
    const {dataLogin, data} = this.state;
    console.log('Gia tri data login ======', dataLogin);
    return (
      <View>
        <TouchableOpacity onPress={() => this.Post()}>
          <Text>Nhan vao day...</Text>
          <Text>{this.phonenumber}</Text>
        </TouchableOpacity>
        {/* {this.state.data.map((item, index) => { */}
        {data.map((item, index) => {
          // if (index == 1) {
          //   return (
          //     <View>
          //       <Text>{item}</Text>
          //     </View>
          //   );
          if (item.toString() == 'value1') {
            return (
              <View>
                <Text>{item}</Text>
              </View>
            );
          } else {
            return null;
          }
        })}

        {/* sssssss */}
        {this.state.dataLogin.map((item, index) => {
          return (
            <View>
              <Text>{item.status}</Text>
            </View>
          );
        })}
        <Text>{dataLogin.Holot}</Text>
      </View>
    );
  }
}
