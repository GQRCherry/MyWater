// pages/up/up.js

const db = wx.cloud.database()

Page({
    data: {
        // bottom_menu 数据绑定的参数
        condition1: false,
        condition2: true,
        firstcolor: "black",
        secondcolor: "#979797",
        // 选择器
        region: ['北京市', '北京市', '全部'],
        customItem: '全部',
        // 用户输入数据
        name: "",
        phone: "",
        address: "",
        detail_address: "",
        describe: "",
        // 用户上传图片
        imageList: [],
        changeTimeFormat: '',
    },
    // bottom_menu触发函数
    first_select: function (e) {
        wx.redirectTo({
            url: '/pages/up/up',
        })
    },
    second_select: function (e) {
        wx.navigateTo({
            url: '/pages/mine/mine',
        })
    },
    goPhone: function (e) {
        wx.navigateTo({
            url: '/pages/phone/phone',
        })
    },
    goExplain: function (e) {
        wx.navigateTo({
            url: '/pages/explain/explain',
        })
    },

    // 上传图片
    chooseImage: function (event) {
        let that = this;
        wx.chooseImage({
            count: 1, // 一次最多可以选择2张图片一起上传
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
                console.log(res)
                let a = that.data.imageList.concat(res.tempFilePaths)
                that.setData({
                    imageList: a
                })
                console.log(that.data.imageList)
            }
        })
    },


    // 获得输入数据
    getApplicantName: function (e) {
        this.setData({
            name: e.detail.value
        })
    },
    getPhoneNum: function (e) {
        this.setData({
            phone: e.detail.value
        })
    },
    // 选择器
    bindRegionChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            region: e.detail.value,
            address: e.detail.value[0] + "," + e.detail.value[1] + "," + e.detail.value[2]
        })
        console.log(this.data.address)
        // console.log(this.data.region[0])
    },
    getAddress: function (e) {
        this.setData({
            detail_address: e.detail.value
        })
    },
    getDescribe: function (e) {
        this.setData({
            describe: e.detail.value
        })
    },
    //提交数据
    submit: function (e) {
        let that = this
        let name = that.data.name;
        let phone = that.data.phone;
        let address = that.data.address;
        let detail_address = that.data.detail_address;
        let describe = that.data.describe;
        let photo = that.data.imageList;
        if (name == '') {
            wx.showModal({
                title: '温馨提示',
                content: '请输入申请人！',
                showCancel: false,
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    }
                }
            })
        } else if (phone == '') {
            wx.showModal({
                title: '温馨提示',
                content: '请输入联系电话！',
                showCancel: false,
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    }
                }
            })
        } else if (address == '') {
            wx.showModal({
                title: '温馨提示',
                content: '请选择地址！',
                showCancel: false,
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    }
                }
            })
        } else if (detail_address == '') {
            wx.showModal({
                title: '温馨提示',
                content: '请输入详细地址！',
                showCancel: false,
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    }
                }
            })
        } else if (describe == '') {
            wx.showModal({
                title: '温馨提示',
                content: '请输入故障描述！',
                showCancel: false,
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    }
                }
            })
        } else if (photo == '') {
            wx.showModal({
                title: '温馨提示',
                content: '请上传图片！',
                showCancel: false,
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    }
                }
            })
        } else {
            var path = {};
            // console.log(path)
            // 为cloudPath设置固定的名字方便引用
            for (var j = 0; j < photo.length; j++) {
                path[j] = "upLoadPhotos/" + Date.now() + j + ".jpg" //命名使用Date.now 返回的是时间戳；如果使用 new Date() , 返回的是标准时间格式
                console.log(path)
            }
            // console.log(path)
            // 上传图片
            for (var i = 0; i < that.data.imageList.length; i++) {
                wx.showLoading({
                    title: "正在上传第" + (i + 1) + "张图片"
                })
                wx.cloud.uploadFile({
                    cloudPath: path[i],
                    //  "upLoadPhotos/" + Date.now() + ".jpg",
                    filePath: that.data.imageList[i],
                    success(res) {
                        console.log(res)
                        wx.hideLoading()

                        //此时已经存进去了新的用于显示creatTime的值

                        //下来来得到图片的下载地址，并存到数据库中
                        wx.cloud.downloadFile({
                            fileID: res.fileID
                        }).then(res => {
                            console.log('成功', res)
                            //下载得到后
                            db.collection('messages')
                                .doc(wx.getStorageSync('thisUpID'))
                                .update({
                                    data: {
                                        url: 'cloud://cloud1-8g5nr0b74a7ae4ed.636c-cloud1-8g5nr0b74a7ae4ed-1306995484/' + path[0], //这里填写从  wx.cloud.downloadFile 上下载得到的下载地址，
                                    }
                                })
                                .then(res => {
                                    console.log('修改成功', res)
                                })
                                .catch(res => {
                                    console.log('修改失败', res)
                                })


                        }).catch(error => {
                            console.log('失败', error)
                            // handle error
                        })

                    },
                    fail(res) {
                        console.log(res)
                        wx.hideLoading()
                        wx.showToast({
                            title: "上传失败，请检查网络！",
                            // icon: "none",
                            duration: 2000
                        })
                    }
                })
            }
            //上传数据
            wx.showLoading({
                title: '提交数据中...',
            })
            //将数据写到数据库中
            db.collection("messages")
                .add({
                    data: {
                        name: name,
                        phoneNumber: phone,
                        address: address,
                        detail_address: detail_address,
                        describe: describe,
                        // _createTime: that.formatTime(db.serverDate()),
                        _createTime: db.serverDate(),
                        photo: path,
                        status: 0,
                        belong: "",
                        url: ""
                    },
                    success(res) {
                        wx.hideLoading()
                        console.log(res)

                        wx.setStorageSync('thisUpID', res._id)

                        wx.showToast({
                            title: "提交成功",
                            duration: 2000
                        })

                        //修改该数据的_createTime

                        //先查询，将时间取出来
                        db.collection('messages')
                            .doc(wx.getStorageSync('thisUpID'))
                            .get()
                            .then(res => {
                                console.log('查询单条数据成功', res)
                                that.setData({
                                    changeTimeFormat: res.data._createTime
                                })
                                console.log(that.data)


                                //然后再修改
                                var date = that.data.changeTimeFormat
                                //调整时间格式
                                var Y = date.getFullYear();
                                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
                                //获取当日日期 
                                var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
                                var hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
                                var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
                                var second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
                                var newdate = Y + "-" + M + "-" + D + " " + hour + ":" + minute + ":" + second;
                                console.log(newdate)

                                //将修改的值存进去
                                db.collection('messages')
                                    .doc(res.data._id)
                                    .update({
                                        data: {
                                            createTime: newdate
                                        }
                                    })
                                    .then(res => {
                                        console.log('修改成功', res)
                                        console.log('云文件path', path[0])
                                    })
                                    .catch(res => {
                                        console.log('修改失败', res)
                                    })


                            })
                            .catch(err => {
                                console.log('查询单条数据失败', err)
                            })
                        wx.reLaunch({
                            url: '/pages/up/up',
                        })
                    },
                    fail(res) {
                        console.log(res)
                        wx.hideLoading()
                        wx.showToast({
                            title: "上传失败，请检查网络！",
                            icon: "none",
                            duration: 2000
                        })
                    }
                })
        }
    },

    previewImage: function (e) {
        var that = this;
        var dataid = e.currentTarget.dataset.id;
        var imageList = that.data.imageList;
        wx.previewImage({
            current: imageList[dataid],
            urls: this.data.imageList
        });
    },
    deleteImage: function (e) {
        console.log(e);
        let index = e.currentTarget.dataset.index;
        console.log(index);
        var srcArr = this.data.imageList;
        srcArr.splice(index, 1);
        this.setData({
            imageList: srcArr
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