import Utils from '../app/Utils';

//http://192.168.3.71:6969/api/rn/getInformation?token=123
let PREFIX = 'api/rn/getInformation?';

async function getThongTinNV(token) {
  let strBody = token == '' ? '' : 'token=' + token;
  const res = await Utils.get_apiToken(PREFIX + strBody);
  return res.data;
}

export default getThongTinNV;
