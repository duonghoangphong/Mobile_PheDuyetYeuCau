import Utils from '../app/Utils';
import getDSThongBao from './getDSThongBao';
//http://192.168.1.2:6969/api/YeuCau/updateThongBao?thongbaoiD=86
let PREFIX = 'api/YeuCau/updateThongBao';

async function getDaDocTB(id) {
  let strBody = id == '' ? '' : '?thongbaoiD=' + id;
  const res = await Utils.post_apiTokenHeader(PREFIX + strBody, 'abc');
  return res.status;
}

export default getDaDocTB;
