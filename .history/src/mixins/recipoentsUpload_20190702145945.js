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
      projectState: false,
      businessLicenseStatus: false,
      familyStatus: false,
      learnStatus: false,
      morePic: [],
      familyLength: []
    }
  },
  methods: {
    async uploadImg(e, index) {
      let formdata = new FormData();
      formdata.append("file", e.file);
      if (index === 0) {
        this.photoStatus = true
        this.item.photo = ''
      } else if (index === 1) {
        this.positivePic = ''
        this.positivePicState = true
      } else if (index === 2) {
        this.againstPic = ''
        this.againstPicState = true
      } else if (index === 3) {
        this.familyStatus = true
        this.familyPic = ''
      } else if (index === 4) {
        this.learnPic = '';
        this.learnStatus = true
      } else if (index === 7) {
        this.projectState = true
        this.data.projectPhoto = ''
      } else if (index === 8) {
        this.businessLicenseStatus = true
        this.item.businessLicense = ''
      }
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      var resolve = await service.singleUpload(formdata, config);
      if (resolve.code === 200) {
        if (index === 1) {
          this.item.photos[0].urls[0] = resolve.data.photoUrl;
          this.positivePic = resolve.data.photoUrl;
          this.positivePicState = true
        } else if (index === 2) {
          this.item.photos[0].urls[1] = resolve.data.photoUrl;
          this.againstPic = resolve.data.photoUrl;
        } else if (index === 3) {
          this.item.photos[1].urls[0] = resolve.data.photoUrl;
          this.familyPic = resolve.data.photoUrl;
          this.familyStatus = true
        } else if (index === 4) {
          this.item.photos[2].urls[0] = resolve.data.photoUrl;
          this.learnPic = resolve.data.photoUrl;
          this.learnStatus = true
        } else if (index === 0) {
          this.item.photo = resolve.data.photoUrl;
          this.photoStatus = true
        } else if (index === 7) {
          this.data.projectPhoto = resolve.data.photoUrl;
          this.projectState = true
        } else if (index === 8) {
          this.item.businessLicense = resolve.data.photoUrl;
          this.businessLicenseStatus = true
        }
      }
    },


    //  上传身份证正面图
    onRead(e) {
      this.uploadImg(e, 1);
    },

    //  上传身份证反面图
    Read(e) {
      this.uploadImg(e, 2);
    },

    // 上传头像
    photoOnRead(e) {
      this.uploadImg(e, 0);
    },

    // 上传学习图片
    learnOnRead(e) {
      this.uploadImg(e, 4);
    },



    //  上传家庭情况图片 
    // familyOnRead(e) {
    //   this.uploadImg(e, 3);
    // },

    // 上传项目主图
    programOnRead(e) {
      this.uploadImg(e, 7);
    },

    licenseUpload(e) {
      this.uploadImg(e, 8)
    },


    async moreUploadImg(e) {
      console.log(e)
      // console.log(e.target.files[1])
      // let Pic = [...e.target.files]
      // console.log(Pic)
      // return false
      if (e.length === 1) {
        this.familyLength = [1]
      } else if (e.length === 2) {
        this.familyLength = [1, 2]
      } else if (e.length >= 3) {
        this.familyLength = [1, 2, 3]
      }

      let formdata = new FormData();

      // formdata.append("file", e.file);
      // Pic.forEach(item => {
      //   formdata.append("files", item)
      //   // formdata.append('number', index) //第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
      // })

      for (var i = 0; i < Pic.length; i++) {
        formdata.append("files", Pic[i])
      }
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      var resolve = await service.moreUpload(formdata, config);
      console.log(resolve)
      // console.log(11111)
      // return false
      if (resolve.code === 200) {
        console.log(resolve)
        // let morePic = resolve.data.filter((item, index) => index <= 2)
        this.morePic = [...this.morePic, ...resolve.data]
        let familyPicMore = this.morePic.slice(0, 3)
        this.familyPicMore = familyPicMore
        console.log(this.familyPicMore)
      }
    },

    familyOnRead(e) {
      this.moreUploadImg(e)
    },
    onFileChange(e) {
      this.moreUploadImg(e)
    }
  }
}
