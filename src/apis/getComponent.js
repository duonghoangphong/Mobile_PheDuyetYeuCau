import Utils from '../app/Utils';
import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

export default function getComponent(id, title, value) {
  if (id == 10 || id == 12 || id == 13 || id == 14) {
    // console.log('==> value: ', value);
    return null;
  }
  switch (id) {
    case '1':
      return (
        <View style={styles.case3}>
          <Image
            source={require('../assets/icon_next.png')}
            style={styles.hinh}></Image>
          <Text style={styles.tieude} numberOfLines={1}>
            {title}
          </Text>
          <Text>{value.slice(2, -2)}</Text>
        </View>
      );
      break;
    case '2':
      return (
        <View style={styles.case3}>
          <Image
            source={require('../assets/icon_next.png')}
            style={styles.hinh}></Image>
          <Text style={styles.tieude} numberOfLines={1}>
            {title}{' '}
          </Text>
          <Text>{value.slice(2, -2)}</Text>
        </View>
      );
      break;
    case '3':
      return (
        <View style={styles.case3}>
          <Image
            source={require('../assets/icon_next.png')}
            style={styles.hinh}></Image>
          <Text numberOfLines={1} style={styles.tieude}>
            {title}{' '}
          </Text>
          <Text>{value}</Text>
        </View>
      );
      break;
    case '4':
      return (
        <View style={styles.case3}>
          <Image
            source={require('../assets/icon_next.png')}
            style={styles.hinh}></Image>
          <Text numberOfLines={1} style={styles.tieude}>
            {title}{' '}
          </Text>
          <Text>{value.slice(2, -2)}</Text>
        </View>
      );
      break;
    case '5':
      return (
        <View style={styles.case3}>
          <Image
            source={require('../assets/icon_next.png')}
            style={styles.hinh}></Image>
          <Text numberOfLines={1} style={styles.tieude}>
            {title}{' '}
          </Text>
          <Text>{value}</Text>
        </View>
      );
      break;
    case '6':
      return (
        <View style={styles.case3}>
          <Image
            source={require('../assets/icon_next.png')}
            style={styles.hinh}></Image>
          <Text numberOfLines={1} style={styles.tieude}>
            {title}{' '}
          </Text>
          <Text>{value}</Text>
        </View>
      );
      break;
    case '7':
      return (
        <View style={styles.case3}>
          <Image
            source={require('../assets/icon_next.png')}
            style={styles.hinh}></Image>
          <Text numberOfLines={1} style={styles.tieude}>
            {title}
          </Text>
          <Text>{value.slice(2, -2) == 'False' ? 'Không' : 'Có'}</Text>
        </View>
      );
      break;
    case '8':
      return (
        <View style={styles.case3}>
          <Image
            source={require('../assets/icon_next.png')}
            style={styles.hinh}></Image>
          <Text numberOfLines={1} style={styles.tieude}>
            {title}{' '}
          </Text>
          <Text>{value == 'False' ? 'Không' : 'Có'}</Text>
        </View>
      );
      break;
    case '9':
      return (
        <View style={styles.case3}>
          <Image
            source={require('../assets/icon_next.png')}
            style={styles.hinh}></Image>
          <Text numberOfLines={1} style={styles.tieude}>
            {title}{' '}
          </Text>
          <Text>{value}</Text>
        </View>
      );
      break;
    case '10':
      return (
        <View style={styles.case3}>
          <Image
            source={require('../assets/icon_next.png')}
            style={styles.hinh}></Image>
          <Text numberOfLines={1} style={styles.tieude}>
            {title}{' '}
          </Text>
          <Text>{value}</Text>
        </View>
      );
      break;
    case '11':
      return (
        <View style={styles.case3}>
          <Image
            source={require('../assets/icon_next.png')}
            style={styles.hinh}></Image>
          <Text numberOfLines={1} style={styles.tieude}>
            {title}{' '}
          </Text>
          <Text>{value}</Text>
          <Text>aasa</Text>
        </View>
      );
      break;
    case '12':
      return (
        <View style={styles.case3}>
          <Image
            source={require('../assets/icon_next.png')}
            style={styles.hinh}></Image>
          <Text style={styles.tieude}>{title} </Text>
          <Text numberOfLines={1} style={{width: 150}} numberOfLines={1}>
            {JSON.parse(value.slice(1, -1)).filename}
          </Text>
          <Image
            style={{height: 50, width: 50}}
            source={{uri: JSON.parse(value.slice(1, -1)).src}}></Image>
        </View>
      );
      break;
    case '13':
      return (
        <View style={styles.case3}>
          <Image
            source={require('../assets/icon_next.png')}
            style={styles.hinh}></Image>
          <Text numberOfLines={1} style={styles.tieude}>
            {title}{' '}
          </Text>
          <Text>{value}</Text>
        </View>
      );
      break;
    case '14':
      return (
        <View style={styles.case3}>
          <Image
            source={require('../assets/icon_next.png')}
            style={styles.hinh}></Image>
          <Text style={styles.tieude}>{title} </Text>
          <Text style={{width: 150}} numberOfLines={1}>
            {JSON.parse(value.slice(1, -1)).filename}
          </Text>
          <Image
            style={{height: 50, width: 50}}
            source={{uri: JSON.parse(value.slice(1, -1)).src}}></Image>
        </View>
      );
      break;
    default:
      break;
  }
}
const styles = StyleSheet.create({
  case3: {
    flexDirection: 'row',
    marginLeft: 10,
    marginVertical: 3,
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  tieude: {
    width: 150,
  },
  hinh: {
    width: 12,
    height: 12,
    tintColor: 'gray',
    marginRight: 5,
  },
});
