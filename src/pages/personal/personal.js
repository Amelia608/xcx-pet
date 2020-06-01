const api = require("../../api/personal");
let app = getApp();
Page({
    data: {
        customerId: "",
        info: {}
    },
    onLoad: function(options) {},
    onShow: function() {
        this.setData({
            customerId: wx.getStorageSync("ww_customerId") || ""
        });
        this.getInfo();
    },
    goOrder({ currentTarget }) {
        app.globalData.orderStatus = currentTarget.dataset.status;
        wx.switchTab({ url: "/pages/order/index" });
        // console.log( app.globalData.orderStatus)
    },
    invite() {
        wx.showToast({
            title: "敬请期待...", //提示的内容,
            icon: "none", //图标,
            duration: 2000, //延迟时间,
            mask: true, //显示透明蒙层，防止触摸穿透,
            success: res => {}
        });
    },
    getInfo() {
        wx.showLoading({
            title: "数据加载中...", //提示的内容,
            mask: true, //显示透明蒙层，防止触摸穿透,
            success: res => {}
        });
        api.getCustomerInfo({
            cid: this.data.customerId,
            success: res => {
                if (res.code == "000000" && res.data) {
                    this.setData({ info: res.data });
                }
                wx.hideLoading();
            },
            fail: () => {
                wx.hideLoading();
            }
        });
    }
});
