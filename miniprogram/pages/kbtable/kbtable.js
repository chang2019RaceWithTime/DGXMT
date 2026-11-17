const { apiUrl } = require("../../utils/config.js");
// pages/kbtable/kbtable.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    week_gap:'',
    name:'',
    password:'',
    login:false,

    data: {},
    colorArrays: [ "#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD","#369"],
  },
  
  turnleft:function(){
    this.setData({
      week_gap:this.data.week_gap-1
    })
    console.log(this.data.week_gap);
    this.loginjwc();
  },
  turnright:function(){
    this.setData({
      week_gap:this.data.week_gap+1
    })
    console.log(this.data.week_gap);
    this.loginjwc();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function (options) {
    var td = this.TodayInfo("2021/8/23");
    console.log(td.week)
    this.setData({
      week_gap:td.week
    })
},
 onShow:function(){
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
    'zc':that.data.week_gap,
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
      that.setData({
        login:true
      })
      console.log(res.data);
      console.log(res.data['data']);
      that.setData({
        wlist: res.data['data']
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
 alert:function(e){
   console.log(e.currentTarget.dataset.ddd)
   wx.showModal({
    content: e.currentTarget.dataset.ddd,
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
   * 生命周期函数--监听页面初次渲染完成
   */
 


  /**
   * 生命周期函数--监听页面显示
   */
  onReady: function () {
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
if (dateDiff < 0) {
    alert("别开玩笑了，你还没开学呢！！！");
    return weekInfo;
}
dateDiff = parseInt(dateDiff / oneDay);
weekInfo.week = Math.ceil((dateDiff - weekLeave) / WEEKLEN) + 1;
return weekInfo;
  },

loginjwc:function(){
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
      that.setData({
        login:true
      })
      console.log(res.data);
      console.log(res.data['data']);
      that.setData({
        wlist: res.data['data']
      })
     
    }
  }
 
})
  
},

})