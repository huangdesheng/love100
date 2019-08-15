<style>
</style>

<template>
  <div class="page-Object">
    <div class="objectTop">
      <h2 class="title">请选择帮扶对象</h2>
      <div class="objectList">
        <ul>
          <li v-for="(item,index) in objectList" :key="index">
            <div class="topInfo">
              <span class="selected_status">
                <input type="checkbox" :value="item.recipientsId" v-model="checkedArr" />
                <img :src="checkedArr.indexOf(item.recipientsId)>=0?icon.active:icon.normal" alt />
              </span>
              <img :src="item.photo" alt />
              <div class="info">
                <p>
                  <span>{{item.name}}</span>
                  <span v-if="item.sex===1">男</span>
                  <span v-else>女</span>
                  <span>{{item.age}}岁</span>
                  <span>{{item.classNumber}}年级</span>
                </p>
                <p>
                  <span>{{item.region}}</span>
                  <van-icon name="arrow-down" @click="slideInfo" style="font-size:0.5rem" />
                </p>
              </div>
            </div>

            <div class="elseInfo" v-show="infoStatus">
              <div>
                <span>家庭状况:</span>

                <div class="img">
                  <span>{{item.family}}</span>
                  <template v-if="item.photos.filter(item=>item.type=='2').length !=0">
                    <img :src="item.photos.filter(item=>item.type=='2')[0].urls[0]" alt width="50%" />
                  </template>
                </div>
              </div>
              <div>
                <span>学习情况:</span>

                <div class="img">
                  <span>{{item.learn}}</span>
                  <template v-if="item.photos.filter(item=>item.type=='3').length !=0">
                    <img :src="item.photos.filter(item=>item.type=='3')[0].urls[0]" alt width="50%" />
                  </template>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="footer">
      <label for>
        <span class="selected_status">
          <input type="checkbox" @click="selectAll" id="selectAll" />
          <img :src="iconAll" alt />
        </span>
        <span>全选</span>
      </label>
      <p>
        共
        <span>{{checkedArr.length}}</span>个帮扶对象
      </p>
      <!-- <button>确定帮扶</button> -->
      <!-- <router-link :to="{path:'/helpProgram/buyer'}" tag="button">确定帮扶</router-link> -->
      <button @click="confirmPay">确定帮扶</button>
    </div>
  </div>
</template>

<script>
import service from "@/api";
export default {
  data() {
    return {
      checkedArr: [],
      infoStatus: false,
      // objectList: [],
      icon: {
        active: require("@/assets/helpProgram/selected_circle.png"),
        normal: require("@/assets/helpProgram/no_selected_circle.png")
      },
      iconAll: require("@/assets/helpProgram/no_selected_circle.png"),
      objectList: []
    };
  },

  mounted() {
    let projectId = this.$route.query.projectId;
    this.helpObjectList(projectId);
  },
  methods: {
    async helpObjectList(projectId) {
      let res = await service.helpObjectList(projectId);
      if (res.code === 200) {
        this.objectList = res.data;
      } else {
        this.$dialog({
          message: "受助人都被帮扶了哦"
        });
      }
    },
    slideInfo(e) {
      let el =
        e.currentTarget.parentElement.parentElement.parentElement
          .nextElementSibling;
      el.style.display = el.style.display === "none" ? "block" : "none";
    },
    confirmPay() {
      this.confirmPay();
    },
    selectAll(e) {
      if (e.target.checked) {
        this.objectList.forEach((item, index) => {
          this.checkedArr.push(item.recipientsId);
          this.iconAll = this.icon.active;
        });
      } else {
        this.checkedArr = [];
        this.iconAll = this.icon.normal;
      }
    },
    async confirmPay() {
      let res = await service.confirmPay({
        projectId:
          this.$route.query.status == "1" ? this.$route.query.projectId : "",
        recipientsIds: this.checkedArr,
        type: this.$route.query.status == "0" ? 0 : 1
      });
      if (res.code === 200) {
        this.$router.push({
          path: "/helpProgram/buyer",
          query: { info: res.data.obj, typeHelp: 1 }
        });
      } else {
        this.$dialog.alert({
          message: "请先选择受助人"
        });
      }
    }
  },
  watch: {
    checkedArr(val) {
      if (val.length === this.objectList.length) {
        this.iconAll = this.icon.active;
      } else {
        this.iconAll = this.icon.normal;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.objectTop {
  height: 92vh;
  padding-bottom: 0.6rem;
  overflow-y: auto;
  .title {
    font-size: 0.5rem;
    padding: 0.4rem 5vw;
    background: #f9f9f9;
  }
  .objectList {
    background: #fff;

    ul {
      width: 90vw;
      margin: 0 auto;

      li {
        .topInfo {
          display: flex;
          align-items: center;
          padding: 0.35rem 0rem;
          border-bottom: 2px solid #f9f9f9;
          > img {
            width: 2rem;
            height: 2rem;
            margin: 0 0.3rem;
            border-radius: 100%;
          }
          > div {
            flex: 1;
            p {
              display: flex;
              align-items: center;
              color: #999;
              font-size: 0.35rem;
              &:nth-of-type(1) {
                margin-bottom: 0.45rem;

                span {
                  margin-right: 0.3rem;

                  &:nth-of-type(1) {
                    color: #333;
                    font-size: 0.45rem;
                  }
                }
              }
              &:nth-of-type(2) {
                justify-content: space-between;
                span {
                  flex: 1;
                }
              }
            }
          }
        }
        .elseInfo {
          padding: 0.3rem 0rem;
          border-bottom: 1px solid #f9f9f9;
          > div {
            display: flex;
            > span {
              width: 2rem;
              font-size: 0.4rem;
              color: #666;
            }
            > div {
              display: block;
              flex: 1;
              img {
                width: 2.5rem;
                height: 2.5rem;
              }
              span {
                flex: 1;
                font-size: 0.36rem;
                color: #999;
                display: block;
                padding-top: 0.05rem;
                margin-bottom: 10px;
              }
            }
            &:nth-of-type(2) {
              margin-top: 0.3rem;
            }
          }
        }
      }
    }
  }
}

.footer {
  height: 12vh;
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  background: #fff;

  p {
    flex: 1;
    text-align: center;
    font-size: 0.38rem;
    color: #999;
    span {
      color: red;
      margin: 0.1rem;
    }
  }
  button {
    width: 3.5rem;
    height: 100%;
    background: #40d0b3;
    font-size: 0.45rem;
    color: #fff;
  }
  label {
    margin: 0rem 0.45rem;
    display: flex;
    font-size: 0.4rem;
    align-items: center;
    font-weight: 400;
    > span {
      margin-right: 0.2rem;
    }
  }
}

.selected_status {
  position: relative;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 0.6rem;
  height: 0.6rem;
  > input {
    position: absolute;
    right: 0;
    top: 0;
    width: 0.6rem;
    height: 0.6rem;
    opacity: 0;
  }
  > img {
    width: 100%;
    margin-left: 0rem;
  }
}
</style>
