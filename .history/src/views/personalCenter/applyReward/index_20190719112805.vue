
<style></style>
<template>
  <div clas="mySuports">
    <section>
      <ul class="commom">
        <li
          v-for="(item,index) in applyList"
          :key="index"
          @click="check_det(item.recipientsId,item.type,item.state)"
        >
          <p>
            <span>{{item.name}}</span>
            <span>（{{item.title}}）</span>
          </p>
          <p>
            <span v-if="item.state==-1">助力成功</span>
            <span v-if="item.state==0">奖励金申请资料审核中</span>
            <span v-if="item.state==1">审核通过</span>
            <span v-if="item.state==2">奖励金申请资料审核不通过</span>
            <span v-if="item.state==3">奖励金申请公示中</span>
            <span v-if="item.state==5">奖励金申请已完成</span>
            <span v-if="item.state==-2">助力失效</span>
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
              <p v-if="item.state==-1">教育计划已完成，祝您一切顺利！</p>
              <p v-if="item.state==2">相关证明材料不符合</p>
              <p v-if="item.state==0">利益保障中，祝您一切顺利</p>
              <p v-if="item.state==3">您的资料已审核通过，信息在公示中。</p>
              <p v-if="item.state==5">教育助学计划已完成，祝您一切顺利。</p>
              <p v-if="item.state==-2">教育助学计划已完成，祝您一切顺利</p>
            </div>
            <button
              @click="continue_btn(item.recipientsId,item.type,item.state)"
              v-if="item.state==2"
            >编辑</button>
            <p v-if="item.state==-1" @click="continue_btn(item.recipientsId,item.type,item.state)">
              <img
                src="http://love100.qxiao.net:8888/group1/M00/00/02/rBFAEl0S3hKAf8sKAABdv3VgGOU889.png"
                alt
              />
              <span>申请奖励金</span>
            </p>
            <!-- <button
              :data-recipientsId="item.recipientsId"
              :data-type="item.type"
              :data-state="item.state"
              @click="continue_btn($event)"
              v-if="item.state==2"
            >编辑</button>
            <p
              v-if="item.state==-1"
              :data-recipientsId="item.recipientsId"
              :data-type="item.type"
              :data-state="item.state"
              @click="continue_btn($event)"
            >
              <img
                src="http://love100.qxiao.net:8888/group1/M00/00/02/rBFAEl0S3hKAf8sKAABdv3VgGOU889.png"
                alt
              />
              <span>申请奖励金</span>
            </p>-->
          </div>
        </li>
      </ul>
    </section>
    <aside class="noData" v-show="noDataStatus">
      <div>
        <img
          src="http://love100.qxiao.net:8888/group1/M00/00/02/rBFAEl0S3jGARIYcAAFKUmCj8_w562.png"
          alt
          width="50%"
        />
        <p>当前没有申请记录</p>
      </div>
    </aside>
  </div>
</template>

<script>
import service from "@/api";
export default {
  data() {
    return {
      value: 3,
      applyList: [],
      noDataStatus: false
    };
  },
  mounted() {
    this.applicationReward();
  },
  methods: {
    continue_btn(recipientsId, type, state) {
      event.stopPropagation();
      if (state == -1) {
        this.$router.push({
          path: "/personalCenter/applyReward/stepApply",
          query: {
            recipientsId: recipientsId,
            type: type,
            state: state
          }
        });
      } else if (state == 2) {
        this.$router.push({
          path: "/personalCenter/applyReward/applyInfo",
          query: {
            recipientsId: recipientsId,
            type: type,
            state: state
          }
        });
      }
    },

    check_det(recipientsId, type, state) {
      event.stopPropagation();
      if (state === -1 || state === -2) {
      } else {
        this.$router.push({
          path: "/personalCenter/applyReward/details",
          query: {
            recipientsId: recipientsId,
            type: type,
            state: 2
          }
        });
      }
    },
    // 申请奖励金列表
    async applicationReward() {
      let res = await service.applicationReward();
      console.log(res);
      if (res.code === 200) {
        this.applyList = res.data;
        this.noDataStatus = false;
      } else if (res.code === 904) {
        this.noDataStatus = true;
      }
    }
  }
};
</script>

<style lang="less" scoped>
section {
  background: #fff;
  ul {
    li {
      padding: 0.45rem;
      p {
        &:nth-of-type(2) {
          margin: 0.3rem 0rem;
          font-size: 0.38rem;
          color: #2e2e2e;
          span {
            &:nth-of-type(2) {
              margin-left: 0.45rem;
            }
          }
        }
      }
      > div {
        > div {
          > p {
            &:nth-of-type(2) {
              color: #999;
            }
          }
        }
        button {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 0.9rem;
          outline: none;
          border: 1px solid rgba(64, 208, 179, 1);
          border-radius: 10px;
          line-height: 0.9rem;
          padding: 0 0.45rem 0.2rem;
          color: #40d0b3;
          font-size: 0.38rem;
          background: transparent;
        }
        > p {
          display: flex;
          justify-content: flex-end;
          flex-wrap: wrap;
          img {
            width: 0.7rem;
            height: 0.7rem;
            margin-right: 0.4rem;
            display: block;
          }
          span {
            display: block;
            width: 100%;
            text-align: right;
            color: #40d0b3;
            font-size: 0.35rem;
            margin-top: 0.2rem;
          }
        }
      }
    }
  }
}
.seciton_dialog {
  padding: 0.4rem 0;
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
</style>

