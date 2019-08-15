export default {
  data() {
    return {
      area: "请选择地区",
      areaStatus: false,
      selectGrade: false, //选择班级的状态
    }
  },
  methods: {
    // 选择地址
    selectAddress() {
      this.areaStatus = true;
    },
    confirm(val) {
      this.areaStatus = false;
      this.area = val[0].name + " " + val[1].name + " " + val[2].name;
    },
    cancel() {
      this.areaStatus = false;
    }
  }
}
