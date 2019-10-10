
let movableAreaWidth = 0
let movableViewWidth = 0
//取到小程序中唯一一个音乐管理器
const backgroundAudioManager = wx.getBackgroundAudioManager()
//backgroundAudioManager.currentTime  当前播放时间，每一秒钟触发四次，但设置到界面上，每一秒钟设置一次即可
//优化 当前播放时间的秒
let currentSec = -1
//当前歌曲总时长
let duration = 0
//优化：解决当前进度条拖拽时候和updatatime事件有冲突的问题（进度条滑块乱跳)
//当前进度条是否在拖拽 
let isMoving = false
Component({
  
  properties: {

  },

  data: {
    showTime: {
      currentTime: '00:00',
      totalTime: '00:00'
    },
    movableDis: 0,
    progress: 0
  },
  //lifetimes  组件生命周期
  //ready()组件在页面上布局完以后执行
  lifetimes: {
    ready() {
      this._getMovableDis()
      this._bindBGMEvent()
    }
  },

  methods: {
    onChange(event) {
      //拖动 event.detail.source === 'touch'
      if (event.detail.source === 'touch') {
        this.data.progress = event.detail.x / (movableAreaWidth - movableViewWidth) * 100
        this.data.movableDis = event.detail.x
        //当前在拖拽
        isMoving = true
      }
    },

    //原生
    onTouchEnd() {
      const currentTimeFmt = this._dataFormat(Math.floor(backgroundAudioManager.currentTime))
      this.setData({
        progress: this.data.progress,
        movableDis: this.data.movableDis,
        ['showTime.currentTime']: `${currentTimeFmt.min}:${currentTimeFmt.sec}`
      })
      //backgroundAudioManager.seek 音乐播放的当前时长
      //播放进度百分比 * 总时长 / 100
      backgroundAudioManager.seek(this.data.progress * duration / 100)
      isMoving = false
    },
    _getMovableDis() {
      //获取当前界面进度条总长度
      const query = this.createSelectorQuery()
      query.select('.movable-area').boundingClientRect()
      query.select('.movable-view').boundingClientRect()
      //query.exec() 全部执行并返回一个数组
      query.exec((rect) => {
        movableAreaWidth = rect[0].width
        movableViewWidth = rect[1].width
      })
    },

    // 背景音乐时间
    _bindBGMEvent() {
      //播放
      backgroundAudioManager.onPlay(() => {
        console.log('onPlay')
        isMoving = false
      })
      //停止播放
      backgroundAudioManager.onStop(() => {
        console.log('onStop')
      })
      //暂停
      backgroundAudioManager.onPause(() => {
        console.log('onPause')
      })
      //监听音频正在加载
      backgroundAudioManager.onWaiting(() => {
        console.log('onWaiting')
      })
      
      //监听背景音乐是可以播放的状态
      backgroundAudioManager.onCanplay(() => {
        console.log('onCanplay')
        //backgroundAudioManager.duration 当前歌曲总时长
        //在某些机型中会获取undefined（概率事件），判断是否为undefeated
        if (typeof backgroundAudioManager.duration != 'undefined') {
          this._setTime()
        } else {
          setTimeout(() => {
            this._setTime()
          }, 1000)
        }
      })
      
      //播放进度
      backgroundAudioManager.onTimeUpdate(() => {
        console.log('onTimeUpdate')
        if(!isMoving) {
          //backgroundAudioManager.currentTime  当前播放时间
          const currentTime = backgroundAudioManager.currentTime
          //优化，一秒设置一次界面当前时间
          if (currentTime.toString().split('.')[0] != currentSec) {
            currentSec = currentTime.toString().split('.')[0]
            const currentTimeFmt = this._dataFormat(backgroundAudioManager.currentTime)
            const duration = backgroundAudioManager.duration
            this.setData({
              movableDis: (movableAreaWidth - movableViewWidth) * currentTime / duration,
              progress: currentTime / duration * 100,
              ['showTime.currentTime']: `${currentTimeFmt.min}:${currentTimeFmt.sec}`
            })
            //联动歌词
            this.triggerEvent('timeUpdate', {
              currentTime
            })
          }
        }    
      })
      //播放结束
      backgroundAudioManager.onEnded(() => {
        console.log('onEnded')
        //自动播放下一首 自定义事件
        this.triggerEvent('musicEnd')
      })
      //播放错误
      backgroundAudioManager.onError(() => {

      })
    },

    //设置歌曲时长
    _setTime() {
      duration = backgroundAudioManager.duration
      const durationFmt = this._dataFormat(duration)
      //给对象中的某一个值复制
      this.setData({
        ['showTime.totalTime']: `${durationFmt.min}:${durationFmt.sec}`
      })
    },

    //格式化时间
    _dataFormat(time) {
      let min = Math.floor(time / 60)
      let sec = Math.floor(time % 60)
      min = min < 10 ? `0${min}` : min
      sec = sec < 10 ? `0${sec}` : sec
      return {
        'min': min,
        "sec": sec
      }
    }
  }
})
