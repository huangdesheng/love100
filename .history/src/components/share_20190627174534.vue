<template>
  <div class="share" v-show="shareStatus">
    <div class="share-tip">
      <img src="@/assets/share-tip.png">
      <p>请点击右上角按钮邀请好友吧</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["shareStatus"]
};
</script>

<style lang="less" scoped>
.share {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
}
</style>
