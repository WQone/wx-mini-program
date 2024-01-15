const app = getApp();
Component({
  /**
   * 组件的一些选项
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 组件的对外属性
   */
  properties: {
    // 背景颜色
    bgColor: {
      type: String,
      value: ''
    },
    isCustom: {
      type: Boolean,
      optionalTypes: [Boolean, Number],
      value: false
    },
    // 是否带返回按钮
    isBack: {
      type: Boolean,
      optionalTypes: [Boolean, Number],
      value: false
    },
    // 背景图片
    bgImage: {
      type: String,
      value: ''
    },
    // 导航标题
    title: {
      type: String,
      value: '',
    },
    // 是否自定义导航栏
    isCustom: {
      type: Boolean,
      optionalTypes: [Boolean, Number],
      value: false
    },
    // 文字颜色
    textColor: {
      type: String,
      value: '#000000D9',
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    gotype: 'page',
    StatusBar: app.globalData.systemInfo.statusBarHeight,
    CustomBar: app.globalData.systemInfo.navBarHeight,
    Custom: app.globalData.systemInfo.capsulePosition
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      const pages = getCurrentPages()
      let gotype = !pages[pages.length - 2] ? 'home' : 'page'
      this.setData({
        gotype,
        StatusBar: app.globalData.systemInfo.statusBarHeight,
        CustomBar: app.globalData.systemInfo.navBarHeight,
        Custom: app.globalData.systemInfo.capsulePosition
      })
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 返回
    BackPage(e) {
      console.warn('BackPageBackPageBackPage', e.currentTarget.dataset);
      const {
        gotype
      } = e.currentTarget.dataset
      switch (gotype) {
        case 'page':
          this.triggerEvent('NavBackPage')
          break;
        case 'home':
          wx.reLaunch({
            url: '/pages/index/index'
          })
          break;
        default:
          break;
      }
    },
    // 关闭
    ClosePage() {
      wx.navigateBack({
        delta: 1
      });
    },
  }
})