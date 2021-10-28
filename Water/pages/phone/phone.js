// pages/phone/phone.js

const db = wx.cloud.database()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        multiArray: [
            ['北京市', '山西省'],
            ['北京市'],
            ['东城区', '海淀区', '西城区', '朝阳区', '丰台区', '石景山区', '门头沟区', '房山区', '通州区', '顺义区', '昌平区', '大兴区', '怀柔区', '平谷区', '密云区', '延庆区'],
            ['段祺瑞执政府旧址', '中国美术馆']
            // ['段祺瑞执政府旧址']
        ],
        multiIndex: [0, 0, 0, 0],
        phoneNum: '暂无数据',
    },

    bindMultiPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            multiIndex: e.detail.value
        })
    },

    bindMultiPickerColumnChange: function (e) {
        console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        var data = {
            multiArray: this.data.multiArray,
            multiIndex: this.data.multiIndex
        };
        data.multiIndex[e.detail.column] = e.detail.value;
        switch (e.detail.column) {
            //改变第一列
            case 0:
                switch (data.multiIndex[0]) {
                    //选择北京市
                    case 0:
                        data.multiArray[1] = ['北京市'];
                        data.multiArray[2] = ['东城区', '海淀区', '西城区', '朝阳区', '丰台区', '石景山区', '门头沟区', '房山区', '通州区', '顺义区', '昌平区', '大兴区', '怀柔区', '平谷区', '密云区', '延庆区'];
                        data.multiArray[3] = ['段祺瑞执政府旧址', '中国美术馆'];
                        break;
                        //选择山西省
                    case 1:
                        data.multiArray[1] = ['太原市', '运城市', '临汾市'];
                        data.multiArray[2] = ['小店区', '迎泽区', '杏花岭区'];
                        data.multiArray[3] = ['华夏医院', '万马士商贸城']
                        break;
                }
                data.multiIndex[1] = 0;
                data.multiIndex[2] = 0;
                data.multiIndex[3] = 0;
                break;
                //改变第二列
            case 1:
                switch (data.multiIndex[0]) {
                    //如果第一列是北京市
                    case 0:
                        switch (data.multiIndex[1]) {
                            case 0:
                                data.multiArray[2] = ['东城区', '西城区', '朝阳区', '丰台区', '石景山区', '海淀区', '门头沟区', '房山区', '通州区', '顺义区', '昌平区', '大兴区', '怀柔区', '平谷区', '密云区', '延庆区'];
                                break;
                                // case 1:
                                //     data.multiArray[2] = ['蛔虫'];
                                //     break;
                        }
                        break;
                        //如果第一列是山西省
                    case 1:
                        switch (data.multiIndex[1]) {
                            case 0:
                                data.multiArray[2] = ['小店区', '迎泽区', '杏花岭区'];
                                data.multiArray[3] = ['华夏医院', '万马士商贸城'];
                                break;
                            case 1:
                                data.multiArray[2] = ['盐湖区', '永济市', '芮城市'];
                                data.multiArray[3] = ['运城中学', '康杰中学']
                                break;
                            case 2:
                                data.multiArray[2] = ['尧都区', '曲沃县', '翼城县', '侯马市'];
                                data.multiArray[3] = ['美都汇购物广场', '尧都公园']
                                break;
                        }
                        break;
                }
                data.multiIndex[2] = 0;
                data.multiIndex[3] = 0;
                break;
                //改变第三列
            case 2:
                console.log(data.multiIndex);
                switch (data.multiIndex[0]) {
                    //第一列是北京市
                    case 0:
                        //看第二列
                        switch (data.multiIndex[1]) {
                            //第二列是北京市
                            case 0:
                                //看第三列
                                switch (data.multiIndex[2]) {
                                    //第三列第一个
                                    case 0:
                                        data.multiArray[3] = ['段祺瑞执政府旧址', '中国美术馆'];
                                        break;
                                    case 1:
                                        data.multiArray[3] = ['北京科技大学', '中国地质大学(北京)', '北京语言大学']
                                        break;
                                    case 2:
                                        data.multiArray[3] = ['单位一', '单位二']
                                }
                                break;
                        }
                        break;
                        //第一列是山西省
                    case 1:
                        //看第二列
                        switch (data.multiIndex[1]) {
                            //第二列是太原市
                            case 0:
                                //看第三列
                                switch (data.multiIndex[2]) {
                                    //第三列第零个
                                    case 0:
                                        data.multiArray[3] = ['华夏医院', '万马士商贸城'];
                                        break;
                                    case 1:
                                        data.multiArray[3] = ['单位一', '单位二']
                                }
                                break;

                            case 1:
                                switch (data.multiIndex[2]) {
                                    //第三列第零个
                                    case 0:
                                        data.multiArray[3] = ['运城中学', '康杰中学'];
                                        break;
                                    case 1:
                                        data.multiArray[3] = ['永济市人民医院', '蒲园']
                                        break;
                                    case 2:
                                        data.multiArray[3] = ['芮城县人民医院', '芮城二中']
                                        break;
                                }
                                break;
                            case 2:
                                switch (data.multiIndex[2]) {
                                    //第三列第零个
                                    case 0:
                                        data.multiArray[3] = ['美都汇购物广场', '尧都公园'];
                                        break;
                                    case 1:
                                        data.multiArray[3] = ['单位三', '单位四'];
                                        break;
                                    case 2:
                                        data.multiArray[3] = ['单位五', '单位六'];
                                        break;
                                    case 3:
                                        data.multiArray[3] = ['单位七', '单位八'];
                                        break;
                                }
                                break;
                        }
                }
                data.multiIndex[3] = 0;
                break;
        }
        this.setData(data);
    },

    seek: function (e) {
        var that = this
        var province = this.data.multiArray[0][this.data.multiIndex[0]]
        var city = this.data.multiArray[1][this.data.multiIndex[1]]
        var area = this.data.multiArray[2][this.data.multiIndex[2]]
        var unit = this.data.multiArray[3][this.data.multiIndex[3]]
        // console.log(that.data.phoneNum)
        db.collection('phoneNum').where({
                Prov: province,
                City: city,
                Area: area,
                Unit: unit,
            })
            .get()
            .then(res => {
                if (res.data.length == 0) {
                    wx.showModal({
                        title: '温馨提示',
                        content: '暂无该单位数据',
                        showCancel: false,
                        success(res) {
                            if (res.confirm) {
                                console.log('用户点击确定')
                            }
                        }
                    })
                    this.setData({
                        phoneNum: '暂无数据'
                    })
                } else {
                    console.log('查询单条数据成功', res.data)
                    console.log('查询单条数据成功', res.data[0].PhonN)
                    this.setData({
                        phoneNum: res.data[0].PhonN
                    })
                    wx.showToast({
                        title: '查询成功！',
                        icon: 'success',
                        duration: 2000
                      })
                }
            }).catch(res => {
                console.log(res)
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