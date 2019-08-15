import service from "@/api";

export default {
  data() {
    return {
      bankHolder: "开户账号信息与受助人保持一致",
    }
  },
  methods: {
    bankCodeVerifications() {
      this.binName()
    },
    // async binName() {
    //   console.log(this.info.bankAccount)
    //   let res = await service.binName({
    //     bankAccount: this.info.bankAccount
    //   })
    //   console.log(res)
    //   if (res.code === 200) {
    //     if (res.data.msg === '没有找到该卡的银行') {
    //       this.bankHolder = "开户账号信息与受助人保持一致"
    //     } else {
    //       this.info.bankName = res.data.msg
    //     }

    //   } else {
    //     this.$dialog({
    //       message: res.message
    //     })
    //   }
    // },
    async binName() {

      let res = await service.binName({
        bankAccount: this.info.bankAccount
      })
      console.log(res)
      if (res.code === 200) {
        if (res.data.msg === '没有找到该卡的银行') {
          this.bankHolder = "开户账号信息与受助人保持一致"
        } else {
          this.info.bankName = res.data.msg
        }

      } else {
        this.$dialog({
          message: res.message
        })
      }
    },
    focusBank() {
      this.bankHolder = ''
    }
  },
}
