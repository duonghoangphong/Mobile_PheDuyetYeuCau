import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import FontSize from '../componentCustom/FontSize';
import {SearchBar} from 'react-native-elements';
import getDanhSachSearch from '../apis/getDanhSachSearch';
import Utils from '../app/Utils';
import LinerGradient from 'react-native-linear-gradient';
export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keySearch: '',
      arrayList: [],
      arrayListOld: [],
      modal: true,
      refresing: false,
    };
  }
  keyExtractorNgang = (item, index) => index.toString();
  loadDSSearch = async () => {
    let temp = await getDanhSachSearch(1, '', '');
    this.setState({arrayList: temp, arrayListOld: temp, refreshing: false});
  };
  componentDidMount() {
    this.loadDSSearch();
  }

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
          // marginHorizontal: 20,
          // marginVertical: 40,
          backgroundColor: 'white',
          // height: '90%',
        }}>
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
          value={this.state.keySearch}></SearchBar>
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
          refreshing={this.state.refresing}
          onRefresh={this.loadDSSearch}
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
        <Text style={styles.detail_item_tieude}>
          {this.props.item.TenLoaiYeuCau}
        </Text>
        {this.props.item.MoTa == '' ? null : (
          <Text style={styles.detail_item_mota}>
            Mô tả: {this.props.item.MoTa}
          </Text>
        )}
      </TouchableOpacity>
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
  background: {backgroundColor: 'red'},

  title: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#5d78ff',
    height: 50,
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
    height: 50,
    justifyContent: 'center',
    // alignItems: 'center',
    marginVertical: 2,
    borderBottomWidth: 2,
    borderBottomColor: '#CFCFCF',
  },
});
