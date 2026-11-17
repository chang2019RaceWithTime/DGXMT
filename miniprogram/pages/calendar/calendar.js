const db = wx.cloud.database();//连接云数据库
var util = require('../../utils/util.js');
Page({
  data: {
    showModal: false,
    showModal_delete:false,
    hasEmptyGrid: false,
    cur_year: '',
    cur_month: '',
    cur_day: '',
    notes: '',
    names:'',
  },
  onLoad(options) {
    this.setNowDate();
    this.getNotes()
  },
  // 新建日程
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },

  // 弹出框蒙层截断touchmove事件
  preventTouchMove: function () {
  },

  //  隐藏模态对话框
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  //  隐藏模态对话框
  hideModal_delete: function () {
    this.setData({
      showModal_delete: false
    });
  },
  // 对话框取消按钮点击事件
  onCancel: function () {
    this.hideModal();
  },
   // 对话框取消按钮点击事件
   onCancel_delete: function () {
    this.hideModal_delete();
  },

  //对话框确认按钮点击事件
  onConfirm: function () {
    this.hideModal();
    //将输入的日程上传到数据库中
    var that = this;
    db.collection("data").add(
      {
        data: {
          names:that.data.names,
          notes: that.data.notes,
          posttime: `${this.data.cur_year}/${this.data.cur_month}/${this.data.todayIndex + 1}`
        }
      }
    )
    this.getNotes()
    this.getNames() //重新获取姓名和事情
    wx.showToast({   //显示存储成功
      title: '记录成功',
      icon: 'success',
      duration: 1000
    })
  },
  onConfirm_delete: function () {
    this.hideModal_delete();
    //利用姓名删除
    var that = this;
    db.collection("data").where(
      {
          names:that.data.names,
          posttime: `${this.data.cur_year}/${this.data.cur_month}/${this.data.todayIndex + 1}` 
      }
    ).remove({
      sucess:function(res){
        console.log(res.data)
      }
    })
    this.getNotes()
    this.getNames() //重新获取姓名和事情
    wx.showToast({   //显示存储成功
      title: '删除成功',
      icon: 'success',
      duration: 1000
    })
  },
  //输入日程
  inputNotes: function (e) {
    this.data.notes = e.detail.value
  },
  inputNames: function (e) {
    this.data.names = e.detail.value
  },
  //删除
  delete(){
    this.setData({showModal_delete:true})
  },

  dateSelectAction: function (e) {
    var cur_day = e.currentTarget.dataset.idx;
    this.setData({
      todayIndex: cur_day
    })
    console.log(`${this.data.cur_year}/${this.data.cur_month}/${this.data.todayIndex + 1}`);
    this.getNotes()
  },
  //获取日程
  getNotes() {
    var that = this
    db.collection("data").orderBy("posttime", "desc").where({
      //筛选日历对应日期的所有日程
      posttime: `${this.data.cur_year}/${this.data.cur_month}/${this.data.todayIndex + 1}`
    }).get()
      .then(res => {
        console.log(res)
        this.setData({
          getArr: res.data
        })
      })
  },
  getNames() {
    var that = this
    db.collection("data").orderBy("posttime", "desc").where({
      //筛选日历对应日期的所有日程
      posttime: `${this.data.cur_year}/${this.data.cur_month}/${this.data.todayIndex + 1}`
    }).get()
      .then(res => {
        console.log(res)
        this.setData({
          getArr: res.data
        })
      })
  },
  setNowDate: function () {
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const todayIndex = date.getDate() - 1;
    console.log(`日期：${todayIndex}`)
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    this.calculateEmptyGrids(cur_year, cur_month);
    this.calculateDays(cur_year, cur_month);
    this.setData({
      cur_year: cur_year,
      cur_month: cur_month,
      weeks_ch,
      todayIndex,
    })
  },

  getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
  },
  getFirstDayOfWeek(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },
  calculateEmptyGrids(year, month) {
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    let empytGrids = [];
    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        empytGrids.push(i);
      }
      this.setData({
        hasEmptyGrid: true,
        empytGrids
      });
    } else {
      this.setData({
        hasEmptyGrid: false,
        empytGrids: []
      });
    }
  },
  calculateDays(year, month) {
    let days = [];

    const thisMonthDays = this.getThisMonthDays(year, month);

    for (let i = 1; i <= thisMonthDays; i++) {
      days.push(i);
    }

    this.setData({
      days
    });
  },
  handleCalendar(e) {
    const handle = e.currentTarget.dataset.handle;
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;
    if (handle === 'prev') {
      let newMonth = cur_month - 1;
      let newYear = cur_year;
      if (newMonth < 1) {
        newYear = cur_year - 1;
        newMonth = 12;
      }

      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);

      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      })

    } else {
      let newMonth = cur_month + 1;
      let newYear = cur_year;
      if (newMonth > 12) {
        newYear = cur_year + 1;
        newMonth = 1;
      }

      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);

      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      })
    }
  }
})
