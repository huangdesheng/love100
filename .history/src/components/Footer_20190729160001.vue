<template>
  <div class="footerMenu" style="z-index: 100;">
    <div class="item" v-for="(item,index) in menuList" :key="index">
      <router-link :to="item.path">
        <img :src="isSelect === item.title ? item.selected : item.select" alt="item.title" />
        <div :class="isSelect === item.title ? 'active' : ''">{{item.title}}</div>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "qxFooter",
  data() {
    return {
      isSelect: "",
      menuList: [
        {
          title: "首页",
          select: require("@/assets/menuIco/index.png"),
          selected: require("@/assets/menuIco/indexed.png"),
          path: "/"
        },
        {
          title: "教育互助",
          select: require("@/assets/menuIco/help.png"),
          selected: require("@/assets/menuIco/helped.png"),
          path: "/index/productDetails"
        },
        {
          title: "教育帮扶",
          select: require("@/assets/menuIco/edcation.png"),
          selected: require("@/assets/menuIco/edcationed.png"),
          path: "/helpProgram"
        },
        {
          title: "我的",
          select: require("@/assets/menuIco/person.png"),
          selected: require("@/assets/menuIco/personed.png"),
          path: "/personalCenter"
        }
      ]
    };
  },
  mounted() {
    this.isSelect = this.$route.meta.title;
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
      color: ##999999;
      img {
        width: 0.5rem;
        height: 0.5rem;
        margin-bottom: 0.1rem;
      }
    }
  }

  .active {
    color: red;
  }
}
</style>
