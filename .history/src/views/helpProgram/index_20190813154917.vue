<template>
  <div class="page-helpprogram">
    <div class="header" id="header">
      <div>
        <img :src="img" alt width="100%" />
      </div>
      <van-tabs @click="tabClick">
        <van-tab title="团体">
          <ul class="group" id="group">
            <router-link
              v-for="(item,index) in groupLists"
              :key="index"
              :to="{path:'/helpProgram/programDetails',query: { projectId: item.projectId }}"
              tag="li"
            >
              <div>
                <span
                  class="img"
                  :style="{backgroundImage: 'url(' + item.projectPhoto + ')', backgroundSize:'cover'}"
                ></span>
                <div>
                  <p>{{item.title}}</p>
                  <p>{{item.introduce}}</p>
                  <p>已帮扶{{item.beenHelpCount}}人,共{{item.allRecipients}}人</p>
                </div>
              </div>
            </router-link>
          </ul>
        </van-tab>
        <van-tab title="个人">
          <ul class="personal" id="personal">
            <li v-for="(item,index) in personLists" :key="index">
              <div>
                <span
                  class="img"
                  @click="goPersonDetails(item.recipientsId)"
                  :style="{backgroundImage: 'url(' + item.photo + ')', backgroundSize:'cover'}"
                ></span>
                <div>
                  <p>
                    <span @click="goPersonDetails(item.recipientsId,item.helpStatus)">{{item.name}}</span>
                    <span v-if="item.helpStatus === -1" class="status">已结束</span>
                    <span v-else-if="item.helpStatus === 1" class="status">帮扶完成</span>
                    <span v-else-if="item.helpStatus === 2" class="status">帮扶中</span>
                    <span v-else>
                      <input type="checkbox" v-model="checked" :value="item.recipientsId" />
                      <img :src="checked.indexOf(item.recipientsId)>=0?icon.active:icon.normal" alt />
                    </span>
                  </p>
                  <p @click="goPersonDetails(item.recipientsId,item.helpStatus)">
                    <span>{{item.sex===1?"男":"女"}}</span>
                    <span>{{item.age}}岁</span>
                    <span>{{item.classNumber}}年级</span>
                  </p>
                  <p>{{item.region}}</p>
                </div>
              </div>
              <div @click="goPersonDetails(item.recipientsId,item.helpStatus)">
                <p>家庭情况</p>
                <p>{{item.family}}</p>
              </div>
              <div @click="goPersonDetails(item.recipientsId,item.helpStatus)">
                <p>学习情况</p>
                <p>{{item.learn}}</p>
              </div>
            </li>
          </ul>
        </van-tab>
      </van-tabs>
    </div>
    <div class="footer footerCommom" v-if="footerStatus===0">
      <van-button type="primary" @click="showobject">发起新的帮扶计划</van-button>
    </div>
    <div class="footer personFooter footerCommom" v-if="footerStatus===1">
      <span>
        已经选择
        <i>{{checked.length}}</i>人
      </span>
      <van-button type="primary" @click="personalHelp">我要帮扶他们</van-button>
    </div>
    <selectObject :showObject="showObject" @closeObject="closeObject"></selectObject>
    <div class="page-ft">
      <qxFooter></qxFooter>
    </div>
  </div>
</template>

<script>
import selectObject from "@/components/selectObject";
import service from "@/api";
import qxFooter from "@/components/Footer";
export default {
  data() {
    return {
      showObject: false,
      groupLists: [],
      personLists: [],
      icon: {
        active: require("@/assets/helpProgram/checked_status.png"),
        normal: require("@/assets/helpProgram/no_checked_status.png")
      },
      checked: [],
      footerStatus: 0,
      active: 0,
      img:
        "http://love100.qxiao.net:8888/group1/M00/00/06/rBFAEl0kQzOADJx9AADcFzAznLM711.jpg"
    };
  },
  components: {
    selectObject,
    qxFooter
  },
  mounted() {
    this.groupHelp();
  },
  activated() {
    if (this.active == 0) {
      this.groupHelp();
    } else if (this.active == 1) {
      this.personalHelpList();
      this.checked = [];
    }
  },
  methods: {
    // 团体帮扶列表
    async groupHelp() {
      let res = await service.groupHelp({
        pageSize: 1000,
        pageNum: 1
      });
      if (res.code === 200) {
        this.groupLists = res.data.list;
      }
    },
    // 个人帮扶列表
    async personalHelpList() {
      let res = await service.personalHelpList({
        pageSize: 1000,
        pageNum: 1
      });
      if (res.code === 200) {
        this.personLists = res.data.list;
      }
    },
    // 点击 （我要帮扶他们）
    personalHelp() {
      this.personalHelpInfo();
    },
    async personalHelpInfo() {
      if (this.checked.length === 0) {
        this.$dialog({
          message: "请选择受助人"
        });
        return false;
      }
      let res = await service.confirmPay({
        recipientsIds: this.checked,
        type: 0
      });
      if (res.code === 200) {
        this.$router.push({
          path: "/helpProgram/buyer",
          query: { info: res.data.obj, typeHelp: 0 }
        });
      }
    },
    // 点击去个人详情
    goPersonDetails(recipientsId, helpStatus) {
      this.$router.push({
        path: "/helpProgram/personProgramDetails",
        query: { recipientsId, helpStatus, status: 100 }
      });
    },
    // 点击 （发起新的帮扶计划）
    showobject() {
      this.showObject = true;
    },
    // 点击取消
    closeObject(val) {
      this.showObject = val;
    },
    // 选项切换
    tabClick(index, title) {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        mask: true,
        message: "加载中..."
      });
      this.active = index;
      this.footerStatus = index;
      index === 0 ? this.groupHelp() : this.personalHelpList();
    }
  }
};
</script>

<style lang="less" scoped>
.group {
  margin-top: 1vh;
  li {
    padding: 0.2rem 0rem 0.2rem;
    border-bottom: 1px solid #e3e8ed;
    background: #fff;
    &:last-of-type {
      border-bottom: none;
    }
    > div {
      padding: 0.1rem 0.35rem 0.1rem;
      display: flex;
      align-items: center;
      .img {
        margin: 0 0.2rem;
        height: 2.5rem;
        width: 2.5rem;
        background-position: center center;
        background-repeat: no-repeat;
        border: 1px solid #f7f7f7;
        border-radius: 0.1rem;
      }
      div {
        flex: 1;
        p {
          &:nth-of-type(1) {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            color: rgba(51, 51, 51, 1);
            font-size: 0.45rem;
          }
          &:nth-of-type(2) {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            font-weight: 500;
            color: #666666;
            font-size: 0.36rem;
            margin: 0.3rem 0rem;
            line-height: 0.45rem;
          }
          &:nth-of-type(3) {
            font-size: 0.32rem;
            margin-top: 0.2rem !important;
            color: #999;
            text-align: right;
          }
        }
      }
    }
  }
}
.personal {
  margin-top: 1vh;
  li {
    padding: 0.35rem 0rem;
    border-bottom: 1px solid #e3e8ed;
    background: #fff;
    &:last-of-type {
      border-bottom: none;
    }
    > div {
      padding: 0rem 0.35rem;
      &:nth-of-type(1) {
        display: flex;
        align-items: center;
        > .img {
          border-radius: 100%;
          margin-right: 0.35rem;
          height: 2rem;
          width: 2rem;
          background-position: center center;
          background-repeat: no-repeat;
          border: 1px solid #f7f7f7;
        }
        div {
          flex: 1;
          p {
            font-size: 0.36rem;
            color: #999;
            &:nth-of-type(1) {
              display: flex;
              flex-wrap: wrap;
              align-items: center;
              span {
                font-size: 0.45rem;
                color: #333;
                &:nth-of-type(1) {
                  flex: 1;
                  display: flex;
                  align-items: center;
                  width: 50vw;
                  i {
                    font-size: 0.5rem;
                    color: #999;
                    margin-left: 0.4rem;
                  }
                }
                &:nth-of-type(2) {
                  position: relative;
                  left: 0;
                  top: 0;
                  display: flex;
                  align-items: center;
                  justify-content: flex-end;
                  width: 30%;
                  > input {
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: 0.8rem;
                    height: 0.8rem;
                    opacity: 0;
                  }
                  > img {
                    width: 50%;
                  }
                }
              }
            }
            &:nth-of-type(2) {
              margin: 0.2rem 0rem;
              font-size: 0.35rem;
            }
          }
        }
      }
      &:nth-of-type(2),
      &:nth-of-type(3) {
        display: flex;
        color: #666;
        margin: 0.35rem 0rem;
        p {
          &:nth-of-type(1) {
            display: block;
            width: 2rem;
            text-align: center;
            color: #666;
            margin-right: 0.35rem;
            font-size: 0.38rem;
          }
          &:nth-of-type(2) {
            display: block;
            width: 75vw;
            color: #999;
            font-size: 0.36rem;
          }
        }
      }
    }
  }
}
.personFooter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-content: center;
  padding: 0 5vw;
  button {
    width: 5rem !important;
  }
  > span {
    font-size: 0.4rem;
    color: #333333;
    i {
      font-style: normal;
      color: red;
    }
  }
}
.header {
  height: 81vh;
  overflow-y: auto;
}

.status {
  color: red !important;
  font-size: 0.36rem !important;
}

.footerCommom {
  bottom: 1.5rem !important;
  height: 10vh;
  button {
    height: 1.05rem !important;
    line-height: 1.05rem !important;
    font-size: 0.4rem !important;
  }
}
</style>
