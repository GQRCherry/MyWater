// pages/detailmall/detailmall.js
const app = getApp().globalData
const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: {},
        score: 0,
    },

    goExchange: function (e) {
        var that = this
        console.log(this.data.score + " " + this.data.list.price)
        if (this.data.score < this.data.list.price) {
            wx.showModal({
                title: '温馨提示',
                content: '您的积分不足',
                showCancel: false,
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    }
                }
            })
        } else {
            wx.showModal({
                title: '温馨提示',
                content: '您确定要兑换此商品吗？',
                success(res) {
                    if (res.confirm) {
                        wx.redirectTo({
                            url: '/pages/exchange/exchange?name=' + e.currentTarget.dataset.name + '&price=' + e.currentTarget.dataset.price,
                        })
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //获得该商品具体信息
        var id = options.id
        var that = this
        db.collection('mall')
            .doc(id)
            .get()
            .then(res => {
                console.log('查询单条数据成功', res)
                this.setData({
                    list: res.data
                })
                console.log(this.data.list)
            })
            .catch(err => {
                console.log('查询单条数据失败', err)
            })
        //确认积分
        db.collection('score')
            .where({
                _openid: wx.getStorageSync('openid')
            })
            .get()
            .then(res => {
                console.log(res.data)
                this.setData({
                    score: res.data[0].myScore
                })
                console.log(this.data)
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