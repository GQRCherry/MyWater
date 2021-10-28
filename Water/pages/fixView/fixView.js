// pages/fixView/fixView.js
const db = wx.cloud.database()
let orderStatus = 0;
let workID = "";
wx.cloud.init({
  env: 'cloud1-8g5nr0b74a7ae4ed' //数据库ID
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 顶部菜单切换
    navbar: ["新维修", "已接单", "已维修"],
    // 默认选中菜单
    currentTab: 0,
    list: []
  },
  navbarTap: function (e) {
    let index = e.currentTarget.dataset.idx;
    this.setData({
      currentTab: index
    })
    console.log("index", index)
    //0：新维修 1：已接单 2：已维修
    if (index == 1) {
      orderStatus = 1;
      this.getMyOrderList2();
    } else if (index == 2) {
      orderStatus = 2;
      this.getMyOrderList2();
    } else {
      orderStatus = 0;
      this.getMyOrderList();
    }

  },

  onShow: function () {
    orderStatus = 0
    this.getMyOrderList();
  },

  //获取维修订单
  getMyOrderList() {
    let that = this;

    db.collection("messages")
      .orderBy('_createTime', 'desc')
      .where({
        status: orderStatus
      })
      .get({
        success: function (res) {
          console.log(res.data)
          let datalist = res.data;

          console.log();
          if (datalist && datalist.length > 0) {
            that.setData({
              list: datalist
            })
            console.log(list[0])
          } else {
            that.setData({
              list: []
            })
          }
        }
      })
  },

  //在已接单中只显示自己的接单
  getMyOrderList2() {
    let that = this;

    db.collection("messages")
      .orderBy('_createTime', 'desc')
      .where({
        status: orderStatus,
        belong: workID
      })
      .get({
        success: function (res) {
          console.log(res.data)
          let datalist = res.data;

          console.log();
          if (datalist && datalist.length > 0) {
            that.setData({
              list: datalist
            })
            console.log(list[0])
          } else {
            that.setData({
              list: []
            })
          }
        }
      })
  },

  //接单
  Order(event) {
    let eve = event
    let that = this
    wx.showModal({
      title: "是否确认接单？",
      showCancel: true,
      success(res) {
        if (res.confirm) {
          console.log("维修员选择了接单")
          that.orderConfirm(eve)
        }
      }
    })

  },

  orderConfirm(event) {
    let that = this;
    let orderId = event.currentTarget.dataset.id;
    console.log("orderId", orderId)
    wx.cloud.callFunction({
      name: "getOrder",
      data: {
        action: 1, //0获取订单，1接单
        orderStatus: 1,
        orderId: orderId,
        workid: workID
      },
      success(res) {
        that.getMyOrderList();
      },
      fail(res) {
        console.log("请求失败", res)
      }
    })
  },

  // 完成维修
  Finish(event) {
    let eve = event
    let that = this
    wx.showModal({
      title: "是否确认完成维修？",
      showCancel: true,
      success(res) {
        if (res.confirm) {
          console.log("维修员选择了完成维修")
          that.finishConfirm(eve)
        }
      }
    })


  },

  finishConfirm(event) {
    let that = this;
    let orderId = event.currentTarget.dataset.id;
    console.log("orderId", orderId)
    wx.cloud.callFunction({
      name: "getOrder",
      data: {
        action: 2, //0获取订单，1接单,2完成维修
        orderStatus: 2,
        orderId: orderId
      },
      success(res) {
        console.log("完成维修")
        that.getMyOrderList2();
      },
      fail(res) {
        console.log("请求失败", res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    workID = options.workid
    console.log("工人ID", workID)
    this.getMyOrderList()
    db.collection("messages").where({
        status: 0
      })
      .orderBy('_createTime', 'desc')
      .get()
      .then(err => {
        console.log('返回的数据', err)
        console.log(this.data)
        this.setData({
          list: err.data
        })
        console.log(this.data.list)
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