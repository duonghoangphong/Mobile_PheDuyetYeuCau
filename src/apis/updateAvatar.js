import {Value} from 'react-native-reanimated';
import Utils from '../app/Utils';

//http://192.168.3.71:6969/api/Online/uploadAvatar
let PREFIX = 'api/Online/uploadAvatar';

async function updateAvatar(string) {
  let strBody = await JSON.stringify(string);
  let res = await Utils.post_apiTokenHeader(PREFIX, strBody, false, false);
  return res.status;
}

export default updateAvatar;
