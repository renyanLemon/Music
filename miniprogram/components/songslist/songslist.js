//调用全局属性和方法
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    songslist: Array
  },

  data: {
    playingId: -1
  },

  pageLifetimes: {
    show() {
      this.setData({
        playingId: parseInt(app.getPlayMusicId())
      })
    }
  },

  methods: {
    onSelect(event) {
      const dataset = event.currentTarget.dataset
      this.setData({
        playingId: dataset.musicid
      })
      wx.navigateTo({
        url: `/pages/player/player?musicid=${dataset.musicid}&index=${dataset.index}`,
      })
    }
  }
})
