
const MAX_WORDS_NUM = 140  //最大输入文字个数
const MAX_IMG_NUM = 9   //最大上传图片数量

//初始化数据库
const db = wx.cloud.database()
//输入的内容
let content = ''
//用户信息
let userInfo = {}

Page({

  data: {
    wordNum: 0,  //输入的文字个数
    footerBottom: 0,  //footer 的 bottom
    images: [],
  },

  onLoad: function(options) {
    userInfo = options
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
    //输入的内容
    content = event.detail.value
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

  //发送
  send() {
    //输入的内容不能为空
    if(content.trim() === '') {
      wx.showModal({
        title: '请输入内容',
        content: '',
      })
      return
    }

    wx.showLoading({
      title: '发布中',
    })

    let promiseArr = []
    let fileIds = []
    //图片上传
    for(let i=0; i < this.data.images.length; i++) {

      let p = new Promise((resolve, reject) => {

        let item = this.data.images[i]
        //文件扩展名
        let suffix = /\.\w+$/.exec(item)[0]
        wx.cloud.uploadFile({
          cloudPath: `blog/${Date.now()}-${Math.random() * 10000}${suffix}`,
          filePath: item,
          success: (res) => {
            fileIds = fileIds.concat(res.fileID)
            resolve()
          },
          fail: (err) => {
            console.log(err)
            reject()
          }
        })
      })

      promiseArr.push(p)
      
    }

    //存入到云数据库   ...userInfo 扩展运算符  将userInfo的每个属性插入
    Promise.all(promiseArr).then((res) => {
      db.collection('blog').add({
        data: {
          ...userInfo,
          content,
          img: fileIds,
          createTime: db.serverDate()
        }
      }).then((res) => {
        wx.hideLoading()
        wx.showToast({
          title: '发布成功',
        })
        //返回blog页面，并且刷新
        wx.navigateBack()
      })
    }).catch((err) => {
      wx.hideLoading()
      wx.showToast({
        title: '发布失败，请稍后重试',
      })
    })
  }
})