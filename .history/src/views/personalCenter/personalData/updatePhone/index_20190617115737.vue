<template>
  <div class="updatePhone">
    <div>
      <label for="phone">
        <div>
          <img src="@/assets/personalCenter/phone.png" alt>
        </div>
        <input type="number" v-model="phone" id="phone" placeholder="请输入手机号码">
        <!-- <span @click="getCode">获取验证码</span> -->
        <span class="register-msg-btn" v-show="show" v-on:click="getCode">获取验证码</span>
        <span class="register-msg-btn" v-show="!show">{{count}} s</span>
      </label>
      <label for="sms">
        <div>
          <img src="@/assets/personalCenter/sms.png" alt>
        </div>
        <input type="number" v-model="sms" id="sms" placeholder="请输入验证码">
      </label>
    </div>
    <button @click="sWitch">提交</button>
  </div>
</template>

<script>
import service from "@/api";
export default {
  data() {
    return {
      phone: "",
      sms: "",
      show: true,
      count: "",
      timer: null
    };
  },
  methods: {
    getCode() {
      if (this.show) {
        this.getcode();
      }
      this.show = false;
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    sWitch() {
      this.switchPhone();
    },
    async getcode() {
      let tele = this.phone;
      let res = await service.getCode({
        tele: tele,
        type: 1
      });
      if (res.code === 200) {
      } else {
        this.$dialog({
          message: res.message,
          confirmButtonColor: "#40D0B3",
          confirmButtonText: "确定"
        });
        this.show = true;
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    async switchPhone() {
      let tele = this.phone;
      let code = this.sms;
      let res = await service.switchPhone({
        code: code,
        tele: tele
      });
      console.log(res);
      if (res.code === 200) {
        this.$router.replace({ path: "/personalCenter/personalData" });
      } else {
        this.$dialog({
          message: res.message,
          confirmButtonColor: "#40D0B3",
          confirmButtonText: "确定"
        }).then(() => {
          this.$router.replace({ path: "/personalCenter/personalData" });
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.updatePhone {
  > div {
    background: #fff;
    > label {
      display: flex;
      height: 2rem;
      border-bottom: 1px solid #f9f9f9;
      div {
        height: 2rem;
        width: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 0.6rem;
          height: 0.8rem;
        }
      }
      input {
        flex: 1;
        outline: none;
        border: none;
      }
      span {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 0.4rem;
        font-size: 0.38rem;
        color: #40d0b3;
      }
    }
  }
  button {
    display: flex;
    justify-content: center;
    width: 95vw;
    outline: none;
    border: none;
    background: #40d0b3;
    text-align: center;
    margin: 2rem auto 0rem;
    padding: 0.4rem 0rem;
    color: #fff;
    font-size: 0.38rem;
    border-radius: 2rem;
  }
}

input {
  text-align: left;
  color: #999 !important;
}

input::-webkit-input-placeholder {
  color: #ccc !important;
  font-size: 0.35rem;
  text-align: left;
}

input:-moz-placeholderr {
  color: #ccc !important;
  font-size: 0.35rem;
  text-align: left;
}

input::-moz-placeholder {
  color: #ccc !important;
  font-size: 0.35rem;
  text-align: right;
}

input:-ms-input-placeholder {
  color: #ccc !important;
  font-size: 0.35rem;
  text-align: left;
}
</style>
