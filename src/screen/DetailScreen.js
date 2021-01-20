import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  ScrollView,
  TextInput,
} from 'react-native';
import {ROOTGlobal} from '../app/data/dataGlobal';
import getThongTinChiTiet from '../apis/getThongTinChiTiet';
import getTinhTrangDuyet from '../apis/getTinhTrangDuyet';
import getComponent from '../apis/getComponent';
import getDSNguoiDuyet from '../apis/getDSNguoiDuyet';
import postXetDuyet from '../apis/postXetDuyet';
import getDSBinhLuanLoad from '../apis/getDSBinhLuanLoad';
import LoadDSBinhLuan from '../componentCustom/LoadDSBinhLuan';
import postBinhLuan from '../apis/postBinhLuan';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinerGradient from 'react-native-linear-gradient';
import {showMessage} from 'react-native-flash-message';

export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      NhanVien: '',
      NoiDungYeuCau: [],
      danhSachNguoiDuyet: [],
      tinhTrang: '',
      dsBinhLuan: [],
      binhluan: '',
    };
  }
  hienChiTiet = (Status, TrangThai, IDTinhTrang, idyeucau) => {
    if (Status == 4) return;
    switch (Status) {
      case 0:
        if (IDTinhTrang == 2)
          return (
            <View>
              <Text style={{color: 'red'}}>Yêu cầu này bị từ chối</Text>
            </View>
          );
        if (TrangThai)
          return (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderTopWidth: 1,
                marginVertical: 5,
              }}>
              <TouchableOpacity
                onPress={() => this.xetDuyet(idyeucau, 1)}
                style={styles.nut}>
                <Text>Duyệt</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.xetDuyet(idyeucau, 2)}
                style={styles.nut}>
                <Text>Từ chối</Text>
              </TouchableOpacity>
            </View>
          );
        else {
          return (
            <View>
              <Text style={{color: 'orange'}}>Vui lòng chờ tới lượt duyệt</Text>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                {/* <TouchableOpacity
                  onPress={() => this.xetDuyet(data.RowID, 1)}
                  style={styles.nut}>
                  <Text>Duyệt</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.xetDuyet(data.RowID, 2)}
                  style={styles.nut}>
                  <Text>Từ chối</Text>
                </TouchableOpacity> */}
              </View>
            </View>
          );
        }

        break;
      case 1:
        return (
          <View>
            <Text style={{color: 'green'}}>Bạn đã duyệt yêu cầu này</Text>
          </View>
        );
        break;
      case 2:
        return (
          <View>
            <Text style={{color: 'red'}}>Bạn đã từ chối yêu cầu này</Text>
          </View>
        );
        break;
      default:
        break;
    }
  };
  xetDuyet = async (id, value) => {
    let a = await postXetDuyet(id, value);
    if (a == 1) {
      showMessage({
        message: value == 1 ? 'Duyệt thành công !' : 'Từ chối thành công',
        type: value == 1 ? 'success' : 'warning',
      });
    }
    // ROOTGlobal.loadDSHome();
    // this.props.navigation.goBack();
    this.loadDS();
  };

  loadDSBinhLuan = async () => {
    let loadBinhLuan = await getDSBinhLuanLoad(this.props.route.params.temp);
    this.setState({dsBinhLuan: loadBinhLuan});
  };
  bihLuan = async () => {
    let temp = {};
    temp['ID_YeuCau'] = this.props.route.params.temp + '';
    temp['NoiDung'] = this.state.binhluan;

    let a = await postBinhLuan(temp);
    if (a == 1) {
      await this.setState({binhluan: ''});
      this.loadDSBinhLuan();
    }
  };
  componentWillUnmount() {
    this.componentDidMount();
  }
  loadDS = async () => {
    let temp = await getThongTinChiTiet(this.props.route.params.temp);
    let temp1 = await getTinhTrangDuyet(this.props.route.params.temp);
    this.loadDSBinhLuan();

    temp.map((item, index) => {
      this.setState({data: item});
    });
    this.state.data.NhanVien.map((item, index) => {
      this.setState({NhanVien: item});
    });
    let a = [];
    this.state.data.NoiDungYeuCau.map((item, index) => {
      a.push(item);
    });
    let b = [];
    this.state.data.danhSachNguoiDuyet.map((item, index) => {
      b.push(item);
    });

    let mang = {};
    if (temp1 == '') {
      mang['Status'] = 4;
      mang['TrangThai'] = false;
    } else mang = temp1[0];

    this.setState({tinhTrang: mang});
    this.setState({NoiDungYeuCau: a});
    this.setState({danhSachNguoiDuyet: b});

    // console.log('==> Data: ', this.state.data);
    // console.log('==> NhanVien: ', this.state.NhanVien);
    // console.log('==> NoiDungYeuCau: ', this.state.NoiDungYeuCau);
    // console.log('==> id_yeucau: ', this.props.route.params.temp);
    // console.log('==> ds binh luan: ', loadBinhLuan);
    // console.log('==> tinh trang: ', temp1);
    // console.log('==> danh sach nguoi duyet: ', this.state.danhSachNguoiDuyet);
  };
  componentDidMount = async () => {
    // console.log('==> Id_YeuCau: ', this.props.route.params.temp);
    this.loadDS();
  };
  keyExtractorNgang = (item, index) => index.toString();
  render() {
    console.log('==> idRowYeuCau: ', this.props.route.params.temp);
    const data = this.state.data;
    const tinhTrang = this.state.tinhTrang;
    const NhanVien = this.state.NhanVien;
    return (
      <ScrollView style={{backgroundColor: 'white', height: height}}>
        <LinerGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#5d78ff', '#00E6FF']}
          style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack(),
                ROOTGlobal.loadDSThongBao(),
                ROOTGlobal.loadDSHome(),
                ROOTGlobal.loadThongBao();
            }}>
            <Image
              source={require('../assets/icon_goback.png')}
              style={styles.hinh}></Image>
          </TouchableOpacity>
          <Text style={styles.title_header}> Yêu cầu </Text>
        </LinerGradient>
        <View style={styles.viewcon}>
          <View style={{}}>
            <View style={{marginHorizontal: 5}}>
              <Text style={styles.tieude}>{data.TenYeuCau}</Text>
              <Text>
                Tình trạng:{' '}
                <Text
                  style={{
                    color:
                      data.Id_TinhTrang == 0
                        ? 'rgb(173, 226, 98)'
                        : data.Id_TinhTrang == 1
                        ? 'green'
                        : 'red',
                  }}>
                  {data.Id_TinhTrang == 0
                    ? ' Yêu cầu chưa được duyệt'
                    : data.Id_TinhTrang == 1
                    ? ' Yêu cầu đã được duyệt'
                    : ' Yêu cầu đã từ chối'}
                </Text>
              </Text>
              {/* {console.log('==> tinhTrang: ', tinhTrang)}
              {console.log('==> data: ', data)}
              {console.log('==> temp: ', this.props.route.params.temp)} */}
              {this.hienChiTiet(
                tinhTrang.Status,
                tinhTrang.TrangThai,
                data.Id_TinhTrang,
                this.props.route.params.temp,
              )}
            </View>
            {/* {data.Hidden ? (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => this.xetDuyet(data.RowID, 1)}
                style={styles.nut}>
                <Text>Duyệt</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.xetDuyet(data.RowID, 2)}
                style={styles.nut}>
                <Text>Từ chối</Text>
              </TouchableOpacity>
            </View>
          ) : null} */}
          </View>
        </View>

        <View style={styles.viewcon}>
          <View style={{marginVertical: 10}}>
            <Text style={styles.tieude}>THÔNG TIN YÊU CẦU</Text>
            <View style={styles.thongtinyeucau}>
              <Image
                source={require('../assets/icon_user.png')}
                style={{
                  width: 17,
                  height: 17,
                  marginHorizontal: 5,
                }}></Image>
              <Text style={styles.thongtin}>Người tạo</Text>
              <Text>{NhanVien.HoTen}</Text>
            </View>
            <View style={styles.thongtinyeucau}>
              <Image
                source={require('../assets/icon_type.png')}
                style={{width: 17, height: 17, marginHorizontal: 5}}></Image>
              <Text style={styles.thongtin}>Loại yêu cầu</Text>
              <Text>{data.TenLoaiYeuCau}</Text>
            </View>
            <View style={styles.thongtinyeucau}>
              <Image
                source={require('../assets/icon_clock.png')}
                style={{width: 17, height: 17, marginHorizontal: 5}}></Image>
              <Text style={styles.thongtin}>Thời gian tạo</Text>
              <Text>{data.NgayTao}</Text>
            </View>
            <View style={styles.thongtinyeucau}>
              <Image
                source={require('../assets/icon_clock.png')}
                style={{width: 17, height: 17, marginHorizontal: 5}}></Image>
              <Text style={styles.thongtin}>Cập nhật gần nhất</Text>
              <Text>{data.CapNhatGanNhat}</Text>
            </View>
            <View style={styles.thongtinyeucau}>
              <Image
                source={require('../assets/icon_writing.png')}
                style={{width: 17, height: 17, marginHorizontal: 5}}></Image>
              <Text style={styles.thongtin}>Mô tả công việc</Text>
              <Text>{data.MoTa}</Text>
            </View>
          </View>
        </View>

        <View style={styles.viewcon}>
          <View style={{marginVertical: 10}}>
            <Text style={styles.tieude}>CHI TIẾT YÊU CẦU</Text>
            {/* {this.state.NoiDungYeuCau === [] ? console.log(1) : console.log(0)} */}
            <FlatList
              renderItem={({item, index}) => {
                return getComponent(item.ControlID, item.Title, item.Value);
              }}
              keyExtractor={this.keyExtractorNgang}
              data={this.state.NoiDungYeuCau}></FlatList>
          </View>
        </View>
        <View style={styles.viewcon}>
          <View style={{marginVertical: 10}}>
            <Text style={styles.tieude}>DANH SÁCH NGƯỜI DUYỆT</Text>
            <View style={{flexDirection: 'row'}}>
              <FlatList
                // horizontal={true}
                renderItem={({item, index}) => {
                  return getDSNguoiDuyet(
                    item.Image,
                    item.VietTat,
                    item.Status,
                    item.HoTen,
                  );
                }}
                keyExtractor={this.keyExtractorNgang}
                data={this.state.danhSachNguoiDuyet}></FlatList>
            </View>
          </View>
        </View>
        <View style={styles.viewcon}>
          <View style={{marginVertical: 10}}>
            <Text style={styles.tieude}>BÌNH LUẬN</Text>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                placeholder={'Nhập bình luận'}
                style={{
                  borderWidth: 1,
                  height: 40,
                  width: '80%',
                  borderRadius: 20,
                  backgroundColor: '#D0D0D0',
                }}
                value={this.state.binhluan}
                onChangeText={(value) =>
                  this.setState({binhluan: value})
                }></TextInput>
              <TouchableOpacity
                onPress={() => this.bihLuan()}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  // backgroundColor: 'blue',
                  borderRadius: 15,
                }}>
                <Image
                  source={require('../assets/icon_send.png')}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: '#749FFE',
                    marginLeft: 10,
                  }}></Image>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row'}}>
              <FlatList
                // horizontal={true}
                renderItem={({item, index}) => {
                  return (
                    <LoadDSBinhLuan
                      item={item}
                      index={index}
                      navigation={this.props.navigation}
                      temp={this.props.route.params.temp}
                      loadDs={this.loadDSBinhLuan}
                    />
                  );
                }}
                keyExtractor={this.keyExtractorNgang}
                data={this.state.dsBinhLuan}></FlatList>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  hinh: {width: 30, height: 30, tintColor: 'white', marginHorizontal: 15},
  header: {
    flexDirection: 'row',
    height: height / 17,
    backgroundColor: 'blue',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  title_header: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
  },
  title2: {
    height: height / 17,
    // alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
  viewcon: {
    borderBottomWidth: 1,
    marginHorizontal: 15,
  },
  tieude: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  thongtinyeucau: {
    flexDirection: 'row',
    marginVertical: 3,
    // justifyContent: 'space-between',
  },
  thongtin: {
    width: 120,
    marginRight: 30,
  },
  nut: {
    backgroundColor: 'red',
    marginHorizontal: 20,
    margin: 5,
    height: 30,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});
