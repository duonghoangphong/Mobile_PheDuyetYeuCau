import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import postRepBinhLuan from '../apis/postRepBinhLuan';
export default class LoadDSBinhLuan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hiden: false,
      noidung: '',
      idrep: '',
      hotenrep: '',
    };
  }
  click = async () => {
    await this.setState({hiden: !this.state.hiden});
    if (this.state.hiden) this.refs['IPref'].focus();
  };
  repBinhLuan = async (idrep = '') => {
    //binhluan.ID_YeuCau binhluan.Id_BinhLuan this.state.noidung binhluan.id_NguoiTao
    let temp = {};
    temp['ID_YeuCau'] = this.props.item.ID_YeuCau + '';
    temp['Id_BinhLuan'] = this.props.item.Id_BinhLuan + '';
    temp['NoiDung'] = this.state.noidung;
    temp['ID_Rep'] =
      idrep == '' ? this.props.item.id_NguoiTao + '' : idrep + '';

    let a = await postRepBinhLuan(temp);
    if (a == 1) {
      this.setState({hiden: false});
      this.props.loadDs();
    }
  };
  render() {
    const binhluan = this.props.item;
    return (
      <View
        style={{
          borderBottomColor: 'gray',
        }}>
        <View
          style={{
            marginVertical: 10,
          }}>
          {binhluan.NguoiTao.map((item, index) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  // backgroundColor: 'red',
                }}>
                {item.Image == '' ? (
                  <View
                    style={{
                      backgroundColor: 'blue',
                      width: 35,
                      height: 35,
                      borderRadius: 17,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginHorizontal: 5,
                    }}>
                    <Text>{item.VietTat}</Text>
                  </View>
                ) : (
                  <Image
                    source={{uri: item.Image}}
                    style={{
                      width: 35,
                      height: 35,
                      borderRadius: 20,
                      marginHorizontal: 5,
                    }}></Image>
                )}
                <View
                  style={{
                    // flexDirection: 'row',
                    backgroundColor: '#DADADA',
                    borderRadius: 10,
                    width: '87%',
                  }}>
                  <View style={{marginHorizontal: 5}}>
                    <Text style={{fontWeight: 'bold', color: 'blue'}}>
                      {item.HoTen}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontSize: 10}}>@{item.ChucVu} </Text>
                      <Text style={{fontSize: 10, color: 'blue'}}>
                        {'\t'} {binhluan.NgayTao}
                      </Text>
                    </View>
                  </View>
                  <View style={{marginHorizontal: 5, marginVertical: 10}}>
                    <Text>{binhluan.NoiDung}</Text>
                  </View>
                </View>
              </View>
            );
          })}
          <TouchableOpacity
            onPress={() => {
              this.click(), this.setState({hotenrep: ''});
            }}
            style={{
              marginLeft: '15%',
              // backgroundColor: '#6561D5',
              width: '20%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <Text>Trả lời</Text>
          </TouchableOpacity>
          {binhluan.DanhSachTraLoiBinhLuan.map((item, index) => {
            return (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 5,
                    // backgroundColor: '#C7EAFF',
                    marginLeft: 50,
                  }}>
                  {item.NguoiTraLoi.map((item, index) => {
                    return (
                      <View
                        style={{
                          flexDirection: 'row',
                          // backgroundColor: 'yellow',
                          marginHorizontal: 5,
                        }}>
                        {item.Image == '' ? (
                          <View
                            style={{
                              backgroundColor: 'blue',
                              width: 35,
                              height: 35,
                              borderRadius: 17,
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginHorizontal: 5,
                            }}>
                            <Text>{item.VietTat}</Text>
                          </View>
                        ) : (
                          <Image
                            source={{uri: item.Image}}
                            style={{
                              width: 35,
                              height: 35,
                              borderRadius: 20,
                              marginHorizontal: 5,
                            }}></Image>
                        )}
                      </View>
                    );
                  })}
                  <View
                    style={{
                      width: '80%',
                      // flexDirection: 'row',
                      backgroundColor: '#DADADA',
                      borderRadius: 10,
                    }}>
                    {item.NguoiTraLoi.map((item, index) => {
                      return (
                        <View
                          style={{
                            marginHorizontal: 5,
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text style={{fontWeight: 'bold', color: 'blue'}}>
                            {item.HoTen}
                          </Text>
                          <Text style={{fontSize: 10}}> @{item.ChucVu}</Text>
                        </View>
                      );
                    })}
                    <Text style={{marginHorizontal: 5, marginVertical: 10}}>
                      {item.NoiDung}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    {
                      this.click(item.NguoiTao),
                        this.setState({
                          hotenrep:
                            item.NguoiTraLoi.map((item, index) => item.HoTen) +
                            '',
                        });
                    }
                  }}
                  style={{
                    marginLeft: '30%',
                    // backgroundColor: '#6561D5',
                    width: '20%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                  }}>
                  <Text>Trả lời</Text>
                </TouchableOpacity>
              </View>
            );
          })}
          {this.state.hiden ? (
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 110,
                justifyContent: 'center',
              }}>
              <TextInput
                placeholder={'Nhập bình luận ...'}
                ref={'IPref'}
                style={{
                  borderWidth: 1,
                  marginVertical: 5,
                  height: 40,
                  width: '85%',
                  borderRadius: 20,
                  backgroundColor: '#D0D0D0',
                }}
                onChangeText={(value) => this.setState({noidung: value})}>
                {this.state.hotenrep == ''
                  ? null
                  : '@' + this.state.hotenrep + ' '}
              </TextInput>
              <TouchableOpacity
                onPress={() => this.repBinhLuan()}
                style={{
                  // backgroundColor: 'blue',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '20%',
                  borderRadius: 20,
                }}>
                <Text style={{fontSize: 20}}>Gửi</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {},
});
// this.refs['IPref'].focus()
// ref={'IPref'}
