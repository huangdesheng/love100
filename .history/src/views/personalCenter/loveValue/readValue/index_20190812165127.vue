<style>
</style>

<template>
  <div class="loveValue">
    <h2>爱心值</h2>
    <h3>基金会互助爱心值获得方式：</h3>
    <p>
      <img
        src="http://love100.qxiao.net:8888/group1/M00/00/02/rBFAEl0S1xaAOev4AAA-U6VKesc541.png"
        alt
        width="4%"
      />
      <span>公益项目的爱心捐款</span>
    </p>
    <p>
      <img
        src="http://love100.qxiao.net:8888/group1/M00/00/02/rBFAEl0S1xaAOev4AAA-U6VKesc541.png"
        alt
        width="4%"
      />
      <span>加入教育互助计划助力金</span>
    </p>
    <p>
      <img
        src="http://love100.qxiao.net:8888/group1/M00/00/02/rBFAEl0S1xaAOev4AAA-U6VKesc541.png"
        alt
        width="4%"
      />
      <span>参与教育帮扶爱心资助金</span>
    </p>

    <div>所有爱心金额都会以1：1的方式转换为爱心值 爱心值可兑换善因商品哦~</div>
  </div>
</template>

<script>
export default {
  components: {
    "cus-bottom": customButton
  }
};
</script>

<style lang="less" scoped>
.loveValue {
  background: #fff;
  padding: 0rem 0.45rem;
  // margin-top: 0.3rem;
  h2 {
    text-align: center;
    padding: 0.6rem 0rem 0rem;
    font-size: 0.5rem;
    color: #40d0b3;
    font-weight: 600;
  }
  h3 {
    padding: 0.8rem 0rem;
    color: #999;
    font-size: 0.38rem;
  }
  p {
    padding: 0rem 0.35rem 0.4rem;
    display: flex;
    align-items: center;
    font-size: 0.4rem;
    color: #2e2e2e;
    img {
      margin-right: 0.2rem;
    }
  }
  div {
    font-size: 0.38rem;
    padding-bottom: 0.45rem;
    color: #999;
    line-height: 0.6rem;
  }
}
</style>
