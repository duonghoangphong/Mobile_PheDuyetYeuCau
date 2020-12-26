import {appConfig} from './Config';
import AsyncStorage from '@react-native-community/async-storage';
import {nGlobalKeys} from '../app/data/globalKey';
import {
  AppsetGlobal,
  AppgetGlobal,
  AppgetRootGlobal,
  ROOTGlobal,
} from '../app/data/dataGlobal';
//==========================================
async function post_api(
  strUrl,
  strBody = '',
  showMsg = false,
  chktoken = false,
) {
  var smethod = 'POST';
  if (strBody == '') smethod = 'GET';
  let token = await ngetStore(nGlobalKeys.loginToken);
  if ((token == null || token.length < 3) && chktoken) {
    // if (showMsg) Alert.alert('Bảo mật', 'Không tồn tại token người dùng');
    return -2;
  }
  try {
    const response = await fetch(appConfig.domain + strUrl, {
      method: smethod,
      headers: {
        Accept: 'application/json',
        'Accept-Encoding': 'gzip',
        'Content-Type': 'application/json',
      },
      body: strBody,
    });
    const res = await response.json();
    console.log('repson', res);
    if (res.ExceptionMessage != undefined) {
      // edit tuỳ từng object api
      nlog('[API]Lỗi API:', res);
      return -3;
    }
    return res;
  } catch (error) {
    nlog('[API]Lỗi error:', error);
    if (showMsg)
      // Alert.alert("Lỗi mạng", "Kết nối server thất bại")
      return -1;
  }
}
//==========================================
function nlog(...val) {
  console.log(...val);
}
//==========================================
async function nsetStore(keys, value) {
  if (typeof value !== 'string') value = JSON.stringify(value);
  await AsyncStorage.setItem(keys, value);
}
async function ngetStore(keys, defaultValue = null) {
  let temp = await AsyncStorage.getItem(keys);
  if (temp == null) return defaultValue;
  try {
    let tempValue = JSON.parse(temp);
    return tempValue;
  } catch (error) {
    return temp;
  }
}
//==========================================
// Hàm get giá trị theo keys - read only. Giá trị thay đổi không làm thay đổi giá trị root
function getGlobal(keys, defaultValue) {
  return AppgetGlobal(keys, defaultValue);
}
// Hàm get giá trị gốc theo keys - read write. Giá trị thay đổi làm thay đổi giá trị root
function getRootGlobal(keys, defaultValue) {
  return AppgetRootGlobal(keys, defaultValue);
}
// Hàm khởi tạo một biến gốc, cũng có thể dùng để thay đổi một gốc.
function setGlobal(keys, value) {
  AppsetGlobal(keys, value);
}
//==========================================
function goback(nthis, routeName = '') {
  if (routeName == '') nthis.props.navigation.goBack();
  else nthis.props.navigation.goBack(routeName);
}
//=========================================
async function get_apiToken(strUrl, showMsg = true, chktoken = true) {
  const res = await post_apiToken(strUrl, '', showMsg, chktoken);
  return res;
}
//=========================================
async function post_apiToken(
  strUrl,
  strBody = '',
  showMsg = false,
  chktoken = true,
) {
  const res = await post_apiTokenHeader(strUrl, strBody, {}, showMsg, chktoken);
  return res;
}
//=========================================
async function post_apiTokenHeader(
  strUrl,
  strBody = '',
  header = {},
  showMsg = false,
  chktoken = true,
) {
  // console.log('strBody' + strBody);
  var smethod = 'POST';
  if (strBody == '') smethod = 'GET';
  let token = await ngetStore(nGlobalKeys.loginToken);
  // if ((token == null || token.length < 3) && chktoken) {
  // if (showMsg) Alert.alert('Bảo mật', 'Không tồn tại token người dùng');
  // return -2;
  // }
  headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Token: token,
    ...header,
  };

  console.log('Token', token);
  url = appConfig.domain + strUrl;
  // console.log('headers ' + JSON.stringify(headers), url);
  try {
    const response = await fetch(url, {
      method: smethod,
      headers: headers,
      body: strBody,
    });
    const res = await response.json();
    if (res.ExceptionMessage != undefined) {
      // edit tuỳ từng object api
      nlog('[API]Lỗi API:', res);
      return -3;
    }
    return res;
  } catch (error) {
    nlog('[API]Lỗi error:', error);
    if (showMsg)
      // Alert.alert("Lỗi mạng", "Kết nối server thất bại")
      return -1;
  }
}
//=========================================
function removeAccents(str) {
  return String(str)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}
//=========================================
function goscreen(nthis, routeName, param = null) {
  if (param) {
    nthis.props.navigation.navigate(routeName, {...param, lang: nthis.lang});
  } else {
    nthis.props.navigation.navigate(routeName, {lang: nthis.lang});
  }
}
//=========================================
// async function parseBase64_Custom(
//   files = {},
//   heightResize = 0,
//   widthResize = 0,
//   downSize = 0.3,
//   isVideo = false,
//   isBase64 = true,
// ) {
//   let {uri = '', height = 0, width = 0} = files; // giá trị mặc định của data files
//   try {
//     let uriReturn = uri;
//     if (!isVideo) {
//       if (heightResize != 0)
//         height = height - 120 * (Platform.OS == 'ios' ? 4 : 2) * 1.328147;
//       uriReturn = await ImageEditor.cropImage(uri, {
//         offset: {x: 0, y: 0},
//         size: {width, height},
//         displaySize: {
//           width: widthResize ? widthResize * downSize : width,
//           height: heightResize ? heightResize * downSize : height,
//         },
//         resizeMode: 'cover',
//       });
//     }
//     if (Platform.OS == 'ios' && isVideo) {
//       const dest = `${RNFS.TemporaryDirectoryPath}${Math.random()
//         .toString(36)
//         .substring(7)}.mp4`;
//       uriReturn = await RNFS.copyAssetsVideoIOS(uri, dest);
//     }
//     if (uriReturn && isBase64) {
//       //-------
//       try {
//         const data64 = await RNFS.readFile(uriReturn, 'base64');
//         //POSTDATA
//         return data64;
//       } catch (error) {
//         nlog('error-----:', error);
//         return '';
//       }
//     }
//     return uriReturn;
//   } catch (cropError) {
//     nlog('error----- 2:', cropError);
//     return '';
//   }
// }
//=========================================
export default {
  goscreen,
  post_api,
  nlog,
  nsetStore,
  ngetStore,
  goback,
  post_apiTokenHeader,
  getGlobal,
  get_apiToken,
  getRootGlobal,
  setGlobal,
  removeAccents,
  // parseBase64_Custom,
};
