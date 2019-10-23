
let keyword = ''

Page({

  data: {
    modalShow: false,  //底部弹出层是否显示
    blogList: []
  },

  onLoad: function(options) {
    this._loadBlogList()
  },

  //加载博客列表
  _loadBlogList(start = 0) {
    wx.showLoading({
      title: '拼命加载中...',
    })
    wx.cloud.callFunction({
      name: 'blog',
      data: {
        keyword,
        start,
        $url: 'list',
        count: 10
      }
    }).then((res) => {
      this.setData({
        blogList:this.data.blogList.concat(res.result)
      })
      wx.hideLoading()
      wx.stopPullDownRefresh()
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

  //触底加载
  onReachBottom: function() {
    this._loadBlogList(this.data.blogList.length)
  },

  //下拉刷新
  onPullDownRefresh: function() {
    this.setData({
      blogList: []
    })
    this._loadBlogList(0)
  },
  
  //评论页面
  goComment(event) {
    wx.navigateTo({
      url: '../../pages/blog-comment/blog-comment?blogId=' + event.target.dataset.blogid,
    })
  },
  
  //用户点击右上角分享
  onShareAppMessage: function () {

  },

  //搜索
  onSearch(event) {
    this.setData({
      blogList: []
    })
    keyword = event.detail.keyword
    this._loadBlogList(0)
  }
})