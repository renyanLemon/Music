
//如果数据需要在页面中显示，则定义在data里；
//如果数据只是用于中间的计算，传值，则不要定义在data里
let songslist = []
//当前正在播放歌曲的index
let nowPlayingIndex = 0

Page({

  data: {
    picUrl: ''
  },

  onLoad: function (options) {
    songslist = wx.getStorageSync('songslist')
    nowPlayingIndex = options.index
    this._loadSongsDetail()
  },

  _loadSongsDetail() {
    let songs = songslist[nowPlayingIndex]
    //将歌曲名称展示在tabbar
    wx.setNavigationBarTitle({
      title: songs.name
    })
    this.setData({
      picUrl: songs.al.picUrl
    })
  }

  
})