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
import {launchImageLibrary} from 'react-native-image-picker';
import updateAvatar from '../apis/updateAvatar';
import RNFS from 'react-native-fs';
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
    this.state = {data: [], refreshing: false, strBase64Image: {}};
  }
  loadDS = async () => {
    let temp = await Utils.ngetStore(nGlobalKeys.loginToken);
    let a = await getThongTinNV(temp);
    this.setState({refreshing: false});
    this.setState({data: a});
  };
  componentDidMount = async () => {
    this.loadDS();
  };
  pickerImage = async () => {
    let options = {
      storageOptions: {
        skipBackup: false,
        path: 'images',
      },
    };
    await launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('user cancelled image picker');
      } else if (response.error) {
        console.log('image picker error', response.error);
      } else if (response.customButton) {
        console.log('user tapped custom button ', response.customButton);
      } else {
        // this.setState({uriImage: response.uri});
        const data64 = await RNFS.readFile(response.uri, 'base64');
        let temp = {};
        temp['chuoi'] = data64;
        let a = await updateAvatar(temp);
        this.loadDS();
      }
    });
  };
  keyExtractorNgang = (item, index) => index.toString();
  renderItemNgang = ({item}) => {
    return (
      <View>
        <View
          style={{
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <Image
            source={{
              uri:
                item.Image == ''
                  ? item.GioiTinh == 'Nam'
                    ? 'data:image/png;base64,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'
                    : 'https://www.kindpng.com/picc/m/52-525979_unknown-person-png-transparent-png.png'
                  : item.Image,
            }}
            style={{width: 200, height: 200, borderRadius: 100}}></Image>
          <TouchableOpacity onPress={() => this.pickerImage()} style={{}}>
            {/* <Image
              source={require('../assets/icon_camera.png')}
              style={{
                width: 40,
                height: 40,
              }}></Image> */}
            <Text style={{color: 'blue'}}>Cập nhật hình</Text>
          </TouchableOpacity>
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
          <Text style={styles.item2}> {item.GioiTinh}</Text>
        </View>
        <View style={styles.custom}>
          <Text style={styles.item1}> Ngày sinh </Text>
          <Text style={styles.item2}> {item.Ngaysinh}</Text>
        </View>
        <View style={styles.custom}>
          <Text style={styles.item1}> Số điện thoại </Text>
          <Text style={styles.item2}> {item.SDT}</Text>
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
            refreshing={this.state.refreshing}
            onRefresh={this.loadDS}
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
    borderBottomWidth: 1,
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
