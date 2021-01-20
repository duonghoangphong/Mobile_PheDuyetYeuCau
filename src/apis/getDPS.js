import Utils from '../app/Utils';

//http://192.168.3.71:6969/api/rn/ThongBao?tinnhan=123
let PREFIX = 'api/rn/ThongBao?';

async function getItem(tinnhan) {
  let temp = tinnhan == '' ? '' : 'tinnhan=' + tinnhan;
  const res = await Utils.post_apiTokenHeader(PREFIX + temp);
  return res;
}

export default getItem;
