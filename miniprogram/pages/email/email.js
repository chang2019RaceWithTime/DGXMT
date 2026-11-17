const { apiUrl } = require("../../utils/config.js");
// pages/email/email.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
  },
  submit:function(e){ var that=this;
    var data={
      'note':e.detail.value.note,
    };

    wx.request({
      url : apiUrl("/email"),
      method: "POST",
      data:data,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res )  {
       if(res.statusCode==200){ 
        wx.showToast({
          title: '感谢建议！',
          icon: 'success',
          duration: 2000
        })
      }
      else
      {
        wx.showToast({
          title: '发送失败！',
          icon: 'none',
          duration: 2000
        }
        )
      }  
    }
   
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