
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
    })
  },

  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})