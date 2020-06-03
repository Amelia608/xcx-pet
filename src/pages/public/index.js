//Page Object
const app = getApp();
const  utils = require("../../utils/index");
let timerId = null;
Page({
  data: {
    cate: ["田园犬", "泰迪", "二哈", "金毛"],
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
