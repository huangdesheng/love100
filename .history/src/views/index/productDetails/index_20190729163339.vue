<style >
</style>
<template>
  <div class="eductionDetails page-index" style="height:100vh">
    <div class="page-details">
      <img
        src="http://love100.qxiao.net:8888/group1/M00/00/07/rBFAEl0xMXqAbWsDAAD7Nr6GTmw039.jpg"
        alt
        width="100%"
      />
      <div class="planDetails">
        <div class="awardPlan">
          <p>全国重点大学教育奖励计划</p>
          <p>
            教育互助平台是为圆莘莘学子大学梦而创立，
            只要参与本教育奖励计划，每年只需要缴纳100元费用，
            当考上全国重点大学时，最高将获得3万元教育奖励金。
          </p>
        </div>
      </div>
      <div class="bonusDetails">
        <p>
          <span></span>计划核心
        </p>
        <div>
          <div>
            <div>
              <img
                src="http://love100.qxiao.net:8888/group1/M00/00/02/rBFAEl0S4YGAcZ-oAAADiAt7RnU479.png"
                alt
                width="100%"
              />
              <span>参与范围</span>
            </div>
            <span></span>
            <div>
              <span>1-9年级</span>
            </div>
          </div>
          <div>
            <div>
              <img
                src="http://love100.qxiao.net:8888/group1/M00/00/02/rBFAEl0S4ZaARHOtAAAGGt826KI310.png"
                alt
                width="100%"
              />
              <span>助学范围</span>
            </div>
            <span></span>
            <router-link tag="div" :to="{path:'/index/productDetails/universityList'}">
              <span>全国重点大学</span>
              <van-icon name="arrow" />
            </router-link>
          </div>
          <div>
            <div>
              <img
                src="http://love100.qxiao.net:8888/group1/M00/00/02/rBFAEl0S4a-ATRVwAAAFFY5bLM0724.png"
                alt
                width="100%"
              />
              <span>奖励详细</span>
            </div>
            <span></span>
            <router-link tag="div" :to="{path:'/index/rewardDetails'}">
              <span>最高￥30000</span>
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
      img:
        "http://love100.qxiao.net:8888/group1/M00/00/02/rBFAEl0S4VuAD6FNAAfltVPY-IY745.png"
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
        font-weight: 600;
        &:nth-of-type(1) {
          font-size: 0.55rem;
          color: #333;
          padding: 0.4rem 0rem;
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
    padding: 0 0.8rem;
  }
}
</style>
