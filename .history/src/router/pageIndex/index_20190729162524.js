export default [{
    path: '/',
    redirect: '/index',
  }, {
    path: '/index',
    name: 'index',
    component: () => import('@/views/index'),
    meta: {
      title: "首页",
      keepAlive: true,
      cookie: true
    },
  }, {
    path: '/index/productDetails',
    name: 'index/productDetails',
    component: () => import('@/views/index/productDetails'),
    meta: {
      title: "教育互助",
      keepAlive: false,
      cookie: true
    },
  },

  {
    path: '/share',
    name: 'share',
    component: () => import('@/views/share'),
    meta: {
      title: "分享",
      keepAlive: false,
      cookie: true
    },
  },

  {
    path: '/index/productDetails/universityList',
    name: 'index/productDetails/universityList',
    component: () => import('@/views/index/productDetails/universityList'),
    meta: {
      title: "全国重点大学",
      keepAlive: false,
      cookie: true
    },
  },
  {
    path: '/index/promiseBook',
    name: 'index/promiseBook',
    component: () => import('@/views/index/promiseBook'),
    meta: {
      title: "教育计划承诺书",
      keepAlive: false,
      cookie: true
    },
  },
  {
    path: '/index/recipientsInfo',
    name: 'index/recipientsInfo',
    component: () => import('@/views/index/recipientsInfo'),
    meta: {
      title: "受助人信息",
      keepAlive: true,
      cookie: true
    },
  },
  {
    path: '/index/buyer',
    name: 'index/buyer',
    component: () => import('@/views/index/buyer'),
    meta: {
      title: "在线支付",
      keepAlive: false,
      cookie: true
    },
  },
  {
    path: '/index/buyerSuccess',
    name: 'index/buyerSuccess',
    component: () => import('@/views/index/buyerSuccess'),
    meta: {
      title: "教育互助计划",
      keepAlive: false,
      cookie: true
    },
  },
  {
    path: '/index/rewardDetails',
    name: 'index/rewardDetails',
    component: () => import('@/views/index/rewardDetails'),
    meta: {
      title: "奖励金详情",
      keepAlive: false,
      cookie: true
    },
  },
]
