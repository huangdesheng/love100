<template>
  <div>
    <div>
      <aside class="tip" v-if="check_state ==2">{{infomation}}</aside>
      <van-steps :active="active">
        <van-step>机构信息</van-step>
        <van-step>项目介绍</van-step>
        <van-step>受助人信息</van-step>
        <van-step>完成</van-step>
      </van-steps>

      <div class="content" id="content">
        <div class="first InstitutionalInfo">
          <ul>
            <li v-for="(item,index) in instituList" :key="index">
              <div>
                <span class="selected_status" @click="select_status(item.organId,index)">
                  <input type="checkbox" :value="item.organId" />
                  <img :src="checkedArr.indexOf(item.organId)>=0?icon.active:icon.normal" alt />
                </span>
                <div class="info">
                  <p>{{item.name}}</p>
                  <p>
                    <span>法人：{{item.corporation}}</span>
                    <span>地区：{{item.region}}</span>
                  </p>
                </div>
                <router-link
                  :to="{ path: '/helpProgram/groupResets/addInstitutional',query:{organId:item.organId,auditStatus:auditStatus,projectId:data.projectId}}"
                  tag="p"
                >编辑</router-link>
              </div>
            </li>
          </ul>
          <div class="instroce" @click="addInstitutional(data.projectId,auditStatus)">
            <van-icon name="plus" />
            <span>新增机构信息</span>
          </div>
        </div>
        <div class="first">
          <div>
            <div class="infoTop">
              <div>
                <van-field v-model="data.title" label="项目标题" />
              </div>
              <div class="textarea" style="border:none">
                <van-field v-model="data.introduce" label="项目介绍" type="textarea" rows="1" autosize />
                <span>(200/500字)</span>
              </div>

              <div class="IdCard normal" style="border-top:0;padding-bottom:20px">
                <div>
                  <div>
                    <div>
                      <!-- <img alt :style="{backgroundImage: 'url('+data.projectPhoto+')'}"> -->
                      <van-uploader name="uploader" :after-read="programOnRead">
                        <!-- <van-icon name="photograph"/> -->
                        <div v-if="projectState">
                          <img
                            alt
                            v-if="data.projectPhoto !=''"
                            :style="{backgroundImage: 'url('+data.projectPhoto+')'}"
                          />
                          <van-loading type="spinner" color="#1989fa" v-else />
                        </div>
                        <van-icon name="photograph" v-else />
                      </van-uploader>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="first" style="margin-bottom:1.8rem">
          <div class="second_from">
            <ul>
              <li v-for="(item,index) in recipientsDTOS" :key="index">
                <img
                  :src="item.photo"
                  alt
                  @click="RecipientsListInfo(index,item,item.recipientsId)"
                />
                <div @click="RecipientsListInfo(index,item,item.recipientsId)">
                  <span>{{item.name}}</span>
                  <span v-if="item.sex===1">男</span>
                  <span v-else-if="item.sex===2">女</span>
                  <span v-else>不详</span>
                  <span>{{item.age}}岁</span>
                  <span>{{item.classNumber}}年级</span>
                </div>
                <span class="selected_status">
                  <input type="checkbox" :value="item.recipientsId" v-model="helpCheckedArr" />
                  <img
                    :src="helpCheckedArr.indexOf(item.recipientsId)>=0?icon.active:icon.normal"
                    alt
                  />
                </span>
              </li>
            </ul>
            <div class="instroce" @click="addClick">
              <van-icon name="plus" />
              <span>添加受助人</span>
            </div>
          </div>
        </div>
        <div class="first finish">
          <div>
            <p>资料已提交，正在审核中</p>
            <p>请留意消息通知，感谢你的爱心传递！</p>
          </div>
          <p>
            <span @click="back_btn">返回帮扶计划</span>
            <span @click="back_launch">查询我的发起</span>
          </p>
        </div>
      </div>
    </div>

    <div class="btn_next" :class="active===0 ? '' : 'fixed_btn' ">
      <div @click="upStep" v-show="upStepStatus">上一步</div>
      <div @click="nextStep" v-show="nextStepStatus">下一步</div>
      <div @click="confirmStep" v-show="confirmStatus">确认</div>
    </div>
  </div>
</template>

<script>
import RecipientsInfo from "@/components/RecipientsInfo";
import service from "@/api";
import { idCard, isPhone } from "@/utils/validator";
import Storage from "@/utils/storage";
import recipoentsUpload from "@/mixins/recipoentsUpload";
export default {
  // data() {
  //   return {
  //     instituList: [], //机构信息列表
  //     active: 0, //step的状态
  //     addInfoStatus: false, //添加受助人的列表页的显示状态
  //     upStepStatus: false, //判断是否存在在上一步的按钮
  //     nextStepStatus: true, //判断是否存在在下一步的按钮
  //     confirmStatus: false, //判断是否存在确定的按钮
  //     RecipientsIndex: "", //传值受助人的列表页，判断是添加还是修改
  //     checkedArr: [], //选择机构信息Id,
  //     projectId: "", //查询详情的Id
  //     checkStatus: "", //审核的状态 2代表审核不通过
  //     infomation: "", //审核不通过的原因
  //     check_status: false, //审核状态不通过的信息的现实和隐藏
  //     auditStatus: 0, //判断添加还是修改 2代表审核不通过的修改提交
  //     icon: {
  //       active: require("@/assets/helpProgram/selected_circle.png"),
  //       normal: require("@/assets/helpProgram/no_selected_circle.png")
  //     },
  //     data: {
  //       recipientsDTOS: [], //受助人信息
  //       projectPhoto: "", //项目图
  //       title: "", //项目标题
  //       introduce: "", //项目介绍,
  //       organId: "" //机构Id
  //     }
  //   };
  // },

  data() {
    return {
      instituList: [], //机构信息列表
      active: 0, //step的状态
      upStepStatus: false, //判断是否存在在上一步的按钮
      nextStepStatus: true, //判断是否存在在下一步的按钮
      confirmStatus: false, //判断是否存在确定的按钮
      checkedArr: [], //选择机构信息Id,
      projectId: "", //查询详情的Id
      checkStatus: "", //审核的状态 2代表审核不通过
      infomation: "", //审核不通过的原因
      check_status: false, //审核状态不通过的信息的现实和隐藏
      auditStatus: 0, //判断添加还是修改 2代表审核不通过的修改提交
      helpCheckedArr: [],
      recipientsDTOS: [],
      icon: {
        active: require("@/assets/helpProgram/selected_circle.png"),
        normal: require("@/assets/helpProgram/no_selected_circle.png")
      },
      data: {
        recipientsIds: [],
        recipientsDTOS: [], //受助人信息
        projectPhoto: "", //项目图
        title: "广州益带路网络科技有限公司", //项目标题
        introduce:
          "中国扶贫基金会成立于1989年3月，是以扶贫济困为宗旨的公益机构。20年来，中国扶贫基金会坚持扶贫公益理念，贯彻对捐赠人和受援人高度负责的原则，奉行公开透明的方针，提倡艰苦奋斗的志愿精神，以严密的内部管理和优异的业绩，获得了党和国家领导人以及社会各界高度评价，取得显著成绩并得到迅速发展，社会知名度不断提高，良好的社会形象得到公众的广泛认同，现在已经成长为我国扶贫公益领域最大的公益组织。", //项目介绍,
        organId: "" //机构Id
      }
    };
  },
  mixins: [recipoentsUpload],
  mounted() {
    // 不知道代码的意思
    // if (this.$route.query.active == 2) {
    //   this.active = 2;
    // }

    this.init(this.active);
    // 修改审核不通过的信息
    let projectId = this.$route.query.projectId; //审核不通过的项目Id
    let checkStatus = this.$route.query.status; //审核不通过的状态 2代表审核不通过
    this.checkStatus = checkStatus;

    // 修改受助人信息之后回到页面在重新取出受助人信息系（8.5禁止代码）
    // if (this.$store.state.check_status == 2) {
    //   this.active = 2;
    //   Storage.remove("dataHelp");
    // }

    // 从修改进来先获取
    if (checkStatus == 2) {
      this.myLaunchDetails(projectId);
      this.NorecipientsList(projectId);
      this.projectState = true;
      this.check_status = true;
      Storage.remove("dataHelp"); //清除localStorage缓存信息
    } else {
      this.recipientsList();
    }

    this.institutionalList(); //调取机构的信息接口

    // localStorage存储的受助人信息
    let dataHelp = Storage.get("dataHelp");
    if (dataHelp) {
      this.data = dataHelp;
      this.checkedArr = [dataHelp.organId];
      if (dataHelp.projectPhoto === "") {
        this.projectState = false;
      } else {
        this.projectState = true;
      }
    }
  },
  computed: {
    // 检测转态是否是审核不通过！2代表审核不同过的状态
    check_state() {
      return this.$store.state.check_status;
    }
  },

  activated() {
    let projectId = this.$route.query.projectId; //审核不通过的项目Id

    // 正常添加
    if (projectId == undefined) {
      this.recipientsList();
      this.institutionalList(); //机构信息
    } else {
      // 审核不通过
      this.NorecipientsList(projectId);
    }
    // 添加受助人！获取受助人列表对应的索引
    if (this.$route.query.active == 2) {
      this.active = 2;
      this.init(2);
    }
    // this.institutionalList(); //机构信息
  },

  methods: {
    // 1获取受助人列表(正常添加团体项目)
    async recipientsList() {
      let res = await service.recipientsList();
      if (res.code === 200) {
        this.recipientsDTOS = res.data;
        if (res.data == null) {
          this.helpCheckedArr = [];
        } else {
          res.data.forEach(item => {
            this.helpCheckedArr.push(item.recipientsId);
          });
        }
      }
    },

    // 获取审核不通过的受助人信息
    async NorecipientsList(projectId) {
      let res = await service.NorecipientsList(projectId);
      if (res.code === 200) {
        this.recipientsDTOS = res.data;
        if (res.data == null) {
          this.helpCheckedArr = [];
        } else {
          res.data.forEach(item => {
            this.helpCheckedArr.push(item.recipientsId);
          });
        }
      }
    },
    // 审核不通过的信息
    async myLaunchDetails(projectId) {
      let res = await service.myLaunchDetails(projectId);
      if (res.code === 200) {
        this.instituList = res.data.organBaseInfoVOS; //获取机构信息
        this.data = res.data;
        this.infomation = res.data.auditDesc; //获取审核不同的原因
        this.auditStatus = res.data.auditStatus; //审核不通过的状态值
        this.checkedArr = [...res.data.organIds]; //默认选中的
        this.$store.commit("check_info", {
          data: res.data, //数据传递
          check_state: res.data.auditStatus //检测是否是审核通过的转态值
        });
      }
    },

    // 返回帮扶列表
    back_btn() {
      // this.$router.history.current.meta.keepAlive = false;
      this.$router.replace({ path: "/helpProgram" });
    },
    // 返回我的发起
    back_launch() {
      // this.$router.history.current.meta.keepAlive = false;
      this.$router.replace({ path: "/personalCenter/myLaunch" });
      this.active = 0;
    },

    //下一步
    nextStep() {
      if (this.checkStatus === "2" || this.$store.state.check_status == 2) {
        Storage.remove("dataHelp");
      } else {
        Storage.set("dataHelp", this.data);
      }
      if (this.active === 0) {
        if (this.checkedArr.length === 0) {
          this.$toast("请添加和选择机构信息");
          return false;
        }
      }
      if (this.active === 1) {
        if (this.data.title === "") {
          this.$toast("项目标题不能为空");
          return false;
        }
        if (this.data.introduce === "") {
          this.$toast("项目介绍不能为空");
          return false;
        }
        if (this.data.projectPhoto === "") {
          this.$toast("项目图不能为空");
          return false;
        }
      }
      if (this.active === 2) {
        if (this.data.recipientsDTOS.length === 0) {
          this.$toast("请添加受助人");
          return false;
        }
      }
      this.active = this.active += 1;
      this.active = this.active >= 4 ? 0 : this.active;

      this.step(this.active);
      let index = this.active;
      var odiv = document
        .getElementById("content")
        .getElementsByClassName("first");
      for (var i = 0; i < odiv.length; i++) {
        odiv[i].style.display = "none";
      }
      odiv[index].style.display = "block";
    },

    // 修改受助人信信息
    RecipientsListInfo(index, item, recipientsId) {
      // this.$store.commit("updataRecipients", {
      //   item: item,
      //   index: index
      // });
      let projectId = this.$route.query.projectId;
      let status = this.$route.query.status;
      this.$router.push({
        path: "/helpProgram/groupResets/RecipientsInfo",
        query: {
          recipientsId: recipientsId,
          projectId: projectId,
          status: status
        }
      });
    },

    // 添加受助
    addClick() {
      // this.$store.commit("updataRecipients", {
      //   index: -1
      // });
      let projectId = this.$route.query.projectId;
      let status = this.$route.query.status;
      this.$router.push({
        path: "/helpProgram/groupResets/RecipientsInfo",
        query: {
          // recipientsId: recipientsId,
          projectId: projectId,
          status: status
        }
      });
    },

    // 上一步
    upStep() {
      this.active--;
      let index = this.active;
      if (index <= 0) {
        this.active = 0;
      }
      this.step(this.active);
    },

    // 选择机构信息
    select_status(organId, index) {
      this.data.organId = organId;
      this.checkedArr.push(organId);
      if (this.checkedArr.length === 1) {
      } else {
        this.checkedArr.splice(0, 1);
      }
    },

    // 获取机构列表
    async institutionalList() {
      let res = await service.institutionalList();
      if (res.code === 200) {
        this.instituList = res.data;
        this.checkedArr = [res.data[0].organId];
      }
    },
    // 点击去添加机构信息
    addInstitutional(projectId, auditStatus) {
      this.$router.push({
        path: "/helpProgram/groupResets/addInstitutional",
        query: { projectId, auditStatus }
      });
    },

    // 判断三个按钮的显示和隐藏
    async step(index) {
      switch (this.active) {
        case 0:
          this.nextStepStatus = true;
          this.upStepStatus = false;
          this.confirmStatus = false;
          break;
        case 1:
          this.upStepStatus = true;
          this.nextStepStatus = true;
          this.confirmStatus = false;
          break;
        case 2:
          this.upStepStatus = true;
          this.nextStepStatus = false;
          this.confirmStatus = true;
          break;
        case 3:
          this.upStepStatus = false;
          this.nextStepStatus = false;
          this.confirmStatus = false;
          break;
        default:
          this.confirmStatus = false;
          this.upStepStatus = false;
          this.nextStepStatus = false;
      }
      var odiv = document
        .getElementById("content")
        .getElementsByClassName("first");
      for (var i = 0; i < odiv.length; i++) {
        odiv[i].style.display = "none";
      }
      odiv[index].style.display = "block";
    },

    // 确定按钮提交
    confirmStep() {
      this.confirmData();
    },
    async confirmData() {
      if (this.helpCheckedArr.length === 0) {
        this.$dialog.alert({ message: "请上传或添加受助人" });
        return false;
      }
      this.data.organId = this.checkedArr[0];
      this.data.recipientsIds = this.helpCheckedArr;
      if (this.checkStatus == 2) {
        var res = await service.updataApply(this.data); //审核不通过 修改提交
      } else {
        var res = await service.groupApply(this.data); //正常提交团体帮扶项目
      }
      if (res.code === 200) {
        this.$dialog
          .alert({
            message: "提交成功",
            confirmButtonColor: "#40d0b3"
          })
          .then(res => {
            Storage.remove("dataHelp");
            this.active = 3;
            this.step(this.active);
          });
      } else {
        this.$dialog.alert({
          message: res.message,
          confirmButtonColor: "#40d0b3"
        });
      }
    },
    // 上传项目图

    // 初始化信息
    init(index) {
      console.log(index);
      this.$nextTick(() => {
        setTimeout(() => {
          var odiv = document
            .getElementById("content")
            .getElementsByClassName("first");
          this.active = this.$store.state.active;
          if (this.active == 2 || index == 2) {
            this.upStepStatus = true; //判断是否存在在上一步的按钮
            this.nextStepStatus = false; //判断是否存在在下一步的按钮
            this.confirmStatus = true; //判断是否存在确定的按钮
            this.active = 2;
          }
          odiv[index].style.display = "block";
        }, 100);
      });
    }
  }
};
</script>

<style  lang="less" scoped>
.content {
  .van-steps {
    margin: 0.2rem 0rem;
  }
  > div {
    display: none;
    background: #fff;
    margin: 0.2rem 0rem;
    &:nth-of-type(1),
    &:nth-of-type(2) {
      .infoTop {
        > div {
          border-bottom: 1px solid #f7f7f7;
          color: #2e2e2e;
          > .van-field {
            font-size: 0.4rem;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            padding: 0.5rem 0.35rem;
          }
        }
        .upload {
          border-bottom: 1px solid #f7f7f7;
          font-size: 0.5rem;
          padding: 15px;
          h2 {
            font-size: 0.4rem;
          }
          .van-uploader {
            padding: 1rem 1.5rem;
            border: 1px solid #ccc;
            margin: 0.4rem 0rem 0.2rem;
            border-radius: 10px;
          }
          p {
            font-size: 0.25rem;
            color: #999;
          }
        }
      }
      .infoBot {
        > div {
          border-bottom: 1px solid #f7f7f7;
          > .van-field {
            font-size: 0.4rem;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            padding: 0.5rem 0.35rem;
          }
        }
      }
    }
    &:nth-of-type(3) {
      width: 100vw;
      ul {
        width: 100vw;
        border-bottom: 0.2rem solid #f9f9f9;
        li {
          display: flex;
          align-items: center;
          padding: 0.45rem 0.25rem;
          border-bottom: 1px solid #f9f9f9;
          > img {
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 100%;
            margin-right: 0.35rem;
          }
          div {
            flex: 1;
            span {
              color: #666;
              margin: 0 0.2rem;
              font-size: 0.36rem;
              &:nth-of-type(1) {
                font-size: 0.45rem;
                color: #2e2e2e;
              }
            }
          }
          i {
            font-size: 0.45rem;
            color: #999;
          }
        }
      }
    }
  }
}

.instroce {
  display: flex;
  align-items: center;
  padding: 0.45rem;
  color: #40d0b3;
  i {
    font-size: 0.45rem;
    color: #40d0b3;
  }
  span {
    font-size: 0.4rem;
    margin-left: 0.3rem;
  }
}

.btn_next {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0rem auto;
  padding: 1rem 0rem;
  > div {
    flex: 1;
    margin: 0rem 0.4rem;
    text-align: center;
    background: #40d0b3;
    padding: 0.3rem 0rem;
    border-radius: 1rem;
    color: #fff;
    font-size: 0.45rem;
    font-weight: 600;
  }
}

.fixed_btn {
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 0.4rem 0rem;
  background: #fff;
}

.InstitutionalInfo {
  ul {
    border-bottom: 0.35rem solid #f9f9f9;
    li {
      border-bottom: 1px solid #f9f9f9;
      width: 100vw;
      > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.45rem;
        > div {
          flex: 1;
          margin: 0 0.3rem;
          > p {
            &:nth-of-type(1) {
              font-size: 0.45rem;
              color: #333;
            }
            &:nth-of-type(2) {
              font-size: 0.36rem;
              color: #666;
              margin-top: 0.3rem;
              span {
                display: block;
                &:nth-of-type(2) {
                  margin-top: 0.3rem;
                }
              }
            }
          }
        }
        > p {
          font-size: 0.38rem;
          color: #999;
        }
      }
    }
  }
}

.finish {
  background: #fff !important;
  > div {
    padding: 25vh 0;
    > p {
      width: 100%;
      text-align: center;
      font-size: 0.5rem;
      padding-top: 3vh;
      &:nth-of-type(2) {
        padding-top: 2vh;
      }
    }
  }
  > p {
    padding: 0 0 20vh;
    display: flex;
    span {
      flex: 1;
      text-align: center;
      font-size: 0.45rem;
      color: #40d0b3;
      &:nth-of-type(1) {
        border-right: 1px solid #40d0b3;
      }
    }
  }
}
</style>
