'use strict';
var app = getApp();

function userAuthed(self){
  var that = self;
  if (app.globalData.usinfo == 0) {
    return false;
  } else {
    return true
  }

}

function checkAuth(self){
  var that = self;
  if (app.globalData.usinfo == 0) {
    that.setData({
      wxlogin: false
    });
    return false;
  } else {
    that.setData({ wxlogin: true });
    return true
  }
}

module.exports = {
  userAuthed: userAuthed,
  checkAuth: checkAuth


};