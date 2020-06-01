const app = getApp()
// 获取取号服务项
exports.getServer = (options) => {
  let data = options.data || {}
  app.ajax({
    url: '/haircut/resNum/getServer',
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
// 取号
exports.takeNum = (options) => {
  let data = options.data || {}
  app.ajax({
    url: '/haircut/resNum/takeNum',
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
// 获取取号详情
exports.getTakeNum = (options) => {
  let data = options.data || {}
  app.ajax({
    url: '/haircut/resNum/getTakeNum',
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
// 获取取号进度
exports.viewingProgress = (options) => {
  let data = options.data || {}
  app.ajax({
    url: '/haircut/resNum/viewingProgress',
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
// 获取取号列表
exports.getTakeNumList = (options) => {
  let data = options.data || {}
  app.ajax({
    url: '/haircut/resNum/getTakeNumList',
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
// 获取取消原因
exports.getCause = (options) => {
  let data = options.data || {}
  app.ajax({
    url: '/haircut/resNum/getCause',
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
// 更改订单状态
exports.updateNumStatus = (options) => {
  let data = options.data || {}
  app.ajax({
    url: '/haircut/resNum/updateNumStatus',
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
