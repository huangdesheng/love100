import * as educationHelpModule from './moule/educationHelpModule' //教育互助
import * as register from './moule/register' //登录注册
import * as indexModule from './moule/indexModule' //首页
import * as welfareModule from './moule/welfareModule' //公益模块
import * as personalCenterModule from './moule/personalCenterModule' //我的模块
import * as transparentModule from './moule/transparentModule' //透明监督模块

export default {
  ...educationHelpModule,
  ...register,
  ...indexModule,
  ...welfareModule,
  ...personalCenterModule,
  ...transparentModule
}
