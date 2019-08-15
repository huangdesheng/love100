

<template>
  <div class="page-index" style="height:100vh">
    <div class="page_title">
      <p>全国重点大学教育奖励计划</p>
      <div>
        <p>
          <span>受助人：</span>
          <span>{{recipientPersonUpload.name}}</span>
        </p>
        <p>
          <span>年级：</span>
          <span>{{recipientPersonUpload.classNumber}}年级</span>
        </p>
        <p>
          <span>身份证号：</span>
          <span>{{recipientPersonUpload.cardId}}</span>
        </p>

        <p>
          <span>助学情况:</span>
          <span>
            <van-rate
              v-model="recipientPersonUpload.alreadyHelp"
              icon="like"
              void-icon="like-o"
              :count="recipientPersonUpload.frequencyCount"
              :size="22"
              color="red"
              void-color="red"
              readonly
            />
          </span>
        </p>
      </div>
    </div>
    <div class="buyer_content">
      <div>
        <h2>选择缴费方式</h2>
        <van-radio-group v-model="item.radio">
          <van-radio name="0" checked-color="#40d0ad" @click="radioChange('0')">按年缴费</van-radio>
          <van-radio name="1" checked-color="#40d0ad" @click="radioChange('1')">一次性缴费</van-radio>
        </van-radio-group>
      </div>
    </div>
    <van-cell title="金额（元）" :value="money+'元'" />
    <div class="continue" v-show="continueStatus">
      <h2>教育互助延续</h2>
      <van-cell title="金额（元）" :value="value+'元'" />
    </div>

    <div class="buyer_footer">
      <van-button type="primary" @click="submit_btn">支付</van-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import service from "@/api";
import qs from "qs";
export default {
  data() {
    return {
      continueStatus: false, //判断互助教育延续是否显示
      value: 100,
      money: 100,
      recipientPersonUpload: "",
      item: {
        index: "",
        radio: "0"
      },
      price: 100,
      loveValue: 3,
      totalPeriods: 8
    };
  },

  mounted() {
    if (this.$route.query.index == undefined) {
      this.continueStatus = false; //正在缴费缴费的
      this.information();
    } else if (this.$route.query.index === 0) {
      this.continueStatus = false; //延期缴费但正常缴费
      this.continueInformation();
    } else if (this.$route.query.index === 1) {
      this.continueStatus = true; //延期一期缴费
      // this.value = 100;
      this.continueInformation();
    } else if (this.$route.query.index === 2) {
      this.continueStatus = true; //延期两期缴费的
      // this.value = 200;
      this.continueInformation();
    }
    this.item.index = this.$route.query.index;
  },

  methods: {
    submit_btn() {
      if (this.item.index == undefined) {
        this.helpWxpay();
      } else {
        this.continuePay();
      }
    },

    radioChange(radio) {
      this.item.radio = radio;
      // this.item.index缺交的期数
      if (this.item.index === undefined) {
        if (radio == "0") {
          this.money = 100;
          this.price = 100;
        } else if (radio == "1") {
          this.money = this.recipientPersonUpload.difference;
          this.price = this.recipientPersonUpload.difference;
        }
      } else if (this.item.index == 0) {
        if (radio == "0") {
          this.money = 100;
          this.price = 100;
        } else if (radio == "1") {
          this.money = this.recipientPersonUpload.difference;
          this.price = this.recipientPersonUpload.difference;
        }
      } else {
        if (radio == "0") {
          this.money = 100;
          this.price = 100 + this.value;
        } else if (radio == "1") {
          this.money = this.recipientPersonUpload.difference;
          this.price = this.recipientPersonUpload.difference + this.value;
        }
      }
    },

    async continueInformation() {
      let res = await service.continueInformation({
        continues: this.$route.query.index,
        recipientsId: this.$route.query.recipientsId
      });

      if (res.code === 200) {
        this.price = 100 + res.data.amount;
        this.recipientPersonUpload = res.data;
        this.value = res.data.amount;
      } else {
        this.$dialog({
          message: res.message
        });
      }
    },

    async information() {
      let res = await service.information(
        qs.stringify({
          recipientsId: this.$route.query.recipientsId
        })
      );
      if (res.code === 200) {
        this.recipientPersonUpload = res.data;
      } else {
        this.$dialog({
          message: res.message
        });
      }
    },

    // 正常结算
    async helpWxpay() {
      let res = await service.helpWxpay({
        recipientsId: this.$route.query.recipientsId,
        // amount: "0.01",
        amount: this.price / 10000,
        payType: this.item.radio
      });
      if (res.code === 200) {
        let payData = Object.assign({}, res.data, {
          package: res.data.packageValue
        });
        this.wxpay(payData);
      } else if (res.code === 706) {
        this.$dialog
          .alert({
            message: res.message
          })
          .then(() => {
            this.$router.push({
              path: "/"
            });
          });
      } else {
        this.$dialog({
          message: res.message
        });
      }
    },

    // 延期结算
    async continuePay() {
      let res = await service.continuePay({
        recipientsId: this.$route.query.recipientsId,
        // amount: "0.100",
        amount: this.price / 10000,
        payType: this.item.radio
      });
      if (res.code === 200) {
        let payData = Object.assign({}, res.data, {
          package: res.data.packageValue
        });
        this.wxpay(payData);
      } else if (res.code === 706) {
        this.$dialog
          .alert({
            message: res.message
          })
          .then(() => {
            this.$router.push({
              path: "/"
            });
          });
      } else {
        this.$dialog({
          message: res.message
        });
      }
    },
    // 支付结果
    async wxpay(data) {
      var _this = this;
      let recipientsId = this.$route.query.recipientsId;
      WeixinJSBridge.invoke("getBrandWCPayRequest", data, function(res) {
        console.log(res);
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          _this.$router.push({
            path: "/index/buyerSuccess",
            query: { recipientsId: recipientsId }
          });
        } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.page_title {
  width: 90vw;
  margin: 0.5rem auto;
  background: #fff;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 18px 2px rgba(204, 204, 204, 0.4);
  border-radius: 10px;
  > p {
    padding: 0.5rem 0rem;
    color: #333;
    font-size: 0.5rem;
    font-weight: 600;
    text-align: center;
  }
  div {
    p {
      display: flex;
      align-items: center;
      padding: 0.4rem 0.3rem;
      &:nth-of-type(1) {
        border-bottom: 1px solid #f7f7f7;
      }
      span {
        color: #333;
        font-size: 0.4rem;
        &:nth-of-type(1) {
          width: 30vw;
        }
        &:nth-of-type(2) {
          flex: 1;
          text-align: right;
          color: #666;
          font-size: 0.4rem;
        }
      }
    }
  }
}
.van-cell {
  color: #333;
  font-size: 0.4rem;
  padding: 0.35rem 5vw;
  margin-top: 0.2rem;
}
.continue {
  background: #fff;
  font-size: 0.45rem;
  margin-top: 0.2rem;
  h2 {
    padding: 0.45rem;
    font-weight: 600;
  }
}
.buyer_content {
  width: 100vw;
  margin: 0 auto;
  background: #fff;
  .van-radio-group {
    display: flex;
    .van-radio {
      flex: 1;
      text-align: center;
      margin: 1rem 0rem 1rem;
      color: #333;
      &:nth-of-type(1) {
        border-right: 1px solid rgba(204, 204, 204, 1);
      }
    }
  }
  h2 {
    font-size: 0.5rem;
    padding: 0.5rem 5vw 0;
    color: #333;
    font-weight: bold;
  }
}
.buyer_footer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10vh;

  .van-button--primary {
    border-radius: 1rem;
    width: 7rem;
    height: 1.2rem;
    line-height: 1.2rem;
    font-size: 0.38rem;
    background: #40d0ad;
    border: none;
    outline: none;
    // margin-bottom: 5vh;
  }
}
</style>
