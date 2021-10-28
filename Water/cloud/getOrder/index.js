// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  let {
    action, //0获取订单，1接单
    orderStatus,
    orderId, //订单id
    workid,
  } = event
  try {
    if (action == 1) {
      return await db.collection('messages').doc(orderId)
        .update({
          data: {
            status: orderStatus, //接单
            belong: workid
          },
          success(res) {
            return res;
          }
        })
    } else if (action == 2) {
      return await db.collection('messages').doc(orderId)
        .update({
          data: {
            status: orderStatus //已维修
          },
          success(res) {
            return res;
          }
        })
    } else {
      return await db.collection('messages')
        .orderBy('createTime', 'desc')
        .where({
          status: orderStatus
        })
        .get({
          success: function (res) {
            return res;
          },
          fail(res) {
            return res;
          }
        });
    }

  } catch (e) {
    console.error(e)
  }
}