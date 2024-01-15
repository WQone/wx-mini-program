// 获取系统信息
const getMianSystemInfo = () => {
  // 获取系统信息
  let systemInfo = wx.getSystemInfoSync() || {
    model: '',
    system: '',
  }
  let rect
  // 校验是否是ios手机 和 是否是iPhone X手机
  let ios = !!(systemInfo.system.toLowerCase().search('ios') + 1)
  let iosX = !!(systemInfo.model.toLowerCase().search('iphone x') + 1)
  try {
    // 获取右上角胶囊位置信息
    rect = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : null
    if (rect === null) {
      throw 'getMenuButtonBoundingClientRect error'
    }
    //取值为0的情况  有可能width不为0 top为0的情况
    if (!rect.width || !rect.top || !rect.left || !rect.height) {
      throw 'getMenuButtonBoundingClientRect error'
    }
  } catch (error) {
    let gap = '' //胶囊按钮上下间距 使导航内容居中
    let width = 96 //胶囊的宽度
    if (systemInfo.platform === 'android') {
      gap = 8
      width = 96
    } else if (systemInfo.platform === 'devtools') {
      if (ios) {
        gap = 5.5 //开发工具中ios手机
      } else {
        gap = 7.5 //开发工具中android和其他手机
      }
    } else {
      gap = 4
      width = 88
    }

    if (!systemInfo.statusBarHeight) {
      //开启wifi的情况下修复statusBarHeight值获取不到
      systemInfo.statusBarHeight = systemInfo.screenHeight - systemInfo.windowHeight - 20
    }

    rect = {
      //获取不到胶囊信息就自定义重置一个
      bottom: systemInfo.statusBarHeight + gap + 32,
      height: 32,
      left: systemInfo.windowWidth - width - 10,
      right: systemInfo.windowWidth - 10,
      top: systemInfo.statusBarHeight + gap,
      width: width,
    }
  }

  // 导航栏高度
  let navBarHeight = ''

  if (!systemInfo.statusBarHeight) {
    systemInfo.statusBarHeight = 0
    systemInfo.navBarExtendHeight = 0 //下方扩展4像素高度 防止下方边距太小

    //开启wifi和打电话下
    systemInfo.statusBarHeight = systemInfo.screenHeight - systemInfo.windowHeight - 20
    navBarHeight = (function () {
      let gap = rect.top - systemInfo.statusBarHeight
      return 2 * gap + rect.height
    })()
  } else {
    if (ios && systemInfo.platform !== 'devtools') {
      systemInfo.navBarExtendHeight = 4 // 下方扩展4像素高度 防止下方边距太小
    } else {
      systemInfo.navBarExtendHeight = 0
    }

    navBarHeight = (function () {
      let gap = rect.top - systemInfo.statusBarHeight
      return systemInfo.statusBarHeight + 2 * gap + rect.height
    })()
  }

  systemInfo.navBarHeight = navBarHeight + systemInfo.navBarExtendHeight // 导航栏高度不包括statusBarHeight
  systemInfo.capsulePosition = rect // 右上角胶囊按钮信息bottom: 58 height: 32 left: 317 right: 404 top: 26 width: 87
  systemInfo.ios = ios // 是否ios
  systemInfo.iosX = iosX // 是否iPhone X类型手机
  systemInfo.customTabbar = iosX ? 82 : 48 // iPhone X手机定义table高度
  return systemInfo
}

const getEnvToken = () => {
  const envVersion = wx.getStorageSync('envVersion') || 'develop'
  const data = require(`./${envVersion}.config.js`)
  console.log(data)
  return data
}
module.exports = {
  getMianSystemInfo,
  getEnvToken,
}
