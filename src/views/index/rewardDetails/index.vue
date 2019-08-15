<style>
</style>

<template>
  <div class="page-reward">
    <div class="reward_top">
      <h2>奖励金划分规则</h2>
      <p>{{msg}}</p>
    </div>

    <div class="reward_content">
      <ul>
        <li>
          <p>爱心进度</p>
          <p>获得奖励金额</p>
        </li>
        <li v-for="(item,index) in reWardLists" :key="index">
          <p>
            <van-rate
              v-model="item.value"
              :count="9"
              icon="like"
              void-icon="like-o"
              :size="20"
              color="red"
              void-color="red"
              readonly
            />
          </p>
          <p>{{item.money}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import reward from "@/mixins/reward.js";
export default {
  mixins: [reward]
};
</script>

<style lang="less" scoped>
.reward_top {
  width: 90vw;
  margin: 0.35rem auto;
  background: rgba(255, 255, 255, 1);
  border-radius: 20px;
  h2 {
    font-size: 0.55rem;
    text-align: center;
    padding: 0.3rem 0rem 0.1rem;
  }
  > p {
    font-size: 0.38rem;
    color: #666;
    padding: 0.4rem;
    line-height: 0.45rem;
  }
}

.reward_content {
  background: #fff;
  ul {
    width: 90vw;
    margin: 0 auto;
    li {
      display: flex;
      align-items: center;
      font-size: 0.4rem;
      font-weight: 600;
      padding: 0.3rem 0rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      color: #333333;
      > p {
        font-size: 0.4rem;
        font-weight: 500;

        &:nth-of-type(1) {
          flex: 2;
        }
        &:nth-of-type(2) {
          flex: 1;
          text-align: center;
        }
      }
      &:nth-of-type(1) {
        border-bottom: none;
        > p {
          font-size: 0.4rem;
          font-weight: 600;
          text-align: left;
          &:nth-of-type(1) {
            flex: 2;
          }
          &:nth-of-type(2) {
            flex: 1;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
