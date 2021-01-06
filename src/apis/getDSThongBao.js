import Utils from '../app/Utils';

//http://192.168.3.92:6969/api/YeuCau/getControls?query.filter.keys=Id_LoaiYeuCau&query.filter.vals=22
let PREFIX = 'api/YeuCau/getDSThongBao';

async function getDSThongBao() {
  const res = await Utils.get_apiToken(PREFIX);
  return res.data;
}

export default getDSThongBao;
