<template>
  <div>
    <van-popup v-model="selectSex" position="bottom">
      <van-picker
        show-toolbar
        title="请选择年级"
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: ["男", "女"]
    };
  },
  props: ["selectSex"],
  methods: {
    onConfirm(value, index) {
      this.$emit("confirmSex", { state: false, index: index, value: value });
    },
    onCancel() {
      this.$emit("cancelSex", false);
    }
  }
};
</script>

<style lang="less" scoped>
.grade_Name {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  .van-picker {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }
}
</style>
