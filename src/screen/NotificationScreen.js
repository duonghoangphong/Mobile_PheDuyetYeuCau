import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {ROOTGlobal} from '../app/data/dataGlobal';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import LinerGradient from 'react-native-linear-gradient';
import getDSThongBao from '../apis/getDSThongBao';
import getDaDocTB from '../apis/getDaDocTB';
import Utils from '../app/Utils';
import getThongTinChiTietStatus from '../apis/getThongTinChiTietStatus';
export default class NotificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      refreshing: false,
    };
    ROOTGlobal.loadDSThongBao = this.loadDS;
    ROOTGlobal.checkDaXemThongBao = (value) => this.click(value);
  }
  click = async (id) => {
    console.log(id);
    let a = await getDaDocTB(id);
    ROOTGlobal.loadThongBao('asdasda');
    console.log(a);
  };
  loadDS = async () => {
    console.log(123);
    let temp = await getDSThongBao();
    this.setState({data: temp, refreshing: false});
  };
  componentDidMount() {
    this.loadDS();
  }
  // componentDidUpdate() {
  //   this.loadDS();
  // }
  chuyentrang = async (item) => {
    let temp = await getThongTinChiTietStatus(item.ID_YeuCau);
    if (temp == -1) alert('Yêu cầu đã bị xóa!');
    else {
      this.click(item.ThongBaoID),
        Utils.goscreen(this, 'Details', {
          temp: item.ID_YeuCau,
        });
    }
  };
  renderItemNgang = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => this.chuyentrang(item)}
        style={{
          backgroundColor: item.DaDoc ? 'white' : '#C7EAFF',
          marginBottom: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 15,
          }}>
          {item.NguoiTao.map((item, index) =>
            item.Image == '' ? (
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 30,
                  marginHorizontal: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#4B92E9',
                }}>
                <Text style={{fontSize: 30}}>
                  {Utils.cutAString(item.HoTen)}
                  {/* aaa */}
                </Text>
              </View>
            ) : (
              <Image
                source={{
                  uri: item.Image,
                  // item.NguoiTao.map((item, index) => item.Image),
                  // 'https://hicksartgallery.com/wp-content/uploads/2019/09/avatar-gai-xinh.jpg',
                }}
                style={styles.hinh_avatar}></Image>
            ),
          )}

          <View style={{height: 50, width: '83%'}}>
            <Text style={{fontSize: 15, marginRight: 5}} numberOfLines={2}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>
                {item.TenNguoiGuiYeuCau}
              </Text>
              <Text>{item.NoiDung}</Text>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>
                {item.TenYeuCau}
              </Text>
            </Text>
            <Text style={{fontSize: 12, marginRight: 5, color: 'blue'}}>
              {item.NgayTao}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  keyExtractorNgang = (item, index) => index.toString();
  render() {
    return (
      <View>
        <LinerGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#5d78ff', '#00E6FF']}
          style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image
              source={require('../assets/icon_goback.png')}
              style={styles.hinh}></Image>
          </TouchableOpacity>
          <Text style={styles.title_header}> Tìm kiếm loại yêu cầu</Text>
        </LinerGradient>
        {/* <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack(),
              showMessage({
                message: 'Có thông báo mới !',
                type: 'info',
              });
          }}>
          <Image
            source={require('../assets/icon_goback.png')}
            style={styles.hinh}></Image>
        </TouchableOpacity> */}
        <FlatList
          // horizontal={true}
          extraData={this.state}
          refreshing={this.state.refreshing}
          onRefresh={this.loadDS}
          renderItem={this.renderItemNgang}
          keyExtractor={this.keyExtractorNgang}
          data={this.state.data}
        />
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
    backgroundColor: '#5d78ff',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  hinh: {width: 30, height: 30, tintColor: 'white', marginHorizontal: 15},
  title_header: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
  },
  hinh_avatar: {
    width: 50,
    height: 50,
    borderRadius: 30,
    marginHorizontal: 5,
  },
  title_header: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
  },
});
