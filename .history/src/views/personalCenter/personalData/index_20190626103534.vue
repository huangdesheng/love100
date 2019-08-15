
<style>
</style>
<template>
  <div>
    <div v-if="obj !=null">
      <van-cell title="手机绑定：" is-link :value="obj" @click="updatePhone"/>
      <van-cell title="实名认证：" value="已认证"/>
    </div>
    <div v-if="obj==null" @click="toRealName">
      <van-cell title="实名认证" is-link value="未认证"/>
    </div>
  </div>
</template>

<script>
import service from "@/api";
export default {
  data() {
    return {
      obj: null
    };
  },
  mounted() {
    this.checkRealName();
  },
  methods: {
    async checkRealName() {
      let res = await service.checkRealName();
      if (res.code === 200) {
        this.obj = res.data.obj;
      } else {
        this.$toast(res.message);
      }
    },
    updatePhone() {
      this.$router.push("/personalCenter/personalData/updatePhone");
    },
    toRealName() {
      this.$router.push({
        path: "/index/promiseBook",
        query: { status: index }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.van-cell {
  padding: 0.5rem 0.3rem;
  color: #2e2e2e;
  font-size: 0.4rem;
  &:nth-of-type(2) {
    padding: 0.5rem 0.6rem 0.5rem 0.3rem;
    border-bottom: 1px solid #f9f9f9;
  }
}
</style>
