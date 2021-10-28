// pages/workerenroll/workerenroll.js

const db = wx.cloud.database()

let account = ""
let password = ""

Page({

    /**
     * 页面的初始数据
     */
    data: {
        allow: false,
    },

    accountinput: function (e) {
        account = e.detail.value
        wx.setStorageSync('account', this.data.account)
    },

    passwordinput: function (e) {
        password = e.detail.value
        wx.setStorageSync('password', this.data.password)
    },

    goEnroll: function (e) {
        wx.navigateTo({
            url: '/pages/enroll/enroll',
        })
    },

    sign: function () {
        if (account == '' || account == undefined) {
            wx.showModal({
                title: '温馨提示',
                content: '请输入账号！',
                showCancel: false,
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    }
                }
            })
            return;
        }
        if (password == '' || password == undefined) {
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
            return;
        }
        console.log(account)
        console.log(password)
        this.login(account, password)
    },

    //登录
    login(account, password) {
        account = parseInt(account)
        db.collection('workerid').where({
                account: account,
                password: password,

            }).get()
            .then(res => {
                console.log(res.data[0]._id)
                 
                if (res.data && res.data.length > 0) {
                    let workid=res.data[0]._id
                    wx.navigateTo({
                        url: '/pages/fixView/fixView?workid='+workid,
                    })
                } else {
                    wx.showToast({
                        icon: 'none',
                        title: '账号或密码错误',
                    })
                }
            }).catch(res => {
                console.log("登陆失败", res)
                // wx.showToast({
                //     icon: 'none',
                //     title: '账号或密码错误',
                // })
                wx.showModal({
                    title: '温馨提示',
                    content: '账号或密码错误！',
                    showCancel: false,
                    success(res) {
                        if (res.confirm) {
                            console.log('用户点击确定')
                        }
                    }
                })
              
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