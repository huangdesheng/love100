<style >
</style>
<template>
  <div class="eductionDetails page-index" style="height:100vh">
    <div class="page-details">
      <img :src="getData.img" alt width="100%" />
      <div class="planDetails">
        <div class="awardPlan">
          <p>{{getData.title}}</p>
          <p>{{getData.content}}</p>
        </div>
      </div>
      <div class="bonusDetails">
        <p>
          <span></span>计划核心
        </p>
        <div>
          <div v-for="(item,index) in getData.list" :key="index">
            <div>
              <img :src="item.img" alt width="100%" />
              <span>{{item.name}}</span>
            </div>
            <span></span>
            <div v-if="item.path === ''">
              <span>{{item.value}}</span>
            </div>
            <router-link tag="div" :to="item.path" v-else>
              <span>{{item.value}}</span>
              <van-icon name="arrow" />
            </router-link>
          </div>
        </div>
      </div>

      <div class="apply">
        <router-link
          :to="{path: '/index/promiseBook'}"
          type="primary"
          tag="van-button"
          class="van-button--primary"
        >申请加入</router-link>
      </div>
    </div>

    <div class="page-ft">
      <qxFooter></qxFooter>
    </div>
  </div>
</template>

<script>
import qxFooter from "@/components/Footer";
export default {
  data() {
    return {
      getData: {
        title: "全国重点大学教育奖励计划",
        content:
          "教育互助平台是为圆莘莘学子大学梦而创立，只要参与本教育奖励计划，每年只需要缴纳100元费用，当考上全国重点大学时，最高将获得3万元教育奖励金。",
        img:
          "http://love100.qxiao.net:8888/group1/M00/00/07/rBFAEl0xMXqAbWsDAAD7Nr6GTmw039.jpg",
        list: [
          {
            path: "",
            name: "参与范围",
            value: "1-9年级",
            img:
              "http://love100.qxiao.net:8888/group1/M00/00/02/rBFAEl0S4YGAcZ-oAAADiAt7RnU479.png"
          },
          {
            path: "/index/productDetails/universityList",
            name: "助学范围",
            value: "全国重点大学",
            img:
              "http://love100.qxiao.net:8888/group1/M00/00/02/rBFAEl0S4ZaARHOtAAAGGt826KI310.png"
          },
          {
            path: "/index/rewardDetails",
            name: "奖励详细",
            value: "最高￥30000",
            img:
              "http://love100.qxiao.net:8888/group1/M00/00/02/rBFAEl0S4a-ATRVwAAAFFY5bLM0724.png"
          }
        ]
      }
    };
  },
  components: {
    qxFooter
  }
};
</script>

<style lang="less" scoped>
.page-details {
  width: 100vw;
  height: 90vh;
  margin: 0 auto;
  .planDetails {
    .awardPlan {
      width: 90vw;
      background: #fff;
      margin: 0.2rem auto;
      text-align: center;
      border: 1px solid #f3f3f3;
      box-shadow: 0px 1px 14px 4px rgba(204, 204, 204, 0.5);
      border-radius: 10px;
      p {
        &:nth-of-type(1) {
          font-size: 0.5rem;
          color: #333;
          padding: 0.4rem 0rem;
          font-weight: 600;
        }
        &:nth-of-type(2) {
          font-size: 0.38rem;
          padding: 0.2rem 0rem 0.4rem;
          text-align: left;
          width: 70vw;
          margin: 0 auto;
          color: #666;
          line-height: 0.6rem;
        }
      }
    }
  }
  .bonusDetails {
    padding-bottom: 0.3rem;
    background: #fff;
    > p {
      font-size: 0.4rem;
      padding: 0.4rem 0.4rem 0rem;
      display: flex;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      span {
        width: 3px;
        background: red;
        display: block;
        margin-right: 0.2rem;
      }
    }
    > div {
      width: 90vw;
      margin: 0 auto;
      > div {
        display: flex;
        align-items: center;
        width: 90vw;
        margin: 0.3rem 0rem 0.2rem;
        padding: 0.15rem 0rem;
        > span {
          flex: 1;
          height: 1px;
          background: rgba(0, 0, 0, 1);
          opacity: 0.05;
          margin: 0rem 0.35rem;
        }
        > div {
          display: flex;
          align-items: center;
          &:nth-of-type(1) {
            img {
              width: 0.4rem;
              height: 0.5rem;
              margin-right: 0.2rem;
            }
            span {
              font-size: 0.35rem;
              font-weight: 500;
              color: rgba(102, 102, 102, 1);
            }
          }
          &:nth-of-type(2) {
            width: 30vw;
            color: #666;
            span {
              font-size: 0.38rem;
              margin-right: 0.1rem;
            }
            i {
              font-size: 0.45rem;
              color: #666;
            }
          }
        }
      }
    }
  }
}
.apply {
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: center;
  padding-bottom: 2rem;
  .van-button {
    padding: 0 2rem;
    border-radius: 1rem;
    background: #40d0b3;
    border: none;
    font-size: 0.4rem;
  }
}
</style>
