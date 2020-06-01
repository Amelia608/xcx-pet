const app = getApp()
// 获取技师列表
exports.getAppointmentInfo = (options) => {
  let data = options.data || {}
  app.ajax({
    url: '/consumer/appointment/getAppointment/info',
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
// 根据预约时间获取技师列表
exports.getAppoTimeInfo = (options) => {
  let data = options.data || {}
  app.ajax({
    url: '/consumer/appointment/appointmentTime',
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
// 获取门店服务分类
exports.getPcatesInfo = (options) => {
  let data = options.data || {}
  app.ajax({
    url:'/consumer/newAppointment/getProCates',
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
// 获取门店服务sku
exports.getSkuInfo = (options) => {
  let data = options.data || {}
  app.ajax({
    url:'/consumer/newAppointment/getSetverList',
    type: 'post',
    data,
    success (res) {
      if (options.success) options.success(res)
    },
    fail (res) {
      if (options.fail) options.fail(res)
    }
  })
}
// 获取技师的可预约时间
exports.getTecAppoTime = (options) => {
  let data = options.data || {}
  app.ajax({
    url:'/consumer/appointment/appointmentTime/state',
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
// 添加/修改预约
exports.addAppointment = (options) => {
  let data = options.data || {}
  app.ajax({
    url:'/consumer/newAppointment/saveOrUpdAppt',
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
// 变更预约
// exports.updateAppointment = (options) => {
//   let data = options.data || {}
//   app.ajax({
//     url:'/consumer/emp/newAppointment/saveOrUpdAppt',
//     type: 'POST',
//     data,
//     success (res) {
//       if (options.success) options.success(res)
//     },
//     fail (res) {
//       if (options.fail) options.fail(res)
//     }
//   })
// }
// 获取预约详情
exports.getAppointmentDetail = (options) => {
  let data = options.data || {}
  app.ajax({
    url:'/consumer/newAppointment/getApptInfo',
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
