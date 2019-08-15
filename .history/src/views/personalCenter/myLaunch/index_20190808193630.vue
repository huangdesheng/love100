<template>
  <div>
    <div class="page-assistanceMutal header" id="header">
      <van-tabs sticky @click="changeHelp">
        <van-tab title="团体">
          <ul class="groupHelp">
            <li
              v-for="(item,index) in myLaunchGroupList"
              :key="index"
              @click="check_details(item.projectId,item.auditStatus)"
            >
              <span
                class="img"
                :style="{backgroundImage: 'url(' + item.projectPhoto + ')', backgroundSize:'cover'}"
              ></span>
              <div>
                <p>
                  <span>{{item.title}}</span>
                  <span v-if="item.auditStatus==0" style="color:#F02310">审核中</span>
                  <span v-if="item.auditStatus==1" style="color:#40D0B3">审核通过</span>
                  <span v-if="item.auditStatus==2" style="color:#F02310">审核不通过</span>
                </p>
                <p>帮扶人数{{item.beenHelpCount}}人,共{{item.allRecipients}}人</p>
              </div>
            </li>
          </ul>
        </van-tab>
        <van-tab title="个人">
          <ul class="personHelp commom">
            <li
              v-for="(item,index) in myLaunchPersonList"
              :key="index"
              @click="person_check(item.recipientsId,item.auditStatus)"
            >
              <p>
                <span>{{item.name}}</span>
                <span>（全国重点大学教育奖励计划）</span>
              </p>

              <div>
                <div>
                  <p>
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
                    <span v-if="item.auditStatus==0" style="color:#F02310">审核中</span>
                    <span v-if="item.auditStatus==1" style="color:#40D0B3">审核通过</span>
                    <span v-if="item.auditStatus==2" style="color:#F02310">审核不通过</span>
                  </p>
                  <p>利益保障中，祝您一切顺利！</p>
                </div>
              </div>
            </li>
          </ul>
        </van-tab>
      </van-tabs>
      <aside class="noData" v-show="noDataStatus" id="noData">
        <div>
          <img
            src="http://love100.qxiao.net:8888/group1/M00/00/02/rBFAEl0S3tGAAMFeAAFFYA3648Y470.png"
            alt
            width="50%"
          />
          <p>当前没有发起记录</p>
          <router-link :to="{path:'/helpProgram'}" tag="button">我要去发起帮扶</router-link>
        </div>
      </aside>
    </div>
  </div>
</template>

<script>
import service from "@/api";
export default {
  data() {
    return {
      myLaunchGroupList: [],
      myLaunchPersonList: [],
      value: 3,
      noDataStatus: false,
      active: 0,
      pages: 0
    };
  },
  mounted() {
    this.myLaunch();
    if (this.$route.query.active === 1) {
      this.active = 1;
    } else {
      this.active = 0;
    }
  },

  activated() {
    if (this.active === 0) {
      this.myLaunch();
    } else if (this.active === 1) {
      this.myLaunchPersonal();
    }
  },
  methods: {
    // 我的团体发起
    async myLaunch() {
      let res = await service.myLaunch({
        pageSize: 100,
        pageNum: 1
      });
      if (res.code === 200) {
        this.myLaunchGroupList = res.data.list;
        this.noDataStatus = false;
      } else if (res.code === 904) {
        if (this.myLaunchGroupList.length === 0) {
          this.noDataStatus = true;
          document.getElementById("noData").style.zIndex = 0;
        } else {
          this.$toast.loading({
            message: "没有更多数据",
            duration: "500"
          });
        }
      }
    },

    //我的个人帮扶（我的发起）
    async myLaunchPersonal() {
      let res = await service.myLaunchPersonal({
        pageSize: 100,
        pageNum: 1
      });
      if (res.code === 200) {
        this.myLaunchPersonList = res.data.list;
        this.noDataStatus = false;
      } else if (res.code === 904) {
        if (this.myLaunchPersonList.length === 0) {
          this.noDataStatus = true;
          document.getElementById("noData").style.zIndex = 0;
        } else {
          this.$toast.loading({
            message: "没有更多数据",
            duration: "500"
          });
        }
      } else {
        this.$toast.loading({
          message: res.message,
          duration: "3000"
        });
      }
    },

    // 点击切换
    changeHelp(index) {
      this.active = index;
      this.pageSize = 100;
      this.pageNum = 1;
      this.currentHeight = 0;
      if (index == 0) {
        if (this.myLaunchGroupList.length === 0) {
          this.myLaunch();
        } else {
          this.noDataStatus = false;
        }
      } else if (index == 1) {
        if (this.myLaunchPersonList.length === 0) {
          this.myLaunchPersonal();
        } else {
          this.noDataStatus = false;
        }
      }
    },

    // 团体详情
    check_details(projectId, status) {
      if (status == "2") {
        this.$router.push({
          path: "/helpProgram/groupResets",
          query: { status: status, projectId: projectId }
        });
        this.$store.commit("check_status");
        this.$store.commit("controlActive");
      } else {
        this.$router.push({
          path: "/helpProgram/programDetails",
          query: { status: status, projectId: projectId }
        });
      }
    },
    // 个人详情
    person_check(recipientsId, status) {
      if (status == "2") {
        // 审核不通过
        this.$router.push({
          path: "/helpProgram/personalApplication",
          query: { status: status, recipientsId: recipientsId }
        });
      } else {
        // 审核通过 和 待审核
        this.$router.push({
          path: "/helpProgram/personProgramDetails",
          query: { status: status, recipientsId: recipientsId }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.page-assistanceMutal {
  background: #fff;
  // padding-top: 0.2rem;
  .groupHelp {
    li {
      display: flex;
      padding: 0.3rem 0rem;
      align-items: center;
      border-bottom: 1px solid #f9f9f9;
      &:nth-last-child {
        border: none;
      }

      .img {
        margin: 0 0.3rem;
        height: 2.5rem;
        width: 2.5rem;
        background-position: center center;
        background-repeat: no-repeat;
        border: 1px solid #f7f7f7;
        border-radius: 0.1rem;
      }
      div {
        flex: 1;
        padding-right: 0.3rem;
        p {
          font-size: 0.4rem;
          color: #333;
          &:nth-of-type(1) {
            display: flex;
            justify-content: space-between;
            span {
              &:nth-of-type(2) {
                font-size: 0.35rem;
                color: #f02310;
                width: 15vh;
                text-align: center;
              }
            }
          }
          &:nth-of-type(2) {
            font-size: 0.38rem;
            color: #999;
            margin-top: 0.8rem;
            text-align: right;
          }
        }
      }
    }
  }
}
.header {
  height: 100vh;
  overflow-y: auto;
}
</style>
