<style>
</style>
<template>
  <div class="page-index">
    <div class="page-title">
      <img
        src="http://love100.qxiao.net:8888/group1/M00/00/06/rBFAEl0kRAmAXVhfAACVoBydgqQ040.jpg"
        alt
        width="100%"
      />
      <van-row>
        <van-col span="8">
          <p>{{transparentList.account}}</p>
          <p>会员数</p>
        </van-col>
        <van-col span="8">
          <p>{{transparentList.fundraisingCount}}</p>
          <p>总筹款(元)</p>
        </van-col>
        <van-col span="8">
          <p>{{transparentList.helpRecipients}}</p>
          <p>资助人数</p>
        </van-col>
      </van-row>
    </div>

    <div class="page-assistanceMutal">
      <van-tabs sticky>
        <van-tab title="公示中">
          <ul class="content" v-if="transparentList.conductList ==[">
            <router-link
              v-for="(item,index) in transparentList.conductList"
              :key="index"
              :to="{path: '/assistanceMutal/assistanceDetails',query:{recipientsId:item.recipientsId,type:item.type}}"
              tag="li"
            >
              <div class="content-top">
                <!-- <img :src="item.photo" alt width="100%" /> -->
                <span
                  class="img"
                  :style="{backgroundImage: 'url(' + item.photo + ')', backgroundSize:'cover'}"
                ></span>
                <div>
                  <div>
                    <span>{{item.name}}</span>
                    <span>公示时间:{{item.adoptTime}}</span>
                    <van-icon name="arrow"></van-icon>
                  </div>
                  <p>全国重点大学教育奖励计划</p>
                </div>
              </div>
              <div class="content-details">
                <p>
                  奖励金：
                  <span>{{item.bonus}}</span>
                </p>
                <span>公示中</span>
              </div>
            </router-link>
          </ul>
          <div class="nodata" v-else>暂无数据</div>
        </van-tab>
        <van-tab title="已完成">
          <ul class="content" v-if="transparentList.completeList.length != 0">
            <router-link
              :to="{path: '/assistanceMutal/assistanceDetails',query:{recipientsId:item.recipientsId,type:item.type}}"
              tag="li"
              v-for="(item,index) in transparentList.completeList "
              :key="index"
            >
              <div class="content-top">
                <!-- <img :src="item.photo" alt width="100%" /> -->
                <span
                  class="img"
                  :style="{backgroundImage: 'url(' + item.photo + ')', backgroundSize:'cover'}"
                ></span>
                <div>
                  <div>
                    <span>{{item.name}}</span>
                    <span>公示时间:{{item.adoptTime}}</span>
                    <van-icon name="arrow"></van-icon>
                  </div>
                  <p>全国重点大学教育奖励计划</p>
                </div>
              </div>
              <div class="content-details">
                <p>
                  奖励金：
                  <span>{{item.bonus}}</span>
                </p>
                <span>已完成</span>
              </div>
            </router-link>
          </ul>
          <div class="nodata" v-else>暂无数据</div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import service from "@/api";
export default {
  data() {
    return {
      transparentList: {}
    };
  },
  mounted() {
    this.transparent();
  },
  methods: {
    async transparent() {
      let res = await service.transparent();
      console.log(res);
      if (res.code === 200) {
        this.transparentList = res.data;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.page-index {
  .page-title {
    position: relative;
    left: 0;
    top: 0;
    height: 45vh;
    .van-row {
      position: absolute;
      left: 5%;
      top: 25vh;
      background: #fff;
      width: 90%;
      border-radius: 5px;
      .van-col {
        text-align: center;
        margin: 0.6rem 0px;
        p {
          color: #f02310;
          font-size: 0.4rem;
          &:nth-of-type(2) {
            margin-top: 0.25rem;
            color: #2e2e2e;
            font-size: 0.4rem;
            padding-top: 0.3rem;
          }
        }
      }
    }
  }
}

.page-assistanceMutal {
  .content {
    background: #fff;
    margin-top: 1vh;
    li {
      border-bottom: 1px solid #e3e8ed;
      padding: 0.2rem 0rem;
      .content-top {
        display: flex;
        align-items: center;
        .img {
          width: 1.8rem;
          height: 1.8rem;
          border-radius: 100%;
          background-position: center center;
          background-repeat: no-repeat;
          margin-right: 0.3rem;
        }
        > div {
          flex: 1;
          > div {
            display: flex;
            margin: 0rem 0rem 0.3rem;
            align-items: center;
            span {
              font-size: 0.36rem;
              &:nth-of-type(1) {
                color: #333;
                margin-right: 0.4rem;
                font-size: 0.5rem;
              }
              &:nth-of-type(2) {
                flex: 1;
                color: #999;
              }
            }
            .finish {
              flex: 1;
            }
            .van-icon {
              font-size: 0.6rem;
              color: #ccc;
              margin: 0 0.2rem;
            }
          }
          p {
            color: #666;
            font-size: 0.4rem;
          }
        }
        img {
          border-radius: 100%;
          margin: 0.25rem;
        }
      }
      .content-details {
        display: flex;
        margin: 0.2rem 0.25rem 0;
        font-size: 0.4rem;
        align-items: center;
        p {
          flex: 1;
          color: #666;
          > span {
            color: #f02310;
            font-size: 0.45rem;
          }
        }
        > span {
          color: #fff;
          background: #40d0ad;
          padding: 0.1rem 0.3rem;
          border-radius: 0.05rem;
        }
      }
    }
  }
}

.nodata {
  text-align: center;
  font-size: 0.45rem;
  color: #999;
  margin: 2rem 0rem;
}
</style>
