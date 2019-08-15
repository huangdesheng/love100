<template>
  <div class="page-index">
    <div class="promiseContent">
      <p>为了保证全体互助会员的全益，加入本计划请您务必要仔细阅读并如实承诺符合以下要求。若您未如实填写资料，将来申请教学奖励金时运营方有权按规定拒绝您的申请！</p>
      <div class="promiseBook">
        <div>
          <h3>1.承诺书</h3>
          <div>
            <p>为充分发挥认证机构的作用，促进市场经济和谐发展，自觉加强行业自律，树立认证机构的良好形象，使本机构所从事的强制性产品认证、自愿性产品认证、质量管理体系认证活动有序、合法、健康，高度防范执业风险和避免责任，我们谨向社会公开承诺：</p>
            <p>一、保证提供的全部换证材料真实、完整、准确;</p>
            <p>二、本机构获得批准换证后保证所从事的每项业务严格遵守国家法律、法规、规章的规定;</p>
            <p>三、保证按照核准的业务范围合法、公正、公平地从事认证业务;严格遵守《中华人民共和国认证认可条例》《认证机构管理办法》;</p>
            <p>四、保证诚信执业，提供优质、专业的认证服务，保证从事的每项认证活动始终遵循客观独立、公开公正、诚实信用的原则</p>
            <p>五、保证所认证的产品、服务内容客观公正，无虚假材料</p>
            <p>六、保证不承担不能胜任或不能按约定时限完成的认证活动,不给不符合条件的产品和服务提供认证业务;</p>
            <p>七、配齐与从事相关产品认证活动相适应的检测、检查等技术能力;</p>
            <p>八、本认证机构不得与行政机关搞利益关系，保证公正无私执业;</p>
            <p>九、建立和完善对认证活动实施有效控制的管理体系;制定有效的认证实施程序，严格按照合同约定内容和认证实施程序提供产品、服务认证活动，健全认证管理体系和评审体系，确保认证真实、有效。</p>
            <p>十、建立有效的专、兼职认证咨询人员聘用、培训、考核、使用和控制程序制度;</p>
            <p>十一、保证按政府规定的服务收费标准收费，不擅自提高收费;不索取、收受委托合同以外的酬金或者其他财物;</p>
            <p>十二、本认证机构不得接受任何可能对认证活动的客观公正产生影响的资助;不得从事任何可能对认证活动的客观公正产生影响的产品开发、营销等活动;</p>
            <p>十三、本认证机构不得与认证委托人存在资产、管理方面的利益关系</p>
            <p>
              十四、本机构必须持续保持和保证始终符合法定许可条件。
              我们将严格遵守本承诺，如有违反，愿意承担相应的法律责任，并接受处罚，欢迎各界全程监督。
              承诺单位(盖章)
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="fit_btn">
      <div>
        <van-checkbox v-model="checked" checked-color="#40d0ad">我已仔细阅读承诺书</van-checkbox>
      </div>
      <van-button type="primary" @click="nextStep">下一步</van-button>
    </div>
  </div>
</template>

<script>
import service from "@/api";
export default {
  data() {
    return {
      checked: false
    };
  },
  methods: {
    nextStep() {
      // 是否处于选中状态
      if (this.checked) {
        // 是否从团体帮扶进来
        if (this.$route.query.status == 1 || this.$route.query.status == 2) {
          // 1 代表团体帮扶的实名认证检测 2代表个人帮扶实名认证检测
          this.checkRealName(this.$route.query.status);
        } else {
          // 互助不需要实名认证直接跳转
          this.$router.push({ path: "/index/recipientsInfo" });
        }
      } else {
        this.$dialog({
          message: "是否已阅读承诺书",
          confirmButtonColor: "#40D0B3",
          confirmButtonText: "确定"
        });
      }
    },
    async checkRealName(status) {
      let res = await service.checkRealName();
      if (res.code === 200) {
        if (res.data.obj === null) {
          this.$dialog
            .confirm({
              message: "您好！您还未实名认证",
              cancelButtonColor: "#999",
              cancelButtonText: "取消",
              confirmButtonColor: "#40D0B3",
              confirmButtonText: "去认证"
            })
            .then(() => {
              this.$router.push({
                path: "/helpProgram/realName",
                query: { status: status }
              });
            });
        } else {
          if (status == 1) {
            // 团体
            this.$router.push({ path: "/helpProgram/groupResets" });
            this.$store.commit("controlActive");
          } else {
            // 个人
            this.$router.push({ path: "/helpProgram/personalApplication" });
          }
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.page-index {
  position: relative;
  .promiseContent {
    width: 100vw;
    height: 88vh;
    overflow-y: auto;
    margin: 0 auto;
    > p {
      width: 85%;
      background: #fff;
      margin: 0.5rem auto;
      padding: 0.6rem 0.2rem 0.6rem 0.3rem;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      line-height: 0.6rem;
      font-size: 0.38rem;
      // line-height: 0.45rem;
      box-shadow: 0px 1px 18px 2px rgba(204, 204, 204, 0.4);
      border-radius: 10px;
    }
    .promiseBook {
      padding-bottom: 1rem;
      background: #fff;
      padding: 0.2rem 0.4rem 0.2rem;
      h3 {
        color: #333;
        font-weight: 400;
        margin: 0.4rem 0rem;
        font-size: 0.4rem;
      }
      p {
        color: #666;
        margin-top: 0.2rem;
        font-size: 0.35rem;
      }
    }
  }
  .fit_btn {
    width: 100vw;
    height: 12vh;
    position: fixed;
    left: 0;
    bottom: 0;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0rem 0.4rem;
    .van-button {
      border-radius: 1rem;
      width: 4rem;
      height: 1rem;
      line-height: 1rem;
      font-size: 0.38rem;
      background: #40d0ad;
      border: none;
      outline: none;
    }
  }
}
</style>
