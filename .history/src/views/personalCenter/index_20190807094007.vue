<style>
</style>
<template>
  <div class="personalCenter">
    <div class="personal_list">
      <header>
        <div class="header_avatar">
          <img :src="item" alt style="width:100%;height:35vh;" />
          <div>
            <img :src="mydata.photo" alt width="100" />
            <router-link :to="{path:'/personalCenter/personalData'}" tag="p">{{mydata.username}}</router-link>
            <router-link :to="{path:'/personalCenter/loveValue'}" tag="p">爱心值:{{mydata.loveValue}}</router-link>
          </div>
        </div>
        <div class="header_data">
          <div>
            <p>{{mydata.amountCount}}</p>
            <p>累计捐款/元</p>
          </div>
          <div>
            <p>{{mydata.myMutual}}</p>
            <p>教育互助/人</p>
          </div>
          <div>
            <p>{{mydata.myHelp}}</p>
            <p>教育帮扶/人</p>
          </div>
        </div>
        <div class="header_report">
          <van-notice-bar
            color="#666"
            background="#ecf9ff"
            :left-icon="icon"
            ref="tes"
          >{{mydata.note}}</van-notice-bar>
        </div>
      </header>
      <section>
        <div>
          <router-link :to="{path:'/personalCenter/mySuports'}" tag="div">
            <img
              src="http://love100.qxiao.net:8888/group1/M00/00/02/rBFAEl0S0SqAIZ2JAAAMxnRIF-w940.png"
              alt
            />
            <p>我的互助</p>
          </router-link>
          <router-link :to="{path:'/personalCenter/myHelp'}" tag="div">
            <img
              src="http://love100.qxiao.net:8888/group1/M00/00/02/rBFAEl0S0WGAaKXXAAAQpNDM6kk026.png"
              alt
              style="width:0.9rem;height:0.7rem"
            />
            <p>我的帮扶</p>
          </router-link>
          <router-link :to="{path:'/personalCenter/myLaunch'}" tag="div">
            <img
              src="http://love100.qxiao.net:8888/group1/M00/00/02/rBFAEl0S0biAQIjeAAANDLhFqIE364.png"
              alt
            />
            <p>我的发起</p>
          </router-link>
          <router-link :to="{path:'/personalCenter/publicRecord'}" tag="div">
            <img
              src="http://love100.qxiao.net:8888/group1/M00/00/02/rBFAEl0S0e2ASR3VAAAP_PERhTE122.png"
              alt
            />
            <p>公益记录</p>
          </router-link>
          <router-link :to="{path:'/personalCenter/applyReward'}" tag="div">
            <img
              src="http://love100.qxiao.net:8888/group1/M00/00/02/rBFAEl0S0hWAE7lKAAANeu6CEvM781.png"
              alt
            />
            <p>申请奖励金</p>
          </router-link>
          <router-link :to="{path:'/personalCenter/helpGoods'}" tag="div">
            <img
              src="http://love100.qxiao.net:8888/group1/M00/00/02/rBFAEl0S0leAaql-AAANamrbwNo050.png"
              alt
            />
            <p>善因商品</p>
          </router-link>
        </div>
        <div>
          <div @click="linkClient">
            <img
              src="http://love100.qxiao.net:8888/group1/M00/00/02/rBFAEl0S0syAM6TwAAANz5PLTOA430.png"
              alt
            />
            <p>联系客服</p>
          </div>
          <router-link :to="{path:'/personalCenter/abount'}" tag="div">
            <img
              src="http://love100.qxiao.net:8888/group1/M00/00/02/rBFAEl0S0uGAbwRyAAAOaOtOxd8488.png"
              alt
            />
            <p>关于我们</p>
          </router-link>
          <div @click="enjoyFriend">
            <img
              src="http://love100.qxiao.net:8888/group1/M00/00/03/rBFAEl0UNSaABvagAAAKmAHHT2w005.png"
              alt
            />
            <p>邀请好友</p>
          </div>
        </div>
      </section>
    </div>
    <centerDialog></centerDialog>
    <shareDialog :shareStatus="shareStatus" @shareClickStatus="shareClickStatus"></shareDialog>
    <div class="page-ft">
      <qxFooter></qxFooter>
    </div>
  </div>
</template>

<script>
import centerDialog from "@/components/centerDialog";
import shareDialog from "@/components/share";
import servive from "@/api";
import wxapi from "@/utils/share";
import qxFooter from "@/components/Footer";
export default {
  data() {
    return {
      mydata: {},
      icon:
        "http://love100.qxiao.net:8888/group1/M00/00/02/rBFAEl0S06eACEMJAAAD4Gv68Hs814.png",
      item:
        "http://love100.qxiao.net:8888/group1/M00/00/07/rBFAEl0xMPuAJlyJAAA5kwUwHQk644.jpg",
      shareStatus: false
    };
  },
  mounted() {
    this.myData();
    wxapi.wxRegister();
    this.$refs.tes.$refs.content.className +=
      "" + "van-notice-bar__play--infinite";
    this.$refs.tes.$refs.content.style.paddingLeft = 251.25 + "px";
    this.$refs.tes.$refs.content.style.animationDuration = 10 + "s";
  },

  components: {
    centerDialog,
    shareDialog,
    qxFooter
  },

  methods: {
    async myData() {
      let res = await servive.mydata();
      if (res.code === 200) {
        this.mydata = res.data;
      }
    },
    linkClient() {
      this.$store.commit("personalMune", { menuStatus: true, menu: 1 });
    },
    enjoyFriend() {
      this.shareStatus = !this.shareStatus;
    },
    shareClickStatus(val) {
      this.shareStatus = false;
    }
  }
};
</script>

<style lang="less" scoped>
.personalCenter {
  width: 100%;

  .personal_list {
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    header {
      position: absolute;
      top: 0;
      left: 0;
      .header_avatar {
        position: relative;
        left: 0;
        top: 0;
        > div {
          position: absolute;
          left: 0;
          top: 2vh;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;

          img {
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 100%;
          }
          > p {
            &:nth-of-type(1) {
              margin-top: 0.5rem;
            }
            width: 100vw;
            text-align: center;
            margin-top: 0.35rem;
            color: #fff;
            font-size: 0.45rem;
            font-weight: 600;
          }
        }
      }
      .header_data {
        position: absolute;
        left: 5%;
        top: 27vh;
        width: 90%;
        display: flex;
        background: #fff;
        padding: 0.4rem 0rem;
        z-index: 10;
        border-radius: 10px;
        > div {
          flex: 1;
          text-align: center;
          p {
            font-size: 0.45rem;
            color: #f02310;
            font-weight: 600;
            &:nth-of-type(2) {
              margin-top: 0.35rem;
              color: #666;
              font-weight: 500;
              font-size: 0.38rem;
            }
          }
        }
      }
      .header_report {
        position: absolute;
        left: 10%;
        top: 43vh;
        z-index: 10;
        width: 80%;
        .van-notice-bar {
          background: #fff !important;
          color: #666 !important;
          border-radius: 5px;
          height: 1.2rem;
          font-size: 0.38rem;
          padding: 0 0px 0 0.3rem;
          > i {
            font-size: 31px;
          }
        }
      }
    }
    section {
      position: absolute;
      top: 53vh;
      left: 0;
      > div {
        display: flex;
        flex-wrap: wrap;
        width: 100vw;
        background: #fff;
        padding-bottom: 0.5rem;
        &:nth-of-type(2) {
          margin-top: 0.3rem;
          margin-bottom: 1.5rem;
        }
        > div {
          width: 33%;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 0.5rem;
          p {
            width: 100%;
            text-align: center;
            font-size: 0.38rem;
            color: #666;
            margin-top: 0.3rem;
          }
          img {
            width: 0.7rem;
            height: 0.7rem;
          }
        }
      }
    }
  }
}
</style>
