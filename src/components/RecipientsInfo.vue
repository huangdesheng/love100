<style></style>
<template>
  <div class="RecipientsInfo">
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
            <div v-if="photo != ''" class="img">
              <img alt :style="{backgroundImage: 'url('+photo+')'}">
            </div>
            <van-uploader name="uploader" :after-read="photoOnRead">
              <van-icon name="arrow"/>
            </van-uploader>
            <!-- <van-icon name="arrow"/> -->
          </div>
        </div>
        <div>
          <van-field v-model="name" label="姓名:" placeholder="请输入法人姓名"/>
        </div>
        <div>
          <van-field v-model="cardId" label="身份证：" placeholder="请输入法人身份证号码"/>
        </div>
        <div>
          <van-field v-model="age" label="年龄" placeholder="请输年龄"/>
        </div>
        <div>
          <van-field v-model="sex" label="性别" placeholder="请输入您的性别"/>
        </div>
        <div class="grade" @click="selectG">
          <span>年级</span>
          <span>{{grade}}</span>
          <van-icon name="arrow-down"/>
        </div>
        <!-- <div>
          <p @click="selectG">
            <span>年级</span>
            <span>{{grade}}</span>
            <van-icon name="arrow-down"/>
          </p>
        </div>-->
        <div class="grade" @click="selectG">
          <span>选择地址</span>
          <span style="color:#999">{{SSX}}</span>
        </div>
        <div>
          <van-field v-model="address" label="详细地址：" placeholder="请输入详细地址"/>
        </div>
      </aside>
      <aside class="IdCard" style="margin:0.45rem 0;border-bottom:10px solid #f7f7f7">
        <p style="padding:0.45rem">上存受助人身份证照片或者户口本照片</p>
        <div>
          <div>
            <div>
              <img alt :style="{backgroundImage: 'url('+positivePic+')'}">
              <van-uploader name="uploader" :after-read="onRead">
                <van-icon name="photograph"/>
              </van-uploader>
            </div>
            <p>身份证正面或者户口本首页</p>
          </div>
          <div>
            <div>
              <img alt :style="{backgroundImage: 'url('+againstPic+')'}">
              <van-uploader name="uploader" :after-read="Read">
                <van-icon name="photograph"/>
              </van-uploader>
            </div>
            <p>身份证反面或户口本受助人本人页</p>
          </div>
        </div>
      </aside>
      <aside>
        <div>
          <div class="infoTop" style="border-bottom:5px solid #f9f9f9">
            <div class="textarea">
              <van-field
                v-model="family"
                label="家庭情况"
                type="textarea"
                placeholder="请输入留言"
                rows="1"
                autosize
              />
              <span>（200字/500字）</span>
            </div>
            <!-- </van-cell-group> -->
            <div class="IdCard" style="border-top:0;padding-bottom:0.45rem">
              <div>
                <div>
                  <div>
                    <img alt :style="{backgroundImage: 'url('+familyPic+')'}">
                    <van-uploader name="uploader" :after-read="familyOnRead">
                      <van-icon name="photograph"/>
                    </van-uploader>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="infoTop">
            <div class="textarea">
              <van-field
                v-model="learn"
                label="学习情况"
                type="textarea"
                placeholder="请输入留言"
                rows="1"
                autosize
              />
              <span>（200字/500字）</span>
            </div>
            <!-- </van-cell-group> -->
            <div class="IdCard" style="border-top:0;padding-bottom:0.45rem">
              <div>
                <div>
                  <div>
                    <img alt :style="{backgroundImage: 'url('+learnPic+')'}">
                    <van-uploader name="uploader" :after-read="learnOnRead">
                      <van-icon name="photograph"/>
                    </van-uploader>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </section>
    <footer>
      <button @click="deleteList" v-if="deteleStatus">删除受助人</button>
      <button @click="dataClick" class="sumbit_btn">提交</button>
    </footer>
    <van-area :area-list="areaList" v-show="areaStatus" @confirm="confirm" @cancel="cancel"/>
  </div>
</template>

<script>
import gradeName from "./selectGrade";
import service from "@/api";
import { idCard, isPhone } from "@/utils/validator";
export default {
  data() {
    return {
      selectGrade: false,
      areaStatus: false,
      deteleStatus: true,
      name: "",
      cardId: "",
      age: "",
      sex: "",
      SSX: "请选择地址",
      classNumber: "",
      regionId: "",
      address: "",
      photo: "",
      family: "",
      learn: "",
      positivePic: "",
      againstPic: "",
      grade: "",
      positivePic: "",
      againstPic: "",
      learnPic: "",
      familyPic: "",
      photoDTOS: [
        {
          type: "1",
          urls: []
        },
        {
          type: "2",
          urls: []
        },
        {
          type: "3",
          urls: []
        }
      ],
      areaList: {
        province_list: {
          110000: "北京市",
          120000: "天津市"
        },
        city_list: {
          110100: "北京市",
          110200: "县",
          120100: "天津市",
          120200: "县"
        },
        county_list: {
          110101: "东城区",
          110102: "西城区",
          110105: "朝阳区",
          110106: "丰台区",
          120102: "河东区",
          120103: "河西区",
          120104: "南开区",
          120105: "河北区"
        }
      }
    };
  },
  components: {
    gradeName
  },
  props: ["RecipientsIndex", "updataList"],
  mounted() {},
  methods: {
    onRead(e) {
      this.uploadImg(e, 1);
    },
    selectG() {
      this.selectGrade = true;
    },
    cancelSelect(val) {
      this.selectGrade = val;
    },
    confirmSelect(val) {
      this.selectGrade = val.state;
      this.grade = val.value;
      this.classNumber = val.index + 1;
    },
    async uploadImg(e, index) {
      let formdata = new FormData();
      formdata.append("file", e.file);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      var resolve = await service.singleUpload(formdata, config);
      if (resolve.code === 200) {
        if (index === 1) {
          this.photoDTOS[0].urls[0] = resolve.data.photoUrl;
          this.positivePic = resolve.data.photoUrl;
        } else if (index === 2) {
          this.photoDTOS[0].urls[1] = resolve.data.photoUrl;
          this.againstPic = resolve.data.photoUrl;
        } else if (index === 3) {
          this.photoDTOS[2].urls[0] = resolve.data.photoUrl;
          this.familyPic = resolve.data.photoUrl;
        } else if (index === 4) {
          this.photoDTOS[1].urls[0] = resolve.data.photoUrl;
          this.learnPic = resolve.data.photoUrl;
        } else {
          this.photo = resolve.data.photoUrl;
        }
      }
    },
    Read(e) {
      this.uploadImg(e, 2);
    },
    photoOnRead(e) {
      this.uploadImg(e, 0);
    },
    learnOnRead(e) {
      this.uploadImg(e, 4);
    },
    familyOnRead(e) {
      this.uploadImg(e, 3);
    },
    deleteList() {
      this.$emit("deleteInfo", false, this.RecipientsIndex);
    },
    dataClick() {
      if (this.sex == "男") {
        this.sex = 1;
      } else if (this.sex == "女") {
        this.sex = 2;
      } else {
        this.sex = 0;
      }
      var data = {
        name: this.name,
        cardId: this.cardId,
        age: this.age,
        sex: this.sex,
        classNumber: this.classNumber,
        regionId: this.regionId,
        address: this.address,
        photo: this.photo,
        family: this.family,
        learn: this.learn,
        photoDTOS: this.photoDTOS
      };

      if (this.photo === "") {
        this.$toast("请上传头像");
        return false;
      }

      if (!idCard(this.cardId)) {
        this.$toast("请正确填写身份证号");
        return false;
      }
      if (this.age === "") {
        this.$toast("输入年龄");
        return false;
      }
      if (this.sex === "") {
        this.$toast("请填写性别");
        return false;
      }
      if (this.classNumber === "") {
        this.$toast("请选择班级");
        return false;
      }
      if (this.address === "") {
        this.$toast("请正确填写详细地址");
        return false;
      }
      if (this.regionId === "") {
        this.$toast("请正确填写地址");
        return false;
      }
      if (this.family === "") {
        this.$toast("请填写家庭情况");
        return false;
      }
      if (this.learn === "") {
        this.$toast("请填写学习情况");
        return false;
      }
      if (this.photoDTOS[0].urls.length < 2) {
        this.$toast("请上传身份证图片");
        return false;
      }
      this.$emit("addInfo", data, false, this.RecipientsIndex);
    },
    selectAddress() {
      this.areaStatus = true;
    },
    confirm(val) {
      this.SSX = val[0].name + "-" + val[1].name + "-" + val[2].name;
      this.regionId = val[2].code;
      this.areaStatus = false;
    },
    cancel() {
      this.areaStatus = false;
    }
  },
  watch: {
    RecipientsIndex(val) {
      if (val == "" || val == null) {
        this.deteleStatus = false;
        this.$options.data();
      }
    },
    updataList(val) {
      console.log(val);
      if (val == "" || val == null) {
        (this.deteleStatus = false),
          (this.name = ""),
          (this.cardId = ""),
          (this.age = ""),
          (this.sex = ""),
          (this.classNumber = ""),
          (this.regionId = ""),
          (this.address = ""),
          (this.phot = ""),
          (this.family = ""),
          (this.learn = ""),
          (this.photoDTOS = [
            {
              type: "1",
              urls: []
            },
            {
              type: "2",
              urls: []
            },
            {
              type: "3",
              urls: []
            }
          ]);
      } else {
        (this.deteleStatus = true),
          (this.name = val.name),
          (this.cardId = val.cardId),
          (this.age = val.age),
          (this.sex = val.sex),
          (this.classNumber = val.classNumber),
          (this.regionId = val.regionId),
          (this.address = val.address),
          (this.phot = val.photo),
          (this.famil = val.family),
          (this.learn = val.learn),
          (this.photoDTOS = val.photoDTOS);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.RecipientsInfo {
  width: 100%;
  height: 100vh;
  background: #fff;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  .top_info {
    width: 100%;
    height: 90vh;
    overflow-y: auto;
    aside {
      width: 100%;
      &:nth-of-type(1) {
        .photo {
          width: 100vw;
          padding: 0.45rem;
          margin: 0 auto;
          display: flex;
          align-items: center;
          height: 2.5rem;
          justify-content: space-between;
          > div {
            display: flex;
            align-items: center;
            // flex: 1;
            justify-content: flex-end;
            .img {
              // flex: 1;
              display: flex;
              justify-content: flex-end;
              img {
                width: 1.5rem;
                height: 1.5rem;
                border-radius: 100%;
                padding-right: 0.45rem;
                background-size: 100% 100% !important;
                text-align: right;
              }
            }
            > .van-uploader {
              margin: 0 !important;
              padding: 0 !important;
              i {
                font-size: 0.5rem;
                color: #999;
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
          padding: 0.4rem;
          font-size: 0.4rem;
          color: #666;
          span {
            &:nth-of-type(1) {
              flex: 1;
              color: #333;
            }
          }

          i {
            color: #666;
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
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    z-index: 101;
    width: 100%;
    button {
      flex: 1;
      padding: 0.6rem 0rem;
      background: #40d0b3;
      color: #fff;
      font-size: 0.4rem;
      &:nth-of-type(2) {
        background: #ccc;
      }
    }
    .sumbit_btn {
      background: #40d0b3;
    }
  }
}
</style>
