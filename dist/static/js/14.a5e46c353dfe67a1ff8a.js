webpackJsonp([14],{GCe1:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("lC5x"),r=a.n(n),l=a("J0Oq"),o=a.n(l),s=a("gyMJ"),c={data:function(){return{obj:null}},mounted:function(){this.checkRealName()},methods:{checkRealName:function(){var e=this;return o()(r.a.mark(function t(){var a;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.a.checkRealName();case 2:200===(a=t.sent).code?e.obj=a.data.obj:e.$toast(a.message);case 4:case"end":return t.stop()}},t,e)}))()},updatePhone:function(){this.$router.push("/personalCenter/personalData/updatePhone")},toRealName:function(){this.$router.push({path:"/helpProgram/realName",query:{status:3}})}}},u={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[null!=e.obj?a("div",[a("van-cell",{attrs:{title:"手机绑定：","is-link":"",value:e.obj},on:{click:e.updatePhone}}),e._v(" "),a("van-cell",{attrs:{title:"实名认证：",value:"已认证"}})],1):e._e(),e._v(" "),null==e.obj?a("div",{staticClass:"no_realName",on:{click:e.toRealName}},[a("van-cell",{attrs:{title:"实名认证","is-link":"",value:"未认证"}})],1):e._e()])},staticRenderFns:[]};var i=a("C7Lr")(c,u,!1,function(e){a("qNfk"),a("sixH")},"data-v-f827110c",null);t.default=i.exports},qNfk:function(e,t){},sixH:function(e,t){}});