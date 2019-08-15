<style></style>
<template>
  <div class="RecipientsInfo">
    <gradeName
      :selectGrade="selectGrade"
      @cancelSelect="cancelSelect"
      @confirmSelect="confirmSelect"
    />
    <section class="top_info" :style="{paddingBottom:this.recipientsId === undefined?0:'2rem'}">
      <aside>
        <div class="photo">
          <span>头像</span>
          <div>
            <van-uploader
              name="uploader"
              :after-read="photoOnRead"
              accept="image/png, image/gif, image/jpeg"
            >
              <div class="img" v-if="photoStatus">
                <img v-if="item.photo != ''" alt :style="{backgroundImage: 'url('+item.photo+')'}" />
                <van-loading type="spinner" color="#1989fa" v-else />
              </div>
              <van-icon v-else />
            </van-uploader>
          </div>
        </div>
        <div>
          <van-field v-model="item.name" label="姓名:" placeholder="请输入法人姓名" />
        </div>
        <div>
          <van-field
            v-model="item.cardId"
            label="身份证："
            placeholder="请输入法人身份证号码"
            pattern="^([0-9]){7,18}(x|X)?$"
            @blur="idCardVerification"
          />
        </div>
        <div>
          <van-field v-model="item.age" label="年龄" placeholder="请输年龄" pattern="[0-9]*" />
        </div>
        <div class="grade">
          <span>性别</span>
          <span style="color:#ccc;font-size:0.35rem" v-if="item.sexName == '请选择性别'">{{item.sexName}}</span>
          <span style="color:#999;font-size:0.38rem" v-else>{{item.sexName}}</span>
        </div>
        <div class="grade" @click="selectG">
          <span>年级</span>
          <van-icon v-if="item.classNumber==''" name="arrow-down" />
          <span style="color:#999" v-else>{{item.classNumber}}年级</span>
        </div>
        <div class="grade" @click="selectAddress">
          <span>选择地址</span>
          <span style="color:#ccc;font-size:0.35rem" v-if="item.region==='请选择地址'">{{item.region}}</span>
          <span style="color:#999;font-size:0.38rem" v-else>{{item.region}}</span>
        </div>
        <div>
          <van-field v-model="item.address" label="详细地址：" placeholder="请输入详细地址" />
        </div>
      </aside>
      <aside class="IdCard" style="margin:0;border-bottom:10px solid #f7f7f7">
        <p style="padding:0.45rem;font-size:0.4rem">上存受助人身份证照片或者户口本照片</p>
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
                :placeholder="familyPlaceholder"
                rows="1"
                autosize
                @focus="familySituation"
                @blur="familyBlur"
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
                <!-- </template> -->
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
                <input
                  type="file"
                  multiple
                  @change="tirggerFile"
                  id="file"
                  accept="image/png, image/gif, image/jpeg"
                />
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
                :placeholder="studyPlaceholder"
                rows="1"
                autosize
                @focus="studySituation"
                @blur="studyBlur"
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
                  <!-- <img :src="item" alt @click="seeBigTu(item,stydyPicMore)" /> -->
                  <span
                    class="img"
                    @click="seeBigTu(item,stydyPicMore)"
                    :style="{backgroundImage: 'url(' + item + ')', backgroundSize:'cover'}"
                  ></span>
                </div>
                <!-- </template> -->
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
                  accept="image/png, image/gif, image/jpeg"
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
    <footer v-if="recipientsId === undefined">
      <button @click="dataClick" class="sumbit_btn">提交</button>
    </footer>
    <footer v-else class="updata">
      <button @click="deleteList">删除受助人</button>
      <button @click="updataClick" class="sumbit_btn">提交</button>
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
import AreaList from "@/mock/mock";
import focus from "@/mixins/focus";
import recipoentsUpload from "@/mixins/recipoentsUpload";

export default {
  // data() {
  //   return {
  //     selectGrade: false,
  //     areaStatus: false,
  //     deteleStatus: false, //true代表修改受助人信息,false代表添加受助人信息
  //     photo: "",
  //     positivePic: "",
  //     againstPic: "",
  //     positivePic: "",
  //     againstPic: "",
  //     learnPic: "",
  //     familyPic: "",
  //     item: {
  //       name: "",
  //       cardId: "",
  //       age: "",
  //       sex: "请选择性别",
  //       sexName: "请选择性别",
  //       classNumber: "",
  //       region: "请选择地址",
  //       address: "",
  //       photo: "",
  //       family: "",
  //       learn: "",
  //       grade: "",
  //       positivePic: "",
  //       againstPic: "",
  //       learnPic: "",
  //       familyPic: "",
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
  //     areaList: AreaList
  //   };
  // },

  data() {
    return {
      selectGrade: false,
      areaStatus: false,
      deteleStatus: false, //true代表修改受助人信息,false代表添加受助人信息
      photo: "",
      positivePic: "",
      againstPic:
        "http://192.168.18.253:8888/group1/M00/00/0F/wKgS_V0AXueAftp5AAA9ripTkdU211.jpg",
      learnPic:
        "http://192.168.18.253:8888/group1/M00/00/06/wKgS_VznwBuAO-0CAACeELRnmUs41.JPEG",
      familyPic:
        "http://192.168.18.253:8888/group1/M00/00/06/wKgS_VznwBuAO-0CAACeELRnmUs41.JPEG",
      recipientsId: "",
      item: {
        name: "匿名",
        cardId: "441621201008061234",
        age: "20",
        sex: "1",
        sexName: "男",
        classNumber: "1",
        region: "广东省广州市天河区",
        address: "华景新城华港商业大厦东塔1703",
        photo: "",
        family:
          "1父权家庭：是历史上大多数家庭的模式，即家庭中最年长的男性拥有大部分权威，包括住、用、孩子对象等。女性负责家务和照顾孩子。2母权家庭：即家庭中最年长的女性拥有大部分权威。没有确凿证据表明妇女曾同样拥有过男人所具有的权威。父系社会里，个别家庭也可能由于没有最年长的男性而由女性领导。3母主家庭：一位妇女成为家庭的核心和最主要成员，常发生在男性由于战争、外出、离婚、非婚生育等境况下，但不在家的丈夫、前夫、同居男友依然行使相当的权利。3平权家庭：现代社会出现了朝平权家庭发展的趋势，即丈夫和妻子在权利和特权上基本平等 。但许多重要决定还是由丈夫作出的。4通勤家庭：在不同城市里工作的夫妻，周末在其中一方的住处度过",
        learn:
          "学习方式：继续采取四个结合和四个为主：即中心组集中学与个人自学相结合，以自学为主。集中学每月至少保证一次;二是合分学相结合，以分学为主。根据学习的内容和要求，可与局机关合在一起学，集中学每月至少保证一次;二是合分学相结合，以分学为主。根据学习的内容和要求，可与局机关合在一起学，也可中心组单独学;三是学原文与听辅导相结合，以学原文为主，加深对原文的理解。同时，坚持学习形式的多样化，既有会议形式学习，又有党校教授专题授课、学习观看中央台电视理论文献片、组织参观反腐倡廉",
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
      areaList: AreaList
    };
  },
  components: {
    gradeName
  },
  mixins: [focus, recipoentsUpload],
  mounted() {
    // 1修改受助人信息
    let recipientsId = this.$route.query.recipientsId;
    this.recipientsId = recipientsId;
    // 判断是修改还是添加
    if (recipientsId != undefined) {
      this.RecipientsInfo(recipientsId);
      this.photoStatus = true;
      this.positivePicState = true;
      this.againstPicState = true;
      this.familyStatus = true;
      this.learnStatus = true;
    }
  },
  methods: {
    // 修改受助人信息
    async RecipientsInfo(recipientsId) {
      let res = await service.RecipientsInfo(recipientsId);
      console.log(res);
      if (res.code === 200) {
        this.item = res.data;
        this.item.sexName = res.data.sex === 1 ? "男" : "女";
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
      } else {
        this.$dialog.alert({
          message: res.message
        });
      }
    },

    // 删除受助人
    deleteList() {
      let projectId = this.$route.query.projectId;
      let status = this.$route.query.status;
      this.$dialog
        .alert({
          message: "确定要删除该受助人吗？"
        })
        .then(res => {
          service.delRecipients(this.recipientsId).then(resolve => {
            if (resolve.code === 200) {
              if (status == undefined) {
                this.$router.push({
                  path: "/helpProgram/groupResets",
                  query: { active: 2 }
                });
              } else {
                this.$router.push({
                  path: "/helpProgram/groupResets",
                  query: { status: status, projectId: projectId, active: 2 }
                });
              }
            } else {
              this.$dialog.alert({
                message: resolve.message
              });
            }
          });
        })
        .catch(() => {});
    },

    // 修改信息
    updataClick() {
      this.validator();
    },
    // 添加信息
    dataClick() {
      this.validator();
    },
    async validator() {
      if (this.item.photo === "") {
        this.$toast("请上传头像");
        return false;
      }
      if (!realName(this.item.name)) {
        this.$toast("请填写真实姓名");
        return false;
      }
      if (!idCard(this.item.cardId)) {
        this.$toast("请正确填写身份证号");
        return false;
      }
      if (this.item.age < 6 || this.item.age > 19) {
        this.$toast("年龄不在合理范围内");
        return false;
      }

      if (this.item.sexName == "男" || this.item.sexName == "女") {
      } else {
        this.$toast("请填写性别'男'或者你'女'");
        return false;
      }

      if (this.item.sexName == "男") {
        this.item.sex = 1;
      } else if (this.item.sexName == "女") {
        this.item.sex = 2;
      }

      if (this.item.classNumber === "") {
        this.$toast("请选择班级");
        return false;
      }
      if (this.item.address === "") {
        this.$toast("请正确填写详细地址");
        return false;
      }
      if (this.item.region === "请选择地址") {
        this.$toast("请正确填写地址");
        return false;
      }
      if (this.item.photos[0].urls.length < 2) {
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

      //判断recipientsId是否存在 存在就是修改，不存在及时添加
      if (this.recipientsId != undefined) {
        this.item = Object.assign({}, this.item, {
          recipientsId: this.recipientsId
        });
      }

      this.saveRecipients(this.item);
    },

    async saveRecipients(data) {
      let projectId = this.$route.query.projectId;
      let status = this.$route.query.status;
      let items = Object.assign({}, data, { projectId: projectId });
      let res = await service.saveRecipients(items);
      if (res.code === 200) {
        if (status == undefined) {
          this.$router.push({
            path: "/helpProgram/groupResets",
            query: { active: 2 }
          });
        } else {
          this.$router.push({
            path: "/helpProgram/groupResets",
            query: { status: status, projectId: projectId, active: 2 }
          });
        }
      } else {
        this.$dialog.alert({
          message: res.message
        });
      }
    },

    // 选择年级
    selectG() {
      this.selectGrade = true;
    },
    cancelSelect(val) {
      this.selectGrade = val;
    },
    confirmSelect(val) {
      this.selectGrade = val.state;
      this.item.grade = val.value;
      this.item.classNumber = val.index + 1;
    },

    // 地址
    selectAddress() {
      this.areaStatus = true;
    },
    confirm(val) {
      this.item.region = val[0].name + " " + val[1].name + " " + val[2].name;
      this.areaStatus = false;
    },
    cancel() {
      this.areaStatus = false;
    },

    // 图片删除
    deletePic(item) {
      this.DeletePic(item);
    },

    // 图片预览
    seeBigTu(item, value) {
      WeixinJSBridge.invoke("imagePreview", {
        urls: value,
        current: item
      });
    },

    // 家庭图片上传
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

    // 学习图片上传
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

    //  删除图片的方法
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
      width: 100%;
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
                background-position: center center;
                background-repeat: no-repeat;
                background-size: cover;
                text-align: right;
              }
            }
            > .van-uploader {
              margin: 0 !important;
              padding: 0 !important;
              > i {
                font-size: 0.5rem;
                color: #ccc;
                width: 1rem;
                height: 1rem;
                background: #ccc;
                border-radius: 100%;
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
  footer {
    display: flex;
    z-index: 101;
    width: 100%;
    button {
      width: 80%;
      margin: 1rem auto;
      padding: 0.4rem 0rem;
      background: #40d0b3;
      color: #fff;
      font-size: 0.4rem;
      border-radius: 1rem;
      &:nth-of-type(2) {
        background: #ccc;
      }
    }
    .sumbit_btn {
      background: #40d0b3;
    }
  }
}
.updata {
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 0;
  margin: 0;
  background: #fff;

  button {
    margin: 0 !important;
    padding: 0.5rem !important;
    border-radius: 0 !important;
    &:nth-of-type(1) {
      background: #ccc !important;
    }
    &:nth-of-type(2) {
      background: #40d0b3 !important;
    }
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
.third {
  padding: 0.1rem 0.4rem;
  color: #ccc;
  font-size: 0.35rem;
  color: red;
}
</style>
