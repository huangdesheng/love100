import {
  idCard
} from "@/utils/validator";
export default {
  data() {
    return {
      familyPlaceholder: '请描述受助人家庭详细情况，上传照片更有公信力!',
      studyPlaceholder: '请描述受助人的学习情况，上传照片更有公信力!'
    }
  },
  methods: {
    familySituation() {
      this.familyPlaceholder = ''
    },
    studySituation() {
      this.studyPlaceholder = ''
    },
    familyBlur() {
      if (this.item.family == '') {
        this.familyPlaceholder = '请描述受助人家庭详细情况，上传照片更有公信力!'
      }
    },
    studyBlur() {
      if (this.item.study == '') {
        this.familyPlaceholder = '请描述受助人的学习情况，上传照片更有公信力!'
      }
    },
    idCardVerification() {
      if (!idCard(this.item.cardId)) {
        alert('请输入正确的身份证')
        return false
      }
      let myDate = new Date();
      var age = myDate.getFullYear() - this.item.cardId.substring(6, 10)
      this.item.age = age
      if (parseInt(this.item.cardId.substr(16, 1)) % 2 == 1) {
        this.item.sexName = '男'
      } else {
        this.item.sexName = '女'
      }
    },

    idCardVerifications() {
      if (!idCard(this.cardId)) {
        alert('请输入正确的身份证')
        return false
      }
      let myDate = new Date();
      var age = myDate.getFullYear() - this.cardId.substring(6, 10)
      this.age = age
      if (parseInt(this.cardId.substr(16, 1)) % 2 == 1) {
        this.sexName = '男'
      } else {
        this.sexName = '女'
      }
    }
  },
}
