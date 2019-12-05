
const MAX_LIMIT = 15

Page({

  data: {
    swiperImgUrls: [
      {url: 'http://littleee.com/jxzy/hanhan-liu/1.jpeg'},
      {url: 'http://littleee.com/jxzy/hanhan-liu/2.jpeg'},
      {url: 'http://littleee.com/jxzy/hanhan-liu/3.jpeg'}
    ],
    musiclist: []
  },

  /**生命周期函数--监听页面加载**/
  onLoad: function (options) {
    this._getMisicList()
  },

  /** 下拉刷新 */
  onPullDownRefresh: function () {
    this.setData({
      playlist: []
    })
    this._getMisicList()
  },

  /**页面上拉触底事件的处理函数*/
  onReachBottom: function () {
    this._getMisicList()
  },

  /** 获取歌单列表 */
  _getMisicList() {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'music',
      data: {
        start: this.data.musiclist.length,
        count: MAX_LIMIT,
        $url: 'musiclist'
      }
    }).then((res) => {
      this.setData({
        musiclist: this.data.musiclist.concat(res.result.data)
      })
      console.log(11111, res)
      //停止下拉刷新
      wx.stopPullDownRefresh()
      wx.hideLoading()
    })
  }
})