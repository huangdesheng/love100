webpackJsonp([15],{MZH7:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("lC5x"),n=a.n(r),s=a("J0Oq"),o=a.n(s),i=a("gyMJ"),c=(a("CtzY"),a("w3CS")),u={data:function(){return{username:"",IDcardNumber:"",positivePic:"",againstPic:"",IdCard:[],recipientsId:0,phone:"",sms:"",timer:null,show:!0,count:""}},mixins:[a("p6jS").a],methods:{confirm:function(){this.testIdCard()},testIdCard:function(){var e=this;return o()(n.a.mark(function t(){return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(Object(c.a)(e.IDcardNumber)){t.next=3;break}return e.$toast("请填写正确的身份证号码"),t.abrupt("return",!1);case 3:if(Object(c.b)(e.phone)){t.next=6;break}return e.$toast("请填写正确的手机号码"),t.abrupt("return",!1);case 6:if(""!==e.sms){t.next=9;break}return e.$toast("请输入验证码"),t.abrupt("return",!1);case 9:if(""!=e.againstPic&&""!=e.positivePic){t.next=12;break}return e.$toast("请上传身份证照片"),t.abrupt("return",!1);case 12:e.RealName();case 13:case"end":return t.stop()}},t,e)}))()},RealName:function(){var e=this;return o()(n.a.mark(function t(){var a;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.a.RealName({cardId:e.IDcardNumber,name:e.username,photoBack:e.againstPic,photoFront:e.positivePic,tele:e.phone,code:e.sms});case 2:200===(a=t.sent).code?e.$dialog.alert({message:"实名认证完成",confirmButtonText:"确定",confirmButtonColor:"#40D0B3"}).then(function(){1==e.$route.query.status?e.$router.push({path:"/helpProgram/groupResets"}):2==e.$route.query.status?e.$router.push({path:"/helpProgram/personalApplication"}):3==e.$route.query.status&&e.$router.push({path:"/personalCenter/personalData"})}):e.$dialog.alert({message:a.message});case 4:case"end":return t.stop()}},t,e)}))()},sendCode:function(){var e=this;if(""===this.phone)return this.$toast("请输入手机号码"),!1;this.show&&this.getcode(),this.show=!1;this.timer||(this.count=60,this.show=!1,this.timer=setInterval(function(){e.count>0&&e.count<=60?e.count--:(e.show=!0,clearInterval(e.timer),e.timer=null)},1e3))},getcode:function(){var e=this;return o()(n.a.mark(function t(){var a,r;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a=e.phone,t.next=3,i.a.getCode({tele:a,type:3});case 3:200===(r=t.sent).code||(e.$dialog({message:r.message,confirmButtonColor:"#40D0B3",confirmButtonText:"确定"}),e.show=!0,clearInterval(e.timer),e.timer=null);case 5:case"end":return t.stop()}},t,e)}))()}}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"page-index",staticStyle:{height:"100vh",background:"#fff"}},[a("div",{staticClass:"recipient_form"},[a("van-cell-group",[a("van-field",{attrs:{label:"姓名:",placeholder:"请输入您的姓名"},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}}),e._v(" "),a("van-field",{attrs:{label:"身份证号:",placeholder:"请输入您的身份证号"},model:{value:e.IDcardNumber,callback:function(t){e.IDcardNumber=t},expression:"IDcardNumber"}}),e._v(" "),a("van-field",{attrs:{type:"phone",label:"手机号码:",placeholder:"请输入您的手机号码"},model:{value:e.phone,callback:function(t){e.phone=t},expression:"phone"}}),e._v(" "),a("van-field",{staticClass:"sms",attrs:{center:"",placeholder:"请输入短信验证码"},model:{value:e.sms,callback:function(t){e.sms=t},expression:"sms"}},[a("van-button",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}],attrs:{slot:"button",size:"small",type:"primary"},on:{click:e.sendCode},slot:"button"},[e._v("发送验证码")]),e._v(" "),a("van-button",{directives:[{name:"show",rawName:"v-show",value:!e.show,expression:"!show"}],attrs:{slot:"button",size:"small",type:"primary"},slot:"button"},[e._v(e._s(e.count)+" s")])],1)],1),e._v(" "),a("div",{staticClass:"IdCard",staticStyle:{"margin-top":"0rem"}},[a("p",[e._v("上传身份证照片")]),e._v(" "),a("div",[a("div",[a("div",[a("van-uploader",{attrs:{name:"uploader","after-read":e.onRead}},[e.positivePicState?a("div",[""!=e.positivePic?a("img",{style:{backgroundImage:"url("+e.positivePic+")",backgroundSize:"cover"},attrs:{alt:""}}):a("van-loading",{attrs:{type:"spinner",color:"#1989fa"}})],1):a("van-icon",{attrs:{name:"photograph"}})],1)],1),e._v(" "),a("p",[e._v("身份证正面")])]),e._v(" "),a("div",[a("div",[a("van-uploader",{attrs:{name:"uploader","after-read":e.Read}},[e.againstPicState?a("div",[""!=e.againstPic?a("img",{style:{backgroundImage:"url("+e.againstPic+")",backgroundSize:"cover"},attrs:{alt:""}}):a("van-loading",{attrs:{type:"spinner",color:"#1989fa"}})],1):a("van-icon",{attrs:{name:"photograph"}})],1)],1),e._v(" "),a("p",[e._v("身份证反面")])])])])],1),e._v(" "),a("div",{staticClass:"recipient_footer"},[a("van-button",{attrs:{type:"primary"},on:{click:e.confirm}},[e._v("确认")])],1)])},staticRenderFns:[]};var p=a("C7Lr")(u,l,!1,function(e){a("nBqf"),a("nEW1")},"data-v-d442fc52",null);t.default=p.exports},nBqf:function(e,t){},nEW1:function(e,t){}});