<style>
</style>
<template>
  <div class="page-welfare page-index">
    <div class="banner">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <div class="img"></div>
        </van-swipe-item>
      </van-swipe>
      <div class="content">
        <div>
          <div>
            <img :src="info.photo" alt />
            <span>{{info.username}}</span>
          </div>
          <p>感谢您的捐助让世界更温暖！</p>
          <van-row>
            <van-col span="12">
              <p>本次捐助/元</p>
              <p>{{info.amount/100}}</p>
            </van-col>
            <van-col span="12">
              <p>获得爱心值</p>
              <p>{{info.loveVlue}}</p>
            </van-col>
          </van-row>
        </div>

        <div>
          <div>
            <p>送人玫瑰 手有余香</p>
            <p>让爱心播送到每个地方</p>
            <div>
              <span @click="back_btn">返回项目详情</span>
              <span @click="btn_loveValue">查看爱心记录</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import service from "@/api";
import qs from "qs";
export default {
  data() {
    return {
      info: ""
    };
  },
  mounted() {
    let projectId = this.$route.query.projectId;
    this.welpayComplete(projectId);
  },
  methods: {
    async welpayComplete(projectId) {
      let res = await service.welpayComplete(
        qs.stringify({
          projectId: projectId
        })
      );
      if (res.code === 200) {
        this.info = res.data;
      }
      console.log(res);
    },

    back_btn() {
      let projectId = this.$route.query.projectId;
      this.$router.push({
        path: "/loveWelfare/welfare_details",
        query: {
          projectId: projectId
        }
      });
    },

    btn_loveValue() {
      this.$router.push({
        path: "/personalCenter/publicRecord"
      });
    }
  }
};
</script>

<style lang="less" scoped>
.page-index {
  background: #f7f7f7;
  .banner {
    position: relative;
    .img {
      width: 100vw;
      height: 55vh;
      background: url("http://love100.qxiao.net:8888/group1/M00/00/03/rBFAEl0S5d-AUssHACC4A6mjfsg577.png");
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
}
.content {
  position: absolute;
  top: 26vh;
  width: 90vw;
  left: 5vw;
  div {
    background: #fff;
    &:nth-of-type(1) {
      padding: 0.2rem;
      > div {
        display: flex;
        align-items: center;
        span {
          font-size: 0.4rem;
          flex: 1;
          color: #333;
          font-weight: 600;
        }
        img {
          width: 1.5rem;
          height: 1.5rem;
          margin-right: 0.3rem;
        }
      }
      > p {
        text-align: center;
        font-size: 0.45rem;
        font-weight: 600;
        margin: 0.1rem 0rem;
      }
      .van-row {
        padding-top: 0rem;
        .van-col {
          text-align: center;
          > p {
            font-size: 0.4rem;
            font-weight: bold;
            color: #000;
            &:nth-of-type(2) {
              margin-top: 0.3rem;
            }
          }
        }
      }
    }
    &:nth-of-type(2) {
      margin-top: 0.2rem;
      > div {
        margin: 0 auto;
        > p {
          font-size: 0.55rem;
          color: red;
          &:nth-of-type(1) {
            padding: 0.4rem 0rem;
          }
        }
        > div {
          margin: 0.5rem 0rem 0.3rem;
          span {
            text-align: center;
            color: #666;
            font-size: 0.38rem;
            &:nth-of-type(1) {
              border-right: 1px solid #666;
            }
          }
        }
      }
    }
  }
}
</style>
