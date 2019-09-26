
Page({

  data: {
    songslist: [],
    listInfo: {}
  },

  onLoad: function (options) {
    console.log(options.musiclistId)
    wx.cloud.callFunction({
      name: 'music',
      data: {
        musiclistId: options.musiclistId,
        $url: 'songslist'
      }
    }).then((res) => {
      this.setData({
        songslist: res.result.playlist.tracks,
        listInfo: {
          coverImgUrl: res.result.playlist.coverImgUrl,
          name: res.result.playlist.name
        }
      })
      this._setSongslist()
    })
  },
  //本地存储
  _setSongslist() {
    wx.setStorageSync('songslist', this.data.songslist)
  }
})