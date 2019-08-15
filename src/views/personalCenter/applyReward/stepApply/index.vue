<style>
</style>

<template>
  <div class="page-step">
    <div class="step_content">
      <h2>流程介绍</h2>
      <div>
        <h3>第一步：详细填写受助人信息</h3>
        <p>在线填写信息，快速提交完整 资料。</p>
      </div>
      <div>
        <h3>第二步：审核和公示</h3>
        <p>接受我们和第三方对材料进行 审核，审核完成向全体成员公 示申请材料。</p>
      </div>
      <div>
        <h3>第三步：助学金发放</h3>
        <p>公示结束后（公示三天)，互助 金由该领域捐款基金完成拨款。</p>
      </div>
      <button @click="apply">立即申请</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    apply() {
      this.$router.push({
        path: "/personalCenter/applyReward/applyInfo",
        query: this.$route.query
      });
    }
  }
};
</script>

<style lang="less" scoped>
.page-step {
  width: 100%;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  background: #40d0b3;
  .step_content {
    width: 90%;
    height: 90%;
    margin: 7.5% 5%;
    background: #fff;
    border-radius: 0.4rem;
    h2 {
      padding: 0.6rem 0rem;
      text-align: center;
      font-size: 0.6rem;
      font-weight: 600;
    }
    div {
      width: 60vw;
      margin: 0 auto;
      font-size: 0.45rem;
      padding: 0.4rem 0rem;
      h3 {
        font-size: 0.45rem;
        color: #333;
        font-weight: 600;
      }
      p {
        font-size: 0.4rem;
        color: #2e2e2e;
        padding-top: 0.4rem;
        line-height: 0.6rem;
      }
    }
    button {
      display: flex;
      justify-content: center;
      width: 90%;
      margin: 0.6rem auto;
      text-align: center;
      background: #40d0b3;
      color: #fff;
      outline: none;
      border: none;
      padding: 0.4rem 0rem;
      border-radius: 1rem;
      font-size: 0.42rem;
    }
  }
}
</style>
