<style>
</style>
<template>
  <!-- <div class="page-welfare page-index" :class="show?'on':''"> -->
  <div class="page-welfare page-index">
    <header>
      <div class="banner">
        <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item,index) in welfarDetail.imageUrls" :key="index">
            <img :src="item" alt width="100%" @click="seeBigTu(welfarDetail.imageUrls)" />
          </van-swipe-item>
        </van-swipe>
        <button>筹款中</button>
        <div>
          <div>
            <p>{{welfarDetail.title}}</p>
            <p>{{welfarDetail.introduce}}</p>
            <van-progress :percentage="rate" pivot-color="#aaa" color="red" />
            <van-row>
              <van-col span="6">
                <p>目标筹款/元</p>
                <p>{{welfarDetail.targetAmount}}</p>
              </van-col>
              <van-col span="12">
                <p>当前筹款/元</p>
                <p>{{welfarDetail.currentAmount}}</p>
              </van-col>
              <van-col span="6">
                <p>捐款人次/次</p>
                <p>{{welfarDetail.donateNumber}}</p>
              </van-col>
            </van-row>
          </div>
        </div>
      </div>
      <div class="welfare_content">
        <div>
          <div>
            <h2>项目介绍</h2>
            <p>{{welfarDetail.introduce}}</p>
            <img :src="controlPic" alt width="100%" @click="preView(controlPic)" />
          </div>
          <div>
            <h2>项目预算</h2>
            <div>
              <h3>1、项目费用</h3>
              <img
                src="http://love100.qxiao.net:8888/group1/M00/00/03/rBFAEl0S5TeATEi6AAJUYT-q6Pc334.png"
                alt
                @click="preView('http://love100.qxiao.net:8888/group1/M00/00/03/rBFAEl0S5TeATEi6AAJUYT-q6Pc334.png')"
              />
            </div>
            <div>
              <h3>2、管理费说明</h3>
              <p>公募组织收取5%的管理费 ，用于 一线工作人员的人力成本（运营人员、财务、志愿者补贴等）、必要的办公支出（房租、水电、网络、捐赠票据回寄等）执行机构收取5%的执行费用，主要用于仓储费用、活动物料、发放执行交通费用等。执行费用不足的部分从其他渠道进行募集。 每一份善心我们都会用心认真和责任的去呵护，让每个公益项目、每笔捐款都能落到实处，为受益人带来改变。</p>
            </div>
            <div>
              <h3>3、执行计划</h3>
              <p>公募组织收取5%的管理费 ，用于 一线工作人员的人力成本（运营人员、财务、志愿者补贴等）、必要的办公支出（房租、水电、网络、捐赠票据回寄等）执行机构收取5%的执行费用，主要用于仓储费用、活动物料、发放执行交通费用等。执行费用不足的部分从其他渠道进行募集。 每一份善心我们都会用心认真和责任的去呵护，让每个公益项目、每笔捐款都能落到实处，为受益人带来改变。</p>
            </div>
          </div>
        </div>
      </div>
      <div class="info">
        <div>
          <h2>慈善机构信息</h2>
          <p>
            <span>慈善机构：</span>
            <span>广州市华侨文化发展基金会</span>
          </p>
          <p>
            <span>机构负责人：</span>
            <span>吴远斌</span>
          </p>
          <p>
            <span>善款接收：</span>
            <span>广州市华侨文化发展基金会</span>
          </p>
        </div>
      </div>
      <div class="loveList" :style="{paddingBottom:welfarDetail.status==0?'2rem':'0.3rem'}">
        <div>
          <h2>公益记录</h2>
          <ul v-if="welfareList.length>0">
            <li v-for="(item,index) in welfareList" :key="index">
              <div>
                <img :src="item.photo" alt width="100%" />
                <span>{{item.username}}</span>
              </div>
              <p>
                捐出
                <span>{{item.amount}}</span>元
              </p>
              <p v-if="item.timeDifference == '刚刚'">{{item.timeDifference}}</p>
              <p v-else>{{item.timeDifference}}前</p>
            </li>
          </ul>
          <div v-else class="no_data_welfare">暂无公益记录</div>
          <template v-if="status">
            <p @click="openwelfare" v-if="!openStatus">
              <van-icon name="arrow-down" @click="openwelfare" />展开查看更多爱心贡献
            </p>
            <p @click="closewelfare" v-else>
              <van-icon name="arrow-up" @click="closewelfare" />收起查看更多爱心贡献
            </p>
          </template>
        </div>
      </div>
    </header>
    <pageFare v-show="show" @showValue="showChildMsg" :projectId="welfarDetail.projectId"></pageFare>
    <div class="footer" v-if="welfarDetail.status === 0">
      <van-button type="primary" @click="fareShow">我要捐款</van-button>
    </div>
  </div>
</template>

<script>
import pageFare from "@/components/welfare_fare";
import service from "@/api";
export default {
  data() {
    return {
      show: false, //巨款金额弹框的现实和隐藏
      welfarDetail: {}, //数据
      rate: 0, //筹款的进度
      welfareList: [],
      openStatus: false,
      status: true,
      controlPic: ""
    };
  },
  components: {
    pageFare
  },
  mounted() {
    window.scroll(0, 0);
    this.welfarDetails(this.$route.query.projectId);
  },
  methods: {
    fareShow() {
      this.show = !this.show;
    },
    showChildMsg(val) {
      this.show = val;
    },
    // 图片的预览功能（多图）
    seeBigTu(value) {
      WeixinJSBridge.invoke("imagePreview", {
        urls: value,
        current: value
      });
    },
    // 图片预览功能能 (单图)
    preView(value) {
      WeixinJSBridge.invoke("imagePreview", {
        urls: [value],
        current: value
      });
    },

    //请求详情数据的接口
    async welfarDetails(projectId) {
      let res = await service.welfarDetails({
        projectId: projectId
      });
      if (res.code === 200) {
        this.welfarDetail = res.data;
        this.status = this.welfarDetail.welfareList.length > 2 ? true : false;
        let arr = this.welfarDetail.welfareList.filter(
          (item, index) => index < 2
        );
        this.welfareList = arr;
        this.controlPic = res.data.imageUrls[0];
        this.rate = parseInt(
          (res.data.currentAmount / res.data.targetAmount) * 100
        );
      } else {
        this.$dialog(res.message);
      }
    },
    openwelfare() {
      this.openStatus = true;
      this.welfareList = this.welfarDetail.welfareList;
    },
    closewelfare() {
      this.openStatus = false;
      this.welfareList = this.welfarDetail.welfareList.filter(
        (item, index) => index < 2
      );
    }
  }
};
</script>
<style lang="less" scoped>
.page-index {
  background: #f7f7f7;
  .banner {
    background: #fff;
    button {
      position: absolute;
      right: 0px;
      top: 0.8rem;
      z-index: 2;
      padding: 0.25rem 0.4rem 0.25rem 0.6rem;
      background: red;
      border-radius: 21px 0px 0px 21px;
      color: #fff;
      font-size: 0.45rem;
    }
    > div {
      > div {
        width: 95vw;
        margin: 0 auto;
        > p {
          font-family: PingFang-SC-Bold;
          padding-top: 0.3rem;
          font-weight: 500;
          &:nth-of-type(1) {
            color: rgba(51, 51, 51, 1);
            font-size: 0.45rem;
            font-weight: bold;
          }
          &:nth-of-type(2) {
            color: #999;
            font-size: 0.35rem;
            padding-bottom: 0.6rem;
          }
        }
        .van-row {
          padding-top: 0.3rem;
          .van-col {
            margin: 0.4rem 0rem;
            text-align: center;
            p {
              font-size: 0.4rem;
              font-weight: bold;
              color: #000;
              &:nth-of-type(2) {
                margin-top: 0.3rem;
              }
            }
          }
        }
      }
    }
  }
  .welfare_content {
    div {
      div {
        font-family: PingFang-SC-Bold;
        &:nth-of-type(1) {
          p {
            padding-bottom: 0.35rem;
            color: #666;
            font-size: 0.38rem;
            font-weight: 500;
          }
        }
        &:nth-of-type(2) {
          h3 {
            font-size: 0.38rem;
            margin: 0.3rem 0rem;
            font-weight: 600;
            color: #666;
          }
        }
      }
    }
  }

  .info {
    div {
      p {
        font-size: 0.4rem;
        margin-top: 0.2rem;
        span {
          &:nth-of-type(2) {
            color: #333;
          }
        }
      }
    }
  }
}
h2 {
  font-size: 0.45rem;
  padding: 0.35rem 0rem;
  font-weight: 600;
}
p {
  font-family: PingFang-SC-Bold;
  color: #666;
  line-height: 0.5rem;
  font-size: 0.37rem;
}
.welfare_content,
.info,
.loveList {
  margin-top: 0.3rem;
  background: #fff;
  padding: 0.3rem 0rem;
  > div {
    width: 90vw;
    margin: 0 auto;
  }
}
.loveList {
  padding-bottom: 2rem;
  ul {
    list-style: none;
    li {
      display: flex;
      align-items: center;
      padding: 0.3rem 0rem;
      div {
        display: flex;
        align-items: center;
        font-size: 0.4rem;
        color: #666;
        flex: 1;
        img {
          width: 0.8rem;
          height: 0.8rem;
          margin-right: 0.3rem;
          border-radius: 100%;
        }
      }
      > p {
        &:nth-of-type(1) {
          // text-align: center;
          width: 35%;
        }
      }
    }
  }
  > div {
    > p {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 0.35rem;
      i {
        font-size: 0.5rem;
        margin-right: 0.3rem;
      }
    }
  }
}
.van-swipe-item {
  height: 6rem !important;
}
.no_data_welfare {
  text-align: center;
  font-size: 0.45rem;
  color: #999;
}

.on {
  position: fixed;
  left: 0;
  top: 0;
}
</style>
