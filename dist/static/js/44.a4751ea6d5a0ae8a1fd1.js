webpackJsonp([44],{JDUt:function(t,e){},hNzX:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("lC5x"),s=a.n(n),r=a("J0Oq"),i=a.n(r),o=a("gyMJ"),c={data:function(){return{info:{},shareStatus:!1}},components:{shareDialog:a("Eg0l").a},mounted:function(){this.payInfo()},methods:{payInfo:function(){var t=this;return i()(s.a.mark(function e(){var a;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.helpPayCompleted({type:t.$route.query.type,planId:t.$route.query.planId});case 2:200===(a=e.sent).code&&(t.info=a.data);case 4:case"end":return e.stop()}},e,t)}))()},back_btn:function(){this.$router.replace({path:"/helpProgram",query:{projectId:this.info.projectId}})},share:function(){this.shareStatus=!this.shareStatus},shareClickStatus:function(t){this.shareStatus=!1}}},u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-index"},[a("div",{staticClass:"page_title"}),t._v(" "),a("div",{staticClass:"page_content"},[a("div",[a("span",{style:{backgroundImage:"url("+t.info.photo+")",backgroundSize:"contain"}}),t._v(" "),a("span",[t._v(t._s(t.info.username))])]),t._v(" "),a("h2",[t._v("您已成功帮扶"+t._s(t.info.helpCount)+"名小朋友")]),t._v(" "),t._m(0),t._v(" "),a("p",[a("span",{on:{click:t.back_btn}},[t._v("返回计划详情")]),t._v("|\n      "),a("span",{on:{click:t.share}},[t._v("分享给好友")])])]),t._v(" "),a("shareDialog",{attrs:{shareStatus:t.shareStatus},on:{shareClickStatus:t.shareClickStatus}})],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("p",[this._v("助人为美")]),this._v(" "),e("p",[this._v("助人为乐")]),this._v(" "),e("p",[this._v("让爱传递美好")])])}]};var h=a("C7Lr")(c,u,!1,function(t){a("JDUt")},"data-v-181a4676",null);e.default=h.exports}});