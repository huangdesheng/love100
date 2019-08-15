<template>
  <div v-show="personBillStatus.billStatus" class="content">
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
</template>

<script>
import { mapState } from "vuex";
import service from "@/api";
export default {
  data() {
    return {
      value: 3,
      billInfo: []
    };
  },
  mounted() {
    console.log(this.$store.state.personBillStatus.type);
    this.info();
  },
  computed: {
    ...mapState(["personBillStatus"])
  },
  methods: {
    cancel_btn() {
      this.$store.commit("personBillStatus", false);
    },
    async info() {
      let res = await service.bill({
        recipientsId: this.$store.state.personBillStatus.recipientsId,
        helpType: this.$store.state.personBillStatus.type
      });
      console.log(res);
      if (res.code === 200) {
        this.billInfo = res.data;
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
