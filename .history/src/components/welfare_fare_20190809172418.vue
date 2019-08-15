<template>
  <div class="page_fare" @touchmove.prevent>
    <div>
      <p>
        <van-icon name="cross" @click.prevent="transword" />
      </p>
      <div>
        <img
          src="http://love100.qxiao.net:8888/group1/M00/00/03/rBFAEl0S5j-AH__4AANOv5xJKC0676.png"
          alt
        />
        <div>
          <h2>给山里孩子的绘本书</h2>
          <p v-if="money!=''">{{parseInt(money==='自定义金额'?0:money)}}份爱心</p>
          <p v-else>0份爱心</p>
          <p>
            <span>￥</span>
            <!-- <span v-if="money!=''">{{money==='自定义金额'?0:parseFloat(money).toFixed(2)}}</span> -->
            <span v-if="money!=''">{{money==='自定义金额'?0:parseFloat(money).toFixed(2)}}</span>
            <span v-else>0</span>
          </p>
        </div>
      </div>
      <div>
        <span
          v-for="(item,index) in list"
          :key="index"
          @click.prevent="money_btn(item)"
          :class="index===active?'on':''"
        >{{item}}0份爱心</span>
      </div>
      <div>
        <input
          type="number"
          placeholder="自定义金额"
          v-model="price"
          @focus="changePrice"
          @input="oninput"
        />
        <div>
          <van-icon name="replay" />
          <span @click.prevent="selectFare">随机</span>
        </div>
      </div>
      <button @click.prevent="submit_pay">确定1</button>
    </div>
  </div>
</template>

<script>
import service from "@/api";
export default {
  data() {
    return {
      show: false,
      selectFareStatus: false,
      timer: null,
      money: "自定义金额",
      list: [1, 2, 3, 4],
      loveVlaue: 0,
      active: "",
      price: ""
    };
  },
  props: ["projectId"],
  methods: {
    transword() {
      this.$emit("showValue", this.show);
      this.money = "自定义金额";
    },
    submit_pay() {
      clearInterval(this.timer);
      this.timer = null;
      if (this.money === 0 || this.money === "自定义金额") {
        this.$dialog({
          message: "请输入公益金额"
        });
      } else {
        this.WxPay();
      }
    },

    oninput(e) {
      // 通过正则过滤小数点后两位
      this.price = e.target.value;
      e.target.value =
        e.target.value.match(/^\d*(\.?\d{0,2})/g)[0] || this.price;

      // console.log("e", e.target.value);
      if (e.target.value === "") {
        this.price = this.price;
      } else {
        let val1 = e.target.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
        this.price = val1;
      }
      this.money = this.price;
    },

    async WxPay() {
      let res = await service.welfarPay({
        amount: this.money,
        projectId: this.projectId
      });
      let payData = Object.assign({}, res.data, {
        package: res.data.packageValue
      });
      if (res.code === 200) {
        this.wxpay(payData);
      } else {
        this.$dialog({
          message: res.message
        });
      }
    },
    async wxpay(data) {
      var _this = this;
      WeixinJSBridge.invoke("getBrandWCPayRequest", data, function(res) {
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          _this.$router.replace({
            path: "/loveWelfare/welfare_reply",
            query: { projectId: _this.projectId }
          });
        } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
        } else {
          _this.$dialog({
            message: "支付失败"
          });
        }
      });
    },
    selectFare() {
      this.selectFareStatus = !this.selectFareStatus;
      this.active = "";
      if (this.selectFareStatus) {
        var _this = this;
        _this.setTimer();
        setTimeout(() => {
          clearInterval(this.timer);
          _this.timer = null;
          _this.selectFareStatus = false;
        }, 500);
        // }, 5000);
      }
    },

    money_btn(item) {
      this.money = item * 10;
      this.active = item - 1;
      this.price = "";
    },

    changePrice() {
      this.active = "";
      this.price = "";
      this.money = 0;
    },

    InputMoney(e) {
      console.log(e);
    },

    setTimer: function() {
      this.timer = setInterval(() => {
        var arr = ["1.11", "6.66", "8.88", "9.99", "18.88", "38.88"];
        var num = Math.floor(Math.random() * arr.length);
        this.price = arr[num];
        this.money = this.price;
      }, 50);
    }
  },
  watch: {
    price(val) {
      // console.log(val);
      // var reg = new RegExp("^[0-9]+([.]{1}[0-9]{0,2}){0,1}$");
      // if (val == "") {
      //   alert("金额不能为空");
      // } else if (!reg.test(val)) {
      //   alert("格式不对");
      // } else {
      //   // alert("你是猪吗");
      // }
      // let val1 = val.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
      // this.price = val1;
      // if (this.price === "") {
      // } else {
      //   this.money = this.price;
      // }
    }
  }
};
</script>

<style lang="less" scoped>
.page_fare {
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  > div {
    background: #fff;
    position: absolute;
    left: 0vw;
    padding: 0.4rem 5vw;
    bottom: 0;
    width: 100vw;
    > p {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      > i {
        font-size: 0.6rem;
        color: #666;
        text-align: right;
      }
    }
    > div {
      margin-top: 0.3rem;
      &:nth-of-type(1) {
        display: flex;
        img {
          height: 4rem;
          height: 2.5rem;
          margin-right: 0.35rem;
        }
        div {
          h2 {
            font-family: PingFang-SC-Bold;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
            font-size: 0.45rem;
          }
          p {
            margin-top: 0.3rem;
            &:nth-of-type(1) {
              font-size: 0.35rem;
              color: #999;
            }
            &:nth-of-type(2) {
              padding-top: 0.2rem;
              span {
                font-size: 0.6rem;
                color: red;
                &:nth-of-type(1) {
                  font-size: 0.3rem;
                }
              }
            }
          }
        }
      }
      &:nth-of-type(2) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0.6rem 0rem;
        span {
          border: 1px solid rgba(153, 153, 153, 1);
          border-radius: 4px;
          font-size: 0.38rem;
          padding: 0.1rem 0.2rem;
          color: #333;
        }
      }
      &:nth-of-type(3) {
        display: flex;
        align-items: center;
        input {
          flex: 1;
          border: 1px solid #999;
          padding: 0.2rem 0rem;
          text-align: center;
          margin-right: 1rem;
          outline: none;
        }
        div {
          display: flex;
          align-items: center;
          font-size: 0.4rem;
          color: #999;
          i {
            font-size: 0.6rem;
          }
        }
      }
    }
    button {
      background: #40d0ad;
      width: 90vw;
      padding: 0.4rem 0rem;
      text-align: center;
      margin: 0 auto;
      margin: 0.6rem 0rem 0rem;
      font-size: 0.4rem;
      border-radius: 1rem;
      color: #fff;
    }
  }
}
.on {
  color: #f02310 !important;
  background: rgba(255, 220, 217, 1) !important;
  border: 1px solid #f02310 !important;
}
</style>
