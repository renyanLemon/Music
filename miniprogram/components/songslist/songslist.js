
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
      this.setData({
        playingId: event.currentTarget.dataset.musicid
      })
    }
  }
})
