//Page Object
const app = getApp();
const ApiStore = require("../../api/store");
Component({
    options: {
        addGlobalClass: true
    },
    properties: {
        empId: {
            type: String,
            value: ''
        },
        storeId: {
            type: String,
            value: ''
        }
    },
    data: {
        starLevelList: [],
        currentIndex: 0,
        commentlists: [],
        commentinfo: {},
        commentAjax: false,
        commentIsGetList: true,
        commentPage: 1,
        pageSize: 20
    },
    methods: {
        getList () {
            this.setData({
                starLevelList: [],
                currentIndex: 0,
                commentlists: [],
                commentinfo: {},
                commentAjax: false,
                commentIsGetList: true,
                commentPage: 1
            })
            this.getStoreStarLevelInfo()
        },
        // 星级切换事件
        handleServeLevel (e) {
            let index = e.currentTarget.dataset.index;
            if (index != this.data.currentIndex) {
                this.setData({
                    currentIndex: index,
                    commentlists: [],
                    commentinfo: {},
                    commentAjax: false,
                    commentIsGetList: true,
                    commentPage: 1,
                })
                this.getStoreCommentList()
            }
        },
        // 获取服务评价列表
        getStoreCommentList () {
            if (!this.data.commentIsGetList) return;
            if (this.data.commentAjax) return;
            this.setData({
                commentAjax: true
            });
            let params = {
                empId: this.data.empId,
                storeId: this.data.storeId,
                page: this.data.commentPage,
                pageSize: this.data.pageSize,
                starLevelEvaluate: this.data.starLevelList[this.data.currentIndex].starLevel
            }
            if (this.data.currentIndex == 1) {
                params.havePictures = 1
            }
            ApiStore.getStoreCommentList({
                data: params,
                fail: () => {
                    this.setData({
                        commentAjax: false
                    });
                },
                success: ({ data = {} }) => {
                    let starLevel = this.data.starLevelList
                    let starArr = ['', 'oneStarsCount', 'twoStarsCount', 'threeStarsCount', 'fourStarsCount', 'fiveStarsCount']
                    starLevel.map((item, index) => {
                        if (index == 0) {
                            item.markedName = (item.markedWords || '--') + ' ' + (data.count || 0)
                        } else if (index == 1) {
                            item.markedName = (item.markedWords || '--') + ' ' + (data.havePicturesCount || 0)
                        } else {
                            item.markedName = (item.markedWords || '--') + ' ' + (data[starArr[item.starLevel]] || 0)
                        }
                    })
                    let lists = [...this.data.commentlists];
                    data.list &&
                        data.list.map(item => {
                            item.fwxghjLabel = '服务：' + (item.service || 0) + '星 效果：' + (item.result || 0) + '星 环境：' + (item.environment || 0) + '星'
                            item.starLevelEvaluateNumber = Number(item.starLevelEvaluate || 0)
                            item.labelsArr = item.labels ? item.labels.split(',') : []
                            let empNames = []
                            item.emps.map(el => {
                              empNames.push(el.empName || '--')
                            })
                            item.empNames = empNames.join(',')
                            lists.push({ ...item });
                        });
                    let page = this.data.commentPage
                    let bol = page < data.totalPage
                    this.setData({
                        starLevelList: starLevel,
                        commentlists: lists,
                        commentinfo: {
                            starLevelEvaluate: data.starLevelEvaluateAvg,
                            starLevelEvaluateNumber: Number(data.starLevelEvaluateAvg || 0),
                            totalCount: data.totalCount || 0
                        },
                        commentAjax: false,
                        commentIsGetList: bol,
                        commentPage: bol ? ++page : page
                    });
                }
            });
        },
        // 获取门店评论星级信息
        getStoreStarLevelInfo () {
            ApiStore.getStoreStarLevelInfo({
                data: {},
                fail: () => { },
                success: ({ data = [] }) => {
                    let list = [{
                        starLevel: '',
                        markedWords: '全部'
                    }, {
                        starLevel: '',
                        markedWords: '晒图'
                    }, ...data]
                    this.setData({
                        starLevelList: list
                    });
                    this.getStoreCommentList()
                }
            });
        }
    },

});
