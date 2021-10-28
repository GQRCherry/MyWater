const db = wx.cloud.database()
const app = getApp().globalData
//题库
let id = ""
let titles = []
let errorOptions = []
let jifen2 = 0
Page({
  data: {
    dis: false,
    percent: 0, //进度条一开始为零
    total: 0, //题目总数
    isSelect: false, //radio一开始未被选中
    subject: null,
    userSelect: '', //用户选择的答案的值
    userScore: 0, //用户答对了几道题
    totalScore: -1, //用户总得分
    totalError: 0, //用户答错几道题
    current: 1, //从第一道题开始
    jifen: 0,
    myShouldScore: 0, //存储数据库中的分数和得到的分数的和
  },
  //一进入页面就会执行的生命周期
  onLoad() {
    // console.log(wx.getStorageSync('openid'))

    id = wx.getStorageSync('openid')
    console.log(id)

    wx.cloud.database().collection("questions")
      .aggregate()
      .sample({ //随机返回指定个数的题目
        size: 5
      })
      .end()
      .then(res => {
        console.log('题库数据', res)
        titles = res.list
        let subject = titles[0]
        console.log('subject', subject)
        this.setData({
          subject,
          total: titles.length
        })
      })


  },
  //用户选择

  radioChange(e) {
    console.log(e.detail.value)
    this.setData({
      userSelect: e.detail.value
    })
  },

  //提交答题,并切换到下一题
  submit() {
    //1. 获取用户选项并判别是否为空
    let userSelect = this.data.userSelect
    if (!userSelect || userSelect.length < 1) {
      wx.showToast({
        icon: 'none',
        title: '请做选择',
      })
      return
    }

    //2. 如果用户有选择，就更新进度条
    let currentNum = this.data.current

    //更新进度条
    this.setData({
      percent: (currentNum / titles.length * 100).toFixed(1)
    })

    //3. 判断用户是否答对
    console.log('用户选项', userSelect)
    console.log('正确答案', this.data.subject.answer)
    if (this.data.subject.answer.indexOf(userSelect) > -1) { //检索userSelect的值是否出现在数据库里的answer里
      console.log('用户答对了第' + currentNum + "道题")
      this.setData({
        userScore: this.data.userScore + 1
      })
    } else {
      //4. 记录用户答错的题
      let subjectNow = this.data.subject
      subjectNow.userSelect = userSelect
      console.log('错题', subjectNow)
      errorOptions.push(subjectNow)
    }
    console.log('用户一共答对了' + this.data.userScore + "道题")

    // 5. 在答完最后一道题的时候，对用户进行打分
    if (currentNum + 1 > titles.length) {
      let totalScore = (this.data.userScore / titles.length * 100).toFixed(1)
      let jifen = (totalScore * 0.1).toFixed(0)
      jifen2 = jifen
      console.log('用户总得分', totalScore)
      console.log('用户错题集', errorOptions)
      console.log('用户获得积分', jifen)
      this.setData({
        totalScore: totalScore,
        totalError: errorOptions.length,
        jifen: jifen,
        dis: true
      })
      wx.showToast({
        icon: 'none',
        title: '已经最后一道啦',
      })

      console.log("jifen2：" + jifen2)

      //将用户所获积分加到数据库中
      var that = this

      //先将分数加一块
      db.collection('score')
        .where({
          _openid: wx.getStorageSync('openid')
        })
        .get()
        .then(res => {
          console.log('查询单条数据成功', res)
          console.log(res.data)
          this.setData({
            myShouldScore: res.data[0].myScore
          })
          console.log(this.data.myShouldScore)
          //求和
          this.data.myShouldScore = Number(this.data.myShouldScore) + Number(this.data.jifen)
          console.log(this.data.myShouldScore)
          //将数据存储到全局中
          console.log(app.userInfo.myScore)
          app.userInfo.myScore = this.data.myShouldScore
          console.log(app.userInfo.myScore)

          //将分数写到数据库中
          db.collection("score")
            .where({
              _openid: wx.getStorageSync("openid")
            })
            .update({
              data: {
                myScore: app.userInfo.myScore
              }
            })
            .then(res => {
              console.log("积分修改成功", res)
              console.log("app.count:" + app.userInfo.myCount + "  app.score:" + app.userInfo.myScore)
            })
            .catch(res => {
              console.log("积分修改失败", res)
            })
        })
        .catch(err => {
          console.log('查询单条数据失败', err)
        })
      return
    }

    let subject = titles[currentNum]
    this.setData({
      userSelect: '',
      subject,
      current: currentNum + 1,
      isSelect: false,
    })
  }


})