const { apiUrl } = require("../../utils/config.js");
// pages/exam/exam.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
data:'',
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
    var that=this;
    that.data.name = wx.getStorageSync("usrname");
that.data.password = wx.getStorageSync("password");


  var data={
    'name':that.data.name,
    'password':that.data.password,
  };

    wx.request({
      url : apiUrl("/exam"),
      method: "POST",
      data:data,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res )  {
   



       if(res.statusCode==200){ 
        that.setData({
          exam: res.data['data']
        })
        that.data.excel=res.data['data']
        console.log(that.data.excel)
        // wx.showToast({
        //   title: '登录成功！',
        //   icon: 'success',
        //   duration: 2000
        // }
        // )
      }
      else
      {
        // wx.showToast({
        //   title: '密码错误！',
        //   icon: 'none',
        //   duration: 2000
        // }
        // )
      }  
    }
   
  })

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