<style>
</style>

<template>
  <div class="page-Object">
    <div class="objectTop">
      <!-- <h2 class="title">请选择帮扶对象</h2> -->
      <div class="objectList">
        <ul>
          <li v-for="(item,index) in objectList" :key="index">
            <div class="topInfo">
              <!-- <input type="checkbox" :value="index" v-model="checkedArr"> -->
              <img src="@/assets/education/education_avatar.png" alt>
              <div class="info">
                <p>
                  <span>{{item.name}}</span>
                  <span>{{item.sex}}</span>
                  <span>15岁</span>
                  <span>小学三年级</span>
                </p>
                <p>
                  <span>{{item.area}}</span>
                  <van-icon name="arrow-down" @click="slideInfo"/>
                </p>
              </div>
            </div>

            <div class="elseInfo" v-show="infoStatus">
              <p>
                <span>家庭状况:</span>
                <span>家中有七口人。家居贫困山区，家境贫困，其主要经济来源靠种农田为生，无其它任何经济来源，现母亲因劳累过度，而生病需长期药物疗养，增加了家庭负担，再加上父亲年老体弱母亲身体不好，且有一祖母已...</span>
              </p>
              <p>
                <span>学习情况:</span>
                <span>优秀三好学生，优秀班集体学习委员。</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkedArr: [],
      infoStatus: false,
      objectList: [
        {
          id: 1,
          name: "张三",
          area: "安徽省六安市",
          sex: "男"
        },
        {
          id: 2,
          name: "李四",
          area: "广东广州",
          sex: "女"
        }
      ]
    };
  },
  mounted() {},
  methods: {
    slideInfo(e) {
      let el =
        e.currentTarget.parentElement.parentElement.parentElement
          .nextElementSibling;
      el.style.display = el.style.display === "none" ? "block" : "none";
    },
    selectAll(e) {
      if (e.target.checked) {
        this.objectList.forEach((item, index) => {
          this.checkedArr.push(index);
        });
      } else {
        this.checkedArr = [];
      }
    }
  },
  watch: {
    checkedArr(val) {
      if (val.length === this.objectList.length) {
        document.getElementById("selectAll").checked = true;
      } else {
        document.getElementById("selectAll").checked = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.objectTop {
  margin-top: 0.4rem;
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
          img {
            width: 2rem;
            height: 2rem;
            margin: 0 0.3rem 0 0rem;
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
          p {
            display: flex;
            span {
              &:nth-of-type(1) {
                width: 2rem;
                font-size: 0.4rem;
                color: #666;
              }
              &:nth-of-type(2) {
                flex: 1;
                font-size: 0.35rem;
                color: #999;
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
</style>
