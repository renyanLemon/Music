
let keyword = ''

Component({
  properties: {
    placeholder: {
      type: String,
      value: '请输入关键字'
    }
  },

  data: {

  },

  methods: {
    onInput(event) {
      keyword = event.detail.value
    },

    //搜索
    onSearch() {
      this.triggerEvent('search', {keyword})
    }
  }
})
