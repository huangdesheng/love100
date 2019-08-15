<template>
  <div class="share" v-show="shareStatus">
    <div class="share-tip">
      <img src="@/assets/share-tip.png" width="80%">
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
  display: flex;
  justify-content: flex-end;
  .share-tip {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    padding: 0 7.5%;
    height: 4rem;
    img {
      width: 2.5rem;
      height: 3rem;
      padding: 0.45rem 0rem;
    }
    p {
      text-align: center;
      font-size: 0.45rem;
      color: #fff;
      width: 100%;
    }
  }
}
</style>
