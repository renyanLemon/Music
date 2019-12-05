import formatTime from '../../untils/formatTime.js'
Page({

  data: {
    blog: {},
    commentList: [],
    blogId: ''
  },

  //生命周期函数--监听页面加载
  onLoad: function (options) {
    this.setData({
      blogId: options.blogId
    })
    this._getBlogDetail()
  },

  _getBlogDetail(blogId) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })

    wx.cloud.callFunction({
      name: 'blog',
      data: {
        blogId: this.data.blogId,
        $url: 'detail',
      }
    }).then((res) => {
      wx.hideLoading()
      let commentList = res.result.commentList.data
      for(let i=0; i<commentList.length; i++) {
        commentList[i].createTime = formatTime(new Date(commentList[i].createTime))
      }
      this.setData({
        commentList,
        blog: res.result.detail[0]
      })
    })
  },

  //用户点击右上角分享
  onShareAppMessage: function () {
    let blogObj = this.data.blog
    return {
      title: {
        title: blogObj.content,
        path: `/pages/blog-comment/blog-comment?blogId=${blogObj._id}`,
        //imageUrl: ''
      }
    }
  }
})