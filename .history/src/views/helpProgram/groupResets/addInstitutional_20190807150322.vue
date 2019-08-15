<style>
</style>
<template>
  <div>
    <section class="content" id="content">
      <div class="first InstitutionalInfo">
        <div class="infoTop">
          <div>
            <van-field v-model="item.name" label="机构名称:" placeholder="请输入机构名称" />
          </div>
          <div class="IdCard">
            <p>机构证明材料</p>
            <div>
              <div>
                <div>
                  <van-uploader name="uploader" :after-read="licenseUpload">
                    <div v-if="businessLicenseStatus">
                      <img
                        alt
                        v-if="item.businessLicense !=''"
                        :style="{backgroundImage: 'url('+item.businessLicense+')'}"
                      />
                      <van-loading type="spinner" color="#1989fa" v-else />
                    </div>
                    <van-icon name="photograph" v-else />
                  </van-uploader>
                </div>
                <p style="color:#999">请上传机构营业执照</p>
              </div>
            </div>
          </div>
        </div>
        <div class="infoBot">
          <div>
            <van-field v-model="item.corporation" label="法人:" placeholder="请输入法人姓名" />
          </div>
          <div>
            <van-field v-model="item.cardId" label="用法人身份证：" placeholder="请输入法人身份证号码" />
          </div>
          <div>
            <van-field v-model="item.linkMan" label="机构联系人：" placeholder="请输入机构联系人姓名" />
          </div>
          <div>
            <van-field
              v-model="item.tele"
              label="机构联系人电话："
              placeholder="请输入机构联系人电话"
              pattern="[0-11]*"
              type="number"
            />
          </div>
          <div class="address">
            <span>地区</span>
            <span
              @click="selectAddress"
              v-if="item.region=='请选择地址'"
              style="color:#ccc"
            >{{item.region}}</span>
            <span @click="selectAddress" v-else style="color:#999">{{item.region}}</span>
          </div>
          <div>
            <van-field v-model="item.address" label="详细地址：" placeholder="请输入详细地址" />
          </div>
        </div>
      </div>

      <div class="delete" v-if="btn_status==='updata'">
        <p @click="deleteInfo">删除机构信息</p>
      </div>
    </section>
    <van-area :area-list="areaList" v-show="areaStatus" @confirm="confirm" @cancel="cancel" />
    <footer>
      <button @click="add" v-if="btn_status == ''">提交</button>
      <button @click="updata" v-if="btn_status == 'updata'">保存修改</button>
    </footer>
  </div>
</template>
<script>
import service from "@/api";
import { idCard, isPhone } from "@/utils/validator";
import AreaList from "@/mock/mock";
import recipoentsUpload from "@/mixins/recipoentsUpload";
import selectAttr from "@/mixins/commom";
export default {
  // data() {
  //   return {
  //     item: {
  //       address: "", //详细地址
  //       businessLicense: "", //营业执照图片地址
  //       cardId: "", //法人身份证
  //       corporation: "", //法人
  //       linkMan: "", //联系人
  //       name: "", //机构名称
  //       tele: "", //联系人电话
  //       region: "请选择地址"
  //     },
  //     btn_status: "",
  //     areaList: AreaList,
  //     areaStatus: false //地址的显示状态
  //   };
  // },

  data() {
    return {
      item: {
        address: "", //详细地址
        businessLicense: "", //营业执照图片地址
        cardId: "", //法人身份证
        corporation: "", //法人
        linkMan: "", //联系人
        name: "", //机构名称
        tele: "", //联系人电话
        region: "请选择地址"
      },
      btn_status: "",
      areaList: AreaList,
      areaStatus: false //地址的显示状态
    };
  },
  mixins: [recipoentsUpload, selectAttr],
  mounted() {
    // 确定是编辑还新增 btn_status显示删除按钮的显示和隐藏
    if (this.$route.query.organId != undefined) {
      this.businessLicenseStatus = true;
      this.institutionalDetails(this.$route.query.organId);
      this.btn_status = "updata";
    } else {
      this.btn_status = "";
    }
  },
  methods: {
    // 获取编辑信息
    async institutionalDetails(organId) {
      let res = await service.institutionalDetails(organId);
      if (res.code === 200) {
        this.item = res.data;
      } else {
        this.$dialog.alert({
          message: res.message
        });
      }
    },

    // 新增保存
    async add() {
      if (this.item.businessLicense === "") {
        this.$toast("请上传营业执照");
        return false;
      }
      if (this.item.corporation === "") {
        this.$toast("输入法人姓名");
        return false;
      }
      if (!idCard(this.item.cardId)) {
        this.$toast("请正确填写身份证号");
        return false;
      }
      if (this.item.linkMan === "") {
        this.$toast("输入联系人名字");
        return false;
      }
      if (!isPhone(this.item.tele)) {
        this.$toast("请正确填写联系人手机号");
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
      this.addInstitutional();
    },
    async addInstitutional() {
      let res = await service.addInstitutional(this.item);
      console.log(res);
      if (res.code === 200) {
        this.$dialog
          .alert({
            message: res.data.msg
          })
          .then(() => {
            let projectId = this.$route.query.projectId;
            let status = this.$route.query.auditStatus;
            this.$router.replace({
              path: "/helpProgram/groupResets",
              query: { projectId, status }
            });
          });
      } else {
        this.$dialog.alert({
          message: res.message
        });
      }
    },

    // 修改保存
    async updata() {
      this.updataInstitutional();
    },
    async updataInstitutional() {
      let res = await service.updataInstitutional(this.item);
      if (res.code === 200) {
        this.$dialog
          .alert({
            message: res.data.msg
          })
          .then(() => {
            let projectId = this.$route.query.projectId;
            let status = this.$route.query.auditStatus;
            this.$router.replace({
              path: "/helpProgram/groupResets",
              query: { projectId, status }
            });
          });
      } else {
        this.$dialog.alert({
          message: res.message
        });
      }
    },
    // 删除信息
    deleteInfo() {
      this.deleteInstitutional();
    },
    async deleteInstitutional() {
      this.$dialog
        .alert({
          message: "确定要删除该机构信息吗？"
        })
        .then(res => {
          service
            .deleteInstitutional(this.$route.query.organId)
            .then(resolve => {
              if (resolve.code === 200) {
                let projectId = this.$route.query.projectId;
                let status = this.$route.query.auditStatus;
                this.$router.push({
                  path: "/helpProgram/groupResets",
                  query: { projectId, status }
                });
              } else {
                this.$dialog.alert({
                  message: resolve.message
                });
              }
            });
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="less" scoped>
footer {
  width: 80%;
  display: flex;
  justify-content: space-between;
  margin: 0rem auto;
  padding: 1rem 0rem;
  > button {
    flex: 1;
    margin: 0rem 0.4rem;
    text-align: center;
    background: #40d0b3;
    padding: 0.4rem 0rem;
    border-radius: 1rem;
    color: #fff;
    font-size: 0.4rem;
    font-weight: 600;
  }
}

.first {
  &:nth-of-type(1) {
    .infoTop {
      > div {
        border-bottom: 1px solid #f7f7f7;
        > .van-field {
          font-size: 0.4rem;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          padding: 0.5rem 0.35rem;
        }
      }
      .upload {
        border-bottom: 1px solid #f7f7f7;
        font-size: 0.5rem;
        padding: 15px;
        h2 {
          font-size: 0.4rem;
        }
        .van-uploader {
          padding: 1rem 1.5rem;
          border: 1px solid #ccc;
          margin: 0.4rem 0rem 0.2rem;
          border-radius: 10px;
        }
        p {
          font-size: 0.25rem;
          color: #999;
        }
      }
    }
    .infoBot {
      > div {
        border-bottom: 1px solid #f7f7f7;
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

.delete {
  background: #fff;
  border-top: 10px solid #f7f7f7;
  p {
    color: #f02310;
    padding: 0.45rem;
    font-size: 0.4rem;
  }
}

.address {
  display: flex;
  padding: 0.6rem 0.45rem;
  background: #fff;
  font-size: 0.35rem;
  color: #999;
  span {
    &:nth-of-type(1) {
      flex: 1;
      font-size: 0.4rem;
      color: #333;
    }
  }
}

.IdCard {
  border-top: 0;
  border-bottom: 10px solid #f7f7f7;
  margin-top: 0;
  > p {
    padding: 0.6rem 15px;
    font-size: 0.4rem;
  }
}
</style>
