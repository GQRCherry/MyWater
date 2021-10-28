// app.js
App({
  onLaunch() {

    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    // 云开发
    wx.cloud.init({
      env: "cloud1-8g5nr0b74a7ae4ed"
    })

    // 获取用户Openid
    wx.cloud.callFunction({
        name: 'getOpenid'
      })
      .then(res => {
        console.log("成功", res.result)
        wx.setStorageSync('openid', res.result.openid)
        console.log(wx.getStorageSync('openid'))
      })
      .catch(res => {
        console.log('失败', res)
      })

  },
  globalData: {
    userInfo: {
    }
  }
})