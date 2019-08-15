export default [{
    path: '/transparentIndex',
    name: 'transparentIndex',
    component: () => import('@/views/transparent'),
    meta: {
      title: "透明监督",
      keepAlive: true,
      cookie: true
    },
  },



  {
    path: '/assistanceMutal/assistanceDetails',
    name: 'assistanceMutal/assistanceDetails',
    component: () => import('@/views/transparent/assistanceMutal/assistanceDetails'),
    meta: {
      title: "互助公示详情",
      keepAlive: false,
      cookie: true
    },
  },
  {
    path: '/assistanceMutal/report',
    name: 'assistanceMutal/report',
    component: () => import('@/views/transparent/assistanceMutal/report'),
    meta: {
      title: "互助公示",
      keepAlive: false,
      cookie: true
    },
  },

]
