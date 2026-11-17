const { meetingMiniProgram } = require("../../utils/config.js");
// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  Tokbtable:function() {
    wx.getStorage({
      key: 'login',
      success:function(res){
        console.log(111)
        console.log(res.data)
        
        if(res.data==false)
        {wx.showModal({
          // cancelColor: '请登录',
          content:'请登录!',
          showCancel	: false,
          complete:function(){
            wx.switchTab({
            url: '/pages/login/login',
          }
          )},
        })
        }
        else{
          wx.navigateTo({
            url: '/pages/kbtable/kbtable',
          })
        }

      },
      fail:function(){
       
        wx.showModal({
          // cancelColor: '请登录',
          content:'请登录!',
          showCancel	: false,
          complete:function(){
            wx.switchTab({
            url: '/pages/login/login',
          }
          )},
        });
        console.log(222);
      },
      
    })
  
  },

  Tojiwang:function() {
    wx.getStorage({
      key: 'login',
      success:function(res){
        console.log(111)
        console.log(res.data)
        
        if(res.data==false)
        {wx.showModal({
          // cancelColor: '请登录',
          content:'请登录!',
          showCancel	: false,
          complete:function(){
            wx.switchTab({
            url: '/pages/login/login',
          }
          )},
        })
        }
        else{
          wx.navigateTo({
            url: '/pages/jiwang/jiwang',
          })
          
        }
      },
      fail:function(){
        console.log(222)
        wx.showModal({
          // cancelColor: '请登录',
          content:'请登录!',
          showCancel	: false,
          complete:function(){
            wx.switchTab({
            url: '/pages/login/login',
          }
          )},
        });
      },
      
    })
   
  },
  Todate:function() {
    wx.getStorage({
      key: 'login',
      success:function(res){
        console.log(111)
        console.log(res.data)
        
        if(res.data==false)
        {wx.showModal({
          // cancelColor: '请登录',
          content:'请登录!',
          showCancel	: false,
          complete:function(){
            wx.switchTab({
            url: '/pages/login/login',
          }
          )},
        })
        }
        else{
          wx.navigateTo({
            url: '/pages/calendar/calendar',
          })
          
        }
      },
      fail:function(){
        console.log(222)
        wx.showModal({
          // cancelColor: '请登录',
          content:'请登录!',
          showCancel	: false,
          complete:function(){
            wx.switchTab({
            url: '/pages/login/login',
          }
          )},
        });
      },
      
    })
   
  },
  Togrades:function() {
    wx.getStorage({
      key: 'login',
      success:function(res){
        console.log(111)
        console.log(res.data)
        
        if(res.data==false)
        {wx.showModal({
          // cancelColor: '请登录',
          content:'请登录!',
          showCancel	: false,
          complete:function(){
            wx.switchTab({
            url: '/pages/login/login',
          }
          )},
        })
        }
        else{
          wx.navigateTo({
            url: '/pages/grades/grades',
          })
          
        }
      },
      fail:function(){
        console.log(222)
        wx.showModal({
          // cancelColor: '请登录',
          content:'请登录!',
          showCancel	: false,
          complete:function(){
            wx.switchTab({
            url: '/pages/login/login',
          }
          )},
        });
      },
      
    })
   
  },
  Tocaibian:function(){
    if (!meetingMiniProgram) {
      wx.showToast({ title: "请配置会议小程序", icon: "none" });
      return;
    }
    wx.navigateToMiniProgram({
      appId: meetingMiniProgram,
      path: 'pages/home/home',
      
      success(res) {
        
      }
    })
    
  },
  Toexam:function() {
    wx.getStorage({
      key: 'login',
      success:function(res){
        console.log(111)
        console.log(res.data)
        
        if(res.data==false)
        {wx.showModal({
          // cancelColor: '请登录',
          content:'请登录!',
          showCancel	: false,
          complete:function(){
            wx.switchTab({
            url: '/pages/login/login',
          }
          )},
        })
        }
        else{
          wx.navigateTo({
            url: '/pages/exam/exam',
          })
          
        }
      },
      fail:function(){
        console.log(222)
        wx.showModal({
          // cancelColor: '请登录',
          content:'请登录!',
          showCancel	: false,
          complete:function(){
            wx.switchTab({
            url: '/pages/login/login',
          }
          )},
        });
      },
      
    })
   
  },
  Toflag:function() {
    wx.getStorage({
      key: 'login',
      success:function(res){
        console.log(111)
        console.log(res.data)
        
        if(res.data==false)
        {wx.showModal({
          // cancelColor: '请登录',
          content:'请登录!',
          showCancel	: false,
          complete:function(){
            wx.switchTab({
            url: '/pages/login/login',
          }
          )},
        })
        }
        else{
          wx.navigateTo({
            url: '/pages/flag/flag',
          })
          
        }
      },
      fail:function(){
        console.log(222)
        wx.showModal({
          // cancelColor: '请登录',
          content:'请登录!',
          showCancel	: false,
          complete:function(){
            wx.switchTab({
            url: '/pages/login/login',
          }
          )},
        });
      },
      
    })
   
  },
  //wangqingshengmeima
  Toemail:function() {
    wx.getStorage({
      key: 'login',
      success:function(res){
        console.log(111)
        console.log(res.data)
        
        if(res.data==false)
        {wx.showModal({
          // cancelColor: '请登录',
          content:'请登录!',
          showCancel	: false,
          complete:function(){
            wx.switchTab({
            url: '/pages/login/login',
          }
          )},
        })
        }
        else{
          wx.navigateTo({
            url: '/pages/email/email',
          })
          
        }
      },
      fail:function(){
        console.log(222)
        wx.showModal({
          // cancelColor: '请登录',
          content:'请登录!',
          showCancel	: false,
          complete:function(){
            wx.switchTab({
            url: '/pages/login/login',
          }
          )},
        });
      },
      
    })
   
  },
  Toboard:function() {
    wx.getStorage({
      key: 'login',
      success:function(res){
        console.log(111)
        console.log(res.data)
        
        if(res.data==false)
        {wx.showModal({
          // cancelColor: '请登录',
          content:'请登录!',
          showCancel	: false,
          complete:function(){
            wx.switchTab({
            url: '/pages/login/login',
          }
          )},
        })
        }
        else{
          wx.navigateTo({
            url: '/pages/board/board',
          })
          
        }
      },
      fail:function(){
        console.log(222)
        wx.showModal({
          // cancelColor: '请登录',
          content:'请登录!',
          showCancel	: false,
          complete:function(){
            wx.switchTab({
            url: '/pages/login/login',
          }
          )},
        });
      },
      
    })
   
  },
  Toexcel:function() {
    wx.getStorage({
      key: 'login',
      success:function(res){
        console.log(111)
        console.log(res.data)
        
        if(res.data==false)
        {wx.showModal({
          // cancelColor: '请登录',
          content:'请登录!',
          showCancel	: false,
          complete:function(){
            wx.switchTab({
            url: '/pages/login/login',
          }
          )},
        })
        }
        else{
          wx.navigateTo({
            url: '/pages/excel/excel',
          })
          
        }
      },
      fail:function(){
        console.log(222)
        wx.showModal({
          // cancelColor: '请登录',
          content:'请登录!',
          showCancel	: false,
          complete:function(){
            wx.switchTab({
            url: '/pages/login/login',
          }
          )},
        });
      },
      
    })
   
  },
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