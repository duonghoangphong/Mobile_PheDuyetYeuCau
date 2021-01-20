import Utils from '../app/Utils';

//http://192.168.3.32:6969/api/Online/UpdateDeviceToken
let PREFIX = 'api/Online/UpdateDeviceToken';

async function postOneSignalID(mang) {
  let strBody = await JSON.stringify(mang);
  console.log(mang);
  let res = await Utils.post_apiTokenHeader(PREFIX, strBody, false, false);
  return res.status;
}

export default postOneSignalID;
