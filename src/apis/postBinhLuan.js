import {Value} from 'react-native-reanimated';
import Utils from '../app/Utils';

//http://192.168.1.2:6969/api/BinhLuan/BinhLuan
let PREFIX = 'api/BinhLuan/BinhLuan';

async function postBinhLuan(array) {
  let strBody = await JSON.stringify(array);
  let res = await Utils.post_apiTokenHeader(PREFIX, strBody, false, false);
  return res.status;
}

export default postBinhLuan;
