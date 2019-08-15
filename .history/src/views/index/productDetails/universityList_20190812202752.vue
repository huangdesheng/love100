<template>
  <div class="page-un page-index">
    <div class="page-title">
      <p>省份</p>
      <p>学校</p>
    </div>

    <van-tree-select
      :items="list"
      :main-active-index="mainActiveIndex"
      :active-id="activeId"
      @navclick="onNavClick"
      @itemclick="onItemClick"
    />
  </div>
</template>

<script>
import service from "@/api";
import lists from "@/mixins/province_university";
export default {
  data() {
    return {
      mainActiveIndex: 0,
      activeId: 1
    };
  },
  mixins: [lists],
  mounted() {
    this.proviceList();
    console.log(this.list);
  },

  methods: {
    onNavClick(index) {
      this.mainActiveIndex = index;
    },
    onItemClick(data) {
      this.activeId = data.id;
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
