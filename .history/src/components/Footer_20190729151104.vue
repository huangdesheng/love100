<template>
  <div class="footer" style="z-index: 100;">
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
      <router-link to="/">
        <div>教育互助</div>
      </router-link>
    </div>
    <div class="item">
      <router-link to="/user">
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
import { mapState } from "vuex";
export default {
  name: "qxFooter",
  data() {
    return {};
  },
  computed: {
    ...mapState("user", {
      roleType: state => state.info.roleType
    }),
    singleUrl() {
      if (this.roleType == 2) {
        return `/single/teacher`;
      } else {
        return `/single`;
      }
    },
    homeUrl() {
      if (this.roleType == 9) {
        return `/login?redirect`;
      } else {
        return `/home`;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.footer {
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
    height: 100px;
    a {
      display: block;
      text-align: center;
      &.router-link-active {
        color: #92cd36;
      }
    }
  }
}
</style>
