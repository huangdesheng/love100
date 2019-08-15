export default [{
    path: '/personalCenter',
    name: 'personalCenter',
    component: () => import('@/views/personalCenter'),
    meta: {
      title: "我的",
      keepAlive: false,
      cookie: true
    },
  },
  {
    path: '/personalCenter/mySuports',
    name: 'personalCenter/mySuports',
    component: () => import('@/views/personalCenter/mySuports'),
    meta: {
      title: "我的互助",
      keepAlive: false,
      cookie: true
    },
  },

  {
    path: '/personalCenter/mySuports/personalInfo',
    name: 'personalCenter/mySuports/personalInfo',
    component: () => import('@/views/personalCenter/mySuports/personalInfo'),
    meta: {
      title: "我的互助详情",
      keepAlive: false,
      cookie: true
    },
  },
  {
    path: '/personalCenter/applyReward',
    name: 'personalCenter/applyReward',
    component: () => import('@/views/personalCenter/applyReward'),
    meta: {
      title: "申请奖励金",
      keepAlive: false,
      cookie: true
    },
  },
  {
    path: '/personalCenter/applyReward/stepApply',
    name: 'personalCenter/applyReward/stepApply',
    component: () => import('@/views/personalCenter/applyReward/stepApply'),
    meta: {
      title: "互助金申请流程",
      keepAlive: false,
      cookie: true
    },
  },
  {
    path: '/personalCenter/applyReward/applyInfo',
    name: 'personalCenter/applyReward/applyInfo',
    component: () => import('@/views/personalCenter/applyReward/applyInfo'),
    meta: {
      title: "填写资料",
      keepAlive: false,
      cookie: true
    },
  },
  {
    path: '/personalCenter/myLaunch',
    name: 'personalCenter/myLaunch',
    component: () => import('@/views/personalCenter/myLaunch'),
    meta: {
      title: "我的发起",
      keepAlive: ture,
      cookie: true
    },
  },
  {
    path: '/personalCenter/myHelp',
    name: 'personalCenter/myHelp',
    component: () => import('@/views/personalCenter/myHelp'),
    meta: {
      title: "我的帮扶",
      keepAlive: false,
      cookie: true
    },
  },
  {
    path: '/personalCenter/myHelp/myHelpList',
    name: 'personalCenter/myHelp/myHelpList',
    component: () => import('@/views/personalCenter/myHelp/myHelpList'),
    meta: {
      title: "我的帮扶详情",
      keepAlive: false,
      cookie: true
    },
  },
  {
    path: '/personalCenter/myHelp/personalInfo',
    name: 'personalCenter/myHelp/personalInfo',
    component: () => import('@/views/personalCenter/myHelp/personalInfo'),
    meta: {
      title: "我的个人帮扶信息",
      keepAlive: false,
      cookie: true
    },
  },

  {
    path: '/personalCenter/publicRecord',
    name: 'personalCenter/publicRecord',
    component: () => import('@/views/personalCenter/publicRecord'),
    meta: {
      title: "公益记录",
      keepAlive: false,
      cookie: true
    },
  },
  {
    path: '/personalCenter/abount',
    name: 'personalCenter/abount',
    component: () => import('@/views/personalCenter/abount'),
    meta: {
      title: "关于我们",
      keepAlive: false,
      cookie: true
    },
  },

  {
    path: '/personalCenter/personalData',
    name: 'personalCenter/personalData',
    component: () => import('@/views/personalCenter/personalData'),
    meta: {
      title: "个人资料",
      keepAlive: false,
      cookie: true
    },
  },

  {
    path: '/personalCenter/personalData/updatePhone',
    name: 'personalCenter/personalData/updatePhone',
    component: () => import('@/views/personalCenter/personalData/updatePhone'),
    meta: {
      title: "个人资料",
      keepAlive: false,
      cookie: true
    },
  },



  {
    path: '/personalCenter/loveValue',
    name: 'personalCenter/loveValue',
    component: () => import('@/views/personalCenter/loveValue'),
    meta: {
      title: "爱心值",
      keepAlive: false,
      cookie: true
    },
  },

  {
    path: '/personalCenter/loveValue/readValue',
    name: 'personalCenter/loveValue/readValue',
    component: () => import('@/views/personalCenter/loveValue/readValue'),
    meta: {
      title: "分值解读",
      keepAlive: false,
      cookie: true
    },
  },

  {
    path: '/personalCenter/helpGoods',
    name: 'personalCenter/helpGoods',
    component: () => import('@/views/personalCenter/helpGoods'),
    meta: {
      title: "善因产品",
      keepAlive: false,
      cookie: true
    },
  },



]
