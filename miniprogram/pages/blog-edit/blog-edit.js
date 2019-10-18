
const MAX_WORDS_NUM = 140  //最大输入文字个数
const MAX_IMG_NUM = 9   //最大上传图片数量

Page({

  data: {
    wordNum: 0,  //输入的文字个数
    footerBottom: 0,  //footer 的 bottom
    images: [],
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

  //选择图片
  onChooseImage() {
    wx.chooseImage({
      count: MAX_IMG_NUM - this.data.images.length,  //还能在上传几张图片
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          images: this.data.images.concat(res.tempFilePaths)
        })
      },
    })
  },

  //删除图片
  onDelImage(event) {
    // splice 改变原有数组 并返回删除的元素
    // this.data.images  已经被改变 
    this.data.images.splice(event.target.dataset.index, 1)
    this.setData({
      images: this.data.images
    })
  },

  //预览图片
  onPreviewImage(event) {
    wx.previewImage({
      urls: this.data.images,
      current: event.target.dataset.imgsrc
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