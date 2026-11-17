const db = wx.cloud.database();
// pages/add/add.js
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
submit:function(e){
  var that = this;
  var myDate = new Date();
  db.collection("comments").add(
    {
      data: {
        name:e.detail.value.name,
        note: e.detail.value.note,
        time:myDate.getFullYear()+'-'+(myDate.getMonth()+1)+'-'+myDate.getDate()
      }
    }
  )
  wx.showModal({
    content: '留言成功',
    showCancel	: false,
    success (res) {
      if (res.confirm) {
        console.log('用户点击确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
      wx.redirectTo({
        url: '/pages/board/board',
      })
    }
    
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