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
        <span>性别</span>
        <span v-if="info.sex==1">男</span>
        <span v-if="info.sex==2">女</span>
      </aside>
      <aside>
        <span>年龄</span>
        <span>{{info.age}}</span>
      </aside>
      <aside>
        <span>加入年级</span>
        <span>{{info.classNumber}}年级</span>
      </aside>
      <aside>
        <span>地区</span>
        <span>{{info.region}}</span>
      </aside>
      <aside>
        <span>互助类型</span>
        <span>{{info.helpType}}</span>
      </aside>
      <aside>
        <span>帮扶时间</span>
        <span>{{info.helpTime}}</span>
      </aside>
      <aside>
        <span>帮扶情况</span>
        <span>
          <van-rate
            v-model="info.loveValue"
            :count="info.totalPeriods"
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
              <p>爱心帮扶成功</p>
              <p>
                <span>
                  <van-rate
                    v-model="item.loveValue"
                    :count="item.totalPeriods"
                    icon="like"
                    void-icon="like-o"
                    :size="20"
                    color="red"
                    void-color="red"
                    readonly
                  />
                </span>
                <span>{{item.money}}元</span>
              </p>
              <p>{{item.date}}</p>
            </li>
          </ul>
        </section>
      </section>
    </div>
  </div>
</template>

<script>
import service from "@/api";
export default {
  data() {
    return {
      value: 1,
      info: {},
      type: "",
      recipientsId: "",
      billStatus: false,
      billInfo: [],
      planId: ""
    };
  },

  mounted() {
    let recipientsId = this.$route.query.recipientsId;
    let type = this.$route.query.type;
    let planId = this.$route.query.planId;
    this.planId = planId;
    this.type = type;
    this.recipientsId = recipientsId;
    this.myPersonHelpDt(recipientsId, type, planId);
  },
  methods: {
    check_info() {
      this.billStatus = true;
      this.Bill();
    },

    // 获取账单信息
    async Bill() {
      let res = await service.bill({
        recipientsId: this.recipientsId,
        helpType: this.type,
        planId: this.planId
      });
      console.log(res);
      if (res.code === 200) {
        this.billInfo = res.data;
      } else {
        this.$dialog({
          message: res.message
        });
      }
    },
    // 取消
    cancel_btn() {
      this.billStatus = false;
    },

    // 获取详情
    async myPersonHelpDt(recipientsId, type, planId) {
      let res = await service.myPersonHelpDt({
        recipientsId: this.recipientsId,
        helpType: this.type,
        planId: this.planId
      });
      if (res.code === 200) {
        this.info = res.data;
      } else {
        alert(res.message);
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
