import api from './api/index'
import { getMianSystemInfo } from './utils/index'
// app.js
App({
  $api: api,

  onLaunch() {
    const systemInfo = getMianSystemInfo()
    this.globalData.systemInfo = systemInfo // 将信息保存到全局变量中

    // 获取当前版本环境
    const { miniProgram } = wx.getAccountInfoSync()

    wx.setStorageSync('envVersion', miniProgram.envVersion || 'develop')

    console.log(systemInfo, miniProgram, 'systemInfo8999')
  },
  globalData: {
    systemInfo: {},
  },
})
