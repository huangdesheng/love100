import Vue from 'vue'
import vuex from 'vuex'
import service from '@/api'
import qs from 'qs'
import axios from 'axios'


Vue.use(vuex)
const state = {
  groupHelp: [], //团体帮扶受助人信息
  recipientsDTOS: [], //受助人信息
  active: 0, //step
  updataRecipients: {}, //修改受助人人信息
  updataRecipientsIndex: -1, //受助人的索引
  recipientPersonUpload: {}, //互助上传受助人信息
  personBillStatus: {},
  allData: {},
  check_status: '',
  continueHelpStatus: false,
  helpByOther: false,
  lackOfNper: 0, //断续缴费次数
  continueHelpInfo: {},
  menuStatus: false, //联系客服和分享的转态
  menu: 0, //1代表联系客服，2代表分享
  buyerInfo: '', //我要帮扶人的信息
  typeHelp: '', //0代表个人帮扶，1代表团体帮扶
}

const mutations = {
  groupHelpInfo(state, info) {
    state.groupHelp = info
  },
  // 添加受助人
  recipientInformation(state, data) {
    state.recipientsDTOS.push(data.info)
    state.active = data.index
  },

  // 审核不通过受助人信息
  check_info(state, info) {
    state.recipientsDTOS = info.data.recipientsVOS
    state.allData = info.data
    state.check_status = info.check_state
  },
  // 修改受助人信息
  updataRecipients(state, info) {
    state.updataRecipients = info.item;
    state.updataRecipientsIndex = info.index
  },
  //提交修改
  submitRecipients(state, info) {
    state.recipientsDTOS.splice(info.index, 1, info.info)
    // console.log(state.recipientsDTOS)
  },
  // 删除信息
  deleteRecipients(state, info) {
    state.recipientsDTOS.splice(info.index, 1)
  },
  // 互助上传受助人信息
  recipientPersonUpload(state, info) {
    state.recipientPersonUpload = info
  },
  personBillStatus(state, info) {
    console.log(info)
    state.personBillStatus = info
  },
  check_status(state) {
    state.check_status = ''
  },
  continueHelp(status, info) {
    status.continueHelpStatus = info.continueHelpStatus
    status.helpByOther = info.helpByOther
    state.lackOfNper = info.lackOfNper
    state.continueHelpInfo = info
  },
  personalMune(state, info) {
    // console.log(info)
    state.menuStatus = info.menuStatus
    state.menu = info.menu
  },

  buyerHelpInfo(state, info) {
    state.buyerInfo = info.buyerInfo
    state.typeHelp = info.typeHelp
  },
  controlActive(state, info) {
    state.active = 0
  }
}


const actions = {
  async authorize({
      state,
      dispatch
    },
    openId
  ) {

    // let res = await service.authorize()
    // console.log(res)
    dispatch('login', openId)
    console.log(openId)
  },
  async login({
      state,
      commit
    },
    openId
  ) {
    console.log('login')
    let res = await service.login(qs.stringify({
      openId: openId
    }))

    console.log(res)
    if (res.code === 200) {
      localStorage.setItem("token", res.data.token);
      axios.defaults.headers.common["Authorization"] = localStorage.getItem(
        "token"
      );
    } else {
      this.$dialog.alert({
        message: res.message
      })
    }
  },
  changeInfo({
    state,
    commit
  }, continueHelpInfo) {
    console.log(continueHelpInfo)
  }
}


export default new vuex.Store({
  state,
  mutations,
  actions
})
