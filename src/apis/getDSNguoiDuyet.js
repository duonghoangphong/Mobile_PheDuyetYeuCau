import Utils from '../app/Utils';
import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

function getTinhTrang(tinhtrang) {
  switch (tinhtrang) {
    // case 0:
    //   return (
    //     <View style={{position: 'absolute', right: 0, bottom: 0}}>
    //       <Image
    //         source={require('../assets/icon_check.png')}
    //         style={{width: 15, height: 15}}></Image>
    //     </View>
    //   );
    //   break;
    case 1:
      return (
        <View style={{position: 'absolute', right: 0, bottom: 0}}>
          <Image
            source={require('../assets/icon_check.png')}
            style={{width: 15, height: 15}}></Image>
        </View>
      );
      break;
    case 2:
      return (
        <View style={{position: 'absolute', right: 0, bottom: 0}}>
          <Image
            source={require('../assets/icon_uncheck.png')}
            style={{width: 15, height: 15}}></Image>
        </View>
      );
      break;
    default:
      break;
  }
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
      }}>
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
          {getTinhTrang(status)}
        </View>
      ) : (
        <Image
          style={{width: 30, height: 30, borderRadius: 15, marginHorizontal: 5}}
          source={{uri: image}}></Image>
      )}
      <Text>{tennguoiduyet}</Text>
    </View>
  );
}
