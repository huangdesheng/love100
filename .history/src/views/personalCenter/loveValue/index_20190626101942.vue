<template>
  <div>
    <div class="banner">
      <div class="img">
        <span>{{loveValue}}</span>
      </div>
      <div class="nav_data">
        <div class="nav">
          <van-row>
            <router-link :to="{path: '/personalCenter/loveValue/readValue'}">
              <van-col span="12">
                <img
                  src="http://love100.qxiao.net:8888/group1/M00/00/02/rBFAEl0S1jWAWZoZAABJILSvm5c266.png"
                  alt
                >
                <p>分值解读</p>
              </van-col>
            </router-link>
            <router-link :to="{path:'/personalCenter/helpGoods'}" tag="div">
              <van-col span="12">
                <img
                  src="http://love100.qxiao.net:8888/group1/M00/00/02/rBFAEl0S1gOAOzO9AABMHn3MSvg448.png"
                  alt
                >
                <p>兑换商品</p>
              </van-col>
            </router-link>
          </van-row>
        </div>
      </div>
    </div>
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <img src="@/assets/personalCenter/slide_1.png" alt width="100%">
      </van-swipe-item>
      <van-swipe-item>
        <img src="@/assets/personalCenter/slide_1.png" alt width="100%">
      </van-swipe-item>
      <van-swipe-item>
        <img src="@/assets/personalCenter/slide_1.png" alt width="100%">
      </van-swipe-item>
      <van-swipe-item>
        <img src="@/assets/personalCenter/slide_1.png" alt width="100%">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import service from "@/api";
export default {
  data() {
    return {
      loveValue: 0
    };
  },

  mounted() {
    this.getloveValue();
  },
  methods: {
    async getloveValue() {
      let res = await service.getloveValue();
      if (res.code === 200) {
        this.loveValue = res.data.loveValue;
      } else {
        this.$dialog({
          message: res.message
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.banner {
  position: relative;
  .img {
    background: url("../../../assets/personalCenter/loveValue.png");
    background-size: 100% 100%;
    height: 4.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.6rem;
    color: #fff;
    span {
      margin-top: 1.5rem;
    }
  }
  .nav_data {
    width: 90vw;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 6px 1px rgba(153, 153, 153, 0.1);
    border-radius: 10px;
    position: absolute;
    left: 5vw;
    top: 28vh;
    .nav {
      .van-row {
        .van-col {
          margin: 0.2rem 0rem 0.4rem;
          text-align: center;
          p {
            font-family: PingFang-SC-Bold;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
            margin-top: 0.3rem;
            font-size: 0.38rem;
          }
          img {
            width: 1rem;
            height: 1rem;
          }
        }
      }
    }
  }
}
.van-swipe {
  margin-top: 3rem;
  width: 96%;
  margin: 3rem auto 0rem;
}
</style>
