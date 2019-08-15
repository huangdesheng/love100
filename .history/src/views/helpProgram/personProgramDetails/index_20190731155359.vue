<style>
</style>
<template>
  <div>
    <div class="page-personalDetail">
      <div class="top_P">
        <p>
          <span>头像:</span>
          <img :src="personRecipientsVO.photo" alt @click="singleBigTu(personRecipientsVO.photo)" />
        </p>
        <p>
          <span>受助人姓名：</span>
          <span>{{personRecipientsVO.name}}</span>
        </p>
        <p>
          <span>年级：</span>
          <span>{{personRecipientsVO.classNumber}}年级</span>
        </p>
        <p>
          <span>年龄：</span>
          <span>{{personRecipientsVO.age}}岁</span>
        </p>
        <p>
          <span>性别：</span>
          <span>{{personRecipientsVO.sex===1?"男":"女"}}</span>
        </p>
        <p>
          <span>爱心状况：</span>
          <span>
            <van-rate
              v-model="personRecipientsVO.loveValue"
              :count="personRecipientsVO.totalPeriods"
              icon="like"
              void-icon="like-o"
              :size="20"
              color="red"
              void-color="red"
              readonly
            />
          </span>
        </p>
        <p>
          <span>地区：</span>
          <span>{{personRecipientsVO.region}}</span>
        </p>
      </div>
      <div class="footer_P">
        <ul>
          <li>
            <h2>家庭状况</h2>
            <div>
              <p>{{personRecipientsVO.family}}</p>
              <div v-if="familyPic.length !=0" class="morePic">
                <!-- <img
                  v-for="(item,index) in familyPic"
                  :key="index"
                  :src="item"
                  @click="picPreviwe(item,familyPic)"
                />-->

                <span
                  v-for="(item,index) in familyPic"
                  :key="index"
                  class="img"
                  @click="picPreviwe(item,familyPic)"
                  :style="{backgroundImage: 'url(' + item + ')', backgroundSize:'cover'}"
                ></span>

                <!-- <div v-for="(item,index) in familyPic" :key="index">{{item}}</div> -->
                <!-- <img src="@/assets/helpProgram/study_1.png" alt> -->
              </div>
            </div>
          </li>
          <li>
            <h2>学习情况</h2>
            <div>
              <p>{{personRecipientsVO.learn}}</p>
              <div v-if="learnPic.length !=0">
                <!-- <img
                  v-for="(item,index) in learnPic"
                  :key="index"
                  :src="item"
                  alt
                  @click="picPreviwe(item,learnPic)"
                />-->
                <span
                  v-for="(item,index) in learnPic"
                  :key="index"
                  class="img"
                  @click="picPreviwe(item,learnPic)"
                  :style="{backgroundImage: 'url(' + item + ')', backgroundSize:'cover'}"
                ></span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import service from "@/api";
import imagePreview from "@/mixins/imagePreview";
export default {
  data() {
    return {
      personRecipientsVO: {}, //受助人信息
      familyPic: [],
      learnPic: []
    };
  },
  mounted() {
    this.personalHelpDetails(this.$route.query.recipientsId);
  },
  mixins: [imagePreview],
  methods: {
    async personalHelpDetails(recipientsId) {
      var res = await service.personalHelpDetails(recipientsId);
      if (res.code === 200) {
        this.personRecipientsVO = res.data.personRecipientsVO;
        let family = res.data.personRecipientsVO.photos.filter(
          item => item.type === 2
        );
        let learnPic = res.data.personRecipientsVO.photos.filter(
          item => item.type === 3
        );
        this.familyPic = family.length === 0 ? [] : family[0].urls;
        this.learnPic = learnPic.length === 0 ? [] : learnPic[0].urls;
      }
    },
    picPreviwe(items, value) {
      WeixinJSBridge.invoke("imagePreview", {
        urls: value,
        current: items
      });
    }
  }
};
</script>

<style lang="less" scoped>
.top_P {
  background: #fff;
  margin: 0.3rem 0;
  p {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0.35rem;
    border-bottom: 1px solid #f9f9f9;
    &:nth-of-type(1) {
      padding: 0.2rem 0.35rem;
      > span {
        flex: 1;
        font-size: 0.4rem;
        color: #333;
      }
      img {
        width: 1rem;
        height: 1rem;
        border-radius: 100%;
      }
    }
    span {
      font-size: 0.4rem;
      &:nth-of-type(1) {
        font-size: 0.4rem;
        color: #333;
        flex: 1;
      }
      &:nth-of-type(2) {
        color: #999;
      }
    }
  }
}
.footer_P {
  background: #fff;
  ul {
    li {
      padding: 0.55rem 0.35rem 0rem;
      border-bottom: 1px solid #f7f7f7;

      h2 {
        font-size: 0.45rem;
        color: #333;
      }
      > div {
        padding: 0.45rem 0.35rem;
        p {
          color: #999;
          font-size: 0.38rem;
          line-height: 0.5rem;
        }
        > div {
          margin: 0.35rem 0rem;
          display: flex;
          .img {
            // width: 2.5rem;
            // height: 2.5rem;
            // margin-right: 0.1rem;
            display: block;
            width: 2rem !important;
            height: 2rem;
            margin-right: 0.1rem;
            // width: 1rem;
            // height: 1rem;
            border-radius: 5px;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
          }
        }
      }
    }
  }
}
</style>
