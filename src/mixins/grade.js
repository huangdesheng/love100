export default {
  data() {
    return {
      gradexIndex: 0, //年级编号
      grade: "", //年级
    }
  },
  methods: {
    // 选择年级
    selectG() {
      this.selectGrade = true;
    },
    cancelSelect(val) {
      this.selectGrade = false;
    },
    confirmSelect(val) {
      this.selectGrade = false;
      this.grade = val.value;
      this.gradexIndex = val.index + 1;
    }
  }
}
