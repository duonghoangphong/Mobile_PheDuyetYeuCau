import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Modal} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import FontSize from '../componentCustom/FontSize';
import {SearchBar} from 'react-native-elements';
import getDanhSachSearch from '../apis/getDanhSachSearch';
import Utils from '../app/Utils';

const data = [
  {
    id: '1',
    name: 'Tất cả',
  },
  {
    id: '2',
    name: 'Đến lượt duyệt',
  },
  {
    id: '3',
    name: 'Qua hạn duyệt',
  },
  {
    id: '4',
    name: 'Đang chở duyệt',
  },
  {
    id: '5',
    name: 'Đã chấp thuận',
  },
  {
    id: '6',
    name: 'Đã từ chối',
  },
  {
    id: '7',
    name: 'Đã đánh dấu',
  },
  {
    id: '8',
    name: 'Đã lưu nháp',
  },
  {
    id: '9',
    name: 'Đã lưu nháp',
  },
];
export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mang: data,
      keySearch: '',
      arrayList: [],
      arrayListOld: [],
      modal: true,
    };
  }
  keyExtractorNgang = (item, index) => index.toString();
  componentDidMount = async () => {
    let temp = await getDanhSachSearch(1, '', '');
    this.setState({arrayList: temp, arrayListOld: temp});
  };

  search = (searchText) => {
    this.setState({keySearch: searchText});
    // let filteredData = this.state.arrayList.filter(function (item) {
    //   return item.TenLoaiYeuCau.includes(searchText);
    // });
    let filteredData = this.state.arrayList.filter((item) =>
      Utils.removeAccents(item['TenLoaiYeuCau'])
        .toUpperCase()
        .includes(Utils.removeAccents(searchText.toUpperCase())),
    );
    if (searchText == '') filteredData = this.state.arrayListOld;
    this.setState({arrayList: filteredData});
  };
  render() {
    return (
      <View
        style={{
          marginHorizontal: 20,
          marginVertical: 40,
          backgroundColor: 'white',
          height: '90%',
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
            TÌM KIẾM LOẠI YÊU CẦU
          </Text>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image
              source={require('../assets/icon_close.png')}
              style={{height: 20, width: 20, tintColor: 'white'}}></Image>
          </TouchableOpacity>
        </View>
        <SearchBar
          placeholder="Search..."
          showCancel={true}
          showLoading={true}
          platform="android"
          containerStyle={{
            marginVertical: 5,
            backgroundColor: '#B5B5B580',
            borderRadius: 20,
            height: FontSize.scale(40),
            justifyContent: 'center',
            marginHorizontal: 5,
          }}
          onChangeText={this.search}
          value={this.state.keySearch}
          // inputContainerStyle={}
        ></SearchBar>
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
          keyExtractor={this.keyExtractorNgang}
          data={this.state.arrayList}
        />
      </View>
    );
  }
}
export class DetailItem extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() =>
          Utils.goscreen(this, 'NewDetailRequest', {
            temp: this.props.item.Id_LoaiYeuCau,
          })
        }
        style={styles.touchable}>
        <View
          style={[
            styles.viewdetailitem,
            {
              // backgroundColor: '#CFCFCF50',
              // this.props.index % 2 == 0 ? '#69696905' : 'white',
            },
          ]}>
          <Text style={styles.detail_item_tieude}>
            {this.props.item.TenLoaiYeuCau}
          </Text>

          <Text style={styles.detail_item_mota}>
            Mô tả: {this.props.item.MoTa}
          </Text>
        </View>
      </TouchableOpacity>
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
    // marginHorizontal: 5,
    // marginVertical: 5,
    // borderWidth: 0.5,
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
    marginVertical: 2,
    borderBottomWidth: 2,
    borderBottomColor: '#CFCFCF',
    // backgroundColor: '#CFCFCF50',
  },
});
