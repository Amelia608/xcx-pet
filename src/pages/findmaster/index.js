/*
 * @Author: your name
 * @Date: 2020-06-03 22:15:38
 * @LastEditTime: 2020-06-03 22:36:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /xcx-appointment-mf-user-sass/src/pages/findmaster/index.js
 */
//Page Object
const app = getApp();
const  utils = require("../../utils/index");
let timerId = null;
Page({
  data: {
    cate: ["田园犬", "泰迪", "二哈", "金毛"],
    tabs:[{name:'已被暂时手编',code:'1'},{name:'尚在餐风露宿中',code:'2'}],
    tabIndex:0,
    cateIndex: -1,
    ages: [0.3, 1, 2, 3, 4, 5],
    ageIndex: -1,
    currentLocation: "",
    sexList:['男生','女生'],
    jys:['已绝育','未绝育','不确定'],
    jyIndex:-1,
    setIndex:-1,
    date:utils.dateFormat(new Date(),'yyyy-MM-dd')
  },
  onLoad: function (options) {},
  onReady() {},

  onShow: function () {},
  openMap() {
    wx.chooseLocation({
      success: (res) => {
        this.setData({ currentLocation: res.address });
        console.log(res);
      },
    });
  },
  bindPickerChange(res) {
    let name = res.currentTarget.dataset.name;
    let value = res.detail.value;
    this.setData({ [name]: value });
  },
  RadioChange(res){
    let index=res.currentTarget.dataset.index
    let name=res.currentTarget.dataset.name
    this.setData({ [name]: index });
  }
});
