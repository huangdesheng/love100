<style>
.van-field__label {
  max-width: 3rem;
  color: #000;
}
p,
i {
  color: #333;
  font-size: 0.4rem;
}
</style>
<template>
  <div class="page-index" style="height:100vh;background:#fff;">
    <div class="recipient_form">
      <van-cell-group>
        <van-field v-model="username" label="姓名:" placeholder="请输入您的姓名" />
        <van-field v-model="IDcardNumber" label="身份证号:" placeholder="请输入您的身份证号" />
        <van-field v-model="phone" type="phone" label="手机号码:" placeholder="请输入您的手机号码" />
        <van-field v-model="sms" center placeholder="请输入短信验证码" class="sms">
          <van-button
            slot="button"
            size="small"
            type="primary"
            @click="sendCode"
            v-show="show"
          >发送验证码</van-button>
          <van-button slot="button" size="small" type="primary" v-show="!show">{{count}} s</van-button>
        </van-field>
      </van-cell-group>
      <div class="IdCard" style="margin-top:0rem">
        <p>上传身份证照片</p>
        <div>
          <div>
            <div>
              <van-uploader name="uploader" :after-read="onRead">
                <div v-if="positivePicState">
                  <img
                    alt
                    v-if="positivePic !=''"
                    :style="{backgroundImage: 'url('+positivePic+')', backgroundSize:'cover'}"
                  />
                  <van-loading type="spinner" color="#1989fa" v-else />
                </div>
                <van-icon name="photograph" v-else />
              </van-uploader>
            </div>
            <p>身份证正面</p>
          </div>
          <div>
            <div>
              <van-uploader name="uploader" :after-read="Read">
                <div v-if="againstPicState">
                  <img
                    alt
                    v-if="againstPic !=''"
                    :style="{backgroundImage: 'url('+againstPic+')', backgroundSize:'cover'}"
                  />
                  <van-loading type="spinner" color="#1989fa" v-else />
                </div>
                <van-icon name="photograph" v-else />
              </van-uploader>
            </div>
            <p>身份证反面</p>
          </div>
        </div>
      </div>
    </div>
    <div class="recipient_footer">
      <van-button type="primary" @click="confirm">确认</van-button>
    </div>
  </div>
</template>

<script>
import service from "@/api";
import qs from "qs";
import { idCard, isPhone, realName } from "@/utils/validator";
import uploadImg from "@/mixins/uploadImg";
export default {
  data() {
    return {
      username: "",
      IDcardNumber: "",
      positivePic: "",
      againstPic: "",
      IdCard: [],
      recipientsId: 0,
      phone: "",
      sms: "",
      timer: null,
      show: true,
      count: ""
    };
  },
  mixins: [uploadImg],
  methods: {
    confirm() {
      this.testIdCard();
    },

    async testIdCard() {
      if (!idCard(this.IDcardNumber)) {
        this.$toast("请填写正确的身份证号码");
        return false;
      }
      if (!isPhone(this.phone)) {
        this.$toast("请填写正确的手机号码");
        return false;
      }
      if (this.sms.strm() === "") {
        this.$toast("请输入验证码");
        return false;
      }

      // let res = await service.verification({
      //   cardId: this.IDcardNumber,
      //   name: this.username
      // });
      // if (res.code === 200) {
      //   this.RealName();
      // } else {
      //   this.$dialog({
      //     message: res.message
      //   });
      // }

      this.RealName();
    },

    async RealName() {
      let res = await service.RealName({
        cardId: this.IDcardNumber,
        name: this.username,
        photoBack: this.againstPic,
        photoFront: this.positivePic,
        tele: this.phone,
        code: this.sms
      });
      if (res.code === 200) {
        this.$dialog
          .alert({
            message: res.message
          })
          .then(() => {
            if (this.$route.query.status == 1) {
              this.$router.push({ path: "/helpProgram/groupResets" });
            } else if (this.$route.query.status == 2) {
              this.$router.push({ path: "/helpProgram/personalApplication" });
            } else if (this.$route.query.status == 3) {
              this.$router.push({ path: "/personalCenter/personalData" });
            }
          });
      } else {
        this.$dialog.alert({
          message: res.message
        });
      }
    },

    // 验证码获取
    sendCode() {
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
    async getcode() {
      let tele = this.phone;
      let res = await service.getCode({
        tele: tele,
        type: 3
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
    }
  }
};
</script>

<style lang="less" scoped>
.recipient_form {
  // margin-top: 0.3rem;
  > p {
    display: flex;
    justify-content: space-between;
    padding: 0.6rem 0.3rem;
    background: #fff;
    span {
      color: #000;
      &:nth-of-type(1) {
        flex: 1;
      }
      &:nth-of-type(2) {
        color: #666;
        margin-right: 0.4rem;
      }
    }
    i {
      color: #666;
    }
  }
  .van-field {
    padding: 0.6rem 0.35rem;
    font-size: 0.38rem;
  }
}
.recipient_footer {
  margin-top: 5vh;
  display: flex;
  justify-content: center;
  .van-button--primary {
    border-radius: 1rem;
    width: 9rem;
    height: 1.2rem;
    line-height: 1.2rem;
    background: #40d0ad;
    border: none;
    outline: 0;
    font-size: 0.38rem;
  }
}
</style>
