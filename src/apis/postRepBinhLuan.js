import {Value} from 'react-native-reanimated';
import Utils from '../app/Utils';

//http://192.168.1.2:6969/api/BinhLuan/TraLoiBinhLuan
let PREFIX = 'api/BinhLuan/TraLoiBinhLuan';

async function postRepBinhLuan(array) {
  let strBody = await JSON.stringify(array);
  let res = await Utils.post_apiTokenHeader(PREFIX, strBody, false, false);
  return res.status;
}

export default postRepBinhLuan;
