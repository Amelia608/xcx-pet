//Page Object
const app = getApp();
const ApiStore = require("../../api/store");
const LocUtil = require("../../utils/location");
let timerId = null;
Page({
  data: {
    lists: [{}, {}, {}, {}],
    bannerIndex: 0,
    cityName: "",
    cc_noAuth: true,
    ajax: false,
    isGetList: true,
    height: "",
    inputValue: "",
    location: {
      latitude: "",
      longitude: "",
    },
    pageNum: 1,
    pageSize: 20,
  },
  onLoad: function (options) {},
  onReady() {},

  onShow: function () {},
});
