import Utils from '../app/Utils';

//http://192.168.3.71:6969/api/YeuCau/PheDuyetYeuCau?idyeucau=30311&trangthai=1
let PREFIX = 'api/YeuCau/PheDuyetYeuCau?';

async function postXetDuyet(id = '', trangthai = '') {
  let tempKeys = id == '' ? '' : 'idyeucau=' + id;
  let tempVals = trangthai == '' ? '' : '&trangthai=' + trangthai;
  let strBody = tempKeys + tempVals;
  const res = await Utils.post_apiTokenHeader(PREFIX + strBody, 'abc');
  return res.status;
}

export default postXetDuyet;
