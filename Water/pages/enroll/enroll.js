// pages/enroll/enroll.js
const db = wx.cloud.database()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        username: "",
        password: "",
        passwordack: "",
    },

    
    usernameinput: function (e) {
        this.data.username = e.detail.value
        // cons1ole.log(this.data.username)
    },

    passwordinput: function (e) {
        this.data.password = e.detail.value
        // console.log(this.data.password)
    },

    passwordinputack: function (e) {
        this.data.passwordack = e.detail.value
        // console.log(this.data.passwordack)
    },

    signin: function (e) {
        wx.navigateBack({
          delta: 1,
        })
    },

    regist: function (e) {
        var that = this
        //请输入用户名
        if (that.data.username == '') {
            wx.showModal({
                title: '温馨提示',
                content: '请输入用户名！',
                showCancel: false,
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    }
                }
            })
        } else if (that.data.password == '') {
            wx.showModal({
                title: '温馨提示',
                content: '请输入密码！',
                showCancel: false,
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    }
                }
            })
        } else if (that.data.passwordack == '') {
            wx.showModal({
                title: '温馨提示',
                content: '请输入确认密码！',
                showCancel: false,
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    }
                }
            })
        } else if (that.data.passwordack != that.data.password) {
            wx.showModal({
                title: '温馨提示',
                content: '两次密码输入不一致！',
                showCancel: false,
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    }
                }
            })
        } else {
            console.log('success')
            db.collection("workerid")
            .add({
                data: {
                    account: this.data.username,
                    password: this.data.password,
                  }
            })
            .then(res => {
                console.log('添加成功', res)
                wx.navigateBack({
                  delta: 1,
                })
              })
              .catch(res => {
                console.log('添加失败', res)
              })
        }
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