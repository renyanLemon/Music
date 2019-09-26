
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

  /**
   * 组件的方法列表
   */
  methods: {
    onSelect(event) {
      const dataset = event.currentTarget.dataset
      this.setData({
        playingId: dataset.musicid
      })
      wx.navigateTo({
        url: `../../pages/player/player?musicid=${dataset.musicid}&index=${dataset.index}`,
      })
    }
  }
})
