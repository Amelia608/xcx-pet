//Page Object
const app = getApp();
Page({
  data: {
    indexTemplateItemList: [
      { imgUrl: "../../images/index/banner1.jpg" },
      { imgUrl: "../../images/index/banner2.jpg" },
      { imgUrl: "../../images/index/banner3.jpg" },
    ],
    quickList: [
      {
        name: "发布信息",
        icon: "../../images/index/quick1.png",
        path: "/pages/public/index",
      },
      {
        name: "寻物启示",
        icon: "../../images/index/quick2.png",
        path: "/pages/note/index",
      },
      {
        name: "寻主启示",
        icon: "../../images/index/quick3.png",
        path: "/pages/public/index",
      },
      {
        name: "领养活动",
        icon: "../../images/index/quick4.png",
        path: "/pages/findmaster/index",
      },
    ],
    array: ["浦东新区", "青浦城区", "虹桥世界"],
    lists: [{}, {}, {}, {}],
    bannerIndex: 0,
    ajax: false,
    isGetList: true,
    height: "",
    inputValue: "",
    pageNum: 1,
    pageSize: 20,
    index: 0,
  },
  onLoad: function (options) {},
  onReady() {},
  bindPickerChange({ detail: { value } }) {
    this.setData({ index: value });
  },
  intervalChange({ detail }) {
    this.setData({ bannerIndex: detail.current });
  },

  //input事件
  bindKeyInput(e) {
    let inp = e.detail.value;
    this.setData({
      inputValue: inp,
    });
  },
  bindConfirm(e) {},
});
