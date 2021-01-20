import Utils from '../app/Utils';

//http://192.168.1.2:6969/api/BinhLuan/loadChiTietBinhLuan?ID_YeuCau=40480
let PREFIX = 'api/BinhLuan/loadChiTietBinhLuan?';

async function getDSBinhLuanLoad(id) {
  let temp = id == '' ? '' : 'ID_YeuCau=' + id;
  const res = await Utils.get_apiToken(PREFIX + temp);
  return res.data;
}

export default getDSBinhLuanLoad;
