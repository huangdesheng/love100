<style>
</style>
<template>
  <div class="page-index">
    <div class="banner">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <img :src="item[0]" alt width="100%" />
        </van-swipe-item>
        <van-swipe-item>
          <img :src="item[0]" alt width="100%" />
        </van-swipe-item>
      </van-swipe>
      <router-link tag="div" class="i" :to="{path:'/personalCenter'}">
        <img
          src="http://love100.qxiao.net:8888/group1/M00/00/03/rBFAEl0UMheAdJe7AAAH5oDifMM234.png"
          alt
        />
      </router-link>
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
            <router-link :to="{path:'/index/productDetails'}" tag="div" class="recipent">
              <van-col span="8">
                <img
                  src="http://love100.qxiao.net:8888/group1/M00/00/07/rBFAEl0pPi2AY6aEAAATCMpXa9c153.png"
                />
                <p>教育互助</p>
              </van-col>
            </router-link>
            <router-link :to="{path:'/helpProgram'}">
              <van-col span="8">
                <img
                  src="http://love100.qxiao.net:8888/group1/M00/00/03/rBFAEl0UMHSADZiyAAAZTMpyzow265.png"
                />
                <p>教育帮扶</p>
              </van-col>
            </router-link>
            <router-link :to="{path:'/loveWelfare'}">
              <van-col span="8">
                <img
                  src="http://love100.qxiao.net:8888/group1/M00/00/03/rBFAEl0UMJGAJNHGAAAOpiAvcII159.png"
                />
                <p>其他公益</p>
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
            <!-- <img :src="item.imageUrl" alt /> -->
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
            <!-- <img :src="item.imageUrl" alt /> -->
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
    <div>
      <img :src="item" alt v-for="(item,index) in imgs" :key="index" />
    </div>
    <div class="uploader-input_box" @click="handleChooseImage">
      <van-icon name="plus" size="30px"></van-icon>
    </div>
    <div class="footer" @click="wechatImg">
      <p>爱心100，承载你的爱，温暖人间</p>
    </div>
  </div>
</template>

<script>
import service from "@/api";
import wxapi from "@/utils/share";
import qs from "qs";
export default {
  data() {
    return {
      indexDataList: {},
      item: [
        "http://love100.qxiao.net:8888/group1/M00/00/06/rBFAEl0kQq2ACCAYAABPwmTPuP8830.jpg",
        "http://love100.qxiao.net:8888/group1/M00/00/06/rBFAEl0kQtGAFnWvAAA5cSlq10k104.jpg"
      ],
      imagesList: [],
      serverId: [], //微信图片ID
      imgs: []
    };
  },
  mounted() {
    this.indexData();
  },
  methods: {
    async indexData() {
      let res = await service.indexData();
      if (res.code === 200) {
        this.indexDataList = res.data;
      }
    },

    handleChooseImage() {
      wx.chooseImage({
        count: 9,
        sizeType: ["compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: res => {
          console.log(res);
          let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          // 判断 ios
          // if (window.__wxjs_is_wkwebview) {
          //   this.handleLocalImgData(localIds);
          // } else {
          //   localIds.forEach(element => {
          //     this.imagesList.push(element);
          //   });
          // }
          this.handleUploadImage(localIds);
        },
        fail: res => {
          alert("失败");
        }
      });
    },

    handleUploadImage(localIds) {
      let i = 0;
      let length = localIds.length;
      let upload = () => {
        let loacId = localIds[i];
        // if (window.__wxjs_is_wkwebview) {
        //   if (loacId.indexOf("wxlocalresource") != -1) {
        //     loacId = loacId.replace("wxlocalresource", "wxLocalResource");
        //   }
        // }
        wx.uploadImage({
          localId: loacId, // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: res => {
            console.log(res);
            let serverId = res.serverId; // 返回图片的服务器端ID
            this.serverId.push(serverId);
            i++;
            i < length && upload();
            console.log(this.serverId);
          },
          fail: res => {
            alert("失败");
          }
        });
      };
      upload();
    },

    async wechatImg() {
      let res = await service.wechat(qs.stringify({ obj: this.serverId }));
    }
  }
};
</script>

<style lang="less" scoped>
.page-index {
  background: #eee;
  .banner {
    position: relative;
    .i {
      position: absolute;
      right: 0.4rem;
      top: 0.4rem;
      z-index: 2;
      font-size: 0.5rem;
      color: #eee;
      border-radius: 100%;
      border: 1px solid #eee;
      padding: 0.3rem;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 0.7rem;
        height: 0.7rem;
      }
    }
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
        font-family: PingFang-SC-Bold;
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
      // &:first-child {
      //   padding: 0rem 0rem 0.4rem;
      // }
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
            font-size: 0.32rem;
            margin-top: 0.2rem !important;
            color: #999;
            text-align: right;
          }
        }
      }
    }
  }
  .footer {
    text-align: center;
    color: #ccc;
    padding: 0.6rem 0rem;
    p {
      font-size: 0.35rem;
      color: #999;
    }
  }
}
</style>
