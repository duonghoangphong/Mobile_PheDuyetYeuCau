import {Value} from 'react-native-reanimated';
import Utils from '../app/Utils';

//http://192.168.1.5:6969/api/YeuCau/LuuData
let PREFIX = 'api/YeuCau/LuuData';

async function postNewDetailRequest(array) {
  console.log('==> array: ', array);
  let strBody = await JSON.stringify(array);
  console.log('==> array of apis: ', strBody);
  let res = await Utils.post_apiTokenHeader(PREFIX, strBody, false, false);
  return res;
}

export default postNewDetailRequest;
