import Utils from '../app/Utils';

//http://192.168.3.32:6969/api/YeuCau/getDSYeuCau?tinhtrang=3
let PREFIX = 'api/YeuCau/getDSYeuCau';

async function getDetailHomeScreen(trangthai) {
  let str = trangthai == '' ? '' : '?tinhtrang=' + trangthai;
  const res = await Utils.get_apiToken(PREFIX + str);
  return res.data;
}

export default getDetailHomeScreen;
