<style>
</style>
<template>
  <div class="page-index">
    <div class="banner">
      <van-swipe :autoplay="3000" indicator-color="white" v-if="indexDataList.bannerList === []">
        <van-swipe-item>
          <img
            :style="{backgroundImage: 'url(' + item[0] + ')', backgroundSize:'cover'}"
            class="banerImg"
          />
        </van-swipe-item>
      </van-swipe>
      <van-swipe :autoplay="3000" indicator-color="white" v-else>
        <van-swipe-item
          v-for="(item,index) in indexDataList.bannerList"
          :key="index"
          @click="imgBtn(item.jumpType,item.jumpId)"
        >
          <img
            :style="{backgroundImage: 'url(' + item.imgUrl + ')', backgroundSize:'cover'}"
            class="banerImg"
          />
        </van-swipe-item>
      </van-swipe>

      <div class="nav_data">
        <router-link :to="{path:'/transparentIndex'}" tag="div" class="data">
          <van-row>
            <van-col span="12">
              <p>会员人数</p>
              <p>{{indexDataList.account}}</p>
            </van-col>
            <van-col span="12">
              <p>被资助人数</p>
              <p>{{indexDataList.helpRecipients}}</p>
            </van-col>
          </van-row>
        </router-link>
        <div class="nav">
          <van-row>
            <router-link
              v-for="(item,index) in menu"
              :key="index"
              :to="item.path"
              tag="div"
              class="recipent"
            >
              <van-col span="8">
                <img :src="item.img" />
                <p>{{item.name}}</p>
              </van-col>
            </router-link>
          </van-row>
        </div>
      </div>
    </div>

    <div class="content">
      <router-link :to="{path: '/index/productDetails'}" tag="div" class="recipent">
        <h2>教育互助</h2>
        <div>
          <img v-lazy="item[1]" />
        </div>
      </router-link>
      <div class="help">
        <router-link
          :to="{path: '/helpProgram'}"
          class="help-title"
          tag="div"
          :style="{padding:indexDataList.helpList==null?'0.4rem 0.2rem':'0.4rem 0.2rem 0rem'}"
        >
          <h2>教育帮扶</h2>
          <div>
            <van-icon name="arrow" />
          </div>
        </router-link>
        <div>
          <router-link
            v-for="(item,index) in indexDataList.helpList"
            :key="index"
            :to="{path:'/helpProgram/programDetails',query: { projectId: item.projectId }}"
            tag="div"
            class="help-content"
          >
            <span
              class="img"
              :style="{backgroundImage: 'url(' + item.imageUrl + ')', backgroundSize:'cover'}"
            ></span>
            <div>
              <p class="title" style="margin:0;">{{item.title}}</p>
              <p class="details">{{item.introduce}}</p>
              <p class="num" style="margin-top:0.3rem">已帮扶{{item.alreadyHelp}}人,共{{item.helpCount}}人</p>
            </div>
          </router-link>
        </div>
      </div>
      <div class="welfare">
        <div>
          <router-link
            :to="{path: '/loveWelfare'}"
            class="help-title"
            tag="div"
            :style="{padding:indexDataList.welfareList==null?'0.4rem 0.2rem':'0.4rem 0.2rem 0rem'}"
          >
            <h2>其他公益</h2>
            <div>
              <van-icon name="arrow" />
            </div>
          </router-link>
          <router-link
            v-for="(item,index) in indexDataList.welfareList"
            :key="index"
            :to="{path: '/loveWelfare/welfare_details',query: {projectId : item.projectId}}"
            tag="div"
            class="help-content"
          >
            <span
              class="img"
              :style="{backgroundImage: 'url(' + item.imageUrl + ')', backgroundSize:'cover'}"
            ></span>
            <div>
              <p class="title" style="margin:0;">{{item.title}}</p>
              <p class="details">{{item.introduce}}</p>
              <p class="num" style="margin-top:0.3rem">已有{{item.donateNumber}}人捐助</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>爱心100，承载你的爱，温暖人间</p>
    </div>
    <div class="page-ft">
      <qxFooter></qxFooter>
    </div>
  </div>
</template>

<script>
import service from "@/api";
import qs from "qs";
import qxFooter from "@/components/Footer";
export default {
  data() {
    return {
      indexDataList: {},
      item: [
        "http://love100.qxiao.net:8888/group1/M00/00/06/rBFAEl0kQq2ACCAYAABPwmTPuP8830.jpg",
        "http://love100.qxiao.net:8888/group1/M00/00/06/rBFAEl0kQtGAFnWvAAA5cSlq10k104.jpg"
      ],
      menu: [
        {
          name: "教育互助",
          img:
            "http://love100.qxiao.net:8888/group1/M00/00/07/rBFAEl0pPi2AY6aEAAATCMpXa9c153.png",
          path: "/index/productDetails"
        },
        {
          name: "教育帮扶",
          img:
            "http://love100.qxiao.net:8888/group1/M00/00/03/rBFAEl0UMHSADZiyAAAZTMpyzow265.png",
          path: "/helpProgram"
        },
        {
          name: "其他公益",
          img:
            "http://love100.qxiao.net:8888/group1/M00/00/03/rBFAEl0UMJGAJNHGAAAOpiAvcII159.png",
          path: "/loveWelfare"
        }
      ]
    };
  },
  components: { qxFooter },
  mounted() {
    this.indexData();
  },
  activated() {
    this.indexData();
  },
  methods: {
    // 首页调取数据
    async indexData() {
      let res = await service.indexData();
      if (res.code === 200) {
        this.indexDataList = res.data;
      }
    },

    imgBtn(jumpType, jumpId) {
      if (jumpType == "1") {
        this.$router.push({
          path: "/helpProgram/programDetails",
          query: {
            projectId: jumpId
          }
        });
      } else if (jumpType == "2") {
        this.$router.push({
          path: "/loveWelfare/welfare_details",
          query: {
            projectId: jumpId
          }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.page-index {
  background: #eee;
  .banner {
    position: relative;
    .nav_data {
      width: 90vw;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 6px 1px rgba(153, 153, 153, 0.1);
      border-radius: 10px;
      position: absolute;
      left: 5vw;
      top: 20vh;
      .data {
        .van-row {
          text-align: center;
          .van-col {
            margin: 0.4rem 0rem;
            p {
              font-size: 0.4rem;
              font-weight: bold;
              color: rgba(51, 51, 51, 1);
              &:nth-of-type(2) {
                margin-top: 0.2rem;
                font-size: 0.45rem;
                color: #ff2f2f;
              }
            }
          }
        }
      }
      .nav {
        .van-row {
          .van-col {
            margin: 0.2rem 0rem 0.4rem;
            text-align: center;
            p {
              font-family: PingFang-SC-Bold;
              font-weight: bold;
              color: rgba(51, 51, 51, 1);
              margin-top: 0.3rem;
              font-size: 0.38rem;
            }
            img {
              width: 1rem;
              height: 0.8rem;
            }
          }
        }
      }
    }
  }
  .content {
    margin-top: 19vh;
    div.recipent {
      padding: 0.1rem 0.2rem 0rem;
      background: #fff;
      margin-top: 0.35rem;
      h2 {
        margin: 0.45rem 0rem;
        font-size: 0.5rem;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
      }
      img {
        width: 100%;
        margin-bottom: 0.3rem;
      }
    }
  }

  .welfare,
  .help {
    background: #fff;
    padding: 0rem;
    margin-top: 0.3rem;
    .help-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.4rem 0.2rem 0.4rem;
      h2 {
        padding: 0;
        font-size: 0.5rem;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
      }
      div {
        font-size: 0.5rem;
        display: flex;
        margin-top: 0;
        color: #999;
        align-items: center;
        span {
          margin-right: 0.1rem;
          font-size: 0.38rem;
        }
        i {
          color: #999;
          font-size: 0.45rem;
        }
      }
    }
    .help-content {
      display: flex;
      border-bottom: 1px solid #f5f5f5;
      padding: 0.4rem 0rem;
      &:last-of-type {
        border: none;
      }
      .img {
        margin: 0 0.2rem;
        height: 2.5rem;
        width: 2.5rem;
        background-position: center center;
        background-repeat: no-repeat;
        border: 1px solid #f7f7f7;
        border-radius: 0.1rem;
      }
      div {
        display: block;
        flex: 1;
        margin-top: 0;
        padding-right: 0.2rem;
        p {
          color: #333;
          font-size: 0.45rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          &:nth-of-type(1) {
            -webkit-line-clamp: 1;
          }
          &:nth-of-type(2) {
            -webkit-line-clamp: 2;
            font-weight: 500;
            color: rgba(102, 102, 102, 1);
            font-size: 0.36rem;
            margin: 0.3rem 0rem;
            line-height: 0.5rem;
            height: 1rem;
          }
          &:nth-of-type(3) {
            font-size: 0.35rem;
            margin-top: 0.2rem !important;
            color: #999;
            display: flex;
            justify-content: flex-end;
          }
        }
      }
    }
  }
  .footer {
    text-align: center;
    color: #ccc;
    padding: 0.5rem 0rem 2rem;
    p {
      font-size: 0.35rem;
      color: #999;
    }
  }
}

.banerImg {
  width: 100%;
  height: 4.6rem;
  background-repeat: no-repeat !important;
  background-position: center center !important;
}
</style>
