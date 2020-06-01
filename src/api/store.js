const app = getApp()
// 获取搜索区域记录
exports.getCityHistory = (options) => {
  let data = options.data || {}
  app.ajax({
    url: '/haircut/store/openedStore/' + app.globalData.appId + '/city/history',
    type: 'GET',
    data,
    success (res) {
      if (options.success) options.success(res)
    },
    fail (res) {
      if (options.fail) options.fail(res)
    }
  })
}
// 获取已开通门店城市列表
exports.getStoreCity = (options) => {
  let data = options.data || {}
  app.ajax({
    url: '/haircut/store/openedStore/' + app.globalData.appId + '/city',
    type: 'GET',
    data,
    success (res) {
      if (options.success) options.success(res)
    },
    fail (res) {
      if (options.fail) options.fail(res)
    }
  })
}
// 获取banner信息
exports.getBannerInfo = (options) => {
  let data = options.data || {}
  app.ajax({
    url: '/haircut/applet/set/banner/info',
    type: 'GET',
    data,
    success (res) {
      if (options.success) options.success(res)
    },
    fail (res) {
      if (options.fail) options.fail(res)
    }
  })
}
// 获取门店列表
exports.getStoreList = (options) => {
  let data = options.data || {}
  data.appId = app.globalData.appId
  app.ajax({
    url: '/haircut/store/getStoreList',
    type: 'GET',
    data,
    success (res) {
      if (options.success) options.success(res)
    },
    fail (res) {
      if (options.fail) options.fail(res)
    }
  })
}
// 获取门店信息
exports.getStoreInfo = (options) => {
  let data = options.data || {}
  app.ajax({
    url: `/haircut/store/${data.storeId}/info`,
    type: 'GET',
    data: {},
    success (res) {
      if (options.success) options.success(res)
    },
    fail (res) {
      if (options.fail) options.fail(res)
    }
  })
}
// 获取门店技师列表
exports.getStoreTecList = (options) => {
  let data = options.data || {}
  app.ajax({
    url: `/haircut/employee/getList`,
    type: 'GET',
    data,
    success (res) {
      if (options.success) options.success(res)
    },
    fail (res) {
      if (options.fail) options.fail(res)
    }
  })
}
// 获取门店/技师评价列表
exports.getStoreCommentList = (options) => {
  let data = options.data || {}
  app.ajax({
    url: `/haircut/comment/getList/byEmpId`,
    type: 'GET',
    data,
    success (res) {
      if (options.success) options.success(res)
    },
    fail (res) {
      if (options.fail) options.fail(res)
    }
  })
}
// 获取门店评论星级信息
exports.getStoreStarLevelInfo = (options) => {
  let data = options.data || {}
  app.ajax({
    url: `/haircut/comment/starLevel/info`,
    type: 'GET',
    data,
    success (res) {
      if (options.success) options.success(res)
    },
    fail (res) {
      if (options.fail) options.fail(res)
    }
  })
}
// 获取技师职位信息
exports.getTecPostInfo = (options) => {
  let data = options.data || {}
  app.ajax({
    url: `/haircut/comment/post/${data.empId}/item`,
    type: 'GET',
    data,
    success (res) {
      if (options.success) options.success(res)
    },
    fail (res) {
      if (options.fail) options.fail(res)
    }
  })
}
// 获取店铺评价设置信息
exports.getShopSetCommentInfo = (options) => {
  let data = options.data || {}
  app.ajax({
    url: `/haircut/comment/set/getList`,
    type: 'GET',
    data,
    success (res) {
      if (options.success) options.success(res)
    },
    fail (res) {
      if (options.fail) options.fail(res)
    }
  })
}
// 保存评价
exports.saveComment = (options) => {
  let data = options.data || {}
  app.ajax({
    url: `/haircut/comment/sava/info`,
    type: 'POST',
    data,
    success (res) {
      if (options.success) options.success(res)
    },
    fail (res) {
      if (options.fail) options.fail(res)
    }
  })
}
// 获取技师经验接口
exports.getTecExperience = (options) => {
  let data = options.data || {}
  app.ajax({
    url: `/haircut/employee/${data.empId}/experience`,
    type: 'get',
    data,
    success (res) {
      if (options.success) options.success(res)
    },
    fail (res) {
      if (options.fail) options.fail(res)
    }
  })
}
// 获取技师作品接口
exports.getTecWorks = (options) => {
  let data = options.data || {}
  app.ajax({
    url: `/haircut/employee/${data.empId}/works`,
    type: 'get',
    data,
    success (res) {
      if (options.success) options.success(res)
    },
    fail (res) {
      if (options.fail) options.fail(res)
    }
  })
}