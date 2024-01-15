Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: "请选择星座",
    },
    navData: {
      type: Array,
      value: [],
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false,
    activeId:'',
  },
  ready() {
    // this.tipNavCilck();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 打开弹出框
    open(id) {
      this.setData({
        isShow: true,
        activeId:id || 0
      });
    },
    // 关闭弹出框
    _closeDialog() {
      this.setData({
        isShow: false,
      });
    },

    // 防止冒泡
    _mycatchtap() {
      return;
    },

    // 阻止滚动
    _myCatchTouch() {
      return;
    },
    // 导航按钮点击
    tipNavCilck(e) {
      console.log(e, 7787878787);
      const index = e ? e.currentTarget.dataset.index : 0;
      this.triggerEvent('pickerChange', index)
      this._closeDialog()
    },
  },
});
