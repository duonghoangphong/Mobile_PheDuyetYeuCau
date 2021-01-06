import Utils from '../app/Utils';

let PREFIX = 'api/YeuCau/loadChiTietYeuCau?';
//192.168.3.32:6969/api/YeuCau/loadChiTietYeuCau?idRowYeuCau=20261

async function getThongTinChiTiet(idRowYeuCau) {
  let temp = idRowYeuCau == '' ? '' : 'idRowYeuCau=' + idRowYeuCau;
  let strBody = temp;
  const res = await Utils.get_apiToken(PREFIX + strBody);
  return res.data;
}

export default getThongTinChiTiet;
