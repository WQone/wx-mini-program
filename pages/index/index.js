import { starNavData, dateNavData } from './initData'
import dayjs from 'dayjs'

//获取应用实例
const app = getApp()
const { constellationAll } = app.$api

Page({
  data: {
    navOpacity: 0, // 背景透明度
    loading: false,
    starNavData, // 十二星座列表
    starActiveIndex: 0, // 选中的当前星座下标
    dateNavData,
    dateActiveIndex: 0, // 选中的当前日期下标
    starData: [],
    starInfo: {},
  },

  onLoad() {
    const key = wx.getStorageSync('starKey')
    this.changeStar({ detail: key || 0 })
  },
  // 页面滚动时候触发
  onPageScroll(e) {
    let { scrollTop } = e
    let navOpacity = 0
    let maxDistance = 60
    navOpacity = parseFloat(scrollTop / maxDistance).toFixed(2)
    if (navOpacity >= 1) {
      navOpacity = 1
    }
    if (navOpacity <= 0.1) {
      navOpacity = 0
    }
    // 这里设置<100是减少setData次数，节省内存
    if (
      (scrollTop < 100 && this.data.navOpacity != navOpacity) ||
      (navOpacity == 1 && this.data.navOpacity != 1)
    ) {
      this.setData({
        navOpacity,
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '快来看看你的今日运势~',
      path: '/pages/index/index',
      imageUrl: `../../assets/images/share.png`,
    }
  },
  /**
   * 朋友圈分享
   */
  onShareTimeline() {
    return {
      title: '快来看看你的今日运势~',
      imageUrl: `../../assets/images/share.png`,
    }
  },

  /**
   * 动画实现
   * @method animationShow
   * @param {that} 当前卡片
   * @param {opacity} 透明度
   * @param {delay} 延迟
   */
  animationShow(px, opacity, delay, duration = 500) {
    let animation = wx.createAnimation({
      duration,
      timingFunction: 'ease',
      delay: delay,
    })
    animation.opacity(opacity).translateX(px).step().translateX(0).step()
    let params = ''
    params = animation.export()
    console.log(params, 'params')
    return params
  },

  // 广告点击
  showAd() {
    let videoAd = null

    // 在页面onLoad回调事件中创建激励视频广告实例
    if (wx.createRewardedVideoAd) {
      videoAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-2fd3a00e3a6a93df',
      })
      videoAd.onLoad(() => {})
      videoAd.onError((err) => {
        console.error('激励视频光告加载失败', err)
      })
      videoAd.onClose((res) => {})
    }

    // 用户触发广告后，显示激励视频广告
    if (videoAd) {
      videoAd.show().catch(() => {
        // 失败重试
        videoAd
          .load()
          .then(() => videoAd.show())
          .catch((err) => {
            console.error('激励视频 广告显示失败', err)
          })
      })
    }
  },
  //切换点击
  tipCilck() {
    this.selectComponent('#tip-dialog').open(this.data.starActiveIndex)
  },

  // 改变星座
  changeStar(e) {
    let index = e ? e.detail : 0
    this.setData({
      starActiveIndex: index,
    })
    wx.setStorageSync('starKey', index)
    this.getData()
  },

  // 改变日期
  changeDate({ target }) {
    const index = target ? target.dataset.index : 0
    this.setData({
      dateActiveIndex: index,
    })
    const info = this.data.starData[index]
    for (let i = 0; i < info.content.length; i++) {
      info.content[i].animation = this.animationShow(i * -50, 0, 0, 0)
    }

    this.setData({
      starInfo: info,
    })
    setTimeout(() => {
      for (let i = 0; i < info.content.length; i++) {
        info.content[i].animation = this.animationShow(0, 1, (i + 1) * 20)
      }
      this.setData({
        starInfo: info,
      })
    }, 100)
  },
  // 数据请求
  getData() {
    this.setData({
      loading: true,
    })
    const { starActiveIndex, dateActiveIndex } = this.data
    return new Promise((resolve) => {
      constellationAll({
        id: starActiveIndex + 1,
        ld: -1,
        vc: 'xcx',
        rq: dayjs().format('YYYYMMDD'),
      }).then((res) => {
        const resData = res.data
        this.setData({
          starData: resData,
          starInfo: resData[dateActiveIndex],
        })

        resolve()
        setTimeout(() => {
          this.setData({
            loading: false,
          })
        }, 300)
      })
    })
  },
})
