
Page({

  data: {
    modalShow: false,  //底部弹出层是否显示
    blogList: []
  },

  onLoad: function(options) {
    this._loadBlogList()
  },

  //加载博客列表
  _loadBlogList() {
    wx.cloud.callFunction({
      name: 'blog',
      data: {
        $url: 'list',
        start: 0,
        count: 10
      }
    }).then((res) => {
      this.setData({
        blogList:this.data.blogList.concat(res.result)
      })
    })
  },

  //发布
  onPublish() {
    //判断用户是否授权
    wx.getSetting({
      success: (res) => {
        if(res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (res) => {
              this.onLoginSuccess({
                detail: res.userInfo
              })
            }
          })
        }else {
          this.setData({
            modalShow: true
          }) 
        }
      }
    })
    
  },

  //授权成功
  onLoginSuccess(event) {
    const detail = event.detail
    wx.navigateTo({
      url: `../blog-edit/blog-edit?nickName=${detail.nickName}&avatarUrl=${detail.avatarUrl}`,
    })
  },

  //授权失败
  onLoginFail(event) {
    wx.showModal({
      title: '授权用户才能发布',
      content: '',
    })
    this.setData({
      modalShow: false
    }) 
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})