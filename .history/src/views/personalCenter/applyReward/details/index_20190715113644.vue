<style>
</style>
<template>
  <div>
    <!-- <aside class="tip" v-if="info.state==2">{{info.auditDescribe}}</aside> -->
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
        <!-- <p style="padding:0.45rem;color:#999;font-size:0.38rem">证明材料</p> -->
        <div>
          <div>
            <div class="Pic">
              <div>
                <img
                  alt
                  :style="{backgroundImage: 'url('+ticketPic+')'}"
                  @click="handlePreviewImage(ticketPic,info.urls)"
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
                  @click="handlePreviewImage(admissionPic,info.urls)"
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
    handlePreviewImage(imgUrl, images) {
      // console.log(imgUrl, images);
      // return false;
      // let imgArray = [];
      // if (images.length) {
      //   images.forEach(item => {
      //     imgArray.push(item.imageUrl);
      //   });
      // }
      // console.log()
      // if (!imgArray.length) {
      //   imgArray.push(imgUrl);
      // }

      WeixinJSBridge.invoke("imagePreview", {
        current: imgUrl,
        urls: images
      });

      // WeixinJSBridge.invoke("imagePreview", {
      //   urls: value,
      //   current: value
      // });

      // wx.previewImage({
      //   current: encodeURI(imgUrl),
      //   urls: imgArray
      // });
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
  .van-cell__value {
    font-size: 0.4rem;
  }
}

h2 {
  padding-bottom: 0.4rem !important;
}
</style>
