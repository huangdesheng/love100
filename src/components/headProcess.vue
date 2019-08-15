<template>
  <div class="header">
    <van-steps :active="active" active-icon="success" active-color="#38f">
      <van-step>机构信息</van-step>
      <van-step>项目介绍</van-step>
      <van-step>受助人信息</van-step>
      <van-step>完成</van-step>
    </van-steps>
  </div>
</template>

<script>
export default {
  props: ["active"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  margin-bottom: 0.3rem;
}
</style>
