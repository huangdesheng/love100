<template>
  <div class="page-selectObject" v-show="showObject">
    <div class="dialogRebush">
      <div>
        <h2>选择帮扶类型</h2>
        <span @click="close">取消</span>
      </div>
      <div>
        <div v-for="(item,index) in list" :key="index" @click="realName(item.number)">
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
  data() {
    return {
      list: [
        {
          number: 1,
          name: "团体",
          img:
            "http://love100.qxiao.net:8888/group1/M00/00/02/rBFAEl0S47mAdoWxAABdEji9mRc390.png"
        },
        {
          number: 2,
          name: "个人",
          img:
            "http://love100.qxiao.net:8888/group1/M00/00/02/rBFAEl0S48-AQSntAABOZeyk5xA306.png"
        }
      ]
    };
  },
  methods: {
    close() {
      this.$emit("closeObject", false);
    },
    realName(index) {
      // 1代表团体 2代表个人
      if (index === 1 || index === 2) {
        this.$emit("closeObject", false);
        this.$router.push({
          path: "/index/promiseBook",
          query: { status: index }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
</style>
