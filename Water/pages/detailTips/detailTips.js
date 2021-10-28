// pages/detailTips/detailTips.js
const app = getApp().globalData
const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tips: {

        },
        canIUseBtn: true,
        color: '#a1a1a1',
        backgroundcolor: '#e6e6e6',
    },

    scorePlus: function (e) {
        var tempCount = app.userInfo.myCount
        var tempScore = app.userInfo.myScore
        //点击按钮后要加上总次数，当总次数为10以后，清零并加一个积分
        //总次数和总分数在app.userInfo 中有
        console.log('app.count:' + app.userInfo.myCount + '  app.score:' + app.userInfo.myScore + '   temp.count:' + tempCount + '   temp.score:' + tempScore)
        tempCount += 1
        if (tempCount == 10) {
            tempCount = 0
            tempScore += 1
        }
        app.userInfo.myCount = tempCount
        app.userInfo.myScore = tempScore
        console.log('app.count:' + app.userInfo.myCount + '  app.score:' + app.userInfo.myScore + '   temp.count:' + tempCount + '   temp.score:' + tempScore)
        // 将得到的分数和次数返回给数据库, 更新数据库
        db.collection('score')
            .where({
                _openid: wx.getStorageSync('openid')
            })
            .update({
                data: {
                    myCount: app.userInfo.myCount,
                    myScore: app.userInfo.myScore
                }
            })
            .then(res => {
                console.log('修改成功', res)
                console.log('app.count:' + app.userInfo.myCount + '  app.score:' + app.userInfo.myScore)
            })
            .catch(res => {
                console.log('修改失败', res)
            })
        // //每条只可以读一次，即加次数或加分数后返回上一页
        wx.navigateBack({
            delta: 1
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var sync = {}
        var that = this
        sync.title = options.receiveTitle
        sync.content = options.receiveContent
        this.setData({
            tips: sync
        })
        console.log(this.data)
        setTimeout(function (e) {
            that.setData({
                canIUseBtn: false,
                color: '#ffffff',
                backgroundcolor: '#07c160'
            })
            clearTimeout(1)
        }, 5000, 1)
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