const app = getApp()
// 获取分销明细图标数据
exports.commissionDetail = (options) => {
  let data = options.data || {}
  app.ajax({
    url: '/mall/cddb/commissionDetail',
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
// 每月佣金统计
exports.monthReport = (options) => {
  app.ajax({
    url: '/mall/cddb/monthReport',
    type: 'post',
    ...options,
    success (res) {
      res.data.income = res.data.income || '0.00'
      res.data.expenditure = res.data.expenditure || '0.00'
      res.data.ramount = res.data.ramount || '0.00'
      res.data.wamount = res.data.wamount || '0.00'
      res.data.gamount = res.data.gamount || '0.00'
      if (options.success) options.success(res)
    }
  })
}

  // 分销佣金订单明细列表
  exports.commissionlist = (options) => {
    app.ajax({
      url: '/mall/cddb/commissionlist',
      type: 'post',
      ...options,
      success (res) {
        if (options.success) options.success(res)
      }
    })
  }