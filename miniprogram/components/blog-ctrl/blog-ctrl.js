
let userInfo = {}
const db = wx.cloud.database()

Component({
  
  properties: {
    blogId: String
  },

  data: {
    loginShow: false, // 授权是否显示
    modalShow: false, //底部评论弹出层是否显示
    content: ''
  },

  methods: {
    onComment() {
      //判断用户是否授权
      wx.getSetting({
        success: (res) => {
          if(res.authSetting['scope.userInfo']){
            wx.getUserInfo({
              success: (res) => {
                userInfo = res.userInfo
                //显示评论弹出层
                this.setData({
                  modalShow: true
                })
              }
            })
          }else {
            this.setData({
              loginShow: true
            })
          }
        }
      })
    },

    //授权成功
    onLoginsuccess(event) {
      userInfo = event.detail
      this.setData({
        loginShow: false,
      }, () => {
        this.setData({
          modalShow: true
        })
      })
    },

    //授权失败
    onLoginfail() {
      wx.showModal({
        title: '授权用户才能进行评价',
        content: '',
      })
    },

    onInput(event) {
      this.setData({
        content: event.detail.value
      })
    },

    //发送
    onSend() {
      //插入数据库
        let content = this.data.content
        if(content.trim() == '') {
          wx.showModal({
            title: '评论内容不能为空',
            content: '',
          })
        }else {
          wx.showLoading({
            title: '发布中...',
            mask: true
          })
          db.collection('blog-comment').add({
            data: {
              content,
              createTime: db.serverDate(),
              blogId: this.properties.blogId,
              nickName: userInfo.nickName,
              avatarUrl: userInfo.avatarUr
            }
          }).then((res) => {
            wx.hideLoading()
            wx.showToast({
              title: '评论成功',
            })
            this.setData({
              modalShow: false,
              content: ''
            })
          })
        }
      //推送模版消息
    }
  }
})
