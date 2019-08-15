<style>
</style>

<template>
  <div>
    <div class="content">
      <div class="welfare">
        <div>
          <router-link
            v-for="(item,index) in programList"
            :key="index"
            :to="{path: '/loveWelfare/welfare_details',query: {projectId : item.projectId}}"
            tag="div"
            class="help-content"
          >
            <!-- <img :src="item.imageUrl" alt> -->
            <span
              class="img"
              :style="{backgroundImage: 'url(' + item.imageUrl + ')', backgroundSize:'cover'}"
            ></span>
            <div>
              <p class="title" style="margin:0;">{{item.title}}</p>
              <p class="details">{{item.introduce}}</p>
              <p class="num" style="margin-top:0.3rem">
                <span>{{item.donateNumber}}人已捐助</span>
                <span v-if="item.status == 0">正在进行中</span>
                <span v-if="item.status ==1">筹款已结束</span>
              </p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <aside class="noData" v-show="noDataStatus">
      <div>
        <img
          src="http://love100.qxiao.net:8888/group1/M00/00/02/rBFAEl0S36uAc0XcAAFpYp09HXY213.png"
          alt
          width="50%"
        />
        <p>当前没有公益记录</p>
        <!-- <button>我要去捐献爱心</button> -->
        <router-link :to="{path:'/loveWelfare'}" tag="button">我要去捐献爱心</router-link>
      </div>
    </aside>
  </div>
</template>

<script>
import service from "@/api";
export default {
  data() {
    return {
      programList: [],
      noDataStatus: ""
    };
  },
  mounted() {
    this.welfarRecord();
  },
  methods: {
    async welfarRecord() {
      let res = await service.welfarRecord();
      if (res.code === 200) {
        this.programList = res.data;
        this.noDataStatus = false;
      } else if (res.code === 904) {
        this.noDataStatus = true;
      } else {
        this.$dialog({
          message: res.message
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.help-content {
  display: flex;
  padding: 0.4rem 0rem;
  border-bottom: 1px solid #f5f5f5;
  background: #fff;
  &:last-of-type {
    border: none;
  }
  img {
    // margin: 0 0.3rem;
    // height: 2.7rem;
    // width: 2.7rem;
    // border-radius: 0.15rem;
    .img {
      margin: 0 0.3rem;
      height: 2.5rem;
      width: 2.5rem;
      background-position: center center;
      background-repeat: no-repeat;
      border: 1px solid #f7f7f7;
      border-radius: 0.1rem;
    }
  }
  div {
    display: block;
    flex: 1;
    margin-top: 0;
    padding-right: 0.3rem;
    padding-left: 0.1rem;
    p {
      color: #333;
      font-size: 0.45rem;
      font-weight: bold;
      &:nth-of-type(2) {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        font-family: PingFang-SC-Bold;
        color: #999;
        font-size: 0.36rem;
        margin: 0.35rem 0rem;
        font-weight: 500;
        line-height: 0.5rem;
      }
      &:nth-of-type(3) {
        display: flex;
        span {
          font-size: 0.36rem;
          color: #40d0b3;
          font-weight: 500;
          &:nth-of-type(1) {
            flex: 1;
            color: #999;
          }
        }
      }
    }
  }
}
</style>
