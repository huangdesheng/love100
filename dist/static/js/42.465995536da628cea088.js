webpackJsonp([42],{"1IjP":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("aA9S"),i=n.n(a),r=n("lC5x"),s=n.n(r),o=n("J0Oq"),c=n.n(o),u=(n("2bvH"),n("gyMJ")),d=n("CtzY"),p=n.n(d),v=n("VKKs"),l={data:function(){return{continueStatus:!1,recipientPersonUpload:{},item:{index:0,radio:"0"},price:100,value:100,money:100}},mounted:function(){void 0==this.$route.query.index?(this.continueStatus=!1,this.information()):(this.continueStatus=!1,this.continueInformation()),this.item.index=this.$route.query.index},methods:{submit_btn:function(){void 0==this.item.index?this.helpWxpay():this.continuePay()},radioChange:function(e){this.item.radio=e,void 0===this.item.index||0===this.item.index?"0"==e?(this.money=100,this.price=100):"1"==e&&(this.money=this.recipientPersonUpload.difference,this.price=this.recipientPersonUpload.difference):"0"==e?(this.money=100,this.price=this.recipientPersonUpload.amountAddArrears):"1"==e&&(this.money=this.recipientPersonUpload.difference,this.price=this.recipientPersonUpload.oneTimePaymentAddArrears)},information:function(){var e=this;return c()(s.a.mark(function t(){var n;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u.a.information(p.a.stringify({recipientsId:e.$route.query.recipientsId}));case 2:200===(n=t.sent).code?e.recipientPersonUpload=n.data:e.$dialog({message:n.message});case 4:case"end":return t.stop()}},t,e)}))()},continueInformation:function(){var e=this;return c()(s.a.mark(function t(){var n;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u.a.continueInformation(e.$route.query.recipientsId);case 2:200===(n=t.sent).code?(0===n.data.owedPeriods?e.continueStatus=!1:(e.price=100+n.data.arrears,e.continueStatus=!0),e.recipientPersonUpload=n.data,e.value=n.data.arrears,e.index=n.data.owedPeriods):e.$dialog({message:n.message});case 4:case"end":return t.stop()}},t,e)}))()},helpWxpay:function(){var e=this;return c()(s.a.mark(function t(){var n,a;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u.a.helpWxpay({recipientsId:e.$route.query.recipientsId,amount:e.price/1e4,payType:e.item.radio});case 2:200===(n=t.sent).code?(a=i()({},n.data,{package:n.data.packageValue}),e.wxpay(a)):706===n.code?e.$dialog.alert({message:n.message}).then(function(){e.$router.push({path:"/"})}):e.$dialog({message:n.message});case 4:case"end":return t.stop()}},t,e)}))()},continuePay:function(){var e=this;return c()(s.a.mark(function t(){var n,a;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u.a.continuePay({recipientsId:e.$route.query.recipientsId,amount:e.price/1e4,payType:e.item.radio,owedPeriods:e.item.index,arrears:e.value});case 2:200===(n=t.sent).code?(a=i()({},n.data,{package:n.data.packageValue}),e.wxpay(a)):706===n.code?e.$dialog.alert({message:n.message}).then(function(){e.$router.push({path:"/"})}):e.$dialog({message:n.message});case 4:case"end":return t.stop()}},t,e)}))()},wxpay:function(e){var t=this;return c()(s.a.mark(function n(){var a,i;return s.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:a=t,i=t.$route.query.recipientsId,WeixinJSBridge.invoke("getBrandWCPayRequest",e,function(e){"get_brand_wcpay_request:ok"==e.err_msg?(v.a.remove("recipuentsInfo"),a.$router.push({path:"/index/buyerSuccess",query:{recipientsId:i}})):e.err_msg});case 3:case"end":return n.stop()}},n,t)}))()}}},m={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"page-index",staticStyle:{height:"100vh"}},[n("div",{staticClass:"page_title"},[n("p",[e._v("全国重点大学教育奖励计划")]),e._v(" "),n("div",[n("p",[n("span",[e._v("受助人")]),e._v(" "),n("span",[e._v(e._s(e.recipientPersonUpload.name))])]),e._v(" "),n("p",[n("span",[e._v("加入年级")]),e._v(" "),n("span",[e._v(e._s(e.recipientPersonUpload.classNumber)+"年级")])]),e._v(" "),n("p",[n("span",[e._v("身份证号")]),e._v(" "),n("span",[e._v(e._s(e.recipientPersonUpload.cardId))])]),e._v(" "),n("p",[n("span",[e._v("助学情况")]),e._v(" "),n("span",[n("van-rate",{attrs:{icon:"like","void-icon":"like-o",count:e.recipientPersonUpload.frequencyCount,size:22,color:"red","void-color":"red",readonly:""},model:{value:e.recipientPersonUpload.alreadyHelp,callback:function(t){e.$set(e.recipientPersonUpload,"alreadyHelp",t)},expression:"recipientPersonUpload.alreadyHelp"}})],1)])])]),e._v(" "),n("div",{staticClass:"buyer_content"},[n("div",[n("h2",[e._v("选择缴费方式")]),e._v(" "),n("van-radio-group",{model:{value:e.item.radio,callback:function(t){e.$set(e.item,"radio",t)},expression:"item.radio"}},[n("van-radio",{attrs:{name:"0","checked-color":"#40d0ad"},on:{click:function(t){return e.radioChange("0")}}},[e._v("按年缴费")]),e._v(" "),n("van-radio",{attrs:{name:"1","checked-color":"#40d0ad"},on:{click:function(t){return e.radioChange("1")}}},[e._v("一次性缴费")])],1)],1)]),e._v(" "),n("van-cell",{attrs:{title:"金额（元）",value:e.money+"元"}}),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.continueStatus,expression:"continueStatus"}],staticClass:"continue"},[n("h2",[e._v("教育互助延续")]),e._v(" "),n("van-cell",{attrs:{title:"金额（元）",value:e.value+"元"}})],1),e._v(" "),n("p",{staticClass:"warningIng"},[e._v("按时缴纳费用，计划完成后请进入申请奖励金。")]),e._v(" "),n("div",{staticClass:"buyer_footer"},[n("van-button",{attrs:{type:"primary"},on:{click:e.submit_btn}},[e._v("支付")])],1)],1)},staticRenderFns:[]};var h=n("C7Lr")(l,m,!1,function(e){n("o4E3")},"data-v-2ec54543",null);t.default=h.exports},o4E3:function(e,t){}});