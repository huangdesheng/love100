webpackJsonp([18],{Zihv:function(e,n){},otCu:function(e,n){},p4AA:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var s=t("lC5x"),i=t.n(s),r=t("J0Oq"),a=t.n(r),o=t("gyMJ"),p={data:function(){return{personRecipientsVO:{},familyPic:[],learnPic:[],statusbtn:!1}},mounted:function(){this.personalHelpDetails(this.$route.query.recipientsId),100==this.$route.query.status&&(0!=this.$route.query.helpStatus&&3!=this.$route.query.helpStatus||(this.statusbtn=!0))},mixins:[t("cnSu").a],methods:{personalHelpDetails:function(e){var n=this;return a()(i.a.mark(function t(){var s,r,a;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.a.personalHelpDetails(e);case 2:200===(s=t.sent).code&&(n.personRecipientsVO=s.data.personRecipientsVO,r=s.data.personRecipientsVO.photos.filter(function(e){return 2===e.type}),a=s.data.personRecipientsVO.photos.filter(function(e){return 3===e.type}),n.familyPic=0===r.length?[]:r[0].urls,n.learnPic=0===a.length?[]:a[0].urls);case 4:case"end":return t.stop()}},t,n)}))()},personalHelp:function(){this.personalHelpInfo()},personalHelpInfo:function(){var e=this;return a()(i.a.mark(function n(){var t;return i.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,o.a.confirmPay({recipientsIds:[e.$route.query.recipientsId],type:0});case 2:200===(t=n.sent).code&&e.$router.push({path:"/helpProgram/buyer",query:{info:t.data.obj,typeHelp:0}});case 4:case"end":return n.stop()}},n,e)}))()}}},c={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("div",{staticClass:"page-personalDetail"},[t("div",{staticClass:"top_P"},[t("p",[t("span",[e._v("头像")]),e._v(" "),t("img",{attrs:{src:e.personRecipientsVO.photo,alt:""},on:{click:function(n){return e.singleBigTu(e.personRecipientsVO.photo)}}})]),e._v(" "),t("p",[t("span",[e._v("受助人姓名")]),e._v(" "),t("span",[e._v(e._s(e.personRecipientsVO.name))])]),e._v(" "),t("p",[t("span",[e._v("加入年级")]),e._v(" "),t("span",[e._v(e._s(e.personRecipientsVO.classNumber)+"年级")])]),e._v(" "),t("p",[t("span",[e._v("年龄")]),e._v(" "),t("span",[e._v(e._s(e.personRecipientsVO.age)+"岁")])]),e._v(" "),t("p",[t("span",[e._v("性别")]),e._v(" "),t("span",[e._v(e._s(1===e.personRecipientsVO.sex?"男":"女"))])]),e._v(" "),t("p",[t("span",[e._v("爱心状况")]),e._v(" "),t("span",[t("van-rate",{attrs:{count:e.personRecipientsVO.totalPeriods,icon:"like","void-icon":"like-o",size:20,color:"red","void-color":"red",readonly:""},model:{value:e.personRecipientsVO.loveValue,callback:function(n){e.$set(e.personRecipientsVO,"loveValue",n)},expression:"personRecipientsVO.loveValue"}})],1)]),e._v(" "),t("p",[t("span",[e._v("地区")]),e._v(" "),t("span",[e._v(e._s(e.personRecipientsVO.region))])])]),e._v(" "),t("div",{staticClass:"footer_P"},[t("ul",[t("li",[t("h2",[e._v("家庭状况")]),e._v(" "),t("div",[t("p",[e._v(e._s(e.personRecipientsVO.family))]),e._v(" "),0!=e.familyPic.length?t("div",{staticClass:"morePic"},e._l(e.familyPic,function(n,s){return t("span",{key:s,staticClass:"img",style:{backgroundImage:"url("+n+")",backgroundSize:"cover"},on:{click:function(t){return e.seeBigTu(n,e.familyPic)}}})}),0):e._e()])]),e._v(" "),t("li",[t("h2",[e._v("学习情况")]),e._v(" "),t("div",[t("p",[e._v(e._s(e.personRecipientsVO.learn))]),e._v(" "),0!=e.learnPic.length?t("div",e._l(e.learnPic,function(n,s){return t("span",{key:s,staticClass:"img",style:{backgroundImage:"url("+n+")",backgroundSize:"cover"},on:{click:function(t){return e.seeBigTu(n,e.learnPic)}}})}),0):e._e()])])])])]),e._v(" "),e.statusbtn?t("div",{staticClass:"apply"},[t("van-button",{attrs:{type:"primary"},on:{click:e.personalHelp}},[e._v("我要帮扶他")])],1):e._e()])},staticRenderFns:[]};var l=t("C7Lr")(p,c,!1,function(e){t("otCu"),t("Zihv")},"data-v-7997bae7",null);n.default=l.exports}});