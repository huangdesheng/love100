webpackJsonp([12],{"/lV4":function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=s("lC5x"),o=s.n(n),r=s("J0Oq"),a=s.n(r),i=s("gyMJ"),c={data:function(){return{phone:"",sms:"",show:!0,count:"",timer:null}},methods:{getCode:function(){var e=this;this.show&&this.getcode(),this.show=!1;this.timer||(this.count=60,this.show=!1,this.timer=setInterval(function(){e.count>0&&e.count<=60?e.count--:(e.show=!0,clearInterval(e.timer),e.timer=null)},1e3))},sWitch:function(){this.switchPhone()},getcode:function(){var e=this;return a()(o.a.mark(function t(){var s,n;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return s=e.phone,t.next=3,i.a.getCode({tele:s,type:1});case 3:200===(n=t.sent).code||(e.$dialog({message:n.message,confirmButtonColor:"#40D0B3",confirmButtonText:"确定"}),e.show=!0,clearInterval(e.timer),e.timer=null);case 5:case"end":return t.stop()}},t,e)}))()},switchPhone:function(){var e=this;return a()(o.a.mark(function t(){var s,n,r;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return s=e.phone,n=e.sms,t.next=4,i.a.switchPhone({code:n,tele:s});case 4:r=t.sent,console.log(r),200===r.code?e.$router.replace({path:"/personalCenter/personalData"}):e.$dialog({message:r.message,confirmButtonColor:"#40D0B3",confirmButtonText:"确定"}).then(function(){e.$router.replace({path:"/personalCenter/personalData"})});case 7:case"end":return t.stop()}},t,e)}))()}}},u={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"updatePhone"},[s("div",[s("label",{attrs:{for:"phone"}},[e._m(0),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.phone,expression:"phone"}],staticClass:"smss",attrs:{type:"number",id:"phone",placeholder:"请输入手机号码"},domProps:{value:e.phone},on:{input:function(t){t.target.composing||(e.phone=t.target.value)}}}),e._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}],staticClass:"register-msg-btn",on:{click:e.getCode}},[e._v("获取验证码")]),e._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:!e.show,expression:"!show"}],staticClass:"register-msg-btn"},[e._v(e._s(e.count)+" s")])]),e._v(" "),s("label",{attrs:{for:"sms"}},[e._m(1),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.sms,expression:"sms"}],staticClass:"smss",attrs:{type:"number",id:"sms",placeholder:"请输入验证码"},domProps:{value:e.sms},on:{input:function(t){t.target.composing||(e.sms=t.target.value)}}})])]),e._v(" "),s("button",{on:{click:e.sWitch}},[e._v("提交")])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("img",{attrs:{src:s("L0GZ"),alt:""}})])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("img",{attrs:{src:s("T3QN"),alt:""}})])}]};var l=s("C7Lr")(c,u,!1,function(e){s("qKQi")},"data-v-057bf5da",null);t.default=l.exports},L0GZ:function(e,t,s){e.exports=s.p+"static/img/phone.8157e85.png"},T3QN:function(e,t,s){e.exports=s.p+"static/img/sms.bdd8e19.png"},qKQi:function(e,t){}});