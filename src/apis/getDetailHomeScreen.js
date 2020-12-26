import Utils from '../app/Utils';

//http://192.168.3.44:6969/api/YeuCau/getDSYeuCau
let PREFIX = 'api/YeuCau/getDSYeuCau';

async function getDetailHomeScreen() {
  const res = await Utils.get_apiToken(PREFIX);
  Utils.nlog('=-=-=-=-: ', res);
  return res.data;
}

export default getDetailHomeScreen;
