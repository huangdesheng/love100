<template>
  <div class="data-menu" v-show="menuStatus">
    <div class="dialog">
      <div class="call" v-if="menu === 1">
        <h2>联系客服</h2>
        <p>
          是否拨打
          <span>“020 - 89635132”</span>
        </p>
        <div>
          <button @click="close">取消</button>
          <button @click="close">
            <a :href="'tel:' +phone">拨打</a>
          </button>
        </div>
      </div>
      <div class="enjoy" v-if="menu === 2">
        <h2>
          <span>选择分享方式</span>
          <van-icon name="cross" style="text-align:center" @click="close"></van-icon>
        </h2>
        <div class="enjoy_content" @click="shareFriend">
          <p>
            <img
              src="http://love100.qxiao.net:8888/group1/M00/00/02/rBFAEl0S1DKANhq3AABMSpYD7lQ211.png"
              alt
            />
            <span>微信好友</span>
          </p>
          <p>
            <img
              src="http://love100.qxiao.net:8888/group1/M00/00/02/rBFAEl0S1E6AfR71AABABHpS-AM998.png"
              alt
            />
            <span>朋友圈</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import {
//   commonShare,
//   shareTitle,
//   shareUrl,
//   shareImg,
//   shareDesc
// } from "@/utils/share";

import wxapi from "@/utils/share";
export default {
  data() {
    return {
      phone: "13411062173"
    };
  },
  mounted() {
    // commonShare(this, "爱心100", window.location.href, "11111", "222222");
    wxapi.wxRegister(this.wxRegCallback);
    // console.log(window.location.href);
  },
  computed: {
    menu() {
      return this.$store.state.menu;
    },
    menuStatus() {
      return this.$store.state.menuStatus;
    }
  },
  methods: {
    close() {
      this.$store.commit("personalMune", { menuStatus: false, menu: 0 });
    },
    shareFriend() {
      // commonShare(this, "爱心100", window.location.href, "11111", "222222");
    },

    wxRegCallback() {
      // 用于微信JS-SDK回调
      // this.wxShareTimeline();
      this.wxShareAppMessage();
    },
    wxShareTimeline() {
      console.log(11111);
      // 微信自定义分享到朋友圈
      let option = {
        title: "亲爱的爱心用户您好", // 分享标题, 请自行替换
        desc: "欢迎加入乐爱心项目", // 分享描述, 请自行替换
        link: window.location.href.split("#")[0] + "#/share", // 分享链接，根据自身项目决定是否需要split
        imgUrl:
          "http://love100.qxiao.net:8888/group1/M00/00/02/rBFAEl0S0IKALkANAAVRVp-c2sA916.png", // 分享图标, 请自行替换，需要绝对路径
        success: () => {
          alert("分享成功");
        },
        error: () => {
          alert("已取消分享");
        }
      };
      // 将配置注入通用方法
      wxapi.ShareTimeline(option);
    },
    wxShareAppMessage() {
      // 微信自定义分享给朋友
      let option = {
        title: "限时团购周 挑战最低价", // 分享标题, 请自行替换
        desc: "限时团购周 挑战最低价", // 分享描述, 请自行替换
        link: window.location.href.split("#")[0], // 分享链接，根据自身项目决定是否需要split
        imgUrl: "logo.png", // 分享图标, 请自行替换，需要绝对路径
        success: () => {
          alert("分享成功");
        },
        error: () => {
          alert("已取消分享");
        }
      };
      // 将配置注入通用方法
      wxapi.ShareAppMessage(option);
    }
  }
};
</script>

<style lang="less">
.dialog {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    width: 90vw;
    background: #fff;
    border-radius: 10px;
    text-align: center;
    h2 {
      padding: 0.8rem 0rem 0rem;
      font-size: 0.5rem;
    }
    p {
      font-size: 0.4rem;
      color: #333;
      padding: 1rem 0rem;
      span {
        color: #40d0b3;
      }
    }
    div {
      width: 100%;
      display: flex;
      border-top: 1px solid #f9f9f9;
      button {
        flex: 1;
        padding: 0.45rem 0rem;
        text-align: center;
        font-size: 0.45rem;
        color: #40d0b3;
        &:nth-of-type(1) {
          color: #999;
          border-right: 1px solid #f9f9f9;
        }
      }
    }
  }
}

.enjoy_content {
  border: none !important;
  display: flex;
  justify-content: center;
  p {
    flex: 1;
    img {
      width: 2rem;
      height: 2rem;
    }
    span {
      display: block;
      margin-top: 0.5rem;
      color: #2e2e2e !important;
    }
  }
}
.enjoy {
  h2 {
    display: flex;
    justify-content: center;
    span {
      flex: 1;
    }
    i {
      padding-right: 0.3rem;
      color: #999;
    }
  }
}
</style>
