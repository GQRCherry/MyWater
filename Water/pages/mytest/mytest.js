// pages/mytest/mytest.js
const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    test: function (e) {
        db.collection('mall')
            .add({
                data: {
                    name: '测试商品二',
                    price: 50,
                    introduce: "这里是测试商品二的简单介绍"
                }
            })
            .then(res => {
                console.log('添加成功', res)
            })
            .catch(res => {
                console.log('添加失败', res)
            })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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