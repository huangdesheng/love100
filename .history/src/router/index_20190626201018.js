import Vue from 'vue'
import Router from 'vue-router'
import indexRouterConfig from './pageIndex';
import transparentRouterConfig from './pageTransparent';
import helpProgramRouterConfig from './pageHelprogram';
import loveWelfareRouterConfig from './pageLoveWelfare';
import personalCenterRouterConfig from './personalCenter';

Vue.use(Router)

export const constantRouterMap = [
  ...indexRouterConfig,
  ...transparentRouterConfig,
  ...helpProgramRouterConfig,
  ...loveWelfareRouterConfig,
  ...personalCenterRouterConfig
]

export default new Router({
  mode: 'hash',
  // base: 'idolweb',
  routes: constantRouterMap
})
