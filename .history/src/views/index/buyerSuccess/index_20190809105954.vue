<template>
  <div class="page-index">
    <div class="page_title"></div>
    <div class="page_content">
      <div>
        <span :style="{backgroundImage: 'url(' + info.photo + ')', backgroundSize:'contain'}"></span>
        <span>{{info.username }}</span>
      </div>
      <h2>教育互助计划加入成功!</h2>
      <div>
        <p>
          姓名：
          <span>{{info.name }}</span>
        </p>
        <p>
          年级：
          <span>{{info.classNumber}}年级</span>
        </p>
        <p>
          助学状况：
          <van-rate
            v-model="info.alreadyHelp"
            :count="info.frequencyCount"
            icon="like"
            void-icon="like-o"
            :size="20"
            color="#f44"
            void-color="#eee"
            readonly
          />
        </p>
      </div>
      <div>
        <p>爱心100</p>
        <p>祝您学业有成一切顺利！</p>
      </div>
      <p>
        <span @click="btn_index">返回我的互助</span>|
        <span @click="share">分享给好友</span>
      </p>
    </div>
    <shareDialog :shareStatus="shareStatus" @shareClickStatus="shareClickStatus"></shareDialog>
  </div>
</template>

<script>
import service from "@/api";
import qs from "qs";
import shareDialog from "@/components/share";
export default {
  data() {
    return {
      info: {},
      shareStatus: false
    };
  },
  mounted() {
    this.payComplete(this.$route.query.recipientsId);
    window.reload();
  },
  components: {
    shareDialog
  },
  methods: {
    // 点击返回详情
    btn_index() {
      this.$router.push({
        path: "/personalCenter/mySuports"
      });
    },

    // 获取支付成功后的信息
    async payComplete(recipientsId) {
      let res = await service.payComplete(
        qs.stringify({
          recipientsId: recipientsId
        })
      );
      if (res.code === 200) {
        this.info = res.data;
      } else {
        this.$dialog({
          message: res.message
        });
      }
    },
    // 点击分享
    share() {
      this.shareStatus = !this.shareStatus;
    },
    // 点击模态框
    shareClickStatus(val) {
      this.shareStatus = false;
    }
  }
};
</script>

<style lang="less" scoped>
.page-index {
  position: relative;
}
.page_title {
  width: 100%;
  height: 8rem;
  background: url(http://love100.qxiao.net:8888/group1/M00/00/02/rBFAEl0S4hCAIAduACI22REusL0249.png);
  background-repeat: no-repeat;
  background-size: cover;
}
.page_content {
  position: absolute;
  top: 3rem;
  // border: 1px solid #ccc;
  width: 90vw;
  left: 5vw;
  z-index: 10;
  background: #fff;
  padding-bottom: 0.45rem;
  box-shadow: 0px 1px 18px 2px rgba(204, 204, 204, 0.4);
  border-radius: 20px;
  > div {
    &:nth-of-type(1) {
      display: flex;
      align-items: center;
      margin: 0rem 0.3rem;
      padding: 0.3rem 0rem;
      border-bottom: 1px solid rgba(249, 249, 249, 1);
      span {
        font-size: 0.45rem;
        color: #333333;
        &:nth-of-type(1) {
          display: block;
          width: 1.2rem;
          height: 1.2rem;
          background-repeat: no-repeat;
          border-radius: 100%;
          margin-right: 0.3rem;
        }
      }
    }
    &:nth-of-type(2) {
      p {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0.5rem 0rem;
        font-size: 0.35rem;
        color: #666;
        span {
          font-size: 0.45rem;
        }
      }
    }
    &:nth-of-type(3) {
      margin: 1rem 0rem;
      text-align: center;

      font-weight: 600;
      p {
        margin-top: 0.4rem;
        color: red !important;
        font-size: 0.5rem;
      }
    }
  }
  h2 {
    padding: 0.5rem 0.3rem;
    font-size: 0.55rem;
    text-align: center;
    color: #333;
    font-weight: 600;
  }
  > p {
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(0, 0, 0, 0.05);
    span {
      font-size: 0.36rem;
      color: #666;
      &:nth-of-type(1) {
        margin-right: 0.8rem;
      }
      &:nth-of-type(2) {
        margin-left: 0.8rem;
      }
    }
  }
}
</style>
