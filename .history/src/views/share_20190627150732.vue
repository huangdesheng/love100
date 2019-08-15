<template>
  <div class="flex-page">
    <div class="flex-bd">
      <div class="qcode">
        <div class="qcode-box">
          <img
            src="http://love100.qxiao.net:8888/group1/M00/00/03/rBFAEl0UXViACWKcAAD1QfonbpA806.jpg"
            alt
          >
          <ul>
            <li>1、长按识别二维码，关注爱心100公众号。</li>
            <li>2、进入公众号后，即可参与教育奖励计划 和帮助贫困学子成就他们的蓝天。</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "share",
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.qcode {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #cbf4fa;
  justify-content: center;
  &-box {
    padding: 0 30px;
    img {
      width: 4rem;
      height: 4rem;
      display: block;
      margin: 0 auto;
    }

    ul {
      margin-top: 2rem;
    }
  }
}
</style>
