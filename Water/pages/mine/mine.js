// pages/mine/mine.js
const db = wx.cloud.database()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // bottom_menu 的初始信息
        condition1: false,
        condition2: true,
        firstcolor: "#979797",
        secondcolor: "black",
        // 获取用户头像，用户名的信息
        userInfo: {},
        // 这里是数据库   messages  的  字段名
        messages: [{
            
        }],

    },
    // 跳转页面
    first_select: function (e) {
        wx.navigateTo({
            url: '/pages/up/up',
        })
    },
    second_select: function (e) {
        wx.redirectTo({
            url: '/pages/mine/mine',
        })
    },
    goScoreMall: function (e) {
        wx.navigateTo({
            url: '/pages/myscore/myscore',
        })
    },
    goWorkerEnroll: function (e) {
        wx.navigateTo({
            url: '/pages/workerenroll/workerenroll',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.setData({
            userInfo: getApp().globalData.userInfo
        })

        db.collection("messages")
            .where({
                _openid: wx.getStorageSync('openid')
            })
            .orderBy('_createTime', 'desc')
            .get()
            .then(err => {
                console.log('返回的数据', err)
                //err.data[0]
                console.log(this.data)
                this.setData({
                    messages: err.data
                })
                console.log(this.data.messages[0].photo[0])

                /*------------------------------------------------------------------------------------------ */
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
        if (getCurrentPages().length != 0) {
            //刷新当前页面的数据
            getCurrentPages()[getCurrentPages().length - 1].onLoad()
     }
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


