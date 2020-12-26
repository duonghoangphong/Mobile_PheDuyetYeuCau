import Utils from '../app/Utils';

let PREFIX = 'api/YeuCau/getDSLoaiYeuCau?';

async function danhSachSearch(status, keys = '', vals = '') {
  let tempKeys = keys == '' ? '' : '&query.filter.keys=' + keys;
  let tempVals = vals == '' ? '' : '&query.filter.vals=' + vals;
  let strBody = 'status=' + status + tempKeys + tempVals;
  const res = await Utils.get_apiToken(PREFIX + strBody);
  return res.data;
}

export default danhSachSearch;
