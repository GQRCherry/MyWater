// pages/exchange/exchange.js
const app = getApp().globalData
const db = wx.cloud.database()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        good_name: "",
        price: 0,
        myScore: 0,
        name: "",
        phonenumber: "",
        address: "",
        detailAddress: "",
        region: ['广东省', '广州市', '海珠区'],
        customItem: '全部',
    },
    bindRegionChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            region: e.detail.value,
            address: e.detail.value[0] + "," + e.detail.value[1] + "," + e.detail.value[2]
        })
        console.log(this.data.address)
        // console.log(this.data.region[0])
    },
    nameInput: function (e) {
        this.data.name = e.detail.value
    },
    phonenumberInput: function (e) {
        this.data.phonenumber = e.detail.value
    },
    detailAddressInput: function (e) {
        this.data.detailAddress = e.detail.value
    },
    regist: function (e) {
        var that = this
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        if (that.data.name == '') {
            wx.showModal({
                title: '提示！',
                content: '请输入姓名！',
                showCancel: false,
                success(res) {}
            })
        } else if (that.data.phonenumber == '') {
            wx.showModal({
                title: '提示！',
                content: '请输入手机号！',
                showCancel: false,
                success(res) {}
            })
        } else if (that.data.phonenumber.length != 11) {
            wx.showModal({
                title: '提示！',
                content: '手机号长度有误，请重新输入！',
                showCancel: false,
                success(res) {}
            })
        } else if (!myreg.test(that.data.phonenumber)) {
            wx.showModal({
                title: '提示！',
                content: '请输入正确的手机号码！',
                showCancel: false,
                success(res) {}
            })
        } else if (that.data.address == '') {
            wx.showModal({
                title: '温馨提示',
                content: '请选择地址！',
                showCancel: false,
                success(res) {}
            })
        } else if (that.data.detailAddress == '') {
            wx.showModal({
                title: '提示！',
                content: '请输入详细地址！',
                showCancel: false,
                success(res) {}
            })
        } else {
            console.log("success")

            wx.showModal({
                title: '温馨提示',
                content: '确定兑换该商品吗？',
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')

                        //将兑换的商品及收件人写入数据库中（商品名、收件人名，收件电话，所在地区，详细地址）
                        db.collection('delivery_address')
                            .add({
                                data: {
                                    Good_name: that.data.good_name,
                                    Name: that.data.name,
                                    PhoneNum: that.data.phonenumber,
                                    Address: that.data.address,
                                    DetailAddress: that.data.detailAddress
                                }
                            })
                            .then(res => {
                                console.log('添加成功', res)
                                wx.showModal({
                                    title: '温馨提示',
                                    content: '恭喜，兑换成功！',
                                    success(res) {
                                        if (res.confirm) {
                                            console.log('用户点击确定')
                                            wx.redirectTo({
                                              url: '/pages/myscore/myscore',
                                            })
                                        } else if (res.cancel) {
                                            console.log('用户点击取消')
                                        }
                                    }
                                })
                            })
                            .catch(res => {
                                console.log('添加失败', res)
                            })

                        //将兑换人的积分扣除
                        that.data.myScore = that.data.myScore - that.data.price
                        db.collection("score")
                            .where({
                                _openid: wx.getStorageSync('openid')
                            })
                            .update({
                                data: {
                                    myScore: that.data.myScore
                                }
                            })
                            .then(err => {
                                console.log('扣除成功')
                                app.userInfo.myScore = that.data.myScore
                            })
                            .catch(res => {
                                console.log('第二种请求失败', res)
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
        var good_name = options.name
        var price = options.price
        // console.log(good_name)
        this.setData({
            good_name: good_name,
            price: price
        })
        //查询兑换人的积分
        db.collection("score")
            .where({
                _openid: wx.getStorageSync('openid')
            })
            .get()
            .then(res => {
                this.setData({
                    myScore: res.data[0].myScore
                })
                console.log('查询成功')
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