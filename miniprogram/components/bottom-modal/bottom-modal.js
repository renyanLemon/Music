
Component({
  
  properties: {
    modalShow: Boolean
  },

  data: {

  },

  methods: {
    //关闭弹窗
    onClose() {
      this.setData({
        modalShow: false
      })
    }
  }
})
