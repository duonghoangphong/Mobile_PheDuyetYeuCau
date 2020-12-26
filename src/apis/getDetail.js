import Utils from '../app/Utils';

//http://192.168.3.92:6969/api/YeuCau/getControls?query.filter.keys=Id_LoaiYeuCau&query.filter.vals=22
let PREFIX = 'api/YeuCau/getControls?';

async function getDetail(keys = '', vals = '') {
  let tempKeys = keys == '' ? '' : '&query.filter.keys=' + keys;
  let tempVals = vals == '' ? '' : '&query.filter.vals=' + vals;
  let strBody = tempKeys + tempVals;
  const res = await Utils.get_apiToken(PREFIX + strBody);
  return res.data;
}

export default getDetail;
