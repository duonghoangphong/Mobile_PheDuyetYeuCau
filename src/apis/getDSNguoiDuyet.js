import Utils from '../app/Utils';
import React from 'react';
import {Text, View, StyleSheet, Image, Animated} from 'react-native';
function getTinhTrang(tinhtrang) {
  let temp =
    tinhtrang == 0
      ? require('../assets/icon_waiting.png')
      : tinhtrang == 1
      ? require('../assets/icon_check.png')
      : require('../assets/icon_uncheck.png');
  return (
    <View>
      <Image source={temp} style={{width: 20, height: 20}}></Image>
    </View>
  );
  // switch (tinhtrang) {
  //   case 0:
  //     return (
  //       <View style={{position: 'absolute', right: 0, bottom: 0}}>
  //         <Image
  //           source={require('../assets/icon_check.png')}
  //           style={{width: 20, height: 20, tintColor: 'yellow'}}></Image>
  //       </View>
  //     );
  //     break;
  //   case 1:
  //     return (
  //       <View style={{}}>
  //         <Image
  //           source={require('../assets/icon_check.png')}
  //           style={{width: 20, height: 20}}></Image>
  //       </View>
  //     );
  //     break;
  //   case 2:
  //     return (
  //       <View>
  //         <Image
  //           source={require('../assets/icon_uncheck.png')}
  //           style={{width: 20, height: 20}}></Image>
  //       </View>
  //     );
  //     break;
  //   default:
  //     break;
  // }
}
export default function getDSNguoiDuyet(
  image = '',
  viettat,
  status,
  tennguoiduyet,
) {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {image == '' ? (
          <View style={{marginHorizontal: 10}}>
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                marginHorizontal: 5,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#4B92E9',
              }}>
              <Text>{viettat}</Text>
            </View>
          </View>
        ) : (
          <View style={{marginHorizontal: 10}}>
            <Image
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                marginHorizontal: 5,
              }}
              source={{uri: image}}></Image>
          </View>
        )}
        <Text>{tennguoiduyet}</Text>
      </View>
      {getTinhTrang(status)}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(254, 254, 254)',
    padding: 8,
  },
});
