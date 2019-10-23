
let userInfo = {}

Component({
  
  properties: {

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
    loginsuccess() {
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
    }
  }
})
