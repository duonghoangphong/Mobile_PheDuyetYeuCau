import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  Dimensions,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import FontSize from '../components/size';
import {Avatar, SearchBar} from 'react-native-elements';
import {GetAllUser} from '../apis/apiUser';

const goback = require('../assets/images/go-back-left-arrow.png');
const avatar = require('../assets/images/avatar.png');
// const congratulation = require('../assets/images/congratulations.png');
export default class SearchUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DsUser: [],
      refresh: true,
      searchText: '',
      filteredData: [],
    };
  }
  _GetAllUser = async () => {
    let res = await GetAllUser();
    console.log('ress', res);
    if (res.status == 1) {
      this.setState({
        DsUser: res.Data,
        refresh: !this.state.refresh,
      });
    } else {
      this.setState({refresh: !this.state.refresh});
      alert('thất bại');
    }
  };

  _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={[styles.khungchua]}
        onPress={() => {
          this.props.navigation.navigate('KhenThuong', item);
        }}>
        {item.Avatar ? (
          <Avatar
            size="medium"
            rounded
            containerStyle={{margin: 5}}
            source={{uri: item.Avatar}}
            activeOpacity={0.7}
          />
        ) : (
          <Avatar
            size="medium"
            rounded
            containerStyle={{margin: 5}}
            source={avatar}
            activeOpacity={0.7}
          />
        )}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            paddingRight: 10,
          }}>
          <Text>{item.Username}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  EmptyListMessage = ({item}) => {
    return (
      <Text style={styles.emptyListStyle} onPress={() => getItem(item)}>
        No Data Found
      </Text>
    );
  };

  search = (searchText) => {
    this.setState({searchText: searchText});
    let filteredData = this.state.DsUser.filter(function (item) {
      return item.Username.toLowerCase().includes(searchText);
    });
    this.setState({filteredData: filteredData});
  };

  componentDidMount() {
    this._GetAllUser();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <SearchBar
            placeholder="Tìm thành viên..."
            showCancel="true"
            platform="android"
            containerStyle={{
              backgroundColor: '#DDDDDD80',
              borderRadius: 20,
              height: FontSize.scale(40),
              justifyContent: 'center',
            }}
            onChangeText={this.search}
            value={this.state.searchText}
          />
        </View>
        <View style={styles.footer}>
          <FlatList
            data={
              this.state.filteredData && this.state.filteredData.length > 0
                ? this.state.filteredData
                : this.state.DsUser
            }
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
            refreshing={this.state.refresh}
            onRefresh={() => {
              this.setState({refresh: true}, this._GetAllUser);
            }}
            ListEmptyComponent={this.EmptyListMessage}
          />
        </View>
      </View>
    );
  }
}
