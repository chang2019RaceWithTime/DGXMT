const { apiUrl } = require("../../utils/config.js");
// pages/grades/grades.js
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that=this;
  console.log('切换成功')
that.data.name = wx.getStorageSync("usrname");
that.data.password = wx.getStorageSync("password");
//只有用同步才会成功！！
//并且同步和异步的写法是不一样的 踩坑了
//明天开学了，居然有点害怕开学，为什么会害怕开学呢，倒不是害怕卷，毕竟从河北省捐出来的，那到底是还怕什么呢，大概是害怕开学之后又会变成一个人吧
  var data={
    'name':that.data.name,
    'password':that.data.password,
  };

  wx.request({
    url : apiUrl("/grades"),
    method: "POST",
    data:data,
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    success: function (res )  {
      console.log(res.statusCode);
      console.log(typeof(res.statusCode));
     if(res.statusCode==200){ 
      console.log(res.data);
      console.log(res.data['data']);
      that.setData({
        grades: res.data['data']
      })
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