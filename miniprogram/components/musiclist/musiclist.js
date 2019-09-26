// compoents/musiclist/musiclist.js
Component({
  /**  组件的属性列表,传过来的数据,需要指定类型  */
  properties: {
    musiclist: {
      type: Object
    }
  },

   /**  数据监听器  */
   observers: {
    //  监听对象
     musiclist(val) {
      //  console.log(val)
     },
    //  监听对象内某个属性
     ['musiclist.playCount'](count) {
       this._tranNumber(count, 2)
       this.setData({
         _count: this._tranNumber(count, 2)
       })
     }
   },

  /**  组件的初始数据,组件内部数据  */
  data: {
    _count: 0
  },

  methods: {
    //点击歌单跳转歌单列表
    goToMusiclist() {
      wx.navigateTo({
        url: `../../pages/songslist/songslist?musiclistId=${this.properties.musiclist.id}`,
      })
    },
    //
    _tranNumber(num,point) {
      let numStr = num.toString().split('.')[0]
      if(numStr.length < 6) {
        return numStr
      }else if(numStr.length >= 6 && numStr.length <= 8) {
        let decimal = numStr.substring(numStr.length - 4, numStr.length-4+point)
        return parseFloat(parseInt(num / 10000) + '.' +decimal) + '万'
      } else if (numStr.length > 8) {
        let decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point)
        return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿'
      }
    }
  }
})
