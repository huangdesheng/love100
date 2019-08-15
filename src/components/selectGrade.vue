<template>
  <div>
    <van-popup v-model="selectGrade" position="bottom">
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
      columns: [
        "小学一年级",
        "小学二年级",
        "小学三年级",
        "小学四年级",
        "小学五年级",
        "小学六年级",
        "初中一年级",
        "初中二年级",
        "初中三年级"
      ]
    };
  },
  props: ["selectGrade"],
  methods: {
    onConfirm(value, index) {
      this.$emit("confirmSelect", { state: false, index: index, value: value });
    },
    onCancel() {
      this.$emit("cancelSelect", false);
    }
  },
  watch: {
    selectGrade(val) {
      console.log(val);
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
