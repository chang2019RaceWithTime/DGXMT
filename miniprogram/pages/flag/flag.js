const { apiUrl } = require("../../utils/config.js");
// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  submit:function(e){
    console.log(e.detail.value.name)
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: apiUrl("/upload"), // 后台上传文件url 
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'name': e.detail.value.name, //需要传入的其它参数给后台
            'number':e.detail.value.number
          },
          success: function (res) {
            console.log(res);
            if (res.statusCode != 200) { 
              wx.showModal({
                title: '提示',
                content: '上传失败1',
                showCancel: false
              })
              
            }
            else{
              wx.showModal({
                title: '提示',
                content: '上传成功',
                showCancel: false,
                
              })
            }
          },
          fail: function (e) {
            console.log(e);
            wx.showModal({
              title: '提示',
              content: '上传失败2',
              showCancel: false
            })
          },
        })
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