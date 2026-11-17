const { apiUrl } = require("../../utils/config.js");
// pages/excel/excel.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     excel:''
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
    var data={}

    wx.request({
      url : apiUrl("/excel"),
      method: "POST",
      data:data,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res )  {
   



       if(res.statusCode==200){ 
        that.setData({
          excel: res.data['data']
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
  click:function(e){
    var that=this
    var number=parseInt(e.currentTarget.dataset.index)
    wx.showModal({
      content: that.data.excel[number]['neirong'],
      showCancel	: false,
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
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