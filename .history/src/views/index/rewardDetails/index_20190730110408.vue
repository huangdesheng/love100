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
  mixins: [reward],
  data() {
    return {
      msg: `只限于小学一年级至初中三年级以内的学生参与！根据学生的具体情况划分爱心数量，每获得一份爱心都可以参与最后奖励金。近平新时代中国特色社会主义思想和党的十九大精神，贯彻落实新时代党的组织路线，以规范奖励。`
    };
  }
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
