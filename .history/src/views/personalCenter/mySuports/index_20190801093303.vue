<style></style>
<template>
  <div clas="mySuports">
    <section>
      <ul class="commom">
        <li
          v-for="(item,index) in mymutualList"
          :key="index"
          @click="myMutalDetalis(item.recipientsId)"
        >
          <p>
            <span>{{item.name}}</span>
            <span>（全国重点大学教育奖励计划）</span>
          </p>
          <p>
            <span v-if="item.payState === 1">生效中</span>
            <span v-if="item.payState===2">已完成</span>
            <span v-if="item.payState===3">暂停缴费</span>
          </p>
          <div>
            <div>
              <p>
                <van-rate
                  v-model="item.alreadyHelp"
                  :count="item.frequencyCount"
                  icon="like"
                  void-icon="like-o"
                  :size="20"
                  color="red"
                  void-color="red"
                  readonly
                />
              </p>
              <p>利益保障中，祝您一切顺利！</p>
            </div>
            <button
              @click="continue_btn"
              v-if="item.payState === 3"
              :data-recipients="item.recipientsId"
            >继续助力</button>
          </div>
        </li>
      </ul>
    </section>

    <aside class="noData" v-show="noDataStatus">
      <div>
        <img
          src="http://love100.qxiao.net:8888/group1/M00/00/02/rBFAEl0S3qOAVmtlAAFKzX4YndA115.png"
          alt
          width="50%"
        />
        <p>当前没有互助记录</p>
        <router-link :to="{path:'/index/productDetails'}" tag="button">我要去参与互助</router-link>
      </div>
    </aside>
  </div>
</template>

<script>
import service from "@/api";
import qs from "qs";
export default {
  data() {
    return {
      mymutualList: [],
      noDataStatus: false,
      timer: 0,
      recipientsId: 0
    };
  },
  mounted() {
    this.mymutual();
  },
  methods: {
    myMutalDetalis(recipientsId) {
      this.$router.push({
        path: "/personalCenter/mySuports/personalInfo",
        query: { recipientsId: recipientsId, mySuportsState: 3 }
      });
    },
    // 继续助力
    continue_btn(e) {
      e.stopPropagation();
      this.recipientsId = e.srcElement.dataset.recipients;
      this.continuation(this.recipientsId);
    },
    async continuation(recipientsId) {
      this.$router.push({
        path: "/index/buyer",
        query: { index: 0, recipientsId: recipientsId }
      });
    },

    // 我的互助列表
    async mymutual() {
      let res = await service.mymutual();
      console.log(res);
      if (res.code === 200) {
        this.mymutualList = res.data;
        this.noDataStatus = false;
      } else if (res.code === 904) {
        this.noDataStatus = true;
      } else {
        this.$dialog({
          message: res.message
        });
      }
    },
    dialog() {
      this.showstatus = false;
    }
  },
  watch: {
    checkedNum1(val) {
      if (val === true) {
        this.checkedNum2 = false;
      }
    },
    checkedNum2(val) {
      if (val === true) {
        this.checkedNum1 = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
section {
  background: #fff;
}

.dialogs {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  .seciton_dialog {
    padding: 0.4rem 0;
    background: #fff;
    width: 90%;
    > .van-icon {
      display: flex;
      padding: 0 0.35rem;
      justify-content: flex-end;
      font-size: 0.6rem;
      color: #999;
    }
    > p {
      text-align: center;
      padding: 0.1rem 0rem;
      font-size: 0.38rem;
      color: #666;
      &:nth-of-type(1) {
        margin-top: 0.6rem;
      }
    }
    > div {
      display: flex;
      justify-content: center;
      margin: 0.8rem 0rem;
      p {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        .van-checkbox {
          margin-right: 0.2rem;
        }
      }
    }
    button {
      width: 90%;
      background: #40d0b3;
      margin-left: 5%;
      padding: 0.4rem;
      border-radius: 1rem;
      font-size: 0.4rem;
      color: #fff;
    }
  }
}
</style>
