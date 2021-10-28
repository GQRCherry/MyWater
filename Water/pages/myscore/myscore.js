// pages/scoremall/scoremall.js
const app = getApp().globalData
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    score:0,
  },
  goScoreMall: function (e) {
    wx.navigateTo({
      url: '/pages/scoremall/scoremall',
    })
  },
  goTips: function (e) {
    wx.navigateTo({
      url: '/pages/tips/tips',
    })
  },
  goQuestions(e) {
    wx.navigateTo({
      url: '/pages/questions/questions',
    })
  },
  goMine: function (e) {
    wx.navigateBack({
      delta: 1,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('score')
    .where({
      _openid: wx.getStorageSync('openid')
    })
    .get()
    .then(err => {
      this.setData({
        score : err.data.myScore
      })
    })
    .catch(res => {
      console.log('第二种请求失败', res)
    })
    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      userInfo: app.userInfo
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      userInfo: app.userInfo
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})