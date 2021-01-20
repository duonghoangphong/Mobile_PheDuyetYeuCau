import React from 'react';
import {Touchable} from 'react-native';
import {View, Text, Dimensions, Image, TouchableOpacity} from 'react-native';
import {PieChart} from 'react-native-svg-charts';
import getSoLieuThongKe from '../../apis/getSoLieuThongKe';
export default class PieChartExample extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount = async () => {
    let temp = await getSoLieuThongKe();
    console.log(temp);
    this.setState({
      data: [
        temp.SoLuongYeuCauCho,
        temp.SoLuongYeuCauChapNhap,
        temp.SoLuongYeuCauTuChoi,
      ],
    });
  };
  mau = (index) => {
    switch (index) {
      case 0:
        return 'blue';
        break;
      case 1:
        return 'red';
        break;
      case 2:
        return 'green';
        break;
      default:
        break;
    }
  };
  xuly = (index) => {
    let temp = 0;
    switch (index) {
      case 0:
        temp = 3;
        break;
      case 1:
        temp = 2;
        break;
      case 2:
        temp = 1;
        break;
      default:
        break;
    }
    this.props.route.params.onEvent(temp);
    this.props.navigation.goBack();
  };
  randomColor = () =>
    ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(
      0,
      7,
    );
  render() {
    const {data} = this.state;
    const pieData = data
      .filter((value) => value > 0)
      .map((value, index) => ({
        value,
        svg: {
          //   fill: index == 1 ? 'red' : 'blue',
          fill: this.mau(index),
          onPress: () => this.xuly(index),
        },
        key: `pie-${index}`,
      }));
    return (
      <View>
        <TouchableOpacity
          style={{height: height / 2}}
          onPress={() => this.props.navigation.goBack()}>
          <Text></Text>
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: 'white',
            height: '50%',
            // marginTop: '50%',
            //   justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              height: height / 17,
              backgroundColor: 'blue',
              // justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image
                source={require('../../assets/icon_close.png')}
                style={{
                  height: 30,
                  width: 30,
                  marginHorizontal: 20,
                  tintColor: 'white',
                }}></Image>
            </TouchableOpacity>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 23}}>
              Thống kê số liệu
            </Text>
          </View>
          <PieChart style={{height: 200, marginTop: 20}} data={pieData} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <View style={{flexDirection: 'row', marginHorizontal: 10}}>
              <Image
                //   source={require('../../assets/icon_waiting.png')}
                style={{
                  backgroundColor: 'blue',
                  width: 20,
                  height: 20,
                  marginHorizontal: 5,
                }}></Image>
              <Text>Đang chờ duyệt</Text>
            </View>
            <View style={{flexDirection: 'row', marginHorizontal: 10}}>
              <Image
                //   source={require('../../assets/icon_checked.png')}
                style={{
                  backgroundColor: 'green',
                  width: 20,
                  height: 20,
                  marginHorizontal: 5,
                }}></Image>
              <Text>Đã phê duyệt</Text>
            </View>
            <View style={{flexDirection: 'row', marginHorizontal: 10}}>
              <Image
                //   source={require('../../assets/icon_waiting.png')}
                style={{
                  backgroundColor: 'red',
                  // tintColor: 'white',
                  width: 20,
                  height: 20,
                  marginHorizontal: 5,
                }}></Image>
              <Text>Đã từ chối</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const height = Dimensions.get('screen').height;
