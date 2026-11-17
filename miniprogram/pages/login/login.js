const { apiUrl } = require("../../utils/config.js");
// pages/login/login.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    week_gap:'',
    login:true,
  

  },
  submit:function(e){ var that=this;
    var data={
      'name':e.detail.value.usrname,
      'password':e.detail.value.password,
      'zc':that.data.week_gap
    };

    wx.request({
      url : apiUrl("/kbtable"),
      method: "POST",
      data:data,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res )  {
        console.log(res.statusCode);
        console.log(typeof(res.statusCode));
       
        
       if(res.statusCode==200){ 
        wx.setStorage({
          key: 'usrname',
          data:e.detail.value.usrname ,
          success: function(res){
              // success
              console.log(11111)
          },
          
      })
      wx.setStorage({
        key: 'password',
        data:e.detail.value.password ,
        success: function(res){
            // success
            console.log('password')
        },
      })
      wx.setStorage({
        key: 'login',
        data:true ,
        success: function(res){
            // success
            console.log('password')
        },
      })
        console.log(res.data);
        wx.showToast({
          title: '登录成功！',
          icon: 'success',
          duration: 2000
        })
        that.setData({
          login:true
        })
        wx.switchTab({
          url: '/pages/home/home',
        })
      }
      else
      {
        wx.showToast({
          title: '密码错误！',
          icon: 'none',
          duration: 2000
        }
        )
      }  
    }
   
  })
  

   },
   logout:function(){
     var that=this
    wx.removeStorage({
      key: 'login',
      success (res) {
        console.log('remove')
      }
    })
that.setData({
  login:false
})
   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log('onload')
    this.setData({
     week_gap: this.TodayInfo('2021/3/8').week
    });
    wx.getStorage({
      key: 'login',
      success:function(res){
        console.log(111)
        that.setData({
          login:true
        })

      },
      fail:function(){
       that.setData({
         login:false
       })
       console.log(22)
      },
      
    })

//登录
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
//登录

  },
  QQ:function(){
    wx.showToast({ title: "演示版未配置联系方式", icon: "none" });
  },
  // getUserInfo(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },
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

  },


  TodayInfo:function(start){
      
    var WEEKLEN = 7, // 一周7天为常量
    WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"],
    weekInfo = {"week": null, "day": null}, // 初始化返回信息，默认第null周，星期null
    oneDay = 24 * 60 * 60 * 1000, // 一天的毫秒时长
    weekLeave, // 开学当天所在周剩余天数
    weekStart, // 开学当天start是星期几
    today, // 今天
    dateDiff, // 今天与开学当天日期差
    sDate; //开学之日，日期对象
var rDateStr = /\d{4}[\/-]\d{1,2}[\/-]\d{1,2}/g; // 简单的日期格式校验：2013/12/19
if (!rDateStr.test(start)) {
    alert("请使用合法的开学日期！！！");
    return weekInfo;
}
sDate = new Date(start.replace("-", "/"));
weekStart = sDate.getDay();
weekStart = weekStart === 0 ? 7 : weekStart; // JS中周日的索引为0，这里转换为7，方便计算

weekLeave = WEEKLEN - weekStart;
today = new Date();
weekInfo.day = WEEKDAYS[today.getDay()];
today = new Date(today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate());
dateDiff = today - sDate;

dateDiff = parseInt(dateDiff / oneDay);
weekInfo.week = Math.ceil((dateDiff - weekLeave) / WEEKLEN) + 1;
return weekInfo;
  },
})