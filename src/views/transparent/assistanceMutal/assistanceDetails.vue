<template>
  <div class="page-assistanceDetails">
    <div class="content">
      <div class="contentUp">
        <div class="content-top">
          <span
            class="img"
            @click="singleBigTu(details.photo)"
            :style="{backgroundImage: 'url(' + details.photo + ')', backgroundSize:'cover'}"
          ></span>
          <div>
            <div>全国重点大学教育奖励计划</div>
            <p>
              <span>{{details.name}}</span>
              <span>
                <van-rate
                  v-model="details.loveValue"
                  :count="details.totalPeriods"
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
        </div>
        <div class="content-details">
          <p>
            <span>年龄: {{details.age}}岁</span>
            <span>
              公示情况:
              <i v-if="details.type==1">公示中</i>
              <i v-if="details.type==2">已完成</i>
            </span>
          </p>
          <p>
            <span>年级: {{details.classNumber}}年级</span>
            <span>公示时间: {{details.adoptTime}}</span>
          </p>
          <p>
            <span>地区: {{details.region}}</span>
            <span>加入时间: {{details.postTime}}</span>
          </p>
        </div>
      </div>
      <van-row>
        <van-col span="12">
          <p>{{details.bonus}}</p>
          <p>获得奖励金</p>
        </van-col>
        <van-col span="12">
          <p>{{details.caringPeople}}</p>
          <p>爱心人士</p>
        </van-col>
      </van-row>

      <div class="contentDetails">
        <div>
          <h3>事件描述</h3>
          <p>{{details.eventDescription}}</p>
        </div>
        <div>
          <h3>调查结论</h3>
          <p>{{details.conclusion}}</p>
        </div>
        <div>
          <h3>相关材料</h3>
          <p>{{details.materialScience}}</p>
        </div>
      </div>

      <div class="Report">
        <router-link
          :to="{path: '/assistanceMutal/report',query:{recipientsId:details.investigationId}}"
          tag="div"
        >
          <h3>调查报告</h3>
          <van-icon name="arrow" />
        </router-link>
      </div>
    </div>

    <div class="details_footer">
      <p>举报有奖</p>
      <p>发现受助人信息有假</p>
      <p>可拨打我们客服热线举报</p>
      <p>
        举报电话:
        <i>020-8679524</i>
      </p>
    </div>
  </div>
</template>

<script>
import service from "@/api";
import imagePreview from "@/mixins/imagePreview";
export default {
  data() {
    return {
      value: 5,
      details: {}
    };
  },
  mixins: [imagePreview],
  mounted() {
    let recipientsId = this.$route.query.recipientsId;
    let type = this.$route.query.type;
    this.publicDetails(recipientsId, type);
  },
  methods: {
    async publicDetails(recipientsId, type) {
      let res = await service.publicDetails({
        recipientsId: recipientsId,
        type: type
      });
      if (res.code === 200) {
        this.details = res.data;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  width: 100vw;
  margin: 0 auto;
  background: #fff;
  .contentUp {
    border-bottom: 1px solid #e3e8ed;
    padding: 0.3rem;
    .content-top {
      display: flex;
      align-items: center;
      > div {
        > div {
          font-size: 0.45rem;
          color: #2e2e2e;
        }
        p {
          font-size: 0.4rem;
          display: flex;
          color: #2e2e2e;
          margin-top: 0.35rem;
          span {
            &:nth-of-type(2) {
              margin-left: 0.4rem;
            }
          }
        }
      }
      > .img {
        border-radius: 100%;
        margin: 0.25rem 0.2rem 0.25rem 0rem;
        width: 2rem;
        height: 2rem;
        background-position: center center;
        background-repeat: no-repeat;
      }
    }
    .content-details {
      margin: 0.4rem 0.25rem;
      color: #333;
      > p {
        margin: 0.4rem 0rem;
        &:nth-of-type(1),
        &:nth-of-type(2),
        &:nth-of-type(3),
        &:nth-of-type(4) {
          font-size: 0.38rem;
          display: flex;
          span {
            &:nth-of-type(1) {
              flex: 1;
            }
            &:nth-of-type(2) {
              width: 4rem;
              text-align: left;
            }
            > i {
              font-style: normal;
              color: #40d0b3;
            }
          }
        }
        &:nth-of-type(3) {
          font-size: 0.38rem;
        }
      }
    }
  }
  .van-row {
    padding: 0.5rem 0rem;
    border-bottom: 1px solid #e3e8ed;
    .van-col {
      text-align: center;
      color: #666;
      font-size: 0.45rem;
      p {
        color: #f02310;
        &:nth-of-type(2) {
          margin-top: 0.35rem;
          color: #333333;
          font-size: 0.4rem;
        }
      }
    }
  }
  .contentDetails {
    div {
      padding: 0.6rem 0.3rem;
      border-bottom: 1px solid #e3e8ed;
      &:last-of-type {
        border-bottom: none;
      }
      h3 {
        padding: 0.15rem 0rem 0.45rem 0rem;
        font-size: 0.4rem;
        color: #333;
        font-weight: 600;
      }
      p {
        color: #666;
        font-size: 0.38rem;
        line-height: 0.6rem;
      }
    }
  }
  .Report {
    div {
      display: flex;
      align-items: center;
      padding: 0.9rem 0.3rem;
      border-top: 10px solid #eee;
      h3 {
        flex: 1;
        font-size: 0.4rem;
        font-weight: 600;
        color: #2e2e2e;
      }
      i {
        font-size: 0.5rem;
        color: #999;
      }
    }
  }
}
.details_footer {
  width: 100vw;
  background: #eee;
  padding: 0.8rem 0rem;
  p {
    &:last-of-type {
      color: #333;
      margin-top: 0.35rem;
    }
    padding: 0rem;
    font-size: 0.4rem;
    color: #999;
    line-height: 0.6rem;
    font-size: 0.4rem;
    text-align: center;
    i {
      font-style: normal;
      color: #f02310;
      margin-left: 0.2rem;
    }
  }
}
</style>
