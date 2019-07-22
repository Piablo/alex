<template>
  <div>
    <div class="header-backing-div">{{title}}</div>
    <div class="body-backing-panel">
      <div class="content-backing-panel">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
//Services
//import { bus } from "@/services/Bus";

export default {
  //name: "HelloWorld",
  props: ["props"],

  data() {
    return {
      title: this.props.title
    };
  },

  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header-backing-div {
  background-color: lightgrey;
}
.body-backing-panel {
  background-color: lightgray;
  padding: 5px;
}
.content-backing-panel {
  background-color: white;
}
</style>
