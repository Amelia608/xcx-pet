//Page Object
// 事件关闭 close
const app = getApp();
const ApiTakeNum = require("../../api/takeNum");
Component({
    options: {
        addGlobalClass: true
    },
    properties: {
        deadline: {
            type: String,
            value: ''
        },
        empInfo: {
            type: Object,
            value: {
                id: '',
                name: '',
                imgUrl: ''
            }
        }
    },
    data: {
        list: [],
        statusArr: ['待服务', '服务中', '已完成', '已取消'],
        wHeight: 300,
        ajax: false
    },
    ready () {
        let windowHeight = wx.getSystemInfoSync().windowHeight
        this.setData({
            wHeight: windowHeight / 2,
            ajax: false,
            list: []
        })
        this.getData()
    },
    methods: {
        handleClose () {
            this.triggerEvent('close', { confrim: false })
        },
        // 选择理由
        chooseItem (e) {
            let index = e.currentTarget.dataset.index;
            let list = this.data.list
            let checked = this.data.list[index].checked
            list.map(item => {
                item.checked = false
            })
            list[index].checked = !checked
            this.setData({
                list
            })
            if (!checked) {
                this.triggerEvent('close', { cancelReson: this.data.list[index].name, confrim: true })
            }
        },
        // 获取取消原因
        getData () {
            this.setData({
                ajax: true
            })
            ApiTakeNum.getCause({
                data: {},
                fail: () => {
                    this.setData({
                        ajax: false
                    })
                },
                success: ({ data = [] }) => {
                    data.map(item => {
                        item.checked = false
                    })
                    let list = [...data]
                    this.setData({
                        list,
                        ajax: false
                    });
                }
            });
        }
    },

});
