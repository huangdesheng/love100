export default [{
    path: '/loveWelfare',
    name: 'loveWelfare',
    component: () => import('@/views/Love public welfare'),
    meta: {
      title: "爱心公益",
      keepAlive: false,
      cookie: true
    },
  },
  {
    path: '/loveWelfare/welfare_details',
    name: 'loveWelfare/welfare_details',
    component: () => import('@/views/Love public welfare/welfare_details'),
    meta: {
      title: "爱心公益",
      keepAlive: false,
      cookie: true
    },
  },
  {
    path: '/loveWelfare/welfare_reply',
    name: 'loveWelfare/welfare_reply',
    component: () => import('@/views/Love public welfare/welfare_reply'),
    meta: {
      title: "爱心公益",
      keepAlive: false,
      cookie: true
    },
  },

]
