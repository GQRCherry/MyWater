const app = getApp().globalData
const db = wx.cloud.database()
Page({
  data: {
    allowBint: true,
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    wx.showLoading({
      title: '加载小程序中',
    })

    setTimeout(function () {
      wx.hideLoading()
    }, 1000)
  },
  getUserProfile: function (e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    if (this.data.allowBint) {
      this.setData({
        allowBint: false
      })
      wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          app.userInfo = res.userInfo
          // console.log(app.userInfo)
          wx.reLaunch({
            url: '/pages/up/up',
            // url:'/pages/myscore/myscore',
          })

          /***********************获取用户积分*******************/
          db.collection('score')
            .where({
              _openid: wx.getStorageSync('openid')
            })
            .get()
            .then(res => {
              console.log('查询成功', res.data)
              //查询是否有该用户  
              if (res.data && res.data.length > 0) {
                app.userInfo.myScore = res.data[0].myScore
                app.userInfo.myCount = res.data[0].myCount
                console.log(app)
              }
              //没有，则在数据库中加入我的积分
              else {
                db.collection('score')
                  .add({
                    // data 字段表示需新增的 JSON 数据
                    data: {
                      myScore: 0,
                      myCount: 0,
                    }
                  })
                  .then(res => {
                    console.log('插入成功', res)
                    app.userInfo.myScore = 0
                    app.userInfo.myCount = 0
                    console.log(app)
                  })
              }
            })
            .catch(err => {
              console.log('查询失败', err)
            })
        }
      })
    }

  },
})