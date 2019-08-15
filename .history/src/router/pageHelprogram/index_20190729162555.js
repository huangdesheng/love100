export default [{
    path: '/helpProgram',
    name: 'helpProgram',
    component: () => import('@/views/helpProgram'),
    meta: {
      title: '教育帮扶',
      keepAlive: true,
      cookie: true
    },
  },
  {
    path: '/helpProgram/programDetails',
    name: '/helpProgram/programDetails',
    component: () => import('@/views/helpProgram/programDetails'),
    meta: {
      title: "帮扶计划",
      keepAlive: false,
      cookie: true
    }
  },

  {
    path: '/helpProgram/helpLaunch',
    name: '/helpProgram/helpLaunch',
    component: () => import('@/views/helpProgram/helpLaunch'),
    meta: {
      title: "发起帮扶",
      keepAlive: false,
      cookie: true
    }
  },
  {
    path: '/helpProgram/groupResets',
    name: '/helpProgram/groupResets',
    component: () => import('@/views/helpProgram/groupResets'),
    meta: {
      title: "发起帮扶",
      keepAlive: false,
      cookie: true
    }
  },
  {
    path: '/helpProgram/personalResets',
    name: '/helpProgram/personalResets',
    component: () => import('@/views/helpProgram/personalResets/index'),
    meta: {
      title: "发起帮扶",
      keepAlive: false,
      cookie: true
    }
  },
  {
    path: '/helpProgram/selectObject',
    name: 'helpProgram/selectObject',
    component: () => import('@/views/helpProgram/selectObject'),
    meta: {
      title: "帮扶对象",
      keepAlive: false,
      cookie: true
    }
  },
  {
    path: '/helpProgram/buyer',
    name: 'helpProgram/buyer',
    component: () => import('@/views/helpProgram/buyer'),
    meta: {
      title: "在线支付",
      keepAlive: false,
      cookie: true
    }
  },
  {
    path: '/helpProgram/objectList',
    name: 'helpProgram/objectList',
    component: () => import('@/views/helpProgram/objectList'),
    meta: {
      title: "对象列表",
      keepAlive: false,
      cookie: true
    }
  },
  {
    path: '/helpProgram/groupBuyerSuccess',
    name: 'helpProgram/groupBuyerSuccess',
    component: () => import('@/views/helpProgram/groupBuyerSuccess'),
    meta: {
      title: "团体互助成功",
      keepAlive: false,
      cookie: true
    }
  },
  {
    path: '/helpProgram/personProgramDetails',
    name: 'helpProgram/personProgramDetails',
    component: () => import('@/views/helpProgram/personProgramDetails'),
    meta: {
      title: "帮扶个人资料",
      keepAlive: false,
      cookie: true
    }
  },

  {
    path: '/helpProgram/realName',
    name: 'helpProgram/realName',
    component: () => import('@/views/helpProgram/realName'),
    meta: {
      title: "实名认证",
      keepAlive: false,
      cookie: true
    }
  },

  // 个人申请帮扶
  {
    path: '/helpProgram/personalApplication',
    name: 'helpProgram/personalApplication',
    component: () => import('@/views/helpProgram/personalApplication'),
    meta: {
      title: "个人帮扶申请",
      keepAlive: false,
      cookie: true
    }
  },

  {
    path: '/helpProgram/groupResets/addInstitutional',
    name: 'helpProgram/groupResets/addInstitutional',
    component: () => import('@/views/helpProgram/groupResets/addInstitutional'),
    meta: {
      title: "新增机构信息",
      keepAlive: false,
      cookie: true
    }
  },

  {
    path: '/helpProgram/groupResets/RecipientsInfo',
    name: 'helpProgram/groupResets/RecipientsInfo',
    component: () => import('@/views/helpProgram/groupResets/RecipientsInfo'),
    meta: {
      title: "添加助人信息",
      keepAlive: false,
      cookie: true
    }
  },



]
