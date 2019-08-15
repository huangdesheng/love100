<template>
  <div>
    <li v-for="(item,index) in list" :key="index">
      <p>{{item.name}}</p>
      <p>{{item.price}}</p>
      <td>
        <input type="checkbox" v-model="checked" :value="item.id">
        <!-- <template v-if="checked"> -->
        <img
          :src="checked.indexOf(item.id)>=0?icon.active:icon.normal"
          alt
          @click="indexa(item.id)"
        >
        <!-- <img src="@/assets/helpProgram/checked_status.png" alt v-else> -->
        <!-- </template> -->
      </td>
    </li>
  </div>
</template>

<script>
export default {
  data() {
    return {
      icon: {
        active: require("@/assets/helpProgram/checked_status.png"),
        normal: require("@/assets/helpProgram/no_checked_status.png")
      },
      list: [
        {
          id: 1,
          name: "iPhone 7",
          price: 16188,
          count: 1
        },
        {
          id: 2,
          name: "iPhone 8",
          price: 16188,
          count: 1
        },
        {
          id: 3,
          name: "iPhone X",
          price: 16188,
          count: 1
        }
      ],
      checked: []
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped>
td {
  position: relative;
  left: 0;
  top: 0;
  // input {
  //   width: 1rem;
  //   height: 1rem;
  //   position: absolute;
  //   left: 0;
  //   top: 0;
  //   z-index: ;
  // }
  // img {
  //   width: 1rem;
  //   height: 1rem;
  //   position: absolute;
  //   left: 0;
  //   top: 0;
  // }
}
</style>
