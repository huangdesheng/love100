<style></style>
<template>
  <div class="RecipientsInfo">
    <aside class="tip" v-if="item.auditStatus==2">
      <img :src="warning" alt class="warning" />
      <span>{{item.auditDesc}}</span>
    </aside>
    <gradeName
      :selectGrade="selectGrade"
      @cancelSelect="cancelSelect"
      @confirmSelect="confirmSelect"
    />
    <section class="top_info">
      <aside>
        <div class="photo">
          <span>头像</span>
          <div>
            <van-uploader name="uploader" :after-read="photoOnRead">
              <div class="img" v-if="photoStatus">
                <img v-if="item.photo != ''" alt :style="{backgroundImage: 'url('+item.photo+')'}" />
                <van-loading type="spinner" color="#1989fa" v-else />
              </div>
              <i v-else>
                <span>上传头像</span>
              </i>
            </van-uploader>
          </div>
        </div>
        <div>
          <van-field v-model="item.name" label="姓名:" placeholder="请输入受助人姓名" />
        </div>
        <div>
          <van-field
            v-model="item.cardId"
            label="身份证："
            placeholder="请输入受助人身份证号"
            @blur="idCardVerification"
          />
        </div>
        <div>
          <van-field v-model="item.age" label="年龄" placeholder="请输入年龄" readonly />
        </div>
        <div class="grade">
          <span>性别</span>
          <span :class="item.sex == '请选择性别'?'in':'on'">{{item.sexName}}</span>
        </div>
        <div class="love" v-if="auditStatus !=undefined">
          <span>爱心状况：</span>
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
        </div>
        <div class="grade" @click="selectG">
          <span>年级</span>
          <span class="on" v-if="item.classNumber">{{item.classNumber}}年级</span>
          <van-icon name="arrow-down" v-else />
        </div>
        <div class="grade" @click="selectAddress">
          <span>选择地址</span>
          <span :class="item.region==='请选择地址'?'in':'on'">{{item.region}}</span>
        </div>
        <div>
          <van-field v-model="item.address" label="详细地址：" placeholder="请输入详细地址" />
        </div>
      </aside>
      <aside class="IdCard" style="margin:0rem 0;border-bottom:10px solid #f7f7f7">
        <p style="padding:0.45rem;font-size:0.4rem;color:#333">上存受助人身份证照片或者户口本照片</p>
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
            <p>身份证正面或者户口本首页</p>
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
      </aside>
      <aside>
        <div>
          <div class="infoTop" style="border-bottom:5px solid #f9f9f9">
            <div class="textarea">
              <van-field
                v-model="item.family"
                label="家庭情况"
                type="textarea"
                placeholder="请描述受助人家庭详细情况，上传照片更有公信力!"
                rows="1"
                autosize
              />
              <span>（200字/500字）</span>
            </div>

            <div id="morePic">
              <div class="Pic">
                <div v-for="(item,index) in familyPicMore" :key="index">
                  <van-icon
                    name="cross"
                    @click="deletePic({index:index,photoUrl:item,familyStatus:1})"
                  />
                  <span
                    class="img"
                    @click="seeBigTu(item,familyPicMore)"
                    :style="{backgroundImage: 'url(' + item + ')', backgroundSize:'cover'}"
                  ></span>
                </div>
                <template v-if="loadingStatus">
                  <div>
                    <div class="loading">
                      <van-loading type="spinner" color="#1989fa" />
                    </div>
                  </div>
                </template>
              </div>
              <div
                class="van-uploader"
                v-if="familyPicMore.length===3 || familyLength.length===3 ?false:true"
              >
                <div class="upload_warp_left" @click="fileClick">
                  <button class="btn btn-success"></button>
                </div>
                <input type="file" multiple @change="tirggerFile" id="file" accept="image/*" />
                <div>
                  <van-icon name="photograph" />
                </div>
              </div>
            </div>
            <p class="third">照片上传只限三张，请谨慎选择！</p>
          </div>
          <div class="infoTop">
            <div class="textarea">
              <van-field
                v-model="item.learn"
                label="学习情况"
                type="textarea"
                placeholder="请描述受助人学习详细情况，上传照片更有公信力!"
                :autosize="{minRows: 3,maxRows: 15}"
              />
              <span>（200字/500字）</span>
            </div>
            <div id="morePic">
              <div class="Pic">
                <div v-for="(item,index) in stydyPicMore" :key="index">
                  <van-icon
                    name="cross"
                    @click="deletePic({index:index,photoUrl:item,familyStatus:2})"
                  />
                  <span
                    class="img"
                    @click="seeBigTu(item,stydyPicMore)"
                    :style="{backgroundImage: 'url(' + item + ')', backgroundSize:'cover'}"
                  ></span>
                </div>
                <template v-if="studyloadingStatus">
                  <div>
                    <div class="loading">
                      <van-loading type="spinner" color="#1989fa" />
                    </div>
                  </div>
                </template>
              </div>
              <div
                class="van-uploader"
                v-if="stydyPicMore.length===3 || studyLength.length===3 ?false:true"
              >
                <div class="upload_warp_left" @click="studyfileClick">
                  <button class="btn btn-success"></button>
                </div>
                <input
                  type="file"
                  multiple
                  @change="studyTirggerFile"
                  id="studyfile"
                  accept="image/*"
                />
                <div>
                  <van-icon name="photograph" />
                </div>
              </div>
            </div>
            <p class="third">照片上传只限三张，请谨慎选择！</p>
          </div>
        </div>
      </aside>
    </section>
    <footer>
      <button @click="dataClick" class="sumbit_btn">提交</button>
    </footer>
    <div class="area" v-show="areaStatus">
      <van-area :area-list="areaList" @confirm="confirm" @cancel="cancel" />
    </div>
  </div>
</template>

<script>
import gradeName from "@/components/selectGrade";
import service from "@/api";
import { idCard, isPhone, age, realName } from "@/utils/validator";
import focus from "@/mixins/focus";
import AreaList from "@/mock/mock";
import recipoentsUpload from "@/mixins/recipoentsUpload";
import qs from "qs";
import imagePreview from "@/mixins/imagePreview";
import selectAttr from "@/mixins/commom";
export default {
  // data() {
  //   return {
  //     item: {
  //       name: "",
  //       cardId: "",
  //       age: "",
  //       sex: "",
  //       sexName: "请选择性别",
  //       classNumber: "",
  //       region: "请选择地址",
  //       address: "",
  //       photo: "",
  //       family: "",
  //       learn: "",
  //       photos: [
  //         {
  //           type: "1",
  //           urls: []
  //         },
  //         {
  //           type: "2",
  //           urls: []
  //         },
  //         {
  //           type: "3",
  //           urls: []
  //         }
  //       ]
  //     },
  //     pisStatus: 1,
  //     selectGrade: false,
  //     areaStatus: false,
  //     deteleStatus: true,
  //     auditStatus: undefined,
  //     positivePic: "",
  //     againstPic: "",
  //     learnPic: "",
  //     familyPic: "",
  //     check_status: false,
  //     areaList: AreaList
  //   };
  // },

  data() {
    return {
      item: {
        name: "",
        cardId: "",
        age: "",
        sex: "",
        sexName: "",
        classNumber: "",
        region: "请选择地址",
        address: "",
        photo: "",
        family: "",
        learn: "",
        grade: "",
        photos: [
          {
            type: 1,
            urls: []
          },
          {
            type: 2,
            urls: []
          },
          {
            type: 3,
            urls: []
          }
        ]
      },
      selectGrade: false,
      areaStatus: false,
      deteleStatus: true,
      auditStatus: undefined,
      positivePic: "",
      againstPic: "",
      learnPic: "",
      familyPic: "",
      check_status: false,
      areaList: AreaList,
      warning: require("@/assets/warning.png")
    };
  },

  components: {
    gradeName
  },

  mixins: [focus, recipoentsUpload, selectAttr, imagePreview],
  mounted() {
    let status = this.$route.query.status;
    if (status == undefined) {
    } else {
      let recipientsId = this.$route.query.recipientsId;
      this.myLaunchPtPer(recipientsId, status);
    }
  },
  methods: {
    async myLaunchPtPer(recipientsId, status) {
      let res = await service.myLaunchPtPer(recipientsId);
      // 直接不要显示加载图
      this.photoStatus = true;
      this.positivePicState = true;
      this.againstPicState = true;
      if (res.code === 200) {
        this.item = res.data;
        this.item.sexName = res.data.sex === 1 ? "男" : "女";
        // 判断身份证 家庭 学习 图片 是否存在并 处理
        this.positivePic = res.data.photos.filter(
          item => item.type == 1
        )[0].urls[0];
        this.againstPic = res.data.photos.filter(
          item => item.type == 1
        )[0].urls[1];

        var stydyPicMore = res.data.photos.filter(item => item.type == 3);
        if (stydyPicMore.length == 0) {
          this.stydyPicMore = [];
          this.studyPic = [];
          this.item.photos.push({
            type: 3,
            urls: []
          });
        } else {
          this.studyPic = stydyPicMore[0].urls;
          this.stydyPicMore = stydyPicMore[0].urls;
        }
        var familyPicMore = res.data.photos.filter(item => item.type == 2);
        if (familyPicMore.length == 0) {
          this.familyPicMore = [];
          this.morePic = [];
          this.item.photos.push({
            type: 2,
            urls: []
          });
        } else {
          this.morePic = familyPicMore[0].urls;
          this.familyPicMore = familyPicMore[0].urls;
        }
      }
    },

    // 家庭(学习)图片上传
    fileClick(e) {
      if (this.loadingStatus) {
        return false;
      } else {
        document.getElementById("file").click();
      }
    },
    tirggerFile(e) {
      if (this.loadingStatus) {
        return false;
      } else {
        this.moreUploadImg(e, 3);
      }
    },
    studyfileClick(e) {
      if (this.studyloadingStatus) {
        return false;
      } else {
        document.getElementById("studyfile").click();
      }
    },
    studyTirggerFile(e) {
      if (this.studyloadingStatus) {
        return false;
      } else {
        this.moreUploadImg(e, 4);
      }
    },

    // 图片删除
    deletePic(item) {
      this.DeletePic(item);
    },
    async DeletePic(item) {
      let res = await service.deletePic({
        obj: item.photoUrl
      });
      if (res.code === 200) {
        if (item.familyStatus === 1) {
          this.familyPicMore.splice(item.index, 1);
          this.morePic.splice(item.index, 1);
          if (this.familyPicMore.length <= 2) {
            this.familyLength = [];
          }
        } else if (item.familyStatus === 2) {
          this.stydyPicMore.splice(item.index, 1);
          this.studyPic.splice(item.index, 1);
          if (this.stydyPicMore.length <= 2 || this.stydyPicMore === "") {
            this.studyLength = [];
          }
        }
      }
    },

    dataClick() {
      this.testIdCard();
    },
    async testIdCard() {
      if (this.item.photo === "") {
        this.$toast("请上传头像");
        return false;
      }
      if (this.item.age < 6 || this.item.age > 18) {
        this.$toast("年龄不在合理范围内");
        return false;
      }
      if (this.item.sexName == "男") {
        this.item.sex = 1;
      } else if (this.item.sexName == "女") {
        this.item.sex = 2;
      }

      if (this.item.classNumber === "") {
        this.$toast("请选择年级");
        return false;
      }
      if (this.item.address === "") {
        this.$toast("请正确填写详细地址");
        return false;
      }
      if (this.item.SSX === "请选择地址") {
        this.$toast("请正确填写地址");
        return false;
      }
      if (
        this.item.photos[0].urls.length < 2 ||
        this.item.photos[0].urls[1] == null ||
        this.item.photos[0].urls[0] == null
      ) {
        this.$toast("请上传身份证图片");
        return false;
      }
      if (
        this.item.family.length === 0 ||
        this.item.family.length < 200 ||
        this.item.family.length > 500
      ) {
        this.$toast("家庭情况字数不在范围内");
        return false;
      }
      if (
        this.item.learn.length === 0 ||
        this.item.learn.length < 200 ||
        this.item.learn.length > 500
      ) {
        this.$toast("学习情况字数不在范围内");
        return false;
      }
      // let res = await service.verification({
      //   cardId: this.item.cardId,
      //   name: this.item.name
      // });
      // if (res.code === 200) {
      //   if (this.$route.query.status == 2) {
      //     this.updataPersonalInfo(this.item);
      //   } else {
      //     this.uploadPersonalInfo(this.item);
      //   }
      // } else {
      //   this.$dialog({
      //     message: res.message
      //   });
      // }

      if (this.$route.query.status == 2) {
        this.updataPersonalInfo(this.item);
      } else {
        this.uploadPersonalInfo(this.item);
      }
    },

    // 保存提交
    async uploadPersonalInfo(params) {
      let res = await service.personApply(params);
      if (res.code === 200) {
        this.$dialog
          .confirm({
            message: res.data.msg,
            cancelButtonText: "我的发起",
            confirmButtonText: "确定",
            confirmButtonColor: "#40D0B3",
            cancelButtonColor: "#666"
          })
          .then(() => {
            // 返回到帮扶首页
            this.$router.replace({ path: "/helpProgram" });
          })
          .catch(() => {
            // 返回到我的发起
            this.$router.replace({ path: "/personalCenter/myLaunch" });
          });
      } else {
        this.$dialog.alert({
          message: res.message
        });
      }
    },
    // 修改提交
    async updataPersonalInfo(params) {
      let res = await service.updataPersonApply(params);
      if (res.code === 200) {
        this.$dialog
          .confirm({
            message: res.data.msg,
            cancelButtonText: "我的发起",
            confirmButtonText: "确定",
            confirmButtonColor: "#40D0B3",
            cancelButtonColor: "#666"
          })
          .then(() => {
            // 返回到帮扶首页

            this.$router.replace({ path: "/helpProgram" });
          })
          .catch(() => {
            // 返回到我的发起
            this.$router.replace({ path: "/personalCenter/myLaunch" });
          });
      } else {
        this.$dialog.alert({
          message: res.message
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.RecipientsInfo {
  width: 100%;
  background: #fff;
  .top_info {
    width: 100%;
    aside {
      // width: 100%;
      &:nth-of-type(1) {
        .photo {
          width: 100vw;
          padding: 0.45rem;
          margin: 0 auto;
          display: flex;
          align-items: center;
          height: 1.5rem;
          justify-content: space-between;
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
                // padding-right: 0.45rem;
                background-size: 100% 100% !important;
                text-align: right;
              }
            }
            > .van-uploader {
              margin: 0 !important;
              padding: 0 !important;
              > i {
                display: flex;
                align-items: center;
                font-size: 0.32rem;
                color: #ccc;
                width: 1rem;
                height: 1rem;
                background: #ccc;
                border-radius: 100%;
                font-style: normal;
                text-align: center;
                justify-content: center;
                > span {
                  font-size: 0.3rem;
                  width: 70%;
                  color: #fff;
                }
                // }
              }
            }
          }
          span {
            font-size: 0.4rem;
          }
        }
        .grade {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0.35rem;
          font-size: 0.4rem;
          color: #666;
          span {
            &:nth-of-type(1) {
              flex: 1;
              color: #333;
            }
          }

          i {
            color: #ccc;
            margin-left: 0.3rem;
          }
        }
        > div {
          border-bottom: 1px solid #f7f7f7;
          &:last-of-type {
            border: none;
          }
          > .van-field {
            font-size: 0.4rem;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            padding: 0.5rem 0.35rem;
          }
        }
      }
    }
  }
}
footer {
  width: 100vw;
  display: flex;
  justify-content: center;
  button {
    width: 80vw;
    background: #40d0b3;
    padding: 0.35rem 2rem;
    margin: 1.5rem 0rem;
    border-radius: 2rem;
    font-size: 0.45rem;
    color: #fff;
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

.love {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.35rem;
  font-size: 0.4rem;
  color: #333;
}

.third {
  padding: 0.1rem 0.4rem;
  color: #ccc;
  font-size: 0.35rem;
  color: red;
}

.on {
  color: #999;
  font-size: 0.38rem;
}

.in {
  color: #ccc;
  font-size: 0.35rem;
}
</style>

