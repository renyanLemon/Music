
const MAX_LIMIT = 15

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperImgUrls: [
      {
        url: 'http://p1.music.126.net/oeH9rlBAj3UNkhOmfog8Hw==/109951164169407335.jpg',
      },
      {
        url: 'http://p1.music.126.net/xhWAaHI-SIYP8ZMzL9NOqg==/109951164167032995.jpg',
      },
      {
        url: 'http://p1.music.126.net/Yo-FjrJTQ9clkDkuUCTtUg==/109951164169441928.jpg',
      }
    ],
    musiclist: []
  },

  /**生命周期函数--监听页面加载**/
  onLoad: function (options) {
    this._getMisicList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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
        count: MAX_LIMIT
      }
    }).then((res) => {
      this.setData({
        musiclist: this.data.musiclist.concat(res.result.data)
      })
      //停止下拉刷新
      wx.stopPullDownRefresh()
      wx.hideLoading()
    })
  }
})