<template>
  <div id="app">
    <keep-alive>
      <router-view :key="$route.fullPath" v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    // console.log(this.$router);
  }
};
</script>
<style lang="less">
@import "./stylus/commom.less";
#app {
  // background: #f9f9f9 !important;
}
</style>
