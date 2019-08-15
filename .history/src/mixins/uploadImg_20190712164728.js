import service from "@/api";
export default {
  data() {
    return {
      positivePic: "", //身份证正面图
      againstPic: "", //身份证反面图
      photo: "", //头像
      photoStatus: false,
      positivePicState: false,
      againstPicState: false,
      ticketPicState: false,
      admissionPicState: false
    }
  },
  methods: {
    async uploadImg(e, index) {
      console.log(e, index)
      return false
      let formdata = new FormData();
      formdata.append("file", e.file);
      if (index === 1) {
        this.ticketPicState = true
        this.ticketPic = ''
      } else if (index === 2) {
        this.admissionPicState = true
        this.admissionPic = ''
      } else if (index === 3) {
        this.positivePicState = true
        this.positivePic = ''
      } else if (index === 4) {
        this.againstPic = ''
        this.againstPicState = true
      } else if (index === 5) {
        this.photoStatus = true
        this.photo = ''
      }
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      var resolve = await service.singleUpload(formdata, config);
      // 1代表助人准考证 2 受助人的录取通知书 3代表神身份证正面上传 4代表身份证反面上传
      // 5代表头像上传 6代表上传营业执照
      if (resolve.code === 200) {
        console.log(resolve)
        if (index === 1) {
          this.ticketPic = resolve.data.photoUrl
          this.ticketPicState = true;
        } else if (index === 2) {
          this.admissionPic = resolve.data.photoUrl
          this.admissionPicState = true;
        } else if (index === 3) {
          this.positivePic = resolve.data.photoUrl
          this.positivePicState = true
        } else if (index === 4) {
          this.againstPic = resolve.data.photoUrl
          this.againstPicState = true
        } else if (index === 5) {
          this.photo = resolve.data.photoUrl
          this.photoStatus = true
        } else if (index === 6) {
          this.item.businessLicense = resolve.data.photoUrl
        }
      }
    },

    // 受助人准考证
    onReadTicketPic(e) {
      this.uploadImg(e, 1);
    },

    // 受助人录取通知书
    onReadAmission(e) {
      this.uploadImg(e, 2);
    },
    // 正面身份证
    onRead(e) {
      this.uploadImg(e, 3);
    },
    // 反面图片上传
    Read(e) {
      this.uploadImg(e, 4);
    },
    // 头像上传
    photoOnRead(e) {
      this.uploadImg(e, 5);
    },

  }
}
