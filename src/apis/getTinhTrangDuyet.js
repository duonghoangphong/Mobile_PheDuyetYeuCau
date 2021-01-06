import Utils from '../app/Utils';

//http://192.168.3.32:6969/api/YeuCau/getTinhTrangDuyet?ID_YeuCau=30389
let PREFIX = 'api/YeuCau/getTinhTrangDuyet';

async function getTinhTrangDuyet(id) {
  let temp = id == '' ? '' : '?ID_YeuCau=' + id;
  const res = await Utils.get_apiToken(PREFIX + temp);
  return res.data;
}

export default getTinhTrangDuyet;
