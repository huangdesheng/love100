<template>
  <div class="footerMenu" style="z-index: 100;">
    <div class="item">
      <router-link to="/">
        <div>首页</div>
      </router-link>
    </div>
    <!-- <div class="item">
      <router-link to="/wisdom">
        <div>小Q智慧</div>
      </router-link>
    </div>-->
    <div class="item">
      <router-link to="/index/productDetails">
        <div>教育互助</div>
      </router-link>
    </div>
    <div class="item">
      <router-link to="/helpProgram">
        <div>教育帮扶</div>
      </router-link>
    </div>
    <div class="item">
      <router-link to="/personalCenter">
        <div>我的</div>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "qxFooter",
  data() {
    return {
      isSelect: "首页",
      menuList: [
        {
          title: "首页"
        }
      ]
    };
  },
  mounted() {
    console.log(this.$route);
  }
};
</script>
<style lang="less" scoped>
.footerMenu {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  font-size: 28px;
  display: flex;
  background-color: #fff;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #e5e5e5;
    color: #e5e5e5;
    transform-origin: 0 0;
    transform: scaleY(0.5);
    z-index: 2;
  }
  .item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1.5rem;
    a {
      display: block;
      text-align: center;
      font-size: 0.4rem;
      color: #000;
      &.router-link-active {
        color: #92cd36;
      }
    }
  }
}
</style>
