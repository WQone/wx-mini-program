//获取应用实例
const app = getApp();
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    windowHeight: app.globalData.systemInfo.windowHeight,
  },
  ready() {},
  /**
   * 组件的方法列表
   */
  methods: {},
});
