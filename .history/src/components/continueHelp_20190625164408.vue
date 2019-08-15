<template>
  <div>
    <div class="dialogs" v-show="continueHelpStatus">
      <div class="seciton_dialog" v-if="helpByOther==0">
        <van-icon name="cross" @click="dialog"/>
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
        <button @click="btn_confirm">确认</button>
      </div>
      <div class="seciton_dialog elseHelp" v-if="helpByOther==1">
        <van-icon name="cross" @click="dialog"/>
        <p>该受助正在被其他爱心人士帮扶中</p>
        <p>感谢您的爱心付出</p>
        <p>祝您生活愉快</p>
        <button @click="else_help">去帮扶其他人</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 3,
      showstatus: true,
      btn: false,
      valueNum1: 1,
      valueNum2: 2,
      checkedNum1: false,
      checkedNum2: false
    };
  },
  computed: {
    continueHelpStatus() {
      return this.$store.state.continueHelpStatus;
    },
    helpByOther() {
      return this.$store.state.helpByOther;
    },
    lackOfNper() {
      return this.$store.state.lackOfNper;
    }
  },
  mounted() {
    console.log(this.$store.state.continueHelpInfo);
  },
  methods: {
    dialog() {
      console.log(this.helpByOther);
      this.$store.commit("continueHelp", {
        continueHelpStatus: false,
        helpByOther: this.helpByOther
      });
    },
    btn_confirm() {
      this.$dialog.alert({
        message: "支付"
      });
    },
    else_help() {}
  },
  watch: {
    checkedNum1(val) {
      if (val === true) {
        this.checkedNum2 = false;
      }
    },
    checkedNum2(val) {
      if (val === true) {
        this.checkedNum1 = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
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
