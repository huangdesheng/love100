<style>
</style>
<template>
  <div>
    <section class="personalInfo">
      <aside>
        <span>头像:</span>
        <img :src="info.photo" alt />
      </aside>
      <aside>
        <span>姓名</span>
        <span>{{info.name}}</span>
      </aside>
      <aside>
        <span>年龄</span>
        <span>{{info.age}}</span>
      </aside>
      <aside>
        <span>年级</span>
        <span>{{info.classNumber}}年级</span>
      </aside>
      <aside>
        <span>地区</span>
        <span>{{info.region}}</span>
      </aside>
      <aside>
        <span>互助类型</span>
        <span>{{info.type}}</span>
      </aside>
      <aside>
        <span>加入时间</span>
        <span>{{info.postTime}}</span>
      </aside>
      <aside>
        <span>爱心情况</span>
        <span>
          <van-rate
            v-model="info.alreadyHelp"
            :count="info.frequencyCount"
            icon="like"
            void-icon="like-o"
            :size="20"
            color="red"
            void-color="red"
            readonly
          />
        </span>
      </aside>
    </section>
    <aside class="check_info" @click="check_info">
      <span>账单</span>
      <span>查看详情</span>
      <van-icon name="arrow" />
    </aside>
    <div v-show="billStatus" class="content">
      <section class="bill">
        <header>
          <h2>账单详情</h2>
          <span @click="cancel_btn">取消</span>
        </header>
        <section>
          <ul>
            <li v-for="(item,index) in billInfo" :key="index">
              <p>{{item.diso}}</p>
              <p>
                <span>
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
                </span>
                <span>{{item.amount}}元</span>
              </p>
              <p>{{item.postTime}}</p>
            </li>
          </ul>
        </section>
      </section>
    </div>
  </div>
</template>

<script>
import personBill from "@/components/personBill";
import service from "@/api";
import qs from "qs";
export default {
  data() {
    return {
      info: {},
      billStatus: false,
      billInfo: []
    };
  },

  mounted() {
    let recipientsId = this.$route.query.recipientsId;
    this.myMutalDetails(recipientsId);
  },
  methods: {
    check_info() {
      this.billStatus = true;
      this.mySuportInfo();
    },

    async mySuportInfo() {
      let res = await service.mySuportInfo(
        qs.stringify({
          recipientsId: this.$route.query.recipientsId
        })
      );
      if (res.code === 200) {
        this.billInfo = res.data;
      }
    },

    cancel_btn() {
      this.billStatus = false;
    },

    // 获取信息
    async myMutalDetails(recipientsId) {
      let res = await service.myMutalDetails(
        qs.stringify({
          recipientsId: recipientsId
        })
      );
      console.log(res);
      if (res.code === 200) {
        this.info = res.data;
      }
    }
  }
};
</script>

<style lang="less" scoped>
aside {
  display: flex;
  border-bottom: 1px solid #f9f9f9;
  justify-content: space-between;
  background: #fff;
  padding: 0.5rem 0.35rem;
  align-items: center;
  span {
    color: #2e2e2e;
    font-size: 0.4rem;
    &:nth-of-type(2) {
      font-size: 0.38rem;
      color: #999999;
      flex: 1;
      text-align: right;
    }
  }
}
section {
  aside {
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 100%;
    }
  }
}

.check_info {
  margin-top: 0.3rem;
  span {
    &:nth-of-type(2) {
      flex: 1;
      color: #40d0b3;
    }
  }
  i {
    font-size: 0.45rem;
    color: #40d0b3;
    margin-left: 0.3rem;
  }
}

.content {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.5);
  .bill {
    width: 100%;
    background: #fff;
    height: 70vh;
    background: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    header {
      display: flex;
      height: 9vh;
      padding: 0 0.35rem;
      border-bottom: 1px solid #f9f9f9;
      justify-content: space-between;
      align-items: center;
      h2 {
        flex: 1;
        text-align: center;
        font-size: 0.45rem;
      }
      span {
        font-size: 0.38rem;
        color: #40d0b3;
      }
    }
    section {
      height: 61vh;
      overflow-y: auto;
      ul {
        li {
          padding: 0.3rem 0.4rem;
          border-bottom: 1px solid #f9f9f9;
          &:last-of-type {
            border: none;
          }
          p {
            &:nth-of-type(1) {
              color: #2e2e2e;
              font-size: 0.45rem;
            }
            &:nth-of-type(2) {
              display: flex;
              justify-content: space-between;
              align-items: center;
              color: #2e2e2e;
              margin: 0.3rem 0rem;
              font-size: 0.4rem;
            }
            &:nth-of-type(3) {
              color: #999;
              font-size: 0.38rem;
            }
          }
        }
      }
    }
  }
}
</style>
