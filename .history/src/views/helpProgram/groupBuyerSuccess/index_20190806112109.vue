<template>
  <div class="page-index">
    <div class="page_title"></div>
    <div class="page_content">
      <div>
        <span :style="{backgroundImage: 'url(' + info.photo + ')', backgroundSize:'contain'}"></span>
        <span>{{info.username}}</span>
      </div>
      <h2>您已成功帮扶{{info.helpCount}}名小朋友</h2>
      <div>
        <p>助人为美</p>
        <p>助人为乐</p>
        <p>让爱传递美好</p>
      </div>
      <p>
        <span @click="back_btn">返回计划详情</span>|
        <span @click="share">分享给好友</span>
      </p>
    </div>
    <shareDialog :shareStatus="shareStatus" @shareClickStatus="shareClickStatus"></shareDialog>
  </div>
</template>

<script>
import service from "@/api";
import shareDialog from "@/components/share";
export default {
  data() {
    return {
      info: {},
      shareStatus: false
    };
  },

  mounted() {
    this.payInfo();
  },

  components: {
    shareDialog
  },

  methods: {
    async payInfo() {
      let res = await service.helpPayCompleted({
        type: this.$route.query.type,
        planId: this.$route.query.planId
      });
      console.log(res);
      if (res.code === 200) {
        this.info = res.data;
      }
    },
    back_btn() {
      //  path: "/helpProgram/programDetails",
      this.$router.replace({
        path: "/helpProgram",
        query: { projectId: this.info.projectId }
      });
    },
    share() {
      // this.$store.commit("personalMune", { menuStatus: true, menu: 2 });
      this.shareStatus = !this.shareStatus;
    },
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
  background: url(http://love100.qxiao.net:8888/group1/M00/00/03/rBFAEl0UNAOAfgwgACI22REusL0342.png);
  background-repeat: no-repeat;
  background-size: cover;
}
.page_content {
  position: absolute;
  top: 3rem;
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
          // background: url(../../../assets/education/education_avatar.png);
          background-repeat: no-repeat;
          background-size: cover;
          border-radius: 100%;
          margin-right: 0.3rem;
        }
      }
    }
    // &:nth-of-type(2) {
    //   p {
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //     margin: 0.5rem 0rem;
    //     font-size: 0.35rem;
    //     color: #666;
    //     span {
    //       font-size: 0.45rem;
    //     }
    //   }
    // }
    &:nth-of-type(2) {
      margin: 1rem 0rem;
      text-align: center;

      font-weight: 600;
      p {
        margin-top: 0.5rem;
        color: red !important;
        font-size: 0.6rem;
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
