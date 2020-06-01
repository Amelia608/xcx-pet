const business = require('../../utils/util')

Component({
  properties: {
    icon: {
      type: String,
      value: ''
    },
    noDataDesc: {
      type: String,
      value: '暂无数据'
    },
    noDataBtnText: {
      type: String,
      value: ''
    },
    noDataBtnUrl: {
      type: String,
      value: ''
    },
    noDataImgUrl: {
      type: String,
      value: 'http://pxcpcqctc.bkt.clouddn.com/icon_no_tuandui.png'
    },
    noMoreDataDesc: {
      type: String,
      value: '已经到底了'
    },
    result: {
      type: Object,
      value: {}
    }
  },
  methods: {
    goLink: business.goLink
  }
})
