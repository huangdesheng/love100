webpackJsonp([22],{"4at/":function(t,e){},kvll:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("lC5x"),r=n.n(a),s=n("J0Oq"),i=n.n(s),o=n("gyMJ"),v=n("CtzY"),c=n.n(v),p={data:function(){return{info:{}}},mounted:function(){var t=this.$route.query.projectId;this.welpayComplete(t)},methods:{welpayComplete:function(t){var e=this;return i()(r.a.mark(function n(){var a;return r.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,o.a.welpayComplete(c.a.stringify({projectId:t}));case 2:200===(a=n.sent).code&&(e.info=a.data);case 4:case"end":return n.stop()}},n,e)}))()},back_btn:function(){var t=this.$route.query.projectId;this.$router.push({path:"/loveWelfare/welfare_details",query:{projectId:t}})},btn_loveValue:function(){this.$router.push({path:"/personalCenter/publicRecord"})}}},l={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page-welfare page-index"},[n("div",{staticClass:"banner"},[n("van-swipe",{attrs:{autoplay:3e3,"indicator-color":"white"}},[n("van-swipe-item",[n("div",{staticClass:"img"})])],1),t._v(" "),n("div",{staticClass:"content"},[n("div",[n("div",[n("img",{attrs:{src:t.info.photo,alt:""}}),t._v(" "),n("span",[t._v(t._s(t.info.username))])]),t._v(" "),n("p",[t._v("感谢您的捐助让世界更温暖！")]),t._v(" "),n("van-row",[n("van-col",{attrs:{span:"12"}},[n("p",[t._v("本次捐助/元")]),t._v(" "),n("p",[t._v(t._s(t.info.amount/100))])]),t._v(" "),n("van-col",{attrs:{span:"12"}},[n("p",[t._v("获得爱心值")]),t._v(" "),n("p",[t._v(t._s(t.info.loveVlue))])])],1)],1),t._v(" "),n("div",[n("div",[n("p",[t._v("送人玫瑰 手有余香")]),t._v(" "),n("p",[t._v("让爱心播送到每个地方")]),t._v(" "),n("div",[n("span",{on:{click:t.back_btn}},[t._v("返回项目详情")]),t._v(" "),n("span",{on:{click:t.btn_loveValue}},[t._v("查看爱心记录")])])])])])],1)])},staticRenderFns:[]};var u=n("C7Lr")(p,l,!1,function(t){n("w9xs"),n("4at/")},"data-v-67cf714c",null);e.default=u.exports},w9xs:function(t,e){}});