<style>
</style>
<template>
  <div>
    <aside class="tip" v-if="info.state==2">{{info.auditDescribe}}</aside>
    <header>
      <van-cell-group>
        <van-cell title="受助人：" value="内容" />
        <van-cell title="受助人身份证：" value="内容" />
        <van-cell title="受助类型：" value="内容" />
        <van-cell title="受助人手机号码：" value="内容" />
      </van-cell-group>
    </header>
    <section>
      <aside class="IdCard">
        <h2>证明材料</h2>
        <!-- <p style="padding:0.45rem;color:#999;font-size:0.38rem">证明材料</p> -->
        <div>
          <div>
            <div class="Pic">
              <div>
                <img alt :style="{backgroundImage: 'url('+ticketPic+')'}" />
              </div>
            </div>
            <p>受助人准考证</p>
          </div>
          <div>
            <div class="Pic">
              <div>
                <img :style="{backgroundImage: 'url('+admissionPic+')'}" />
              </div>
            </div>
            <p>受助人录取通知书</p>
          </div>
        </div>
      </aside>
      <div class="infoBot">
        <van-cell-group>
          <van-cell title="受助人收款账号：" value="内容" />
          <van-cell title="开户行名称：" value="内容" />
        </van-cell-group>
      </div>
    </section>
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
    let recipientsId = this.$route.query.recipientsId;
    let type = this.$route.query.type;
    let state = this.$route.query.state;
    if (state == -1) {
      // 申请奖励金
      this.ApplicationMutalQuery(recipientsId, type);
    } else if (state == 2) {
      // 修改
      this.ticketPicState = true;
      this.admissionPicState = true;
      this.AuditInformationUpdate(recipientsId, type);
    }
  },
  methods: {
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
          message: "请上传准考证图片和录取通知书图片",
          confirmButtonColor: "#40d0b3"
        });
      }

      this.info.type = this.$route.query.type;
      this.info.recipientsIds = this.$route.query.recipientsId;
      let info = this.info;
      let state = this.$route.query.state;
      if (state == -1) {
        this.submitApply(info);
      } else if (state == 2) {
        this.AuditInformationSubmission(info);
      }
    },

    // 查询受助人信息
    async ApplicationMutalQuery(recipientsId, type) {
      let res = await service.ApplicationMutalQuery({
        recipientsIds: recipientsId,
        type: type
      });
      console.log(res);
      if (res.code === 200) {
        let info = Object.assign({}, this.item, res.data);
        this.info = info;
      }
    },

    async AuditInformationUpdate(recipientsId, type) {
      let res = await service.AuditInformationUpdate({
        recipientsIds: recipientsId,
        type: type
      });
      console.log(res);
      if (res.code === 200) {
        this.info = res.data;
        this.ticketPic = res.data.urls[0]; //受助人准考证
        this.admissionPic = res.data.urls[1]; //受助人录取通知书
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
    },

    async AuditInformationSubmission(params) {
      let res = await service.AuditInformationSubmission(params);
      if (res.code === 200) {
        this.$dialog
          .alert({
            message: res.data.msg,
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

.Pic {
  > div {
    width: 100%;
    height: 2.8rem;
    img {
      width: 100%;
      height: 100%;
      background-size: 100% 100% !important;
    }
  }
}

.infoBot {
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
