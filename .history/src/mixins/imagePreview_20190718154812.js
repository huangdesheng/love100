export default {
  methods: {
    seeBigTu(item, value) {
      WeixinJSBridge.invoke("imagePreview", {
        urls: value,
        current: item
      });
    },
    singleBigTu(value) {
      WeixinJSBridge.invoke("imagePreview", {
        urls: value,
        current: item
      });
    }
  },
}
