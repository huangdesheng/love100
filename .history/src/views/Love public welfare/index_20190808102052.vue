<style>
</style>
<template>
  <div class="page-welfare page-index">
    <div class="banner">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <img alt width="100%" v-lazy="img" />
        </van-swipe-item>
      </van-swipe>
      <van-search placeholder="搜索公益项目" v-model="value" @blur="search" />
    </div>
    <div class="content">
      <div class="welfare">
        <div>
          <router-link
            v-for="(item,index) in programList"
            :key="index"
            :to="{path: '/loveWelfare/welfare_details',query: {projectId : item.projectId}}"
            tag="div"
            class="help-content"
          >
            <img :src="item.imageUrl" alt />
            <div>
              <p class="title" style="margin:0;">{{item.title}}</p>
              <p class="details">{{item.introduce}}</p>
              <p class="num" style="margin-top:0.3rem">已有{{item.donateNumber}}人捐助</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import service from "@/api";
export default {
  data() {
    return {
      value: "",
      programList: [],
      img:
        "http://love100.qxiao.net:8888/group1/M00/00/07/rBFAEl0xMcqAGysZAAF87nMs8Fw792.jpg"
    };
  },
  mounted() {
    this.welfareList();
  },
  methods: {
    // 获取公益列表
    async welfareList() {
      let res = await service.welfareList();
      if (res.code === 200) {
        this.programList = res.data;
      } else {
        alert(res.message);
      }
    },

    // 搜索相关公益
    search() {
      this.searchWelfare();
    },
    async searchWelfare() {
      let res = await service.searchWelfare({
        title: this.value.replace(" ", "")
      });
      if (res.code === 200) {
        this.programList = res.data;
      } else {
        alert(res.message);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.page-index {
  background: #f7f7f7;
  .banner {
    position: relative;
    .van-search {
      position: absolute;
      right: 5vw;
      top: 0.4rem;
      width: 90vw;
      z-index: 2;
      text-align: center;
      border-radius: 100px;
      padding: 0.1rem 0rem;
      box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.15);
      border-radius: 21px;
      .van-search__content {
        background: transparent !important;
        .van-field__control {
          text-align: center !important;
        }
      }
    }
  }
  .content {
    div.recipent {
      padding: 0.1rem 0.2rem 0rem;
      background: #fff;
      margin-top: 0.35rem;
      h2 {
        margin: 0.4rem 0rem;
        font-size: 0.45rem;
        font-family: PingFang-SC-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
      }
      img {
        width: 100%;
      }
    }
  }

  .welfare {
    background: #fff;
    padding: 0rem;
    .help-content {
      display: flex;
      padding: 0.4rem 0rem;
      border-bottom: 1px solid #f5f5f5;
      &:last-of-type {
        border: none;
      }
      img {
        margin: 0 0.2rem;
        height: 2.5rem;
        width: 2.5rem;
        border-radius: 0.15rem;
      }
      div {
        display: block;
        flex: 1;
        margin-top: 0;
        padding-right: 0.2rem;
        p {
          color: #333;
          font-size: 0.4rem;
          font-weight: bold;
          &:nth-of-type(2) {
            font-family: PingFang-SC-Bold;
            color: #666;
            font-size: 0.35rem;
            margin: 0.35rem 0rem;
            font-weight: 500;
          }
          &:nth-of-type(3) {
            font-size: 0.35rem;
            margin-top: 0.45rem !important;
            color: #999;
            text-align: right;
            font-weight: 500;
          }
        }
      }
    }
  }
}
</style>
