//Page Object
// 事件关闭 close
const app = getApp();
const ApiStore = require("../../api/store");
Component({
    options: {
        addGlobalClass: true
    },
    properties: {
        storeId: {
            type: String,
            value: ''
        },
        defaultData: {
            type: Array,
            value: []
        }
    },
    data: {
        list: [],
        statusArr: ['待服务', '服务中', '已完成', '已取消'],
        isGetList: true,
        ajax: false,
        pageSize: 10,
        pageNum: 1,
        wHeight: 300
    },
    ready () {
        let windowHeight = wx.getSystemInfoSync().windowHeight
        this.setData({
            list: [],
            isGetList: true,
            ajax: false,
            pageNum: 1,
            wHeight: (windowHeight / 3) * 2
        })
        this.getData()
    },
    methods: {
        handleClose () {
            let data = this.data.list.filter(item => item.checked)
            this.triggerEvent('close', { data })
        },
        // 选择理由
        chooseItem (e) {
            let index = e.currentTarget.dataset.index;
            let list = this.data.list
            let checked = this.data.list[index].checked
            list[index].checked = !checked
            this.setData({
                list
            })
        },
        // 获取技师列表
        getData () {
            if (!this.data.isGetList) return;
            if (this.data.ajax) return;
            this.setData({
                ajax: true
            });
            console.log(1)
            ApiStore.getStoreTecList({
                data: {
                    cid: wx.getStorageSync('ww_customerId') || '',
                    storeId: this.data.storeId,
                    page: this.data.pageNum,
                    pageSize: this.data.pageSize
                },
                fail: () => {
                    this.setData({
                        ajax: false
                    });
                },
                success: ({ data = {} }) => {
                    wx.hideLoading()
                    let list = [...this.data.list]
                    data.list && data.list.map(item => {
                        item.checked = false
                        this.data.defaultData.map(el => {
                            if (el.id === item.id) {
                                item.checked = true
                            }
                        })
                        list.push({ ...item })
                    })
                    let page = this.data.pageNum
                    let bol = page < data.totalPage
                    this.setData({
                        list,
                        ajax: false,
                        isGetList: bol,
                        pageNum: bol ? ++page : page
                    });
                }
            });
        },
        // 滚动底部事件
        scrolltolower () {
            this.getData()
        }
    },

});
