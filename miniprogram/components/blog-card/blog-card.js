
import formatTime from '../../untils/formatTime.js'

Component({
  
  properties: {
    blog: Object
  },

  //监听器
  observers: {
    ['blog.createTime'](val) {
      if (val) {
        this.setData({
          _createTime: formatTime(new Date(val))
        })
      }
    }
  },

  data: {
    _createTime: ''
  },

  methods: {
    onPreviewImage(event) {
      const ds = event.target.dataset
      wx.previewImage({
        urls: ds.imgs,
        current: ds.imgsrc
      })
    }
  }
})
