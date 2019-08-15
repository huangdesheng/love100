export default {
  data() {
    return {
      gradexIndex: 0, //年级编号
      grade: "", //年级
      area: "请选择地区",
      areaStatus: false,
      selectGrade: false, //选择班级的状态

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
    },
    // 选择地址
    selectAddress() {
      this.areaStatus = true;
    },
    confirm(val) {
      this.areaStatus = false;
      this.area = val[0].name + " " + val[1].name + " " + val[2].name;
      this.item.region = val[0].name + " " + val[1].name + " " + val[2].name;
    },
    cancel() {
      this.areaStatus = false;
    }
  }
}
