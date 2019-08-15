<template>
  <div class="page-selectObject" v-show="showObject">
    <div class="dialogRebush">
      <div>
        <h2>选择帮扶类型</h2>
        <span @click="close">取消</span>
      </div>
      <div>
        <div @click="realName(1)">
          <div>
            <img
              src="http://love100.qxiao.net:8888/group1/M00/00/02/rBFAEl0S47mAdoWxAABdEji9mRc390.png"
              alt
            />
          </div>
          <span>团体</span>
        </div>
        <div @click="realName(2)">
          <div>
            <img
              src="http://love100.qxiao.net:8888/group1/M00/00/02/rBFAEl0S48-AQSntAABOZeyk5xA306.png"
              alt
            />
          </div>
          <span>个人</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["showObject"],
  methods: {
    close() {
      this.$emit("closeObject", false);
    },
    realName(index) {
      if (index === 1 || index === 2) {
        this.$emit("closeObject", false);
        this.$router.push({
          path: "/index/promiseBook",
          query: { status: index }
        });
        // this.$dialog
        //   .confirm({
        //     // title: "标题",
        //     message: "您好！您还未实名认证"
        //   })
        //   .then(() => {
        //     this.$router.push({ path: "/helpProgram/realName" });
        //   })
        //   .catch(() => {});
      }
    }
  }
};
</script>

<style lang="less" scoped>
</style>
