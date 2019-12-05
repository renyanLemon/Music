
App({
  onLaunch: function (options) {
    console.log('onLaunch', options)
    this.checkUpdate()
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'procedures-b85dd9',
        traceUser: true,
      })
    }

    this.getOpenid()

    //全局变量
    this.globalData = {
      //当前播放的歌曲id
      playingMusicId: -1,
      openid: -1
    }
  },

  //
  onShow(options) {
    console.log('onShow', options)
  },

  //设置playingMusicId
  setPlayMusicId(musicId) {
    this.globalData.playingMusicId = musicId
  },
  //获取playingMusicId
  getPlayMusicId(musicId) {
    return this.globalData.playingMusicId
  },

  //获取opinId
  getOpenid() {
    wx.cloud.callFunction({
      name: "login",
    }).then((res)=>{
      const openid = res.result.openid
      this.globalData.openid = openid
      //如果当前设备不存在openid
      if (wx.getStorageSync(openid) == '') {
        wx.setStorageSync(openid, [])
      }
    })
  },

  //检查更新
  checkUpdate() {
    const updateManager = wx.getUpdateManager()
    //检测版本更新
    updateManager.onCheckForUpdate((res)=>{
      if(res.hasUpdate) {
        updateManager.onUpdateReady(()=>{
          console.log(123456)
          wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用',
            success(res) {
              if (res.confirm) {
                updateManager.applyUpdate()
              }
            }
          })
        })
      }
    })
  }
})
