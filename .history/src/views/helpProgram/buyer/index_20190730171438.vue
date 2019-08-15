

<template>
  <div class="page-index">
    <div class="page_title">
      <p>{{info.title}}</p>
      <div>
        <p>帮扶对象:</p>
        <div>
          <div>
            <img
              v-for="(item,index) in info.recipientsSimpleInfoVOS"
              :key="index"
              :src="item.photo"
              alt
            />
          </div>
          <!-- <span style="font-size:0.4rem;color:#999">等{{info.recipientsBaseInfoVO.length}}人</span> -->
          <!-- <van-icon name="arrow"/> -->
        </div>
      </div>
    </div>

    <div class="details_n">
      <p>
        <span>资助详情:</span>
        <span>每人{{info.price}}元/年</span>
      </p>
      <p>
        <span>资助人数:</span>
        <span>{{info.recipientsCount}}人</span>
      </p>
      <div>
        <p v-for="(item,index) in info.recipientsSimpleInfoVOS" :key="index">
          <span>{{item.name}}:</span>
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
        </p>
      </div>
      <p>
        <span>资助金额:</span>
        <span>{{info.amount}}元</span>
      </p>
    </div>
    <div class="buyer_content">
      <div>
        <h2>选择缴费方式</h2>
        <van-radio-group v-model="radio">
          <van-radio name="0" checked-color="#40d0ad">按年缴费</van-radio>
          <van-radio name="1" checked-color="#40d0ad">一次性缴费</van-radio>
        </van-radio-group>
      </div>
    </div>
    <van-cell title="金额（元）" :value="radio=='0'?info.amount+'元':info.oneTimePayment+'元'" />

    <div class="continue buyer_content" v-show="continueStatus">
      <div class="stop">
        <h2>教育互助延续</h2>
        <span @click="openTip">
          共{{info.recipientsOwedVOS.length}}人
          <van-icon name="question-o" />
        </span>
      </div>
      <van-radio-group v-model="radioHelp">
        <van-radio name="3" checked-color="#40d0ad">否</van-radio>
        <van-radio name="4" checked-color="#40d0ad">是</van-radio>
      </van-radio-group>
      <ul v-if="radioHelp === '4'?true:false">
        <li v-for="(item,index) in info.recipientsOwedVOS" :key="index">
          <div class="topInfo">
            <span class="selected_status" @change="itemList">
              <input
                type="checkbox"
                :value="item.recipientsId"
                v-model="checkedArr"
                :data-owedPeriods="item.owedPeriods"
                :data-recipientsId="item.recipientsId"
                :data-arrears="item.arrears"
                :data-index="index"
              />
              <img :src="checkedArr.indexOf(item.recipientsId)>=0?icon.active:icon.normal" alt />
            </span>

            <div class="info">
              <p>
                <span>{{item.name}}</span>
                <span>
                  需要帮扶延续:
                  <van-rate
                    v-model="item.owedPeriods"
                    :count="item.owedPeriods"
                    icon="like"
                    void-icon="like-o"
                    :size="20"
                    color="red"
                    void-color="red"
                    readonly
                  />
                </span>
                <span>￥{{item.arrears}}</span>
              </p>
            </div>
          </div>
        </li>
        <!-- <li>
          <div class="topInfo">
            <span class="selected_status">
              <input type="checkbox" :value="1" v-model="checkedArr" />
              <img :src="checkedArr.indexOf(1)>=0?icon.active:icon.normal" alt />
            </span>

            <div class="info">
              <p>
                <span>黄德生</span>
                <span>
                  需要帮扶延续:
                  <van-rate
                    v-model="loveValue"
                    :count="totalPeriods"
                    icon="like"
                    void-icon="like-o"
                    :size="20"
                    color="red"
                    void-color="red"
                    readonly
                  />
                </span>
                <span>￥100</span>
              </p>
            </div>
          </div>
        </li>-->
      </ul>
      <van-cell title="金额（元）" v-if="radioHelp === '4'" :value="arrears+'元'" />
    </div>

    <div class="buyer_footer" @click="wxPay">
      <!-- <router-link
        :to="{path: '/helpProgram/groupBuyerSuccess'}"
        tag="van-button"
        type="primary"
        class="van-button--primary"
      >支付</router-link>-->

      <van-button type="primary">支付</van-button>
    </div>

    <div class="tip" v-show="tipStatus">
      <div>
        <div>
          <van-icon name="cross" @click="closeTip" />
        </div>
        <p>
          <span>敬爱的爱心人士您好</span>
          <span>教育帮扶延续是因为您帮扶</span>
          <span>的小孩中因中途被暂停帮扶导致</span>
          <span>不能获得完整的奖励金</span>
          <span>为了孩子能够获得更多助学奖励</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import service from "@/api";
export default {
  data() {
    return {
      radio: "0",
      info: {
        recipientsOwedVOS: []
      },
      type: 0,
      obj: "",
      loveValue: 3,
      totalPeriods: 8,
      owedPeriods: "",
      continueStatus: true,
      tipStatus: false,
      radioHelp: "3",
      icon: {
        active: require("@/assets/helpProgram/selected_circle.png"),
        normal: require("@/assets/helpProgram/no_selected_circle.png")
      },
      valueId: 1,
      checkedArr: [],
      totalPeriods: 1,
      loveValue: 1,
      timerHelp: [],
      recipientsOwedPayDTOS: [],
      arrears: 0,
      timerHelpStatus: false
    };
  },

  mounted() {
    this.obj = this.$route.query.info;
    this.type = this.$route.query.typeHelp;
    this.payInfo(this.obj, this.type);
  },

  methods: {
    wxPay() {
      let info = this.info;
      let dataInfo = {
        helpType: this.type, //帮扶类型 0:个人 1:团体 ,
        payType: this.radio, //支付类型 0:自动缴费 1:一次性支付 ,
        planId: info.planId,
        recipientsOwedPayDTOS: this.recipientsOwedPayDTOS
      };

      if (this.radioHelp === "4") {
        dataInfo.amount =
          this.radio == "0"
            ? info.amount / 10000 + this.arrears / 10000
            : info.oneTimePayment / 10000 + this.arrears / 10000;
      } else {
        dataInfo.amount =
          this.radio == "0" ? info.amount / 10000 : info.oneTimePayment / 10000;
      }

      // if (this.radioHelp === "4") {
      //   dataInfo.amount =
      //     this.radio == "0"
      //       ? info.amountAddArrears / 10000 + this.arrears / 10000
      //       : info.oneTimePaymentAddArrears / 10000 + this.arrears / 10000;
      // } else {
      //   this.timerHelpStatus = false;
      //   dataInfo.amount =
      //     this.radio == "0" ? info.amount / 10000 : info.oneTimePayment / 10000;
      // }

      // let data = Object.assign({}, dataInfo, {
      //   arrears: info.arrears,
      //   owedPeriods: this.$route.query.owedPeriods
      // });
      // if (this.$route.query.owedPeriods != undefined) {
      this.WxPay(dataInfo);
      // } else {
      //   this.WxPay(dataInfo);
      // }
    },
    async WxPay(data) {
      let res = await service.WxPay(data);
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
              path: "/helpProgram"
            });
          });
      } else {
        this.$dialog({
          message: res.message
        });
      }
    },
    async wxpay(data) {
      var _this = this;
      console.log(this.type, this.obj);
      WeixinJSBridge.invoke("getBrandWCPayRequest", data, function(res) {
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          _this.$router.replace({
            path: "/helpProgram/groupBuyerSuccess",
            query: { type: _this.type, planId: _this.obj }
          });
        } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
        }
      });
    },

    async payInfo(obj, type) {
      let res = await service.payInfo({
        planId: obj,
        type: type
      });
      if (res.code === 200) {
        this.info = res.data;
        if (res.data.recipientsOwedVOS.length === 0) {
          this.continueStatus = false;
        }
        // let recipientsBaseInfoVO = res.data.recipientsBaseInfoVO.map(item => {
        //   if (item.owedPeriods >= 2) {
        //     item.owedPeriods = 2;
        //   }
        //   return item;
        // });
        // this.timerHelp = recipientsBaseInfoVO;

        let defaultArr = res.data.recipientsOwedVOS.filter(
          item => item.owedPeriods > 0
        );
        defaultArr.forEach(element => {
          this.checkedArr.push(element.recipientsId);
          this.arrears += element.arrears;
        });
        this.recipientsOwedPayDTOS = defaultArr;
      }
    },

    itemList($event) {
      if ($event.target.checked) {
        this.recipientsOwedPayDTOS.push({
          arrears: $event.target.dataset.arrears,
          owedPeriods: $event.target.dataset.owedperiods,
          recipientsId: $event.target.dataset.recipientsid
        });
      } else {
        let recipientsOwedPayDTOS = this.recipientsOwedPayDTOS.filter(
          item => item.recipientsId != $event.target.dataset.recipientsid
        );
        this.recipientsOwedPayDTOS = recipientsOwedPayDTOS;
      }
      var total = this.recipientsOwedPayDTOS.reduce((acc, cur) => {
        return acc + parseFloat(cur.arrears);
      }, 0);
      this.arrears = total;
    },

    closeTip() {
      this.tipStatus = false;
    },
    openTip() {
      this.tipStatus = true;
    }
  }
};
</script>

<style lang="less" scoped>
.page_title {
  margin-bottom: 0.2rem;
  background: #fff;
  > p {
    text-align: center;
    font-size: 0.5rem;
    color: #333;
    padding: 0.6rem 0rem 0.3rem;
    font-weight: 600;
  }
  > div {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0.3rem;
    align-items: center;
    p {
      font-size: 0.4rem;
      color: #666;
      margin-top: 0.1rem;
    }
    > div {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      div {
        display: flex;
        justify-content: flex-end;
        flex: 1;
        margin-right: 0.3rem;

        img {
          width: 1rem;
          height: 1rem;
          margin-left: 0.2rem;
          border-radius: 100%;
        }
      }
      i {
        font-size: 0.6rem;
      }
    }
  }
}

.details_n {
  background: #fff;
  margin-bottom: 0.2rem;
  > p {
    padding: 0.4rem 0.3rem 0rem;
    font-size: 0.4rem;
    color: #666;

    span {
      &:nth-of-type(1) {
        margin-right: 0.45rem;
      }
    }
    &:nth-of-type(3) {
      padding-bottom: 0.4rem;
    }
    &:nth-of-type(1) {
      span {
        &:nth-of-type(2) {
          color: #666;
        }
      }
    }
  }
  > div {
    padding: 0.4rem 0.3rem 0rem;
    > p {
      display: flex;
      // align-content: center;
      span {
        &:nth-of-type(1) {
          color: #666;
          font-size: 0.38rem;
          margin-right: 0.45rem;
          width: 3rem;
          text-align: right;
        }
        &:nth-of-type(2) {
          flex: 1;
        }
        // width: 70%;
      }
      padding-top: 0.2rem;
    }
  }
}
.van-cell {
  color: #333;
  font-size: 0.4rem;
  padding: 0.35rem 5vw;
  margin-top: 0.2rem;
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
      font-size: 0.36rem;
      color: #333;
      &:nth-of-type(1) {
        border-right: 1px solid rgba(204, 204, 204, 1);
      }
    }
  }
  h2 {
    font-size: 0.45rem;
    padding: 0.5rem 2.5vw 0;
    color: #333;
  }
}
.buyer_footer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8vh 0;
  .van-button--primary {
    border-radius: 1rem;
    width: 7rem;
    height: 1.2rem;
    line-height: 1.2rem;
    font-size: 0.38rem;
    background: #40d0ad;
    border: none;
    outline: none;
  }
}

.continue {
  background: #fff;
  font-size: 0.45rem;
  margin-top: 0.2rem;
  .stop {
    display: flex;
    align-items: center;
    h2 {
      padding: 0.45rem;
      font-weight: 600;
      flex: 1;
    }
    span {
      margin-right: 0.3rem;
      display: flex;
      align-items: center;
      color: #666666;
      font-size: 0.36rem;
      i {
        font-size: 0.4rem;
      }
    }
  }

  ul {
    width: 90%;
    margin: 0 auto;
    border-top: 1px solid #f7f7f7;
    border-bottom: 1px solid #f7f7f7;
    li {
      > .topInfo {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.35rem 0rem;
        color: #666;
        font-size: 0.4rem;
        .info {
          margin-left: 0.3rem;
          flex: 1;
          > p {
            display: flex;
            align-items: center;
            justify-content: space-between;
            span {
              width: 30%;
              &:nth-of-type(3) {
                text-align: right;
                width: 15%;
              }

              &:nth-of-type(2) {
                display: flex;
                flex: 1;
                text-align: left;
                align-items: center;
              }
            }
          }
        }
      }
    }
  }
}

.tip {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  > div {
    background: #fff;
    color: #000000;
    width: 85%;
    border-radius: 10px;
    div {
      display: flex;
      justify-content: flex-end;
      padding: 0.45rem 0.2rem;
      font-size: 0.55rem;
      color: #ccc;
    }
    > p {
      width: 100%;
      text-align: center;
      padding: 0rem 0.35rem 1rem;
      font-size: 0.4rem;
      span {
        display: block;
        margin-top: 0.1rem;
      }
    }
  }
}
</style>
