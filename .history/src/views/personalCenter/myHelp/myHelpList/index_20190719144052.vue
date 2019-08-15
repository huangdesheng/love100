<template>
  <div>
    <ul class="personHelp commom">
      <li v-for="(item, index) in list" :key="index" @click="check_info(item.recipientsId)">
        <p>
          <span>{{item.name}}</span>
          <span>( {{item.title}} )</span>
          <van-icon name="arrow" />
        </p>
        <p>
          <!-- <span>帮扶成功</span> -->
          <!-- <span v-if="item.status===1">帮扶成功</span> -->
          <span v-if="item.planStatus===2">帮扶中</span>
          <span v-if="item.planStatus===1 || item.planStatus==3">帮扶成功</span>
          <span v-if="item.planStatus===-1">已结束</span>
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
            <p>{{item.msg}}</p>
          </div>
          <!-- <button
            @click="continue_btn(item.helpByOther,item.lackOfNper)"
            v-if="item.planStatus==3"
          >继续助力</button>-->

          <!-- <button
            @click="continue_btn"
            :data-helpByOther="item.helpByOther"
            :data-lackOfNper="item.lackOfNper"
            v-if="item.planStatus==3"
          >继续助力</button>-->

          <button
            @click="continue_btn"
            :data-helpByOther="item.helpByOther"
            :data-lackOfNper="item.lackOfNper"
            :data-recipientsId="item.recipientsId"
            v-if="item.planStatus==3"
          >继续助力</button>
        </div>
      </li>
    </ul>
    <div class="dialogs" v-show="continueHelpStatus">
      <!-- <div class="seciton_dialog" v-if="helpByOther==0">
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
      </div>-->
      <div class="seciton_dialog elseHelp">
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
import service from "@/api";
import continueHelp from "@/components/continueHelp";
export default {
  data() {
    return {
      list: [],
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
    console.log(this.$route.query.planId);
    this.mygroupHelpNumber(this.$route.query.planId);
  },
  methods: {
    check_info(recipientsId) {
      let planId = this.$route.query.planId;
      this.$store.commit("personBillStatus", false);
      this.$router.push({
        path: "/personalCenter/myHelp/personalInfo",
        query: { recipientsId: recipientsId, type: 1, planId: planId }
      });
      this.$store.commit("personBillStatus", {
        billStatus: false,
        type: 1,
        recipientsId: recipientsId
      });
    },

    continue_btn(e) {
      e.stopPropagation();
      this.helpByOther = e.srcElement.dataset.helpbyother;
      if (this.helpByOther === 1) {
        this.continueHelpStatus = true;
      }
      this.lackOfNper = e.srcElement.dataset.lackofnper;
      this.recipientsIds = e.srcElement.dataset.recipientsid;
      this.personalHelpInfo();
    },

    async personalHelpInfo() {
      let res = await service.confirmPay({
        recipientsIds: [this.recipientsIds],
        type: 1,
        projectId: this.$route.query.projectId
      });

      if (res.code === 200) {
        this.$router.push({
          path: "/helpProgram/buyer",
          query: {
            info: res.data.obj,
            typeHelp: 1
          }
        });
      }
    },

    async mygroupHelpNumber(planId) {
      let res = await service.mygroupHelpNumber(planId);
      console.log(res);
      if (res.code === 200) {
        this.list = res.data;
      } else {
        this.$dialog({
          message: res.message
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
    }
  }
};
</script>

<style lang="less" scoped>
.personHelp {
  background: #fff;
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
