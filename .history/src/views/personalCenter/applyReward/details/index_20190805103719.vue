
<template>
  <div>
    <header>
      <van-cell-group>
        <van-cell title="受助人：" :value="info.name" />
        <van-cell title="受助人身份证：" :value="info.cardId" />
        <van-cell title="受助类型：" :value="info.title" />
        <van-cell title="受助人手机号码：" :value="info.tele" />
      </van-cell-group>
    </header>
    <section>
      <aside class="IdCard">
        <h2>证明材料</h2>
        <div>
          <div>
            <div class="Pic">
              <div>
                <img
                  alt
                  :style="{backgroundImage: 'url('+ticketPic+')'}"
                  @click="seeBigTu(ticketPic,info.urls)"
                />
              </div>
            </div>
            <p>受助人准考证</p>
          </div>
          <div>
            <div class="Pic">
              <div>
                <img
                  :style="{backgroundImage: 'url('+admissionPic+')'}"
                  @click="seeBigTu(admissionPic,info.urls)"
                />
              </div>
            </div>
            <p>受助人录取通知书</p>
          </div>
        </div>
      </aside>
      <div class="infoBot">
        <van-cell-group>
          <van-cell title="受助人收款账号：" :value="info.bankAccount" />
          <van-cell title="开户行名称：" :value="info.bankName" />
        </van-cell-group>
      </div>
    </section>
  </div>
</template>

<script>
import service from "@/api";
import imagePreview from "@/mixins/imagePreview";
export default {
  data() {
    return {
      ticketPic: "", //受助人准考证
      admissionPic: "", //受助人录取通知书
      info: {}
    };
  },
  mixins: [imagePreview],
  mounted() {
    let applyId = this.$route.query.applyId;
    this.AuditInformationUpdate(applyId);
  },
  methods: {
    async AuditInformationUpdate(applyId) {
      let res = await service.AuditInformationUpdate(applyId);
      if (res.code === 200) {
        this.info = res.data;
        this.ticketPic = res.data.urls[0]; //受助人准考证
        this.admissionPic = res.data.urls[1]; //受助人录取通知书
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

.van-cell {
  padding: 0.5rem 0.4rem;
  color: #333333;
  .van-cell__title {
    flex: none;
  }
  .van-cell__value {
    font-size: 0.4rem;
    flex: 1;
  }
}

h2 {
  padding-bottom: 0.4rem !important;
}
</style>
