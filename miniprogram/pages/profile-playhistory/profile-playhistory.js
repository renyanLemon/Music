const app = getApp()
Page({

  data: {
    musiclist: []
  },

  onLoad: function (options) {

    const playHistory = wx.getStorageSync(app.globalData.openid)
    if (playHistory.length == 0) {
      wx.showModal({
        title: '播放历史为空',
        content: '',
      })
    } else {
      // storage里面存储的songslist替换成播放历史的歌单
      //否则在最近播放页面点击下一首，播放的是原来存储的songslist里的歌曲
      wx.setStorage({
        key: 'songslist',
        data: playHistory,
      })
      this.setData({
        musiclist: playHistory
      })
    }
  }
})