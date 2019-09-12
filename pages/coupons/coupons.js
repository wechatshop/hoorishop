//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    coupons: '',
    busid: 0
  },

  
  onLoad: function () {
    var that = this
    if (app.globalData.iphone == true) { that.setData({ iphone: 'iphone' }) }
    that.getCoupons();
    
  },
  getCoupons: function () {
    var that = this;
    wx.request({
      url: app.globalData.urls + '/discounts/coupons',
      data: {
        type: 'shop'
      },
      success: function (res) {
				console.log(res)
        if (res.data.code == 0) {
          that.setData({
            hasNoCoupons: false,
            coupons: res.data.data
          });
        }
      }
    })
  },
  gitCoupon: function (e) {
    var that = this;
    wx.request({
      url: app.globalData.urls + '/discounts/fetch',
      data: {
        id: e.currentTarget.dataset.id,
        token: app.globalData.token
      },
      success: function (res) {
        if (res.data.code == 20001 || res.data.code == 20002) {
          wx.showModal({
            title: '错误',
            content: '礼券已经领完了',
            showCancel: false
          })
          return;
        }
        if (res.data.code == 20003) {
          wx.showModal({
            title: '错误',
            content: '您已经领过了',
            showCancel: false
          })
          return;
        }
        if (res.data.code == 30001) {
          wx.showModal({
            title: '错误',
            content: '您的积分不足',
            showCancel: false
          })
          return;
        }
        if (res.data.code == 20004) {
          wx.showModal({
            title: '错误',
            content: '礼券已经过期',
            showCancel: false
          })
          return;
        }
        if (res.data.code == 0) {
          wx.showToast({
            title: '礼券领取成功',
            icon: 'success',
            duration: 2000
          })
        } else {
          wx.showModal({
            title: '错误',
            content: res.data.msg,
            showCancel: false
          })
        }
      }
    })
  }
})
