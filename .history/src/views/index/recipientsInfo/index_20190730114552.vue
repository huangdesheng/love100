
<template>
  <div class="page-index">
    <gradeName
      :selectGrade="selectGrade"
      @cancelSelect="cancelSelect"
      @confirmSelect="confirmSelect"
    ></gradeName>
    <div class="recipient_form">
      <div class="photo">
        <span>头像</span>
        <div>
          <van-uploader name="uploader" :after-read="photoOnRead">
            <div class="img" v-if="photoStatus">
              <img v-if="photo != ''" alt :style="{backgroundImage: 'url('+photo+')'}" />
              <van-loading type="spinner" color="#1989fa" v-else />
            </div>
            <div v-else>
              <span>上传头像</span>
              <van-icon />
            </div>
          </van-uploader>
        </div>
      </div>
      <van-cell-group>
        <van-field v-model="name" label="姓名:" placeholder="请输入真实姓名" />
        <van-field
          v-model="cardId"
          label="身份证号:"
          placeholder="请输入15位或者18位身份证号"
          @blur="idCardVerifications"
        />
        <van-field v-model="age" label="年龄" placeholder="请输入年龄" type="number" />
      </van-cell-group>
      <p @click="selectG" style=" border-bottom: 1px solid #f9f9f9;">
        <span>年级</span>
        <span :style="{fontSize:grade==''?'0.35rem':'0.38rem'}">{{grade}}</span>
        <van-icon name="arrow-down" />
      </p>
      <p>
        <span>地区</span>
        <span
          v-if="area === '请选择地区'"
          @click="selectAddress"
          style="font-size:0.35rem;margin-right:0;color:#ccc;"
        >{{area}}</span>
        <span
          @click="selectAddress"
          style="font-size:0.36rem;margin-right:0;color:#999;"
          v-else
        >{{area}}</span>
      </p>
      <div class="IdCard">
        <p>上传受助人身份证或户口本照片</p>
        <div>
          <div>
            <div>
              <van-uploader name="uploader" :after-read="onRead">
                <div v-if="positivePicState">
                  <img
                    alt
                    v-if="positivePic !=''"
                    :style="{backgroundImage: 'url('+positivePic+')'}"
                  />
                  <van-loading type="spinner" color="#1989fa" v-else />
                </div>
                <van-icon name="photograph" v-else />
              </van-uploader>
            </div>

            <p>身份证正面或户口本首页</p>
          </div>
          <div>
            <div>
              <van-uploader name="uploader" :after-read="Read">
                <div v-if="againstPicState">
                  <img alt v-if="againstPic !=''" :style="{backgroundImage: 'url('+againstPic+')'}" />
                  <van-loading type="spinner" color="#1989fa" v-else />
                </div>
                <van-icon name="photograph" v-else />
              </van-uploader>
            </div>
            <p>身份证反面或户口本本人页</p>
          </div>
        </div>
      </div>
    </div>

    <div class="area" v-show="areaStatus">
      <van-area :area-list="areaList" @confirm="confirm" @cancel="cancel" />
    </div>
    <div class="recipient_footer">
      <van-button type="primary" @click="nextStep">下一步</van-button>
    </div>
  </div>
</template>

<script>
import gradeName from "@/components/selectGrade";
import service from "@/api";
import uploadImg from "@/mixins/uploadImg";
import commom from "@/mixins/commom";
import { idCard, isPhone, age, realName } from "@/utils/validator";
import focus from "@/mixins/focus";
import AreaList from "@/mock/mock";
export default {
  data() {
    return {
      name: "",
      cardId: "",
      age: "",
      areaList: AreaList
    };
  },
  mixins: [uploadImg, focus, commom],
  components: {
    gradeName
  },
  methods: {
    // 年级选择
    nextStep() {
      let data = {
        cardId: this.cardId,
        classNumber: this.gradexIndex,
        name: this.name,
        urls: [this.positivePic, this.againstPic],
        photo: this.photo,
        age: this.age,
        region: this.area
      };
      this.testIdCard(data);
    },

    async testIdCard(data) {
      if (this.photo === "") {
        this.$toast("请上传头像");
        return false;
      }
      if (!realName(this.name)) {
        this.$toast("请正确填写真实姓名");
        return false;
      }

      if (this.grade === "") {
        this.$toast("请选择班级");
        return false;
      }

      if (this.area === "请选择地区") {
        this.$toast("请选择地址");
        return false;
      }

      if (this.positivePic == "" || this.againstPic == "") {
        this.$toast("请上传身份证图片");
        return false;
      }
      if (!idCard(this.cardId)) {
        this.$toast("请正确填写身份证号码");
        return false;
      }
      if (this.age < 6 || this.age > 18) {
        this.$toast("年龄不在合理范围内");
        return false;
      }

      // let res = await service.verification({
      //   cardId: this.cardId,
      //   name: this.name
      // });
      // if (res.code === 200) {
      //   // console.log(1111);
      //   this.verification(data);
      // } else {
      //   this.$dialog({
      //     message: res.message
      //   });
      // }
      this.verification(data);
    },

    async verification(data) {
      let res = await service.paymenInformation(data);
      console.log(res);
      if (res.code === 200) {
        this.$router.push({
          path: "/index/buyer",
          query: { recipientsId: res.data.recipientsId }
        });
      } else {
        this.$dialog.alert({
          message: res.message
        });
      }
    } // 正面图片上传
  },
  watch: {
    age(val) {
      this.age = decodeURIComponent(val).split(".")[0];
    }
  }
};
</script>

<style lang="less" scoped>
.recipient_form {
  background: #fff;
  p {
    display: flex;
    justify-content: space-between;
    padding: 0.6rem 0.3rem;
    background: #fff;

    span {
      color: #000;
      &:nth-of-type(1) {
        flex: 1;
      }
      &:nth-of-type(2) {
        color: #999;
        margin-right: 0.35rem;
      }
    }
    i {
      color: #ccc;
    }
  }
  .van-field {
    padding: 0.6rem 0.35rem;
    font-size: 0.38rem;
  }
  .IdCard {
    background: #fff;
    margin-top: 0rem !important;
    border-top: 10px solid #f7f7f7;
    > p {
      color: #000;
    }
    > div {
      display: flex;
      justify-content: center;
      padding: 0rem 0.4rem;
      > div {
        flex: 1;
        &:nth-of-type(1) {
          margin-right: 0.3rem;
        }
        > div {
          position: relative;
          left: 0px;
          top: 0px;
          width: 100%;
          > img {
            background-size: 100% 100% !important;
            width: 100%;
            height: 100%;
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0.5;
          }
          .van-uploader {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            border: 1px solid #f7f7f7;
            > div {
              height: 2.8rem;
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              i {
                font-size: 0.6rem;
                color: #666;
              }
              img {
                width: 100%;
                height: 100%;
                background-size: 100% 100% !important;
              }
            }
            > i {
              font-size: 0.6rem;
              color: #666;
              margin: 1rem 0rem;
            }
          }
        }

        > p {
          width: 100%;
          font-size: 0.3rem;
          color: #666;
          display: flex;
          justify-content: center;
          padding: 0.3rem 0rem;
        }
      }
    }
  }
}
.recipient_footer {
  margin-top: 10vh;
  display: flex;
  justify-content: center;
  margin-bottom: 10vh;
  .van-button--primary {
    border-radius: 1rem;
    width: 6rem;
    height: 1.2rem;
    line-height: 1.2rem;
    background: #40d0ad;
    border: none;
    outline: 0;
    font-size: 0.38rem;
  }
}

.photo {
  width: 100vw;
  padding: 0.45rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  height: 1.9rem;
  justify-content: space-between;
  border-bottom: 1px solid #f9f9f9;
  > div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .img {
      display: flex;
      justify-content: flex-end;
      img {
        width: 1rem;
        height: 1rem;
        border-radius: 100%;
        background-size: 100% 100% !important;
        text-align: right;
      }
    }
    > .van-uploader {
      margin: 0 !important;
      padding: 0 !important;
      position: relative;
      left: 0;
      top: 0;
      .img {
        width: 1rem;
        height: 1rem;
        border-radius: 100%;
        background-size: 100% 100% !important;
        text-align: right;
      }
      > div {
        position: relative;
        width: 1rem;
        height: 1rem;
        span {
          width: 1rem;
          height: 1rem;
          color: #fff;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 2;
          font-size: 0.3rem;
          display: flex;
          align-items: center;
          text-align: center;
        }
        i {
          font-size: 0.5rem;
          color: #ccc;
          width: 1rem;
          height: 1rem;
          background: #ccc;
          border-radius: 100%;
          position: absolute;
          left: 0;
          top: 0;
        }
      }
    }
  }
  span {
    font-size: 0.4rem;
  }
}

.area {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 1001;
  .van-area {
    position: absolute;
  }
}

.van-icon-arrow {
  background: transparent;
}
</style>
