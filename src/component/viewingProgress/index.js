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
        statusArr: ['待服务', '服务中', '已完成', '已取消']
    },
    ready () {
        console.log('ready')
        this.viewingProgress()
    },
    methods: {
        handleClose () {
            this.triggerEvent('close')
        },
        // 获取进度
        viewingProgress () {
            wx.showLoading({
                title: '加载中'
            })
            let params = {
                empId: this.data.empInfo.id,
                deadline: this.data.deadline
            }
            ApiTakeNum.viewingProgress({
                data: params,
                fail: () => {
                    wx.hideLoading()
                },
                success: ({ data = [] }) => {
                    wx.hideLoading()
                    let list = []
                    let dataLength = data.length
                    if (dataLength < 6) {
                        list = [...data]
                    } else {
                        let dataArrStart = data.slice(0, 3)
                        let dataArrEnd = data.slice(-2)
                        list = [...dataArrStart, { ellipsis: true }, ...dataArrEnd]
                    }
                    this.setData({
                        list
                    });
                }
            });
        }
    },

});
