// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import 'lib-flexible'
import store from '@/store'
import VueLazyLoad from 'vue-lazyload'
import wxapi from "@/utils/share";

Vue.use(Vant);
import {
  urlSearch
} from '@/utils/handleURL';

Vue.use(VueLazyLoad, {
  preLoad: 1,
  error: 'http://love100.qxiao.net:8888/group1/M00/00/03/rBFAEl0UMmSAUfIEAAADrfLOjsw731.png',
  loading: 'http://love100.qxiao.net:8888/group1/M00/00/03/rBFAEl0UMmSAUfIEAAADrfLOjsw731.png',
  attempt: 2,
})

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  if (to.name === 'index' || to.name === 'helpProgram' || to.name === 'index/productDetails') {
    if (to.query.openId != undefined) {
      let openId = urlSearch()
      store.dispatch('authorize', openId)
    }
  }
  next()
})

//全局后置钩子
// router.afterEach((to, from) => {
//   // if (to.meta.isShare === false) {
//   function wxShareAppMessage() {
//     console.log(111)
//     let option = {
//       title: "亲爱的用户您好", // 分享标题
//       desc: "乐爱心欢迎你的加入", // 分享描述
//       link: 'http://tonyleung.natapp1.cc/wechat/authorize/1', // 分享链接
//       imgUrl: "http://love100.qxiao.net:8888/group1/M00/00/02/rBFAEl0S0IKALkANAAVRVp-c2sA916.png", // 分享图标, 请自行替换，需要绝对路径
//       success: () => {},
//       error: () => {}
//     }
//     wxapi.ShareAppMessage(option);
//   }
//   wxapi.wxRegister(wxShareAppMessage);
//   // }
// });


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  mounted() {
    wxapi.wxRegister(this.wxRegCallback);
    // console.log(window.location.href.split("#")[1])
  },
  methods: {
    wxRegCallback() {
      // 用于微信JS-SDK回调
      // if (window.location.href.split("#")[1] === '/personalCenter') {
      this.wxShareTimeline();
      // }
      this.wxShareAppMessage();
    },
    wxShareTimeline() {
      // 微信自定义分享到朋友圈
      let option = {
        title: "亲爱的爱心用户您好", // 分享标题, 请自行替换
        desc: "欢迎加入乐爱心项目", // 分享描述, 请自行替换
        link: window.location.href.split("#")[0] + '#/share', // 分享链接，根据自身项目决定是否需要split
        imgUrl: "http://love100.qxiao.net:8888/group1/M00/00/02/rBFAEl0S0IKALkANAAVRVp-c2sA916.png", // 分享图标, 请自行替换，需要绝对路径
        success: () => {
          alert("分享成功");
        },
        error: () => {
          alert("已取消分享");
        }
      };
      // 将配置注入通用方法
      wxapi.ShareTimeline(option);
    },
    wxShareAppMessage() {
      console.log(window.location.href.split("#")[0])
      // 微信自定义分享给朋友
      let option = {
        title: "亲爱的爱心用户您好", // 分享标题, 请自行替换
        desc: "欢迎加入乐爱心项目", // 分享描述, 请自行替换
        link: window.location.href.split("#")[0] + '#/share', // 分享链接，根据自身项目决定是否需要split
        imgUrl: "http://love100.qxiao.net:8888/group1/M00/00/02/rBFAEl0S0IKALkANAAVRVp-c2sA916.png", // 分享图标, 请自行替换，需要绝对路径
        success: () => {
          alert("分享成功");
        },
        error: () => {
          alert("已取消分享");
        }
      };
      // if (API_ROOT)
      // 将配置注入通用方法
      wxapi.ShareAppMessage(option);
    }
  },
  template: '<App/>'
})


/*
萌爱心
  1926646409@qq.com
  gzqy2018

乐爱心
1610660369@qq.com
lehui2019**
*/
