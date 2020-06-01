const config = {
  // domainPath: 'https://nice.wowkai.cn/consumer',
  // domainPath: 'http://129.204.180.126:8082',
  // domainPath: 'https://test.nice.wowkai.cn', // 测试
  domainPath: 'https://saasmall.wowkai.cn', // 线上

  // domainPath: 'https://test.nice.wowkai.cn/consumer',

};
// const config = wx.getExtConfigSync ? wx.getExtConfigSync() : {}
const business = require('./utils/util')
let tokenIsEnd = true
App({
  appBaseUrl: config.domainPath,
  data: {},
  globalData: {
    isUpdate: false,
    initIndexLotion: true,
    appoDetail: {
      serve: [], // 选择的服务
      tec: [], // 选择的技师
      storeInfo: {}, // 选择的门店
      cInfo: {}, // 当前客户id和name
      cStoreInfo: {}, // 到店人信息
      appoTime: {}, // 预约时间
      appoId: '' // 变更预约id
    }, // 要预约的详情
    appId: '', // 小程序的appId
    orderStatus: -1,//订单列表状态 -1表示查看全部
  },
  onLaunch () {
    let _this = this
    tokenIsEnd = false
    const accountInfo = wx.getAccountInfoSync();
    this.globalData.appId = accountInfo.miniProgram.appId;
    // _this.getToken()
    wx.onAppRoute((route) => {
      // 如果没授权头像和昵称，则进行头像和昵称的授权。
      console.log(route)
      const pageIndex = [
        'pages/index/index', // 首页页不检测
        'pages/order/index', // 个人中心页不检测
        'pages/personal/personal', // 个人中心页不检测
      ].indexOf(route.path)
      // 其他页面都检测
      if (pageIndex === -1) {
        const { fullPath } = business.getCurrentPage()
        // console.log(tokenIsEnd)
        if (tokenIsEnd) {
          if (!wx.getStorageSync('ww_mobile')) {
            wx.redirectTo({
              url: `/pages/authorization/authorization?refererUrl=${encodeURIComponent(fullPath)}`
            })
            return
          }
        } else {
          _this.zTCheck(fullPath)
        }

      }
    })

  },
  zTCheck (fullPath) {
    let _this = this

    setTimeout(() => {
      // console.log(tokenIsEnd,!wx.getStorageSync('ww_mobile'),wx.getStorageSync('ww_mobile'))
      if (tokenIsEnd) {
        if (!wx.getStorageSync('ww_mobile')) {
          wx.redirectTo({
            url: `/pages/authorization/authorization?refererUrl=${encodeURIComponent(fullPath)}`
          })
          return
        }
      } else {
        _this.zTCheck(fullPath)
      }
    }, 200)
  },
  ajax (options) {
    if (options.url !== '/mall/api/getToken' && !tokenIsEnd) {
      return
    }
    options.url = `${config.domainPath}${options.url}`;
    options.method = options.type || 'POST';
    options.data = options.data || {};
    options.header = {
      'content-type': 'application/json',
      'token': wx.getStorageSync('token') || '',
      // 'content-type': 'application/x-www-form-urlencoded',
    };
    if (options.success) {
      const success = options.success;
      options.success = ({ data, msg }) => {
        if (data.code == 500 || data.code == 400) {
          wx.showToast({ title: data.msg ? data.msg : data.message, icon: 'none', duration: 3000 })
        }
        if (data.status == 500) {
          if (data.message == 'CUSTOMERS_IS_NOT_EXISTS:客户id不存在' || data.message == 'CUSTOMERS_IS_NOT_EXISTS:客户信息不存在') {
            wx.showToast({ title: '客户信息失效，重新登录中', icon: 'none', duration: 1500 })
            wx.clearStorageSync()
            setTimeout(() => {
              wx.reLaunch({ url: '/pages/appointment/appointment' })
            }, 1500)

            return
          } else if (data.message) {
            wx.showToast({ title: data.message, icon: 'none', duration: 3000 })
          } else {
            wx.showToast({ title: '服务器错误', icon: 'none', duration: 3000 })
          }

        }
        if (data.code == 'S1001') {
          // console.log(data.msg)
          wx.showToast({ title: data.msg, icon: 'none', duration: 3000 })
        }
        if (data.code == 500 || data.code == 502) {
          wx.showToast({ title: msg || '获取数据失败', icon: 'none', duration: 3000 })
        }
        // console.log(data)
        success(data);
      };
    }
    if (!options.fail) {
      options.fail = () => {
        wx.showToast({ title: '请求失败', icon: 'none', duration: 3000 })
      }
    }
    wx.request(options);
  },
  getToken () {
    let JSCODE = ''
    let _this = this
    const accountInfo = wx.getAccountInfoSync();
    let aid = accountInfo.miniProgram.appId;
    wx.login({
      success: function (loginres) {
        JSCODE = loginres.code
        _this.ajax({
          url: '/mall/api/getToken',
          type: 'post',
          data: {
            appId: aid,
            code: JSCODE
          },
          fail: () => {
            tokenIsEnd = true
            const { pages } = business.getCurrentPage()
            if (pages.length > 0) {
              if (pages[0].route.indexOf('pages/index/index') !== -1 && this.globalData.initIndexLotion) return
              pages[0].onLoad(pages[0].options)
              pages[0].onShow()
            }
          },
          success: res => {

            let userInfo = {
              name: '',
              nickName: '',
              custHeader: '',
              avatarUrl: '',
              gender: '',
              phone: '',
              customerId: ''
            }
            if (res.data && res.data.token) {
              wx.setStorageSync('token', res.data.token)
              userInfo = {
                name: res.data.wuv.nickName || '',
                nickName: res.data.wuv.nickName || '',
                custHeader: res.data.wuv.avatarUrl || '',
                avatarUrl: res.data.wuv.avatarUrl || '',
                gender: res.data.wuv.gender || '',
                phone: res.data.wuv.mobile || '',
                customerId: res.data.wuv.id || ''
              }
            } else {
              wx.setStorageSync('token', '')
            }
            wx.setStorageSync('ww_userInfo', JSON.stringify(userInfo))
            wx.setStorageSync('ww_customerId', userInfo.customerId)
            wx.setStorageSync('ww_mobile', userInfo.phone)
            _this.globalData.appoDetail.cInfo = {
              id: userInfo.customerId,
              name: userInfo.name,
              phone: userInfo.phone
            }
            _this.globalData.appoDetail.cStoreInfo = {
              id: userInfo.customerId,
              name: userInfo.name,
              phone: userInfo.phone
            }
            tokenIsEnd = true
            const { pages } = business.getCurrentPage()
            if (pages.length > 0) {
              if (pages[0].route.indexOf('pages/index/index') !== -1 && _this.globalData.initIndexLotion) return
              pages[0].onLoad(pages[0].options)
              pages[0].onShow()
            }
          }
        })
      },
      fail: function (loginres) {
        console.log("获取登录code fail")
      }
    })
  }
});
