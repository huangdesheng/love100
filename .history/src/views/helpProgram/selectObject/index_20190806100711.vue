
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
                <img :src="checkedArr.indexOf(item.recipientsId)>=0?icon.active:icon.normal" />
              </span>
              <img :style="{backgroundImage: 'url(' + item.photo + ')', backgroundSize:'cover'}" />

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
                  <van-icon name="arrow-down" @click="slideInfo(index)" style="font-size:0.45rem" />
                </p>
              </div>
            </div>

            <div class="elseInfo" v-show="infoStatus" ref="mybox">
              <div>
                <span>家庭状况:</span>
                <div>
                  <span>{{item.family}}</span>
                  <div v-if="item.photos.filter(item=>item.type === 2).length>0">
                    <span
                      v-for="(items,index) in item.photos.filter(item=>item.type === 2)[0].urls"
                      :key="index"
                      class="img"
                      @click="seeBigTu(items,item.photos.filter(item=>item.type === 2)[0].urls)"
                      :style="{backgroundImage: 'url(' + items + ')', backgroundSize:'cover'}"
                    ></span>
                  </div>
                </div>
              </div>
              <div>
                <span>学习情况:</span>
                <div class="img">
                  <span>{{item.learn}}</span>
                  <div v-if="item.photos.filter(item=>item.type === 3).length>0">
                    <span
                      v-for="(items,index) in item.photos.filter(item=>item.type === 3)[0].urls"
                      :key="index"
                      class="img"
                      @click="seeBigTu(items,item.photos.filter(item=>item.type === 3)[0].urls)"
                      :style="{backgroundImage: 'url(' + items + ')', backgroundSize:'cover'}"
                    ></span>
                  </div>
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
          <img :src="icon.iconAll" alt />
        </span>
        <span>全选</span>
      </label>
      <p>
        共
        <span>{{checkedArr.length}}</span>个帮扶对象
      </p>
      <button @click="confirmPay">确定帮扶</button>
    </div>
  </div>
</template>

<script>
import service from "@/api";
import imagePreview from "@/mixins/imagePreview";
export default {
  data() {
    return {
      checkedArr: [],
      infoStatus: false,
      icon: {
        active: require("@/assets/helpProgram/selected_circle.png"),
        normal: require("@/assets/helpProgram/no_selected_circle.png")
      },
      // iconAll: require("@/assets/helpProgram/no_selected_circle.png"),
      objectList: []
    };
  },
  mixins: [imagePreview],
  mounted() {
    let projectId = this.$route.query.projectId;
    this.helpObjectList(projectId);
  },
  methods: {
    // 受助人列表
    async helpObjectList(projectId) {
      let res = await service.helpObjectList(projectId);
      if (res.code === 200) {
        this.objectList = res.data;
      }
    },
    // 展开和收起
    slideInfo(index) {
      let ref = this.$refs.mybox[index];
      ref.style.display = ref.style.display === "none" ? "block" : "none";
    },

    // 全选
    selectAll(e) {
      this.checkedArr = [];
      if (e.target.checked) {
        this.objectList.forEach((item, index) => {
          this.checkedArr.push(item.recipientsId);
        });
        this.iconAll = this.icon.active;
      } else {
        this.iconAll = this.icon.normal;
      }
    },

    // 确认帮扶
    confirmPay() {
      this.confirmPay();
    },
    async confirmPay() {
      // 0 代表个人 1代表团体 如果状态等于0 就不需要传projectId
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
        document.getElementById("selectAll").checked = true;
      } else {
        this.iconAll = this.icon.normal;
        document.getElementById("selectAll").checked = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.objectTop {
  height: 90vh;
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
                > span {
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
              > div {
                display: flex;
                .img {
                  display: block;
                  width: 2rem !important;
                  height: 2rem;
                  margin-right: 0.2rem;
                  border-radius: 5px;
                  background-position: center center;
                  background-repeat: no-repeat;
                  background-size: cover;
                }
              }

              > span {
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
  height: 10vh;
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
