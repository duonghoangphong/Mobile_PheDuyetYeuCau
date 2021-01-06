import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import {ROOTGlobal} from '../app/data/dataGlobal';
import getThongTinChiTiet from '../apis/getThongTinChiTiet';
import getTinhTrangDuyet from '../apis/getTinhTrangDuyet';
import getComponent from '../apis/getComponent';
import getDSNguoiDuyet from '../apis/getDSNguoiDuyet';
import postXetDuyet from '../apis/postXetDuyet';
export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      NhanVien: '',
      NoiDungYeuCau: [],
      danhSachNguoiDuyet: [],
      tinhTrang: '',
    };
  }
  hienChiTiet = (Status, TrangThai, IDTinhTrang) => {
    if (IDTinhTrang == 2)
      return (
        <View>
          <Text>Yêu cầu này bị từ chối</Text>
        </View>
      );
    switch (Status) {
      case 0:
        if (TrangThai)
          return (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'blue',
              }}>
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
          );
        else {
          return (
            <View>
              <Text>Vui lòng chờ tới lượt duyệt</Text>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
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
            </View>
          );
        }

        break;
      case 1:
        return (
          <View>
            <Text>Bạn đã duyệt yêu cầu này</Text>
          </View>
        );
        break;
      case 2:
        return (
          <View>
            <Text>Bạn đã từ chối yêu cầu này</Text>
          </View>
        );
        break;
      default:
        break;
    }
  };
  xetDuyet = async (id, value) => {
    let a = await postXetDuyet(id, value);
    console.log(a);
  };
  componentDidMount = async () => {
    let temp = await getThongTinChiTiet(this.props.route.params.temp);
    let temp1 = await getTinhTrangDuyet(this.props.route.params.temp);

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
    this.setState({NoiDungYeuCau: a});
    this.setState({tinhTrang: temp1[0]});
    this.setState({danhSachNguoiDuyet: b});
    // console.log('==> Data: ', this.state.data);
    // console.log('==> NhanVien: ', this.state.NhanVien);
    // console.log('==> NoiDungYeuCau: ', this.state.NoiDungYeuCau);
    // console.log('==> temp: ', temp);
    console.log('==> danh sach nguoi duyet: ', this.state.danhSachNguoiDuyet);
  };
  keyExtractorNgang = (item, index) => index.toString();
  render() {
    // console.log('==> idRowYeuCau: ', this.props.route.params.temp);
    const data = this.state.data;
    const tinhTrang = this.state.tinhTrang;
    const NhanVien = this.state.NhanVien;
    return (
      <View style={{backgroundColor: 'white', height: height}}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack(), ROOTGlobal.loadDSThongBao();
            }}>
            <Image
              source={require('../assets/icon_goback.png')}
              style={{
                height: 30,
                width: 30,
                marginHorizontal: 20,
                tintColor: 'white',
              }}></Image>
          </TouchableOpacity>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 23}}>
            Yêu cầu:
          </Text>
        </View>
        {/* <View style={styles.title2}></View> */}
        <View style={styles.viewcon}>
          <View style={{marginHorizontal: 5}}>
            <Text style={styles.tieude}>{data.TenYeuCau}</Text>
            <Text>Tình trạng: {data.Id_TinhTrang}</Text>
            {this.hienChiTiet(
              tinhTrang.Status,
              tinhTrang.TrangThai,
              data.Id_TinhTrang,
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

        <View style={styles.viewcon}>
          <Text style={styles.tieude}>THÔNG TIN YÊU CẦU</Text>
          <View style={styles.thongtinyeucau}>
            <Image
              source={require('../assets/icon_user.png')}
              style={{width: 17, height: 17, marginHorizontal: 5}}></Image>
            <Text style={styles.thongtin}>Người tạo</Text>
            <Text> : </Text>
            <Text>{NhanVien.HoTen}</Text>
          </View>
          <View style={styles.thongtinyeucau}>
            <Image
              source={require('../assets/icon_type.png')}
              style={{width: 17, height: 17, marginHorizontal: 5}}></Image>
            <Text style={styles.thongtin}>Loại yêu cầu</Text>
            <Text> : </Text>
            <Text>{data.TenLoaiYeuCau}</Text>
          </View>
          <View style={styles.thongtinyeucau}>
            <Image
              source={require('../assets/icon_clock.png')}
              style={{width: 17, height: 17, marginHorizontal: 5}}></Image>
            <Text style={styles.thongtin}>Thời gian tạo</Text>
            <Text> : </Text>
            <Text>{data.NgayTao}</Text>
          </View>
          <View style={styles.thongtinyeucau}>
            <Image
              source={require('../assets/icon_clock.png')}
              style={{width: 17, height: 17, marginHorizontal: 5}}></Image>
            <Text style={styles.thongtin}>Cập nhật gần nhất</Text>
            <Text> : </Text>
            <Text>{data.CapNhatGanNhat}</Text>
          </View>
          <View style={styles.thongtinyeucau}>
            <Image
              source={require('../assets/icon_writing.png')}
              style={{width: 17, height: 17, marginHorizontal: 5}}></Image>
            <Text style={styles.thongtin}>Mô tả công việc</Text>
            <Text> : </Text>
            <Text>{data.MoTa}</Text>
          </View>
        </View>

        <View style={styles.viewcon}>
          <Text style={styles.tieude}>CHI TIẾT YÊU CẦU</Text>
          {/* {this.state.NoiDungYeuCau === [] ? console.log(1) : console.log(0)} */}
          <FlatList
            renderItem={({item, index}) => {
              return getComponent(item.ControlID, item.Title, item.Value);
            }}
            keyExtractor={this.keyExtractorNgang}
            data={this.state.NoiDungYeuCau}></FlatList>
        </View>
        <View style={styles.viewcon}>
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
    );
  }
}
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: height / 17,
    backgroundColor: 'blue',
    // justifyContent: 'center',
    alignItems: 'center',
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
    // justifyContent: 'space-between',
  },
  thongtin: {
    width: 120,
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
