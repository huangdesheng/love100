<style>
</style>
<template>
  <div>
    <aside class="tip" v-if="info.state==2">{{info.auditDescribe}}</aside>
    <header>
      <div>
        <p>受助人：{{info.name}}</p>
        <p>身份证：{{info.cardId}}</p>
        <p>受助类型:{{info.title}}</p>
      </div>
    </header>
    <section>
      <aside class="IdCard">
        <h2>证明材料</h2>
        <p style="padding:0.45rem;color:#999;font-size:0.38rem">请上传受助人准考证和录取通知书照片。</p>
        <div>
          <div>
            <div>
              <van-uploader name="uploader" :after-read="onReadTicketPic">
                <div v-if="ticketPicState">
                  <img alt v-if="ticketPic !=''" :style="{backgroundImage: 'url('+ticketPic+')'}" />
                  <van-loading type="spinner" color="#1989fa" v-else />
                </div>
                <van-icon name="photograph" v-else />
              </van-uploader>
            </div>
            <p>受助人准考证</p>
          </div>
          <div>
            <div>
              <van-uploader name="uploader" :after-read="onReadAmission">
                <div v-if="admissionPicState">
                  <img
                    alt
                    v-if="admissionPic !=''"
                    :style="{backgroundImage: 'url('+admissionPic+')'}"
                  />
                  <van-loading type="spinner" color="#1989fa" v-else />
                </div>
                <van-icon name="photograph" v-else />
              </van-uploader>
            </div>
            <p>受助人录取通知书</p>
          </div>
        </div>
      </aside>
      <div class="infoBot">
        <div>
          <van-field
            v-model="info.bankAccount"
            label="受助人收款账号："
            :placeholder="bankHolder"
            @focus="focusBank"
            @blur="bankCodeVerifications"
          />
        </div>
        <div>
          <van-field
            v-model="info.bankTele"
            label="银行预留手机号："
            placeholder="请输入手机号"
            pattern="[0-11]*"
            @blur="bankCodeVerifications"
          />
        </div>
        <van-field v-model="info.verification" center placeholder="请输入短信验证码" id="sms">
          <van-button slot="button" size="small" type="primary" @click="getCode" v-show="show">获取验证码</van-button>
          <van-button slot="button" size="small" type="primary" v-show="!show">{{count}} s</van-button>
        </van-field>

        <div>
          <van-field v-model="info.bankName" label="开户行名称：" placeholder />
        </div>

        <van-cell-group class="helperNumber">
          <van-field v-model="info.tele" label="受助人手机号码：" placeholder="请输入用户名" pattern="[0-11]*" />
        </van-cell-group>
      </div>
    </section>
    <footer>
      <div @click="apply_btn">立即申请</div>
    </footer>
  </div>
</template>

<script>
import uploadImg from "@/mixins/uploadImg";
import blurs from "@/mixins/blur";
import service from "@/api";
import { isPhone } from "@/utils/validator";
export default {
  data() {
    return {
      item: {
        urls: [],
        bankAccount: "6217003810083356892", //受助人银行账号
        bankName: "", //受助人开户行
        bankTele: "18502821864", //开户行手机号码
        type: "", //类型 1-互助 2-个人帮扶 3团体帮扶 ,
        verification: "",
        tele: "13411062173"
      },
      ticketPic: "", //受助人准考证
      admissionPic: "", //受助人录取通知书
      info: {},
      show: true,
      count: "",
      timer: null,
      bankHolder: "开户账号信息与受助人保持一致"
    };
  },
  mixins: [uploadImg, blurs],
  mounted() {
    let applyId = this.$route.query.applyId;
    let type = this.$route.query.type;
    let state = this.$route.query.state;
    if (state == -1) {
      // 申请奖励金
      this.ApplicationMutalQuery(applyId, type);
    } else if (state == 2) {
      // 修改
      this.ticketPicState = true;
      this.admissionPicState = true;
      this.AuditInformationUpdate(applyId, type);
    }
  },
  methods: {
    // 获取编辑时受助人信心
    async AuditInformationUpdate(applyId, type) {
      let res = await service.AuditInformationUpdate(applyId);
      if (res.code === 200) {
        this.info = res.data;
        this.ticketPic = res.data.urls[0]; //受助人准考证
        this.admissionPic = res.data.urls[1]; //受助人录取通知书
      }
    },
    getCode() {
      if (!isPhone(this.info.bankTele)) {
        this.$dialog.alert({
          message: "输入正确的手机号"
        });
        return false;
      }
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
      let tele = this.info.bankTele;
      let res = await service.getCode({
        tele: tele,
        type: 2
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
    apply_btn() {
      if (this.ticketPic != "" && this.admissionPic != "") {
        this.info.urls = [this.ticketPic, this.admissionPic];
      } else {
        this.$dialog.alert({
          message: "您还未上传证明材料照片",
          confirmButtonColor: "#40d0b3"
        });
      }
      this.info.type = this.$route.query.type;
      this.info.recipientsIds = this.$route.query.recipientsId;
      let info = this.info;
      this.submitApply(info);
    },

    // 查询受助人信息
    async ApplicationMutalQuery(applyId, type) {
      let res = await service.ApplicationMutalQuery(applyId);
      if (res.code === 200) {
        let info = Object.assign({}, this.item, res.data);
        this.info = info;
      }
    },

    // 立即申请
    async submitApply(params) {
      let res = await service.submitApply(params);
      console.log(res);
      if (res.code === 200) {
        this.$dialog
          .alert({
            message: "申请资料提交成功 等待资料审核。",
            confirmButtonColor: "#40d0b3"
          })
          .then(() => {
            this.$router.replace({ path: "/personalCenter/applyReward" });
          });
      } else {
        this.$dialog.alert({
          message: res.message,
          confirmButtonColor: "#40d0b3"
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
header {
  width: 100vw;
  > div {
    width: 90%;
    margin: 0.3rem auto;
    background: #fff;
    border-radius: 0.2rem;
    padding-bottom: 0.35rem;
    p {
      padding: 0.35rem 0.35rem 0;
      font-size: 0.38rem;
      color: #666;
    }
  }
}
.IdCard {
  h2 {
    padding: 0.35rem 0.4rem 0rem;
    font-size: 0.5rem;
    color: #666;
  }
  margin-bottom: 0.35rem;
  border-top: 0;
}

.infoBot {
  > div {
    border-bottom: 1px solid #f7f7f7;
    &:last-of-type {
      border: none;
    }
    > .van-field {
      font-size: 0.4rem;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      padding: 0.5rem 0.35rem;
    }
  }
}
.van-field {
  padding: 0.5rem 0.35rem;
  .van-button--small {
    padding: 0 8px;
    height: 1rem;
    font-size: 12px;
    line-height: 1rem;
    background: #fff;
    color: #40d0b3;
    border: none;
    font-size: 0.38rem;
  }
}

footer {
  margin: 1.5rem 0rem;
  div {
    width: 90vw;
    padding: 0.4rem 0;
    border-radius: 1rem;
    background: #40d0b3;
    margin: 0 auto;
    text-align: center;
    font-size: 0.4rem;
    color: #fff;
  }
}

.helperNumber {
  margin-top: 0.2rem;
}
</style>
