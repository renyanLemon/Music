
const MAX_WORDS_NUM = 140

Page({

  data: {
    wordNum: 0,  //输入的文字个数
    footerBottom: 0,  //footer 的 bottom
  },

  onLoad: function (options) {
    
  },

  //输入框
  onInput(event) {
    let wordsNum = event.detail.value.length
    if (wordsNum >= MAX_WORDS_NUM) {
      wordsNum = `最大字数为${MAX_WORDS_NUM}`
    }
    this.setData({
      wordsNum
    })
  },

  //获取焦点
  onFocus(event) {
    //模拟器获取的键盘高度为0
    this.setData({
      footerBottom: event.detail.height
    })
  },

  //失去焦点
  onBlur(event) {
    this.setData({
      footerBottom: 0
    })
  },

  onReady: function () {

  },

  onShow: function () {

  },

  onHide: function () {

  },

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