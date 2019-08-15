<style>
</style>
<template>
  <div>
    <!-- <aside class="tip" v-if="info.state==2">{{info.auditDescribe}}</aside> -->
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
      ticketPic: "", //受助人准考证
      admissionPic: "", //受助人录取通知书
      info: {}
    };
  },

  mounted() {
    let recipientsId = this.$route.query.recipientsId;
    let type = this.$route.query.type;
    let state = this.$route.query.state;
    this.AuditInformationUpdate(recipientsId, type);
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

.van-cell {
  padding: 0.5rem 0.4rem;
}
</style>
