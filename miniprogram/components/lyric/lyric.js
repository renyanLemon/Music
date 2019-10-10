
let lyricHeight = 0

Component({
  
  properties: {
    isLyricShow: {
      type: Boolean,
      value: false,
    },
    lyric: String
  },

  observers: {
    lyric(lrc) {
      if(lrc == '暂无歌词') {
        this.setData({
          lrcList: [
            {
              lrc,
              time: 0,
            }
          ],
          nowLyricIndex: -1
        })
      }else {
        // 解析歌词
        this._parseLyric(lrc)
      }

    }
  },

  data: {
    lrcList: [],
    nowLyricIndex: 0, //当前播放的歌词索引
    scrollTop: 0 //滚动条滚动高度
  },

  lifetimes: {
    ready() {
      //获取当前设备信息
      wx.getSystemInfo({
        success(res) {
          //res.screenWidth / 750  求出1rpx大小
          //res.screenWidth / 750 * 64  一行歌词所对应的高度（css里设置了一行歌词64rpx）
          lyricHeight = res.screenWidth / 750 * 64
        }
      })
    }
  },

  methods: {
    //接收进度条组件传过来的时间
    updata(currentTime) {
      let lrcList = this.data.lrcList
      if (lrcList.length == 0) {
        return
      }
      //如果滚动条滑动到最后，则取消歌词高亮显示
      if (currentTime > lrcList[lrcList.length-1].time) {
        if(this.data.nowLyricIndex != -1) {
          this.setData({
            nowLyricIndex: -1,
            scrollTop: lrcList.length * lyricHeight
          })
        }
      }
      //对应歌词高亮显示
      for(let i=0; i<lrcList.length; i++) {
        if (currentTime <= lrcList[i].time) {
          this.setData({
            nowLyricIndex: i-1,
            scrollTop: (i - 1) * lyricHeight
          })
          break
        }
      }
    },

    _parseLyric(sLyric){
      let _lrcList = []
      let line = sLyric.split('\n')
      line.forEach((elem) => {
        let time = elem.match(/\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g)
        if(time != null) {
          //获取歌词
          let lrc = elem.split(time)[1]
          //获取歌词对应的时间
          let timeReg = time[0].match(/(\d{2,}):(\d{2})(?:\.(\d{2,3}))?/)
          //把时间转化为秒
          let timeToSeconds = parseInt(timeReg[1]) * 60 + parseInt(timeReg[2]) + parseInt(timeReg[3]) / 1000
          _lrcList.push({
            lrc,
            time: timeToSeconds
          })
        }
      })
      this.setData({
        lrcList: _lrcList
      })
    }
  }
})
