
//如果数据需要在页面中显示，则定义在data里；
//如果数据只是用于中间的计算，传值，则不要定义在data里
let songslist = []
//当前正在播放歌曲的index
let nowPlayingIndex = 0

//获取全局唯一的背景音频管理器
const backgroundAudioManager = wx.getBackgroundAudioManager()

Page({

  data: {
    picUrl: '',
    isPlaying: false
  },

  onLoad: function (options) {
    console.log('options', options)
    songslist = wx.getStorageSync('songslist')
    nowPlayingIndex = options.index
    this._loadSongsDetail(options.musicid)
  },

  _loadSongsDetail(songId) {
    backgroundAudioManager.stop()
    let songs = songslist[nowPlayingIndex]
    //将歌曲名称展示在tabbar
    wx.setNavigationBarTitle({
      title: songs.name
    })
    this.setData({
      picUrl: songs.al.picUrl
    })
    
    wx.showLoading({
      title: '加载中',
    })

    wx.cloud.callFunction({
      name: 'music',
      data: {
        songId,
        $url: 'songUrl',
      }
    }).then((res) => {
      wx.hideLoading()
      let result = JSON.parse(res.result)
      backgroundAudioManager.src = result.data[0].url
      backgroundAudioManager.title = songs.name
      backgroundAudioManager.coverImgUrl = songs.al.picUrl
      backgroundAudioManager.singer = songs.ar[0].name
      backgroundAudioManager.epname = songs.al.name

      this.setData({
        isPlaying: true
      })
    })
  },

  togglePlaying() {
    if(this.data.isPlaying) {
      backgroundAudioManager.pause()
    }else {
      backgroundAudioManager.play()
    }
    this.setData({
      isPlaying: !this.data.isPlaying
    })
  },

  onPrev() {
    nowPlayingIndex--
    if (nowPlayingIndex < 0) {
      nowPlayingIndex = songslist.length -1
    }
    this._loadSongsDetail(songslist[nowPlayingIndex].id)
  },

  onNext() {
    nowPlayingIndex++
    if (nowPlayingIndex === songslist.length) {
      nowPlayingIndex = 0
    }
    this._loadSongsDetail(songslist[nowPlayingIndex].id)
  }


  
})