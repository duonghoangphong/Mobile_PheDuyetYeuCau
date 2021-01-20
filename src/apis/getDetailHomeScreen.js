import Utils from '../app/Utils';

//http://192.168.3.32:6969/api/YeuCau/getDSYeuCau?tinhtrang=0&toiguidi=0&guidentoi=1

let PREFIX = 'api/YeuCau/getDSYeuCau';
async function getDetailHomeScreen(
  trangthai = '',
  toiguidi = '',
  guidentoi = '',
) {
  // console.log('trangthai toiguidi guidentoi', trangthai, toiguidi, guidentoi);
  let temptrangthai = trangthai + '';
  let temptoiguidi = toiguidi + '';
  let tempguidentoi = guidentoi + '';
  let str = temptrangthai == '' ? '' : '?tinhtrang=' + trangthai;
  let temp0 = temptoiguidi == '' ? '' : '&toiguidi=' + toiguidi;
  let temp1 = tempguidentoi == '' ? '' : '&guidentoi=' + guidentoi;
  let temp2 = str + temp0 + temp1;
  console.log('getDetailHomeScreen: ', temp2);
  const res = await Utils.get_apiToken(PREFIX + temp2);
  return res.data;
}

export default getDetailHomeScreen;
