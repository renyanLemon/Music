
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
      const musicid = event.currentTarget.dataset.musicid
      this.setData({
        playingId: musicid
      })
      wx.navigateTo({
        url: `../../pages/player/player?musicid=${musicid}`,
      })
    }
  }
})
