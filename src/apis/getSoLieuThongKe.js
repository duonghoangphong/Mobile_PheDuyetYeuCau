import Utils from '../app/Utils';
//http://192.168.1.4:6969/api/Report/getSoLuongYeuCau
let PREFIX = 'api/Report/getSoLuongYeuCau';

async function getSoLieuThongKe() {
  const res = await Utils.get_apiToken(PREFIX);
  return res.data;
}

export default getSoLieuThongKe;
