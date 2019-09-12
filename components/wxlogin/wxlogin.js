//https://www.cnblogs.com/till-the-end/p/8935152.html
//https://segmentfault.com/a/1190000014474289
//loginSuccess
const app =getApp()
Component({
  properties: {
    wxlogin: {
      type: Boolean,
      value: false,
    },
  },
  data: { topname:''},
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      var that = this 
      var topname = wx.getStorageSync('mallName')
      console.log("titletitletitletitle=>", topname)
      if (topname){
        that.setData({ topname: topname})
      }

     


     },
    hide: function () { },
    resize: function () { },
  },
  methods: {
    disAllow:function(e){
      var that = this 
      that.setData({ wxlogin:true})
      return
      /*
      wx.switchTab({
        url: '/pages/index/index',
      })*/
    },

    // --- 用户登陆开始 --- 
    userlogin: function (e) {
      var that = this;
      var iv = e.detail.iv;
      var encryptedData = e.detail.encryptedData;
      wx.login({
        success: function (wxs) {
          wx.request({
            url: app.globalData.urls + '/user/wxapp/register/complex',
            data: {
              code: wxs.code,
              encryptedData: encryptedData,
              iv: iv
            },
            success: function (res) {
              if (res.data.code != 0) {
                wx.showModal({
                  title: '温馨提示',
                  content: '需要您的授权，才能正常使用哦～',
                  showCancel: false,
                  success: function (res) { }
                })
              } else {
                that.setData({ wxlogin: true })
                app.login();
                wx.showToast({
                  title: '授权成功',
                  duration: 2000
                })
                app.globalData.usinfo = 1;
                that.triggerEvent('loginSuccess', {})
              }
            }
          })
        }
      })
    },
  // --- 用户登陆结束 --- 

    },
    
  
});