const app = getApp()
exports.custmobile = (options) => {
  let data = options.data || {}
  data.appId = app.globalData.appId
  app.ajax({
    url: '/consumer/customers/add/customers',
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
exports.isCustmobile = (options) => {
  let data = options.data || {}
  data.appId = app.globalData.appId
  app.ajax({
    url: '/consumer/customers/add/customers',
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
