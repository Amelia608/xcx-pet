//Page Object
const app = getApp();
const ApiTakeNum = require("../../api/takeNum");

Page({
    data: {
        tapList: ["全部", "待服务", "服务中", "已完成", "已取消"],
        currentTab: 0,
        viewProgree: false,
        empInfo: {},
        cancelResonShow: false,
        deadline: '',
        ajax: false,
        isGetList: true,
        pageNum: 1,
        pageSize: 20,
        lists: [],
        chooseItem: {}

    },
    onLoad: function () {

    },

    onShow: function () {
        // 待服务 0 服务中 1 已完成 2 已取消 3
        let status = app.globalData.orderStatus
        let statusNumber = status >= 0 ? Number(status) + 1 : 0
        this.setData({
            currentTab: statusNumber
        })
        wx.showTabBar()
        this.setData({
            viewProgree: false,
            cancelResonShow: false,
            ajax: false,
            isGetList: true,
            lists: [],
            pageNum: 1
        })
        this.getTakeNumList()
    },
    makePhoneCall (e) {
        let item = e.currentTarget.dataset.item
        wx.makePhoneCall({ phoneNumber: item.tel })
    },
    toTakeNum (e) {
        let item = e.currentTarget.dataset.item
        wx.navigateTo({
            url: '/pages/takeNum/index?empId=' + item.technicianId + '&storeId=' + item.storeId
        })
    },
    // 删除订单
    deleteOrder (e) {
        let item = e.currentTarget.dataset.item
        let _this = this
        wx.showModal({
            title: '提示',
            content: '确定删除该记录吗',
            success (res) {
                if (res.confirm) {
                    _this.setData({
                        chooseItem: item,
                        'chooseItem.ccStatus': 4,
                    })
                    _this.updateNumStatus()
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })

    },
    toCommentPage (e) {
        let item = e.currentTarget.dataset.item
        wx.navigateTo({
            url: '/pages/addComment/index?id=' + item.storeId,
            success: function (res) {
                // 通过eventChannel向被打开页面传送数据
                res.eventChannel.emit('handleParams', {
                    data: {
                        id: item.id,
                        storeId: item.storeId,
                        storeName: item.storeName || '',
                        consumeBillCode: item.billNum || ''
                    }
                })
            }
        })
        console.log(item)
    },
    toStoreDetail (e) {
        let item = e.currentTarget.dataset.item
        if (!item.storeId) return
        wx.navigateTo({
            url: '/pages/storeDetail/index?id=' + item.storeId
        })
    },
    // 打开查看进度
    handleViewProgress (e) {
        let item = e.currentTarget.dataset.item
        this.setData({
            empInfo: {
                id: item.technicianId,
                name: item.technicianName || '',
                imgUrl: item.headUrl || ''
            },
            deadline: item.createTime,
            viewProgree: true
        })
        wx.hideTabBar()
    },

    // 关闭进度
    handleCloseViewProgress () {
        this.setData({
            viewProgree: false
        })
        wx.showTabBar()
    },
    // 打开取消原因
    handleOpenCancelReson (event) {
        let item = event.currentTarget.dataset.item;
        this.setData({
            cancelResonShow: true,
            chooseItem: item
        })
        wx.hideTabBar()
    },
    // 关闭取消原因
    handleCloseCancelReson (e) {
        let cancelReson = e.detail.cancelReson || ''
        let confrim = e.detail.confrim
        wx.showTabBar()
        this.setData({
            cancelResonShow: false,
            'chooseItem.cancelReson': cancelReson,
            'chooseItem.ccStatus': 3,
        })
        if (confrim) {
            this.updateNumStatus()
        }
    },
    switchNav (event) {
        let cur = event.currentTarget.dataset.current;
        if (this.data.currentTab == cur) {
            return false;
        } else {
            this.setData({
                currentTab: cur,
                ajax: false,
                isGetList: true,
                pageNum: 1,
                lists: []
            })
            app.globalData.orderStatus = cur
            this.getTakeNumList()
        }

    },
    // 改变订单状态
    updateNumStatus () {
        let params = {
            sid: this.data.chooseItem.sid,
            storeId: this.data.chooseItem.storeId,
            status: this.data.chooseItem.ccStatus
        }
        if (this.data.chooseItem.ccStatus == 3) {
            params.cancelReason = this.data.chooseItem.cancelReson
        }
        wx.showLoading({
            title: '加载中'
        })
        ApiTakeNum.updateNumStatus({
            data: params,
            fail: () => {
                wx.hideLoading()
            },
            success: (res) => {
                wx.hideLoading()
                if (res.code == '000000') {
                    let toastTitle = '取消成功'
                    if (this.data.chooseItem.ccStatus == 4) {
                        toastTitle = '删除成功'
                    }
                    wx.showToast({
                        title: toastTitle,
                        icon: 'none',
                        duration: 2000
                    })
                    this.setData({
                        ajax: false,
                        isGetList: true,
                        lists: [],
                        pageNum: 1
                    })
                    this.getTakeNumList()
                }

            }
        });
    },
    // 获取订单列表
    getTakeNumList () {
        if (!this.data.isGetList) return;
        if (this.data.ajax) return;
        this.setData({
            ajax: true
        });
        let status = this.data.currentTab == 0 ? '' : (this.data.currentTab - 1)
        ApiTakeNum.getTakeNumList({
            data: {
                cid: wx.getStorageSync('ww_customerId') || '',
                status,
                empId: '',
                page: this.data.pageNum,
                pageSize: this.data.pageSize
            },
            fail: () => {
                this.setData({
                    ajax: false
                });
            },
            success: ({ data = {} }) => {
                let result = data.data || []
                let lists = [...this.data.lists, ...result];
                let page = this.data.pageNum
                let bol = page < data.totalPage
                this.setData({
                    lists,
                    ajax: false,
                    isGetList: bol,
                    pageNum: bol ? ++page : page
                });
            }
        });
    }
});
