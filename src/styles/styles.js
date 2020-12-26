/**
 * Styles for app
 * @type {string}
 * =====================================================================================================================
 */

import {
  Platform,
  StyleSheet, Dimensions
} from 'react-native';
import { isIphoneX, ifIphoneX } from 'react-native-iphone-x-helper';
import { colors } from '../styles/color';
import { sizes, reText } from '../styles/size';


const { width, height } = Dimensions.get('window');
export const nwidth = width;
export const nheight = height;
export const isIOS = Platform.OS == 'ios';
export const Width = (num: number) => nwidth * (num / 100);
export const Height = (num: number) => nheight * (num / 100);


//--Khai báo các thuộc tính chung
export const boldMax2 = '900';
export const boldMax = 'bold';
export const boldNom2 = '600';
export const boldNom = '400';
export const boldLow = '300';
export const khoangcach = 13;
export const top = 35;
//-- Khai báo các màu chủ đạo của app và gọi lại dùng.
export const nColors = {
  // bgr: Platform.OS == 'ios'? colors.veryLightPinkSeven: 'transparent',
  // bgr: colors.veryLightPinkSeven,
  bgr: colors.bgr,
  main: colors.white,
  main2: colors.greenyBlue,
  textMain: colors.black
};

//--Xử lý container iPhoneX
let safeHeighHead = 0;
let paddingTopMul = 0;
let paddingBotX = 0;
let heightHed = 50;
let heightBot = 50;
if (isIphoneX()) {
  safeHeighHead = 30;
  paddingTopMul = 30;
  heightBot = 80;
  heightHed = 80;
  paddingBotX = 25;
} else if (Platform.OS == 'ios') { //|| Platform.OS == 'android' && Platform.Version >= 20
  heightHed = 65;
  paddingTopMul = 15;
}
export { safeHeighHead, paddingBotX };
export { heightHed, paddingTopMul, heightBot };

export const nstyles = StyleSheet.create({
  ncontainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: nColors.bgr
  },
  // style khung fix hiện thị ở bottom cho iphone X. screen nào cần thì dùng(thường là screen nằm ngoài TabHome)
  ncontainerX: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: nColors.bgr,
    // backgroundColor: nColors.bgr,

    paddingBottom: paddingBotX
  },
  ncol: {
    flexDirection: 'column'
  },
  nrow: {
    flexDirection: 'row'
  },
  //--styles chung cơ bản của text, bắt buộc phải có trong mỗi style của thẻ <Text...
  ntext: {
    color: nColors.textMain,
    fontWeight: boldNom,
    fontSize: sizes.sText13
  },
  shadow: {
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    shadowColor: colors.black_50
  },
  shadowTop: {
    elevation: 24,
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowRadius: 16.00,
    shadowOpacity: 0.58,
    shadowColor: colors.black
  },
  ntextinput: {
    color: nColors.textMain,
    fontWeight: boldNom,
    fontSize: sizes.sText14,
    paddingVertical: 4,
    paddingHorizontal: 10
  },
  ntexttitle: {
    color: nColors.main2,
    fontWeight: boldNom,
    fontSize: sizes.sText17
  },
  ntextsub: {
    color: colors.colorGrayText,
    fontWeight: boldNom,
    fontSize: sizes.sText17
  },
  ntextSma: {
    color: nColors.textMain,
    fontWeight: boldNom,
    fontSize: sizes.sText14
  },
  ntextsubSma: {
    color: colors.colorGrayText,
    fontWeight: boldNom,
    fontSize: sizes.sText14
  },
  //--styles thanh header chung
  nhead: {
    height: heightHed,
    backgroundColor: nColors.main,
    borderColor: nColors.main2,
    borderBottomWidth: 1
  },
  nbody: {
    flex: 1,
  },
  nfooter: {
    height: heightBot,
    paddingBottom: paddingBotX
  },
  nbotttom: {
    height: 50,
    backgroundColor: colors.white
  },
  nHcontent: {
    flex: 1,
    paddingTop: paddingTopMul + 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13
  },
  nHleft: {
    width: sizes.nImgSize50,
    height: sizes.nImgSize50,
    justifyContent: 'center',
  },
  nHmid: {
    flex: 1,
    alignItems: 'center'
  },
  nHright: {
    width: sizes.nImgSize50,
    height: sizes.nImgSize50,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  //--
  ntitle: {
    color: nColors.main,
    lineHeight: 19,
    fontSize: sizes.sText20,
    fontWeight: 'bold'
  },
  nbtn_Bor_Ra: {
    backgroundColor: colors.white,
    borderColor: nColors.main,
    borderRadius: 5,
    borderWidth: 2,
    padding: 8,
    paddingHorizontal: 15,
    justifyContent: 'center'
  },
  nbtn_Bgr: {
    backgroundColor: nColors.main,
    padding: 8,
    paddingHorizontal: 12,
    justifyContent: 'center'
  },
  ntextbtn_Bor: {
    color: nColors.main,
    fontWeight: boldNom,
    textAlign: 'center',
    fontSize: sizes.sText17
  },
  ntextbtn_Bgr: {
    color: colors.white,
    fontWeight: boldNom2,
    textAlign: 'center',
    fontSize: sizes.sText17
  },
  nmiddle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  nLineTextInput: {
    height: 1,
    backgroundColor: '#BCBBC1'
  },
  //----
  npopupContain: {
    position: 'absolute',
    left: 0, right: 0, bottom: 0, height: height,
    flexDirection: 'column'
  },
  npopupBgr: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: colors.black,
    opacity: 0.5
  },
  //--- IMG styles
  nIcon8: {
    width: sizes.nImgSize8,
    height: sizes.nImgSize8
  },
  nIcon9: {
    width: sizes.nImgSize9,
    height: sizes.nImgSize9
  },
  nIcon10: {
    width: sizes.nImgSize10,
    height: sizes.nImgSize10
  },
  nIcon11: {
    width: sizes.nImgSize11,
    height: sizes.nImgSize11
  },
  nIcon12: {
    width: sizes.nImgSize12,
    height: sizes.nImgSize12
  },
  nIcon13: {
    width: sizes.nImgSize13,
    height: sizes.nImgSize13
  },
  nIcon14: {
    width: sizes.nImgSize14,
    height: sizes.nImgSize14,
  },
  nIcon15: {
    width: sizes.nImgSize15,
    height: sizes.nImgSize15,
  },
  nIcon16: {
    width: sizes.nImgSize16,
    height: sizes.nImgSize16,
  }, nIcon18: {
    width: sizes.nImgSize18,
    height: sizes.nImgSize18,
  },
  nIcon17: {
    width: sizes.nImgSize17,
    height: sizes.nImgSize17,
  },
  nIcon18: {
    width: sizes.nImgSize18,
    height: sizes.nImgSize18,
  },
  nIcon19: {
    width: sizes.nImgSize19,
    height: sizes.nImgSize19
  },
  nIcon20: {
    width: sizes.nImgSize20,
    height: sizes.nImgSize20
  },
  nIcon21: {
    width: sizes.nImgSize21,
    height: sizes.nImgSize21
  },

  nIcon22: {
    width: sizes.nImgSize22,
    height: sizes.nImgSize22
  },
  nIcon24: {
    width: sizes.nImgSize24,
    height: sizes.nImgSize24
  },
  nIcon26: {
    width: sizes.nImgSize26,
    height: sizes.nImgSize26
  },
  nIcon28: {
    width: sizes.nImgSize28,
    height: sizes.nImgSize28
  },
  nIcon29: {
    width: sizes.nImgSize29,
    height: sizes.nImgSize29
  },
  nIcon30: {
    width: sizes.nImgSize30,
    height: sizes.nImgSize30
  },
  nIcon32: {
    width: sizes.nImgSize32,
    height: sizes.nImgSize32
  },
  nIcon35: {
    width: sizes.nImgSize35,
    height: sizes.nImgSize35
  },
  nIcon38: {
    width: sizes.nImgSize38,
    height: sizes.nImgSize38
  },
  nIcon40: {
    width: sizes.nImgSize40,
    height: sizes.nImgSize40
  },
  nIcon48: {
    width: sizes.nImgSize48,
    height: sizes.nImgSize48
  },
  nIcon50: {
    width: sizes.nImgSize50,
    height: sizes.nImgSize50
  },
  nIcon56: {
    width: sizes.nImgSize56,
    height: sizes.nImgSize56
  },
  nIcon65: {
    width: sizes.nImgSize65,
    height: sizes.nImgSize65
  },

  nIcon81: {
    width: sizes.nImgSize81,
    height: sizes.nImgSize81
  },
  nIcon120: {
    width: sizes.nImgSize120,
    height: sizes.nImgSize120
  },
  nAva26: {
    width: sizes.nImgSize26,
    height: sizes.nImgSize26,
    borderRadius: sizes.nImgSize26 / 2
  },
  nAva28: {
    width: sizes.nImgSize28,
    height: sizes.nImgSize28,
    borderRadius: sizes.nImgSize28 / 2
  },
  nAva35: {
    width: sizes.nImgSize35,
    height: sizes.nImgSize35,
    borderRadius: sizes.nImgSize35 / 2
  },
  nAva40: {
    width: sizes.nImgSize40,
    height: sizes.nImgSize40,
    borderRadius: sizes.nImgSize40 / 2
  },
  nAva50: {
    width: sizes.nImgSize50,
    height: sizes.nImgSize50,
    borderRadius: sizes.nImgSize50 / 2
  },
  nAva60: {
    width: sizes.nImgSize60,
    height: sizes.nImgSize60,
    borderRadius: sizes.nImgSize60 / 2
  },
  nAva70: {
    width: sizes.nImgSize70,
    height: sizes.nImgSize70,
    borderRadius: sizes.nImgSize70 / 2
  },
  nAva80: {
    width: sizes.nImgSize80,
    height: sizes.nImgSize80,
    borderRadius: sizes.nImgSize80 / 2
  },
  nbtnCir14: {
    width: sizes.nImgSize14,
    height: sizes.nImgSize14,
    borderRadius: sizes.nImgSize14 / 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nbtnCir40: {
    width: sizes.nImgSize40,
    height: sizes.nImgSize40,
    borderRadius: sizes.nImgSize20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  //-- TripU styles chung
  containLinebot: {
    borderColor: colors.sapphire,
    borderBottomWidth: 0.5,
    paddingVertical: 5,
    marginVertical: 15,
    alignItems: 'center'
  },
  containWhite_BorBlue: {
    backgroundColor: colors.white, marginHorizontal: 20,
    padding: 12, paddingVertical: 25,
    marginBottom: Height(5)
  },
  txtGeneral: {
    fontSize: sizes.sText15,
    color: 'black',
    fontWeight: boldNom
  },
  txtGray: {
    fontSize: sizes.sText12,
    color: colors.colorGreyishBrown
  },
  txtSoftBlue: {
    fontSize: sizes.sText14,
    color: colors.softBlue
  },
  txtWhite: {
    fontSize: sizes.sText14,
    color: 'white'
  },
  txtSapphire17: {
    fontSize: sizes.sText17,
    color: colors.colorSapphire
  },
  text14: {
    fontSize: reText(14)
  },
  text13: {
    fontSize: reText(13)
  },
  text12: {
    fontSize: reText(12)
  },
  containViewHead: {
    // position: 'absolute',
    marginTop: -top,
    backgroundColor: colors.white,
    right: 0,
    left: 0,
    marginHorizontal: khoangcach,
    borderRadius: 4,
    padding: 20,
    paddingVertical: 10
  },
  button: {
    flex: 1,
    padding: 11,
    backgroundColor: colors.bgr,
    borderRadius: 3,
    justifyContent: 'space-between'
  },
  iconDown: {
    transform: [{ rotate: '-90deg' }],
    tintColor: colors.black_20
  },
});

//css khác tự định nghĩa
//---------------------

//Hiện sẽ copy style từng màn hình bỏ đây (nếu có).

//styles màn hình Feeds
export const stFeeds = StyleSheet.create({
  textLikes: {
    color: '#4A4A4A',
    fontSize: 14,
    fontWeight: '300'
  },
  loadios: { position: 'absolute', bottom: -50, left: 0, width: '100%', alignItems: 'center' },
  loadandroid: { width: '100%', alignItems: 'center', marginTop: 20 },
  imgFull: { borderWidth: 0.5, borderColor: colors.colorGrayText },
  imgLink: { width: 100, height: 100, borderWidth: 0.5, borderColor: colors.colorGrayText, marginLeft: -10 }
});

//styles màn hình Comment
export const stComment = StyleSheet.create({
  textCmt: {
    color: nColors.textMain,
    fontSize: 15,
    fontWeight: boldNom
  }
});

//styles màn hình Comment
export const stNewFeeds = StyleSheet.create({
  btnDelItem: {
    position: 'absolute',
    top: 5,
    right: 5
  }
});

// Styles màn hình Accomplishment
export const stAccomplishment = StyleSheet.create({
  bodyBgr: {
    backgroundColor: '#DADADB',
  },
  firstTittle: {
    fontSize: sizes.sText17,
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 5,
    color: '#8E8E93'
  },
  txtTitle: {
    color: '#8E8E93',
    fontSize: sizes.sText17,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 5
  },
  txtContent: {
    fontSize: sizes.sText17,
    color: nColors.textMain,
    marginLeft: 10,
    marginVertical: 10
  },
  ContentBgr: {
    height: 44,
    backgroundColor: colors.white
  },
  containerTextArea: {
    height: 176,
    backgroundColor: colors.white
  },
  btnContainer: {
    backgroundColor: colors.white,
    height: 44,
    marginTop: 10,
    marginBottom: 12
  },
  txtBtn: {
    color: '#D0021B',
    fontSize: sizes.sText17
  },
  IconContainer: {
    position: 'absolute',
    right: 12
  },
})

export const stProfile = StyleSheet.create({
  txtSize20: {
    fontSize: sizes.sText20,
    color: colors.softBlue
  },
  txtSize14: {
    fontSize: sizes.sText14,
    color: colors.black
  },
  txtSize17: {
    fontSize: sizes.sText17,
    color: colors.black
  },
  txtSize10: {
    fontSize: sizes.sText10,
    color: colors.softBlue
  },
  title: {
    marginTop: 16,
    fontSize: sizes.sText14,
    fontWeight: '500',
    color: colors.blueGrey
  },
  txtSize12: {
    fontSize: sizes.sText12,
    color: colors.softBlue
  },
  textInput: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: sizes.sText14,
    fontWeight: '500',
    color: colors.dark
  },
  btnChangePhoto: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: colors.softBlue,
    borderRadius: 5
  },
  rooms: {
    borderRadius: 17,
    borderColor: colors.colorBrownishGrey,
    borderWidth: 1,
    backgroundColor: 'white',
    height: 34,
    width: '30%',
    marginTop: 10
  },
  btnEnd: {
    width: 100,
    height: 30,
    borderRadius: 15,
    paddingVertical: 5,
  },
  containerBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: colors.sapphire,
    flexDirection: 'row',
    padding: 12,
    paddingLeft: 20,
    paddingVertical: 15,
    paddingHorizontal: 30
  },
  category: {
    fontSize: sizes.sText20,
    color: colors.black,
    fontWeight: "500"
  },
})

export const stUser = StyleSheet.create({
  containerTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  line: {
    height: 1,
    backgroundColor: '#696969',
    flex: 1
  },
  txtTab: {
    fontSize: sizes.sText12,
    fontWeight: '600',
    paddingVertical: 10
  },
  txtOr: {
    marginHorizontal: 10,
    fontSize: sizes.sText13,
    color: '#696969',
    fontWeight: '500',
  },
  containerTabSignIn: {
    paddingBottom: 3,
    borderBottomWidth: 2,
    alignItems: 'center'
  },
  labelTitle: {
    fontSize: sizes.sText13,
    color: colors.colorBrownishGrey,
    fontWeight: '500',
    marginTop: 20,
  },
  txtInput: {
    paddingVertical: 13,
    paddingHorizontal: 16,
    color: colors.black,
    fontWeight: '500',
    fontSize: sizes.sText14
  },
  containerInput: {
    borderRadius: 6,
    backgroundColor: colors.whitegay,
    justifyContent: 'center',
    marginTop: 8
  },
  txtForgot: {
    textAlign: 'center',
    color: colors.gunmetal,
    fontSize: sizes.sText12,
    fontWeight: '600',
  },
  inputBox: {
    width: '100%',
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255,255,0.2)',
    borderRadius: 18,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: "#4f80ff",
    paddingHorizontal: 20,

  },
  chooseGender: {
    // position: 'absolute',
    backgroundColor: 'white',
    width: '25%',
    top: '10%', left: 5,
    height: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 1,
    borderRadius: 8
  },

})
export const dd = StyleSheet.create({
  container: {
    flex: 1
  },

  wrapper: {
  },

  slide: {
    height: '100%'
  },


  image: {
    height: '100%',
    width: '70%',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginHorizontal: 20,
    borderRadius: 10,
    flex: 1
  }
})

