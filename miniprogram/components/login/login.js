
Component({

  properties: {
    modalShow: Boolean
  },

  data: {

  },

  methods: {
    //获取用户授权
    ongetUserInfo(event) {
      const userInfo = event.detail.userInfo
      if (userInfo) {
        //允许授权
        this.setData({
          modalShow: false
        })
        this.triggerEvent('loginsuccess', userInfo)
      }else {
        this.triggerEvent('loginfail', userInfo)
      }
    }
  }
})
