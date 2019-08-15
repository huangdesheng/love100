import service from '@/api'
import qs from 'qs'

const wxApi = {
  /**
   * [wxRegister 微信Api初始化]
   * @param  {Function} callback [ready回调函数]
   */
  wxRegister(callback) {

    // 这边的接口请换成你们自己的
    let url = decodeURIComponent(window.location.href).split('#')[0]
    console.log(url)
    service.token(qs.stringify({
      url: url
    })).then((res) => {
      console.log(res)
      // return false
      let data = res.data // PS: 这里根据你接口的返回值来使用
      // console.log(data.signature)
      wx.config({
        debug: false, // 开启调试模式
        appId: data.appId, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature, // 必填，签名，见附录1
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'hideMenuItems', "chooseImage",
          "uploadImage",
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
    }).catch((error) => {
      console.log(error)
    })
    wx.ready((res) => {
      wx.hideMenuItems({
        menuList: [
          // "menuItem:share:timeline",
          "menuItem:share:qq",
          "menuItem:share:weiboApp",
          "menuItem:share:QZone",
          "menuItem:favorite"
        ]
      });
      if (callback) {
        callback()
      }
    })
    wx.error(function (err) {
      console.log(1)
      console.log('处理失败的验证:' + err)
    })
  },
  /**
   * [ShareTimeline 微信分享到朋友圈]
   * @param {[type]} option [分享信息]
   * @param {[type]} success [成功回调]
   * @param {[type]} error   [失败回调]
   */
  ShareTimeline(option) {
    // console.log(option)
    wx.onMenuShareTimeline({
      title: option.title, // 分享标题
      link: option.link, // 分享链接
      imgUrl: option.imgUrl, // 分享图标
      success() {
        // 用户成功分享后执行的回调函数
        option.success()
      },
      cancel() {
        // 用户取消分享后执行的回调函数
        option.error()
      }
    })
  },
  /**
   * [ShareAppMessage 微信分享给朋友]
   * @param {[type]} option [分享信息]
   * @param {[type]} success [成功回调]
   * @param {[type]} error   [失败回调]
   */
  ShareAppMessage(option) {
    console.log(option)
    wx.onMenuShareAppMessage({
      title: option.title, // 分享标题
      desc: option.desc, // 分享描述
      link: option.link, // 分享链接
      imgUrl: option.imgUrl, // 分享图标
      success() {
        console.log('111111')
        // 用户成功分享后执行的回调函数
        option.success()
      },
      cancel() {
        // 用户取消分享后执行的回调函数
        option.error()
      }
    })
  },
  wxHideOptionMenu() {
    wx.hideOptionMenu();
  },
  //显示右上角菜单接口
  wxShowOptionMenu() {
    wx.showOptionMenu();
  },
}
export default wxApi
