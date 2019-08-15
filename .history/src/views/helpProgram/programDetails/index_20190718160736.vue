<style>
</style>
<template>
  <div class="page-program" id="page-program">
    <div class="details" :style="{marginBottom:(footerStatus?'12vh':'0')}">
      <div class="top_details">
        <div>
          <img
            src="http://love100.qxiao.net:8888/group1/M00/00/06/rBFAEl0kRFGABwl8AAAcRmRw45U151.jpg"
            alt
          />
        </div>
        <div>
          <div>
            <div style="height:5rem;width:100%;overflow:hidden;">
              <img
                :src="helpGroupProjectVO.projectPhoto"
                alt
                width="100%"
                @click="picPreviwe(helpGroupProjectVO.projectPhoto,helpGroupProjectVO.projectPhoto)"
              />
            </div>
            <p>{{helpGroupProjectVO.title}}</p>
            <p>
              已经帮扶
              <span>{{helpGroupProjectVO.beenHelpCount}}人</span> 共
              <span>{{helpGroupProjectVO.allRecipients}}人</span>
            </p>
          </div>
          <p>{{helpGroupProjectVO.tempMessage}}</p>
          <button class="checking" v-if="this.$route.query.status===0">审核中</button>
        </div>
      </div>
      <div class="introduction">
        <div>
          <span></span>
          <h2>项目介绍</h2>
        </div>
        <p>{{helpGroupProjectVO.introduce}}</p>
      </div>
      <div class="organization">
        <div>
          <span></span>
          <h2>机构信息:</h2>
        </div>
        <div>
          <p>
            <span>机构名称:</span>
            <span>{{organBaseInfoVO.name}}</span>
          </p>
          <p>
            <span>机构负责人:</span>
            <span>{{organBaseInfoVO.corporation}}</span>
          </p>
          <p>
            <span>机构地址:</span>
            <span>{{organBaseInfoVO.region}}</span>
          </p>
        </div>
      </div>
      <div class="studentStory">
        <div>
          <span></span>
          <h2>学生故事</h2>
        </div>
        <div class="tabSelect">
          <div class="concent">
            <ul class="box" id="flexslide">
              <li
                v-for="(item, index) in helpGroupProjectRecipientsVOS"
                :key="index"
                @click="selectedObj(index)"
              >
                <p v-if="item.helpStatus ===1">帮扶完成</p>
                <p v-if="item.helpStatus ===2">帮扶中</p>
                <p v-if="item.helpStatus ===-1">已过期</p>
                <div>
                  <img
                    :style="{backgroundImage: 'url(' + item.photo + ')', backgroundSize:'cover',width:'2rem',height:'2rem',backgroundRepeat:'no-repeat',backgroundPositon:'center center'}"
                  />
                </div>
                <span></span>
              </li>
            </ul>
          </div>

          <div id="infoObject">
            <div
              class="van-tab__pane"
              v-for="(item, index) in helpGroupProjectRecipientsVOS"
              :key="index"
            >
              <aside>
                <span>{{item.name}}</span>
                <p>
                  <span>{{item.sex===1?"男":"女"}}</span>
                  <span>{{item.age}}岁</span>
                </p>
              </aside>
              <aside>
                <span>年级：{{item.classNumber}}年级</span>
                <p>地址：{{item.region}}</p>
              </aside>
              <aside>
                <span>爱心情况</span>
                <span>
                  <van-rate
                    v-model="item.loveValue"
                    icon="like"
                    void-icon="like-o"
                    :count="item.totalPeriods"
                    :size="22"
                    color="red"
                    void-color="red"
                    readonly
                  />
                </span>
              </aside>
              <aside>
                <span>家庭状况</span>
                <div>
                  <span>{{item.family}}</span>
                  <div v-if="item.photos[1] !=undefined">
                    <img
                      v-for="(items,index) in item.photos[1].urls"
                      :key="index"
                      :src="items"
                      alt
                      @click="picPreviwe(items,item.photos[1].urls)"
                    />
                  </div>
                </div>
              </aside>
              <aside>
                <span>学习情况</span>
                <div>
                  <span>{{item.learn}}</span>
                  <div v-if="item.photos[2] !=undefined">
                    <img
                      v-for="(items,index) in item.photos[2].urls"
                      :key="index"
                      :src="items"
                      @click="picPreviwe(items,item.photos[2].urls)"
                    />
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
      <div class="record" v-if="record">
        <div>
          <span></span>
          <h2>帮扶记录</h2>
        </div>
        <ul v-if="helpGroupRecordVOS.length>0">
          <li v-for="(item, index) in helpGroupRecordVOS" :key="index">
            <div>
              <img :src="item.aidAccountPhoto " alt />
            </div>
            <div>
              <p>{{item.aidAccountName }}</p>
              <p>
                帮扶了
                <span>{{item.recipients}}</span>
              </p>
            </div>
          </li>
        </ul>
        <div v-else class="no_data_welfare">暂无帮扶记录</div>
        <template v-if="status">
          <p @click="openwelfare" v-if="!openStatus">
            <van-icon name="arrow-down" />展开查看更多爱心贡献
          </p>
          <p @click="closewelfare" v-else>
            <van-icon name="arrow-up" />收起查看更多爱心贡献
          </p>
        </template>
      </div>
    </div>

    <div class="footer" v-if="footerStatus">
      <van-button type="primary" @click="helpStudent">我要帮扶贫困学生</van-button>
    </div>
  </div>
</template>

<script>
import { link } from "fs";
import service from "@/api";
export default {
  data() {
    return {
      helpGroupProjectVO: "", //团体帮扶计划基本信息
      helpGroupRecordVOS: [], //帮扶记录
      helpGroupProjectRecipientsVOS: [], //受助人信息列表
      footerStatus: true,
      record: true,
      openStatus: false,
      helpGroupRecordVOSAll: [],
      status: true,
      organBaseInfoVO: {}
    };
  },
  mounted() {
    this.init();
    if (this.$route.query.status === undefined) {
      this.groupHelpDetails(this.$route.query.projectId);
    } else {
      this.myLaunchDetails(this.$route.query.projectId);
    }
    window.scroll(0, 0);
  },
  methods: {
    // 学生故事头像操作
    selectedObj(index) {
      var oLi = document.getElementById("flexslide").childNodes;
      var oDiv = document.getElementById("infoObject").childNodes;
      for (var i = 0; i < oLi.length; i++) {
        oLi[i].lastElementChild.style.height = 0 + "px";
        oDiv[i].style.display = "none";
      }
      oLi[index].lastElementChild.style.height = 2 + "px";
      oDiv[index].style.display = "block";
    },

    // 帮扶记录展开
    openwelfare() {
      this.openStatus = true;
      this.helpGroupRecordVOS = this.helpGroupRecordVOSAll;
    },

    // 帮扶记录收起
    closewelfare() {
      this.openStatus = false;
      let helpGroupRecordVOSList = this.helpGroupRecordVOSAll.filter(
        (item, index) => index < 2
      );
      this.helpGroupRecordVOS = helpGroupRecordVOSList;
    },

    // 获取信息
    async groupHelpDetails(recipientsId) {
      let res = await service.groupHelpDetails(recipientsId);
      console.log(res);
      if (res.code === 200) {
        this.helpGroupProjectVO = res.data.helpGroupProjectVO;
        this.organBaseInfoVO = res.data.organBaseInfoVO;

        if (res.data.helpGroupRecordVOS == null) {
          this.helpGroupRecordVOS = [];
          this.helpGroupRecordVOSAll = [];
        } else {
          this.helpGroupRecordVOSAll = res.data.helpGroupRecordVOS;
          let helpGroupRecordVOSList = res.data.helpGroupRecordVOS.filter(
            (item, index) => index < 2
          );
          this.helpGroupRecordVOS = helpGroupRecordVOSList;
        }
        this.helpGroupProjectRecipientsVOS =
          res.data.helpGroupProjectRecipientsVOS;
        this.status = this.helpGroupRecordVOSAll.length > 2 ? true : false;
        let helping = this.helpGroupProjectRecipientsVOS.filter(item => {
          if (
            item.helpStatus === 2 ||
            item.helpStatus === 1 ||
            item.helpStatus === -1
          ) {
            return item;
          }
        });

        if (helping.length == this.helpGroupProjectRecipientsVOS.length) {
          this.footerStatus = false;
        }
      } else {
        alert(res.message);
      }
    },

    async myLaunchDetails(projectId) {
      let res = await service.myLaunchDetails(projectId);
      console.log(res);
      if (res.code === 200) {
        let obj = {
          introduce: res.data.introduce,
          projectPhoto: res.data.projectPhoto,
          beenHelpCount: res.data.beenHelpCount,
          allRecipients: res.data.allRecipients,
          tempMessage: res.data.tempMessage,
          title: res.data.title
        };
        let organization = res.data.organBaseInfoVOS.filter(
          item => item.organId === res.data.organId
        );
        this.organBaseInfoVO = organization[0];
        console.log(organization);
        this.helpGroupProjectVO = obj;
        this.helpGroupProjectRecipientsVOS = res.data.recipientsVOS;

        if (res.data.helpGroupRecordVOS == null) {
          this.helpGroupRecordVOS = [];
          this.helpGroupRecordVOSAll = [];
        } else {
          this.helpGroupRecordVOSAll = res.data.helpGroupRecordVOS;
          let helpGroupRecordVOSList = res.data.helpGroupRecordVOS.filter(
            (item, index) => index < 2
          );
          this.helpGroupRecordVOS = helpGroupRecordVOSList;
        }
        this.status = this.helpGroupRecordVOSAll.length > 2 ? true : false;
        this.footerStatus = false;
        if (this.$route.query.status === 1) {
          this.record = true;
        } else {
          this.record = false;
        }
      }
    },

    // 我要去帮扶的按钮
    helpStudent() {
      let projectId = this.helpGroupProjectVO.projectId;
      this.helpObjectList(projectId);
    },

    async helpObjectList(projectId) {
      let res = await service.helpObjectList(projectId);
      if (res.code === 200) {
        this.$router.push({
          path: "/helpProgram/selectObject",
          query: {
            projectId: this.helpGroupProjectVO.projectId,
            status: 1 //代表团体帮扶
          }
        });
      } else {
        this.$dialog({
          message: "谢谢你的好心"
        });
      }
    },

    picPreviwe(item, value) {
      WeixinJSBridge.invoke("imagePreview", {
        urls: value instanceof Array ? value : [value],
        current: item
      });
    },
    // 初始化学生信息
    init() {
      setTimeout(() => {
        var oLi = document.getElementById("flexslide").childNodes;
        oLi[0].lastElementChild.style.height = 2 + "px";
        var oDiv = document.getElementById("infoObject").childNodes;
        oDiv[0].style.display = "block";
      }, 1000);
    }
  }
};
</script>

<style lang="less" scoped>
.details {
  margin-bottom: 12vh;
}
.top_details {
  width: 100vw;
  position: relative;
  left: 0;
  top: 0;
  height: 75vh;
  > div {
    &:nth-of-type(1) {
      width: 100%;
      text-align: center;
      font-size: 0.4rem;
      color: #fff;
      padding: 0rem 0rem 0.3rem;
    }
    &:nth-of-type(2) {
      width: 90%;
      position: absolute;
      top: 1rem;
      left: 5%;
      z-index: 10;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 24px 8px rgba(204, 204, 204, 0.59);
      border-radius: 5px;
      div {
        padding: 0.25rem;
        p {
          font-size: 0.5rem;
          padding: 0.5rem 0rem 0rem;
          &:nth-of-type(2) {
            color: #666;
            font-size: 0.38rem;
            span {
              color: red;
            }
          }
        }
      }
      > p {
        font-size: 0.38rem;
        color: #999;
        line-height: 0.7rem;
        margin-top: 0.3rem;
        padding: 0rem 0.3rem 0.3rem;
      }
      button {
        width: 2rem;
        height: 0.7rem;
        position: absolute;
        right: 0;
        top: 5.5rem;
        background: red;
        color: #fff;
        text-align: right;
        border-radius: 1rem 0 0 1rem;
        padding-right: 0.4rem;
        line-height: 0.7rem;
      }
    }
  }
}
.introduction {
  > p {
    padding: 0.1rem 0.35rem 0.55rem;
    font-size: 0.38rem;
    color: #666;
    line-height: 0.65rem;
  }
}

.organization {
  > div {
    padding: 0.3rem 0.35rem 0.3rem !important;
    flex-wrap: wrap;
    > p {
      width: 100%;
      display: flex;
      font-size: 0.38rem;
      color: #666;
      &:nth-of-type(2) {
        margin: 0.35rem 0rem;
      }
      span {
        &:nth-of-type(2) {
          flex: 1;
          margin-left: 0.1rem;
        }
      }
    }
  }
}

.introduction,
.studentStory,
.record,
.organization {
  margin-top: 0.3rem;
  background: #fff;
  > div {
    padding: 0.45rem 0.35rem 0.4rem;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    h2 {
      font-size: 0.45rem;
    }
    > span {
      display: block;
      width: 3px;
      height: 20px;
      background: red;
      margin-right: 0.1rem;
    }
  }
}
.tabSelect {
  .concent {
    margin: 0px auto;
    width: 95vw;
    .box {
      white-space: nowrap;
      overflow-x: auto;
      overflow-y: hidden;
      overflow: -moz-scrollbars-none;
      overflow: -moz-scrollbars-none;
      -webkit-overflow-scrolling: touch;
      li {
        list-style: none;
        display: inline-block;
        margin-right: 0.3rem;
        position: relative;
        > div {
          width: 2rem;
          height: 2rem;
          border-radius: 100%;
          background: red;
          overflow: hidden;
        }
        > p {
          width: 2rem;
          height: 2rem;
          position: absolute;
          left: 0;
          top: 0;
          background: green;
          opacity: 0.3;
          border-radius: 100%;
          font-size: 0.35rem;
          text-align: center;
          line-height: 2rem;
          color: #fff;
        }
        span {
          display: block;
          width: 65%;
          height: 0px;
          background: #40d0b3;
          margin: 5px auto;
        }
      }
    }
  }
  > div {
    width: 93vw;
    .van-tab__pane {
      display: none;
      padding: 0.45rem 0rem 0rem !important;
      aside {
        margin-top: 0.4rem;
        color: #666;
        font-size: 0.38rem;
        display: flex;

        &:nth-of-type(1) {
          font-size: 0.38rem;
          align-items: center;
          > span {
            width: 4rem;
            font-size: 0.5rem;
            color: #333;
          }
          > p {
            flex: 1;
            span {
              margin-right: 0.3rem;
            }
          }
        }
        &:nth-of-type(2) {
          display: flex;
          font-size: 0.38rem;
          > span {
            display: block;
            width: 4rem;
            &:nth-of-type(2) {
              color: #666;
            }
          }
        }
        &:nth-of-type(3) {
          align-items: center;

          > span {
            display: block;
            width: 2rem;
            &:nth-of-type(2) {
              flex: 1;
            }
          }
        }
        &:nth-of-type(4),
        &:nth-of-type(5) {
          color: #999;
          > span {
            width: 2rem;
            color: #666;
          }
          > div {
            flex: 1;
            > span {
              font-size: 0.38rem;
            }
            > div {
              img {
                width: 3.5rem;
                margin-top: 0.1rem;
              }
            }
          }
        }
      }
    }
  }
}
.record {
  > ul {
    padding: 0rem 0.25rem 0rem;
    li {
      display: flex;
      border-bottom: 1px solid #e3e8ed;
      padding: 0.3rem 0rem;
      &:last-of-type {
        border-bottom: none;
      }
      // align-items: center;
      div {
        padding: 0;
        &:nth-of-type(1) {
          margin-right: 0.35rem;
          img {
            border-radius: 100%;
            width: 1rem;
            height: 1rem;
          }
        }
        &:nth-of-type(2) {
          flex: 1;
          font-size: 0.4rem;
          p {
            &:nth-of-type(1) {
              margin: 0.2rem 0rem;
              padding-top: 2px;
            }

            color: #666;
            span {
              color: #40d0b3;
              font-size: 0.35rem;
            }
          }
        }
      }
    }
  }
  > p {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.35rem 0rem;
    font-family: PingFang-SC-Bold;
    color: #666;
    line-height: 0.5rem;
    font-size: 0.4rem;
    i {
      margin-right: 0.2rem;
      font-size: 0.5rem;
    }
  }
}
.no_data_welfare {
  font-size: 0.45rem;
  color: #999;
  display: flex;
  justify-content: center;
}
#infoObject {
  aside {
    div {
      div {
        // display: flex;
        img {
          width: 2rem !important;
          height: 2rem;
          margin-right: 0.2rem;
        }
      }
    }
  }
}
</style>
