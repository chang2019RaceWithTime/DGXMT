const { apiUrl } = require("../../utils/config.js");
// pages/jiwang/jiwang.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:'',
    colorArrays: [ "#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD","#369"],


  },
jiwang20:function(){
  var that=this;
    var data={}
    wx.request({
      url : apiUrl("/jiwang20"),
      method: "POST",
      data:data,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res )  {
       if(res.statusCode==200){ 
        that.setData({
          data: res.data['data']
        })
        console.log(that.data.data)
      }
    }
  })
},
jiwang19:function(){
  var that=this;
    var data={}
    wx.request({
      url : apiUrl("/jiwang19"),
      method: "POST",
      data:data,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res )  {
       if(res.statusCode==200){ 
        that.setData({
          data: res.data['data']
        })
        console.log(that.data.data)
      }
    }
  })
},
jiwang18:function(){
  var that=this;
    var data={}
    wx.request({
      url : apiUrl("/jiwang18"),
      method: "POST",
      data:data,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res )  {
       if(res.statusCode==200){ 
        that.setData({
          data: res.data['data']
        })
        console.log(that.data.data)
      }
    }
  })
},
jiwang17:function(){
  var that=this;
    var data={}
    wx.request({
      url : apiUrl("/jiwang17"),
      method: "POST",
      data:data,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res )  {
       if(res.statusCode==200){ 
        that.setData({
          data: res.data['data']
        })
        console.log(that.data.data)
      }
    }
  })
},
click:function(e){
    wx.setClipboardData(
    {data: e.currentTarget.dataset.href,
  success:function(){

      // 添加下面的代码可以复写复制成功默认提示文本`内容已复制` 
      wx.showToast({
        title: '已复制通知链接',
        duration: 1500
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
    var that=this;
    var data={}
    wx.request({
      url : apiUrl("/jiwang20"),
      method: "POST",
      data:data,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res )  {
       if(res.statusCode==200){ 
        that.setData({
          data: res.data['data']
        })
        console.log(that.data.data)
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