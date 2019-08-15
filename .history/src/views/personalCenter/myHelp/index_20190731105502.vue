<style>
</style>

<template>
  <div>
    <div class="page-assistanceMutal">
      <van-tabs sticky @click="changeHelp">
        <van-tab title="团体">
          <ul class="groupHelp">
            <router-link
              v-for="(item,index) in myLaunchGroupList"
              :key="index"
              :to="{path:'/personalCenter/myHelp/myHelpList',query:{planId:item.planId,projectId:item.projectId}}"
              tag="li"
            >
              <!-- <img :src="item.projectPhoto" alt /> -->
              <span
                class="img"
                :style="{backgroundImage: 'url(' + item.projectPhoto + ')', backgroundSize:'cover'}"
              ></span>
              <div>
                <p>{{item.title}}</p>
                <p>帮扶人数：{{item.recipientsCount}}人</p>
              </div>
            </router-link>
          </ul>
        </van-tab>
        <van-tab title="个人">
          <ul class="personHelp">
            <li
              v-for="(item,index) in myLaunchPersonList"
              :key="index"
              @click="check_info(item.recipientsId,item.planId)"
            >
              <p>
                <span>{{item.name}}</span>
                <span>（全国重点大学教育奖励计划）</span>
                <van-icon name="arrow" />
              </p>
              <p>
                <span v-if="item.helpStatus==2">帮扶中</span>
                <span v-if="item.helpStatus===1 || item.helpStatus==3">帮扶成功</span>
              </p>
              <div>
                <div>
                  <p>
                    <van-rate
                      v-model="item.loveValue"
                      :count="item.totalPeriods"
                      icon="like"
                      void-icon="like-o"
                      :size="20"
                      color="red"
                      void-color="red"
                      readonly
                    />
                  </p>
                  <p>利益保障中，祝您一切顺利！</p>
                </div>
                <button
                  @click="continue_btn"
                  :data-helpByOther="item.helpByOther"
                  :data-lackOfNper="item.lackOfNper"
                  :data-recipientsId="item.recipientsId"
                  v-if="item.helpStatus===3"
                >继续助力</button>
              </div>
            </li>
          </ul>
        </van-tab>
      </van-tabs>
    </div>
    <continueHelp></continueHelp>
    <aside class="noData" id="noData" v-show="noDataStatus">
      <div>
        <img
          src="http://love100.qxiao.net:8888/group1/M00/00/02/rBFAEl0S31qAZ1jZAAFcYjSkvlI319.png"
          alt
          width="50%"
        />
        <p>您还没有帮扶记录</p>
        <router-link :to="{path:'/helpProgram'}" tag="button">我要去帮扶他们</router-link>
      </div>
    </aside>

    <div class="dialogs" v-show="continueHelpStatus">
      <div class="seciton_dialog" v-if="helpByOther==0">
        <van-icon name="cross" @click="dialogCancel" />
        <p>因您中途暂停助学计划</p>
        <p>为了您能够获得更多助学奖励金</p>
        <p>特地为您提供延续机会！</p>
        <div>
          <p>
            <van-checkbox
              v-model="checkedNum1"
              icon-size="60"
              checked-color="#07c160"
              :value="valueNum1"
            ></van-checkbox>
            <van-rate
              v-model="valueNum1"
              :count="1"
              icon="like"
              void-icon="like-o"
              :size="20"
              color="red"
              void-color="red"
              readonly
            />
          </p>
          <p v-if="lackOfNper>=2">
            <van-checkbox v-model="checkedNum2" checked-color="#07c160" :value="valueNum2"></van-checkbox>
            <van-rate
              v-model="valueNum2"
              :count="2"
              icon="like"
              void-icon="like-o"
              :size="20"
              color="red"
              void-color="red"
              readonly
            />
          </p>
        </div>
        <button @click="btn_confirmPay">确认</button>
      </div>
      <div class="seciton_dialog elseHelp" v-if="helpByOther==1">
        <van-icon name="cross" @click="dialogCancel" />
        <p>该受助正在被其他爱心人士帮扶中</p>
        <p>感谢您的爱心付出</p>
        <p>祝您生活愉快</p>
        <button @click="else_help">去帮扶其他人</button>
      </div>
    </div>
  </div>
</template>

<script>
import continueHelp from "@/components/continueHelp";
import service from "@/api";
export default {
  data() {
    return {
      value: 0,
      showstatus: false,
      myLaunchGroupList: [],
      myLaunchPersonList: [],
      noDataStatus: false,
      continueHelpStatus: false,
      helpByOther: "",
      valueNum1: 1,
      valueNum2: 2,
      checkedNum1: false,
      checkedNum2: false,
      lackOfNper: "",
      recipientsIds: ""
    };
  },
  components: {
    continueHelp
  },
  mounted() {
    this.mygroupHelp();
    this.$store.commit("continueHelp", {
      // helpByOther: helpByOther,
      continueHelpStatus: false
      // lackOfNper: lackOfNper
    });
  },

  activated() {
    console.log(this.value);
    this.value === 1 ? this.myPersonHelp() : this.mygroupHelp();
    if (this.value === 0) {
      this.mygroupHelp();
    } else if (this.value === 1) {
      this.myPersonHelp();
    }
  },
  methods: {
    // 我的帮扶列表
    async mygroupHelp() {
      let res = await service.mygroupHelp();
      console.log(res);
      if (res.code === 200) {
        this.myLaunchGroupList = res.data.list;
        this.noDataStatus = false;
      } else if (res.code === 904) {
        this.myLaunchGroupList = [];
        this.noDataStatus = true;
        document.getElementById("noData").style.zIndex = 0;
      } else {
        this.$dialog({
          message: res.message
        });
      }
    },

    async myPersonHelp() {
      let res = await service.myPersonHelp();
      console.log(res);
      if (res.code === 200) {
        this.myLaunchPersonList = res.data.list;
        this.noDataStatus = false;
      } else if (res.code === 904) {
        this.myLaunchPersonList = [];
        this.noDataStatus = true;
        document.getElementById("noData").style.zIndex = 0;
      } else {
        this.$dialog({
          message: res.message
        });
      }
    },

    changeHelp(index) {
      this.value = index;
      if (index == 0) {
        if (this.myLaunchGroupList.length === 0) {
          this.mygroupHelp();
        } else {
          this.noDataStatus = false;
        }
      } else if (index == 1) {
        if (this.myLaunchPersonList.length === 0) {
          this.myPersonHelp();
        } else {
          this.noDataStatus = false;
        }
      } else {
        this.$dialog({
          message: res.message
        });
      }
    },
    // 继续帮扶按钮
    continue_btn(e) {
      // console.log(e);
      e.stopPropagation();

      if (this.helpByOther === 1) {
        this.continueHelpStatus = true;
      }
      this.helpByOther = e.srcElement.dataset.helpbyother;
      this.lackOfNper = e.srcElement.dataset.lackofnper;
      this.recipientsIds = e.srcElement.dataset.recipientsid;
      this.personalHelpInfo();
      // this.$store.commit("continueHelp", {
      //   helpByOther: helpByOther,
      //   continueHelpStatus: true,
      //   lackOfNper: lackOfNper
      // });
    },

    btn_confirmPay() {
      this.personalHelpInfo();
    },

    async personalHelpInfo() {
      // console.log(123456);

      let res = await service.confirmPay({
        recipientsIds: [this.recipientsIds],
        type: 0
      });

      if (res.code === 200) {
        this.$router.push({
          path: "/helpProgram/buyer",
          query: {
            info: res.data.obj,
            typeHelp: 0
          }
        });
      }
    },

    else_help() {
      this.$router.replace({
        path: "/helpProgram"
      });
    },

    dialogCancel() {
      this.continueHelpStatus = false;
    },
    //查看帮扶信息
    check_info(recipientsId, planId) {
      console.log(planId);
      this.$router.push({
        path: "/personalCenter/myHelp/personalInfo",
        query: { recipientsId: recipientsId, type: 0, planId: planId }
      });
    },
    dialog() {
      this.showstatus = false;
    },
    btn_confirm() {
      this.showstatus = false;
    }
  }
};
</script>

<style lang="less" scoped>
.page-assistanceMutal {
  background: #fff;
  // padding-top: 0.2rem;
  .groupHelp {
    li {
      display: flex;
      padding: 0.3rem 0rem;
      align-items: center;
      border-bottom: 1px solid #f9f9f9;
      &:nth-last-child {
        border: none;
      }
      .img {
        margin: 0 0.3rem;
        height: 2.5rem;
        width: 2.5rem;
        background-position: center center;
        background-repeat: no-repeat;
        border: 1px solid #f7f7f7;
        border-radius: 0.1rem;
      }
      div {
        flex: 1;
        p {
          font-size: 0.4rem;
          color: #333;
          &:nth-of-type(2) {
            font-size: 0.38rem;
            color: #999;
            margin-top: 0.8rem;
          }
        }
      }
    }
  }
  .personHelp {
    li {
      width: 100%;
      padding: 0.6rem 0.3rem 0.3rem;
      border-bottom: 1px solid #f9f9f9;
      p {
        &:nth-of-type(1) {
          font-size: 0.45rem;
          color: #333;
          display: flex;
          align-items: center;
          font-weight: 600;
          span {
            &:nth-of-type(2) {
              color: #999999;
              margin-left: 0.45rem;
              flex: 1;
              font-size: 0.4rem;
              font-weight: 500;
            }
          }
          i {
            color: #ccc;
            font-size: 0.5rem;
          }
        }
        &:nth-of-type(2) {
          margin: 0.3rem 0rem;
          font-size: 0.35rem;
          color: #40d0b3;
          span {
            &:nth-of-type(2) {
              margin-left: 0.45rem;
            }
          }
        }
      }
      > div {
        display: flex;
        margin-top: 0.6rem;
        align-items: center;
        > div {
          flex: 1;
          p {
            &:nth-of-type(2) {
              font-size: 0.36rem;
              color: #999;
            }
          }
        }
        button {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 0.8rem;
          outline: none;
          border: 1px solid rgba(64, 208, 179, 1);
          border-radius: 10px;
          padding-bottom: 0.2rem;
          line-height: 0.8rem;
          padding: 0 0.45rem;
          color: #40d0b3;
          font-size: 0.38rem;
          background: transparent;
        }
      }
    }
  }
}

.dialogs {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  .seciton_dialog {
    padding: 0.4rem 0;
    background: #fff;
    width: 90%;
    > .van-icon {
      display: flex;
      padding: 0 0.35rem;
      justify-content: flex-end;
      font-size: 0.6rem;
      color: #999;
    }
    > p {
      text-align: center;
      padding: 0.1rem 0rem;
      font-size: 0.38rem;
      color: #666;
      &:nth-of-type(1) {
        margin-top: 0.6rem;
      }
    }
    > div {
      display: flex;
      justify-content: center;
      margin: 0.8rem 0rem;
      p {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        .van-checkbox {
          margin-right: 0.2rem;
        }
      }
    }
    button {
      width: 90%;
      background: #40d0b3;
      margin-left: 5%;
      padding: 0.4rem;
      border-radius: 1rem;
      font-size: 0.4rem;
      color: #fff;
    }
  }
  .elseHelp {
    > p {
      text-align: center;
      padding: 0.1rem 0rem;
      font-size: 0.38rem;
      color: #333;
      font-weight: 600;
    }
    > button {
      padding: 0.4rem;
      border-radius: 0.2rem;
      margin-top: 0.8rem;
      margin-bottom: 0.4rem;
    }
  }
}
</style>