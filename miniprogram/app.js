//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'procedures-b85dd9',
        traceUser: true,
      })
    }
    //全局变量
    this.globalData = {
      //当前播放的歌曲id
      playingMusicId: -1
    }
  },
  //设置playingMusicId
  setPlayMusicId(musicId) {
    this.globalData.playingMusicId = musicId
  },
  //获取playingMusicId
  getPlayMusicId(musicId) {
    return this.globalData.playingMusicId
  }
})
