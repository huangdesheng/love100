<template>
  <div class="page-un page-index">
    <div class="page-title">
      <p>省份</p>
      <p>学校</p>
    </div>

    <van-tree-select
      :items="items"
      :main-active-index="mainActiveIndex"
      :active-id="activeId"
      @navclick="onNavClick"
      @itemclick="onItemClick"
    />
  </div>
</template>

<script>
import service from "@/api";
export default {
  data() {
    return {
      items: [],
      mainActiveIndex: 0,
      activeId: 1
    };
  },
  mounted() {
    this.proviceList();
  },

  methods: {
    onNavClick(index) {
      this.mainActiveIndex = index;
    },
    onItemClick(data) {
      this.activeId = data.id;
    },
    async proviceList() {
      let res = await service.proviceList();
      if (res.code === 200) {
        this.items = res.data;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.page-index {
  .page-title {
    display: flex;
    justify-content: center;
    background: #fff;
    height: 9vh;
    margin-bottom: 1vh;
    p {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.4rem;
      color: #333;
      font-weight: bold;
      &:nth-of-type(1) {
        flex: 3.5;
      }
      &:nth-of-type(2) {
        flex: 6.5;
      }
    }
  }
  .universityList {
    background: #fff;
    margin-top: 0.45rem;
    ul {
      li {
        border-bottom: 1px solid #eee;
        span {
          display: block;
          font-size: 0.4rem;
          color: #333;
          padding: 0.4rem 0.3rem;
        }
      }
    }
  }
}
.van-picker__toolbar {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 0px;
  line-height: 44px;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
</style>
