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
      studyPic: [],
      familyLength: [],
      stydyPicMore: [],
      studyLength: [],
      familyPicMore: [],
      loadingStatus: false,
      studyloadingStatus: false
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

    async moreUploadImg(e, index) {
      let Pic = [...e.target.files];
      if (index === 3) {
        this.loadingStatus = true;
        if (this.familyPicMore.length >= 2 && Pic.length !== 0) {
          this.familyLength = [1, 2, 3];
        } else {
          this.familyLength = [];
        }
      } else if (index === 4) {
        this.studyloadingStatus = true;
        if (this.stydyPicMore.length >= 2 && Pic.length !== 0) {
          this.studyLength = [1, 2, 3];
        } else {
          this.studyLength = [];
        }
      }

      let formdata = new FormData();
      for (var i = 0; i < 3; i++) {
        formdata.append("files", Pic[i]);
      }
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      var resolve = await service.moreUpload(formdata, config);
      if (resolve.code === 200) {
        console.log(this.item)
        if (index === 3) {
          this.loadingStatus = false;
          let familyItem = []
          resolve.data.forEach(element => {
            familyItem.push(element.photoUrl)
          });
          this.morePic = [...this.morePic, ...familyItem];
          let familyPicMore = this.morePic.slice(0, 3);
          this.familyPicMore = familyPicMore;
          // console.log(this.item.photos)
          // this.item.photos[1].urls = familyPicMore
          this.item.photos.filter(item => item.type === 2)[0].urls = stydyPicMore
        } else if (index === 4) {
          this.studyloadingStatus = false;
          let studyItem = []
          resolve.data.forEach(element => {
            studyItem.push(element.photoUrl)
          });
          this.studyPic = [...this.studyPic, ...studyItem];
          let stydyPicMore = this.studyPic.slice(0, 3);
          this.stydyPicMore = stydyPicMore;
          // this.item.photos[2].urls = stydyPicMore
          this.item.photos.filter(item => item.type === 3)[0].urls = stydyPicMore

        }
      }
    },
  }
}
