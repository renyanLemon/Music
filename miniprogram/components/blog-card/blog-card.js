
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

  }
})
