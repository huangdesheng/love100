<template>
  <div class="share" v-show="shareStatus">123121213</div>
</template>

<script>
export default {
  props: [shareStatus]
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
}
</style>
