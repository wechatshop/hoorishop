const app = getApp()
var checkAuth = require('../../utils/checkAuth.js')
Page({
	data: {
    balance:0,
    freeze:0,
    score:0,
    score_sign_continuous:0,
    wxlogin:true,
    userInfo:{uid:0},
    isLogin:false,  // 是否登陆
    serviceList:[
    //  { pic: "/images/service_kanjia.png", name: "我的砍价", url:"/pages/my-kanjia/index"},
    //  { pic: "/images/service_bargain.png", name: "我的拼团", url: "/pages/my-pintuan/index"},
    //  { pic: "/images/service_feedback.png", name: "反馈", url: "/pages/feedback/feedback" },
   //   { pic: "/images/service_job.png", name: "招骋信息", url: "/pages/job/index" },
      { pic: "../../images/jifen.png", name: "积分", url: "/pages/score/score" },
      { pic: "../../images/profile_ticket.png", name: "优惠券", url: "/pages/my-coupons/my-coupons"},
      { pic: "../../images/profile_collection.png", name: "我的收藏", url: "/pages/fav-list/fav-list" },
      { pic: "../../images/profile_address.png", name: "我的地址", url: "/pages/address/address"},
      ]
  },
  onLoad: function () {
    var that = this;
    console.log("onLoad++++++");
    that.getUserApiInfo();
    that.getUserAmount();
    that.checkScoreSign();
    that.getInfo();
    wx.request({
      url: app.globalData.urls + '/notice/list',
      data: {
        type: 'notice'
      },
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            noticeList: res.data.data
          });
        }
      }
    });
  },
  
  loginSuccess:function(e){
    var that = this 
    console.log("loginSuccess===============>")
    that.onShow()
  },
  goUserInfo:function(e){
    var that = this
    console.log("checkAuth=>", checkAuth.userAuthed(that))
    console.log("app.globalData.token=", app.globalData.token)
    if (!checkAuth.checkAuth(that)) {
      return
    }
  },
  onShow() {
    // ==================================
    var that = this
    if (!checkAuth.userAuthed(that)) {
     return
    }
    that.setData({ userInfo: { uid: app.globalData.uid }, isLogin: ""!=app.globalData.token })
    if (app.globalData.token=="" ){
      setTimeout(function () {
        that.setData({ userInfo: { uid: app.globalData.uid }, isLogin: "" != app.globalData.token })
      },2000)
    }
    this.getUserApiInfo();
    this.getUserAmount();
    this.checkScoreSign();
    this.getInfo();
    //更新订单状态
    console.log("==============statistics ==============TOKEN=", app.globalData.token);
    wx.request({
      url: app.globalData.urls + '/order/statistics',
      data: { token: app.globalData.token },
      success: function (res) {
        if (res.data.code == 0) {
          if (res.data.data.count_id_no_pay > 0) {
            wx.setTabBarBadge({
              index: 3,
              text: '' + res.data.data.count_id_no_pay + ''
            })
          } else {
            wx.removeTabBarBadge({
              index: 3,
            })
          }
          that.setData({
            noplay: res.data.data.count_id_no_pay,
            notransfer: res.data.data.count_id_no_transfer,
            noconfirm: res.data.data.count_id_no_confirm,
            noreputation: res.data.data.count_id_no_reputation
          });
        }
      }
    })
    wx.getStorage({
      key: 'shopCarInfo',
      success: function (res) {
        if (res.data) {
          that.data.shopCarInfo = res.data
          if (res.data.shopNum > 0) {
            wx.setTabBarBadge({
              index: 2,
              text: '' + res.data.shopNum + ''
            })
          } else {
            wx.removeTabBarBadge({
              index: 2,
            })
          }
        } else {
          wx.removeTabBarBadge({
            index: 2,
          })
        }
      }
    })
  },	
  getUserApiInfo: function () {
    var that = this;
    wx.request({
      url: app.globalData.urls + '/user/detail',
      data: {
        token: app.globalData.token
      },
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            apiUserInfoMap: res.data.data
          });
        }
      }
    })
  },
  getUserAmount: function () {
    var that = this;
    wx.request({
      url: app.globalData.urls + '/user/amount',
      data: {
        token: app.globalData.token
      },
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            balance: res.data.data.balance,
            freeze: res.data.data.freeze,
            score: res.data.data.score
          });
        }
      }
    })
  },
  getInfo: function () {
    var that = this;
    wx.request({
      url: app.globalData.urls + '/config/get-value',
      data: {
        key: "mallinfo"
      },
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            getInfo: res.data.data.value
          });
        }
      }
    })
  },
  checkScoreSign: function () {
    var that = this;
    wx.request({
      url: app.globalData.urls + '/score/today-signed',
      data: {
        token: app.globalData.token
      },
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            score_sign_continuous: res.data.data.continuous
          });
        }
      }
    })
  },
  scoresign: function () {
    var that = this;
    wx.request({
      url: app.globalData.urls + '/score/sign',
      data: {
        token: app.globalData.token
      },
      success: function (res) {
        if (res.data.code == 0) {
          that.getUserAmount();
          that.checkScoreSign();
        } else {
          wx.showModal({
            title: '错误',
            content: res.data.msg,
            showCancel: false
          })
        }
      }
    })
  },

  relogin:function(){
    var that = this;
    wx.authorize({
      scope: 'scope.userInfo',
      success() {
        app.globalData.token = null;
        app.login();
        wx.showModal({
          title: '提示',
          content: '重新登陆成功',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              that.onShow();
            }
          }
        })
      },
      fail(res){
        //console.log(res);
        wx.openSetting({});
      }
    })
  },
  goBuyMember:function(){
    return this.membercenter()
  },

  goPage: function (e) {
    var that = this
    if (!checkAuth.checkAuth(that)) {
      return
    }
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  },
  withdraw: function () {
    wx.navigateTo({
      url: "/pages/withdraw/index"
    })
  }, 

  score: function () {
    wx.navigateTo({
      url: "/pages/score/index"
    })
  }, 



  membercenter:function(){
    wx.navigateTo({
      url: "/pages/member/member"
    })
  },



 
  store1: function () {
    wx.navigateToMiniProgram({
      appId: 'wx13ada471efd5d943',
      path: 'pages/index/index',
      extraData: {
        foo: 'bar'
      },
      envVersion: 'release',
      success(res) {
        // 打开成功
      }
    })

  },
  
})