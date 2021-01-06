import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinerGradient from 'react-native-linear-gradient';
import getThongTinNV from '../apis/getThongTinNV';
import Utils from '../app/Utils';
import {nGlobalKeys} from '../app/data/globalKey';
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
];
export default class InformationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
  }
  componentDidMount = async () => {
    let temp = await Utils.ngetStore(nGlobalKeys.loginToken);
    let a = await getThongTinNV(temp);
    this.setState({data: a});
  };
  keyExtractorNgang = (item, index) => index.toString();
  renderItemNgang = ({item}) => {
    return (
      <View>
        <View style={{alignItems: 'center', marginVertical: 10}}>
          <Image
            source={{
              uri:
                item.Image == ''
                  ? 'https://hicksartgallery.com/wp-content/uploads/2019/09/avatar-gai-xinh.jpg'
                  : item.Image,
            }}
            style={{width: 200, height: 200, borderRadius: 100}}></Image>
        </View>
        <View style={styles.custom}>
          <Text style={styles.item1}> Mã nhân viên </Text>
          <Text style={styles.item2}> {item.MaNV}</Text>
        </View>
        <View style={styles.custom}>
          <Text style={styles.item1}> Tên nhân viên </Text>
          <Text style={styles.item2}> {item.Holot + ' ' + item.Ten}</Text>
        </View>
        <View style={styles.custom}>
          <Text style={styles.item1}> Giới tính </Text>
          <Text style={styles.item2}> {item.Phai}</Text>
        </View>
        <View style={styles.custom}>
          <Text style={styles.item1}> Ngày sinh </Text>
          <Text style={styles.item2}> {item.Ngaysinh}</Text>
        </View>
        <View style={styles.custom}>
          <Text style={styles.item1}> Số điện thoại </Text>
          <Text style={styles.item2}> {item.Mobile}</Text>
        </View>
        <View style={styles.custom}>
          <Text style={styles.item1}> Email </Text>
          <Text style={styles.item2}> {item.Email}</Text>
        </View>
        <View style={styles.custom}>
          <Text style={styles.item1}> Dân tộc </Text>
          <Text style={styles.item2}> {item.Dantoc}</Text>
        </View>
        <View style={styles.custom}>
          <Text style={styles.item1}> CMND </Text>
          <Text style={styles.item2}> {item.CMND}</Text>
        </View>
      </View>
    );
  };
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
          <Text style={styles.title_header}> Thông tin cá nhân</Text>
        </LinerGradient>
        <View
          style={{
            marginHorizontal: 10,
            backgroundColor: 'white',
            // justifyContent: 'center',
            // alignItems: 'center',
          }}>
          <FlatList
            // horizontal={true}
            renderItem={this.renderItemNgang}
            keyExtractor={this.keyExtractorNgang}
            data={this.state.data}
          />
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
  custom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.2,
    borderColor: '#C4C4C4',
    height: 40,
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 10,
  },
  item1: {
    fontSize: 17,
  },
  item2: {
    fontSize: 15,
    color: 'gray',
  },
});
