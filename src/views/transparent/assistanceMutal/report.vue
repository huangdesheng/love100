<template>
  <div class="page-index" style="background:#fff;">
    <div class="pic">
      <img v-for="(item,index) in img" :key="index" :src="item" alt width="100%">
      <!-- <img src="@/assets/transparent/report_two.png" alt width="100%"> -->
    </div>
  </div>
</template>

<script>
import service from "@/api";
import qs from "qs";
export default {
  data() {
    return {
      img: []
    };
  },
  mounted() {
    let recipientsId = this.$route.query.recipientsId;
    this.report(recipientsId);
  },

  methods: {
    async report(recipientsId) {
      let res = await service.report(
        qs.stringify({
          investigationId: recipientsId
        })
      );
      console.log(res);
      if (res.code === 200) {
        this.img = res.data.investigationUrls;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.pic {
  width: 95vw;
  margin: 0rem auto;
  img {
    display: block;
    border-radius: 15px;
    padding-top: 20px;
    &:last-of-type {
      padding-bottom: 20px;
    }
  }
}
</style>
