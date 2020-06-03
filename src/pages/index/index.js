//Page Object
const app = getApp();
let timerId = null;
Page({
    data: {
        indexTemplateItemList: [
          {imgUrl:'../../images/index/banner1.jpg'},
          {imgUrl:'../../images/index/banner2.jpg'},
          {imgUrl:'../../images/index/banner3.jpg'}
        ],
        quickList:[
          {name:'发布信息',icon:'../../images/index/quick1.png',path:'/pages/public/index'},
          {name:'寻物启示',icon:'../../images/index/quick2.png',path:'/pages/note/index'},
          {name:'寻主启示',icon:'../../images/index/quick3.png',path:'/pages/public/index'},
          {name:'领养活动',icon:'../../images/index/quick4.png',path:'/pages/findmaster/index'},
        ],
        array: ['浦东新区', '青浦城区', '虹桥世界'],
        lists:[{},{},{},{}],
        bannerIndex: 0,
        ajax: false,
        isGetList: true,
        height: "",
        inputValue: "",
        location: {
            latitude: "",
            longitude: ""
        },
        pageNum: 1,
        pageSize: 20,
        index:0
    },
    //options(Object)
    onLoad: function (options) { },
    onReady () {
        // this.getHeight();
    },

    onShow: function () {
        // let _this = this;
        // if (_this.data.cityName) {
        //     _this.setData({
        //         inputValue: "",
        //         lists: [],
        //         ajax: false,
        //         isGetList: true,
        //         pageNum: 1
        //     });
        //     _this.getBannerInfo();
        //     _this.getStoreList();
        //     return;
        // }
        // wx.getLocation({
        //     type: "wgs84",
        //     complete () {
        //         setTimeout(() => {
        //             console.log('kkkklllll')
        //             LocUtil.getLocation(function (data) {
        //                 app.globalData.initIndexLotion = false
        //                 _this.setData({
        //                     location: {
        //                         latitude: data[0].latitude,
        //                         longitude: data[0].longitude
        //                     },
        //                     inputValue: "",
        //                     lists: [],
        //                     ajax: false,
        //                     isGetList: true,
        //                     pageNum: 1,
        //                     cc_noAuth: !!data[0].cc_noAuth,
        //                     cityName:
        //                         data[0].regeocodeData.addressComponent.province
        //                 });
        //                 _this.getBannerInfo();
        //                 _this.getStoreList();
        //             });
        //         }, 10);
        //     }
        // });
    },
    bindPickerChange({detail:{value}}){
      this.setData({index:value})
    },
    intervalChange ({ detail }) {
        this.setData({ bannerIndex: detail.current });
    },
    toDetail (e) {
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/storeDetail/index?id=' + id
        })
    },
    // 获取轮播图事件
    getBannerInfo (e) {
        wx.showLoading({
            title: '加载中',
        })
        ApiStore.getBannerInfo({
            data: {},
            fail: () => {
                wx.hideLoading()
            },
            success: ({ data = {} }) => {
                wx.hideLoading()
                let list = []
                data.info && data.info.map(item => {
                    list.push({
                        imgUrl: item.url,
                        linkUrl: item.link || ''
                    })
                })
                this.setData({
                    indexTemplateItemList: list
                })
            }
        });
    },
    // 点击轮播图事件
    handleSwiper () {
        let slides = this.data.indexTemplateItemList;
        let linkUrl = slides[this.data.bannerIndex].linkUrl;
        if (!linkUrl) return;
        wx.navigateTo({
            url: "/pages/h5view/h5view?linkUrl=" + linkUrl
        });
    },
    //input事件
    bindKeyInput (e) {
        let inp = e.detail.value;
        this.setData({
            inputValue: inp
        });
        // timerId && clearTimeout(timerId);
        // timerId = setTimeout(() => {
        //     this.setData({
        //         inputValue: inp,
        //         lists: [],
        //         ajax: false,
        //         isGetList: true,
        //         pageNum: 1
        //     });
        //     this.getStoreList();
        // }, 400);
    },
    bindConfirm (e) {
        let inp = e.detail.value;
        this.setData({
            inputValue: inp,
            lists: [],
            ajax: false,
            isGetList: true,
            pageNum: 1
        });
        this.getStoreList();
    },
    getHeight () {
        let query = wx.createSelectorQuery();
        query
            .select(".store_list_content")
            .boundingClientRect(rect => {
                this.setData({
                    height:
                        wx.getSystemInfoSync().windowHeight - rect.top - 15 + "px"
                });
            })
            .exec();
    },
    getStoreList () {
        if (this.data.cityName === "定位失败") {
            this.setData({
                lists: [],
                ajax: false,
                isGetList: false,
                pageNum: 1,
            });
            return;
        }
        if (!this.data.isGetList) return;
        if (this.data.ajax) return;
        this.setData({
            ajax: true
        });
        ApiStore.getStoreList({
            data: {
                cityName: this.data.cityName,
                appId: app.globalData.appId,
                customersId: wx.getStorageSync('ww_customerId') || '',
                longitude: this.data.location.longitude,
                latitude: this.data.location.latitude,
                storeName: this.data.inputValue,
                page: this.data.pageNum,
                pageSize: this.data.pageSize
            },
            fail: () => {
                wx.showToast({
                    title: "获取门店列表失败",
                    icon: "none",
                    duration: 2000
                });
                this.setData({
                    ajax: false
                });
            },
            success: ({ data = {} }) => {
                let lists = [...this.data.lists];
                data.list &&
                    data.list.map(item => {
                        lists.push({
                            id: item.id,
                            addr: item.addr,
                            name: item.name,
                            distance: item.distance,
                            consumptionNum: item.consumptionNum,
                            forServiceNum: item.forServiceNum,
                            startTime: item.startTime,
                            endTime: item.endTime,
                            flag: item.flag
                        });
                    });
                let page = this.data.pageNum
                let bol = page < data.totalPage
                this.setData({
                    lists,
                    ajax: false,
                    isGetList: bol,
                    pageNum: bol ? ++page : page,
                });
            }
        });
    },
    onReachBottom () {
        this.getStoreList();
    }
});
