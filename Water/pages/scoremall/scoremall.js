// pages/scoremall/scoremall.js
const app = getApp().globalData
const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list:[],
    },
    goDetailMall:function(e){
      console.log(e)
      var deliverData = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/detailmall/detailmall?id='+deliverData,
      })
      // wx.setStorageSync('detialMallID',deliverData)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        db.collection('mall').get().
        then(res => {
            this.setData({
              list: res.data
            })
            console.log(this.data.list)
          })
          .catch(err => {
            console.log('第二种请求失败', err)
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