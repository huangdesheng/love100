webpackJsonp([27],{JFaw:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("lC5x"),r=a.n(n),s=a("J0Oq"),i=a.n(s),o=a("gyMJ"),u=a("w3CS"),c=a("telf"),l=a("YvwL"),d=a("bjyp"),p={data:function(){return{item:{address:"",businessLicense:"",cardId:"",corporation:"",linkMan:"",name:"",tele:"",region:"请选择地址"},btn_status:"",areaList:c.a,areaStatus:!1}},mixins:[l.a,d.a],mounted:function(){void 0!=this.$route.query.organId?(this.businessLicenseStatus=!0,this.institutionalDetails(this.$route.query.organId),this.btn_status="updata"):this.btn_status=""},methods:{institutionalDetails:function(t){var e=this;return i()(r.a.mark(function a(){var n;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,o.a.institutionalDetails(t);case 2:200===(n=a.sent).code?e.item=n.data:e.$dialog.alert({message:n.message});case 4:case"end":return a.stop()}},a,e)}))()},add:function(){var t=this;return i()(r.a.mark(function e(){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(""!==t.item.businessLicense){e.next=3;break}return t.$toast("请上传营业执照"),e.abrupt("return",!1);case 3:if(""!==t.item.corporation){e.next=6;break}return t.$toast("输入法人姓名"),e.abrupt("return",!1);case 6:if(Object(u.a)(t.item.cardId)){e.next=9;break}return t.$toast("请正确填写身份证号"),e.abrupt("return",!1);case 9:if(""!==t.item.linkMan){e.next=12;break}return t.$toast("请输入联系人名字"),e.abrupt("return",!1);case 12:if(Object(u.b)(t.item.tele)){e.next=15;break}return t.$toast("请正确填写联系人手机号"),e.abrupt("return",!1);case 15:if("请选择地址"!==t.item.region){e.next=18;break}return t.$toast("请选择地址"),e.abrupt("return",!1);case 18:if(""!==t.item.address){e.next=21;break}return t.$toast("请填写详细地址"),e.abrupt("return",!1);case 21:t.addInstitutional();case 22:case"end":return e.stop()}},e,t)}))()},addInstitutional:function(){var t=this;return i()(r.a.mark(function e(){var a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.addInstitutional(t.item);case 2:a=e.sent,console.log(a),200===a.code?t.$dialog.alert({message:a.data.msg}).then(function(){var e=t.$route.query.projectId,a=t.$route.query.auditStatus;t.$router.replace({path:"/helpProgram/groupResets",query:{projectId:e,status:a}})}):t.$dialog.alert({message:a.message});case 5:case"end":return e.stop()}},e,t)}))()},updata:function(){var t=this;return i()(r.a.mark(function e(){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.updataInstitutional();case 1:case"end":return e.stop()}},e,t)}))()},updataInstitutional:function(){var t=this;return i()(r.a.mark(function e(){var a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.updataInstitutional(t.item);case 2:200===(a=e.sent).code?t.$dialog.alert({message:a.data.msg}).then(function(){var e=t.$route.query.projectId,a=t.$route.query.auditStatus;t.$router.replace({path:"/helpProgram/groupResets",query:{projectId:e,status:a}})}):t.$dialog.alert({message:a.message});case 4:case"end":return e.stop()}},e,t)}))()},deleteInfo:function(){this.deleteInstitutional()},deleteInstitutional:function(){var t=this;return i()(r.a.mark(function e(){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.$dialog.alert({message:"确定要删除该机构信息吗？"}).then(function(e){o.a.deleteInstitutional(t.$route.query.organId).then(function(e){if(200===e.code){var a=t.$route.query.projectId,n=t.$route.query.auditStatus;t.$router.push({path:"/helpProgram/groupResets",query:{projectId:a,status:n}})}else t.$dialog.alert({message:e.message})})}).catch(function(){});case 1:case"end":return e.stop()}},e,t)}))()}}},v={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("section",{staticClass:"content",attrs:{id:"content"}},[a("div",{staticClass:"first InstitutionalInfo"},[a("div",{staticClass:"infoTop"},[a("div",[a("van-field",{attrs:{label:"机构名称",placeholder:"请输入机构名称"},model:{value:t.item.name,callback:function(e){t.$set(t.item,"name",e)},expression:"item.name"}})],1),t._v(" "),a("div",{staticClass:"IdCard"},[a("p",[t._v("机构证明材料")]),t._v(" "),a("div",[a("div",[a("div",[a("van-uploader",{attrs:{name:"uploader","after-read":t.licenseUpload}},[t.businessLicenseStatus?a("div",[""!=t.item.businessLicense?a("img",{style:{backgroundImage:"url("+t.item.businessLicense+")"},attrs:{alt:""}}):a("van-loading",{attrs:{type:"spinner",color:"#1989fa"}})],1):a("van-icon",{attrs:{name:"photograph"}})],1)],1),t._v(" "),a("p",{staticStyle:{color:"#999"}},[t._v("请上传机构营业执照")])])])])]),t._v(" "),a("div",{staticClass:"infoBot"},[a("div",[a("van-field",{attrs:{label:"法人",placeholder:"请输入法人姓名"},model:{value:t.item.corporation,callback:function(e){t.$set(t.item,"corporation",e)},expression:"item.corporation"}})],1),t._v(" "),a("div",[a("van-field",{attrs:{label:"法人身份证",placeholder:"请输入法人身份证号码"},model:{value:t.item.cardId,callback:function(e){t.$set(t.item,"cardId",e)},expression:"item.cardId"}})],1),t._v(" "),a("div",[a("van-field",{attrs:{label:"机构联系人",placeholder:"请输入机构联系人姓名"},model:{value:t.item.linkMan,callback:function(e){t.$set(t.item,"linkMan",e)},expression:"item.linkMan"}})],1),t._v(" "),a("div",[a("van-field",{attrs:{label:"机构联系人电话",placeholder:"请输入机构联系人电话",pattern:"[0-11]*",type:"number"},model:{value:t.item.tele,callback:function(e){t.$set(t.item,"tele",e)},expression:"item.tele"}})],1),t._v(" "),a("div",{staticClass:"address"},[a("span",[t._v("地区")]),t._v(" "),a("span",{class:"请选择地址"==t.item.region?"in":"on",on:{click:t.selectAddress}},[t._v(t._s(t.item.region))])]),t._v(" "),a("div",[a("van-field",{attrs:{label:"详细地址",placeholder:"请输入详细地址"},model:{value:t.item.address,callback:function(e){t.$set(t.item,"address",e)},expression:"item.address"}})],1)])]),t._v(" "),"updata"===t.btn_status?a("div",{staticClass:"delete"},[a("p",{on:{click:t.deleteInfo}},[t._v("删除机构信息")])]):t._e()]),t._v(" "),a("footer",[""==t.btn_status?a("button",{on:{click:t.add}},[t._v("提交")]):t._e(),t._v(" "),"updata"==t.btn_status?a("button",{on:{click:t.updata}},[t._v("保存修改")]):t._e()]),t._v(" "),a("van-area",{directives:[{name:"show",rawName:"v-show",value:t.areaStatus,expression:"areaStatus"}],attrs:{"area-list":t.areaList},on:{confirm:t.confirm,cancel:t.cancel}})],1)},staticRenderFns:[]};var m=a("C7Lr")(p,v,!1,function(t){a("t9W8"),a("VQZL")},"data-v-30d4a2bc",null);e.default=m.exports},VQZL:function(t,e){},t9W8:function(t,e){}});