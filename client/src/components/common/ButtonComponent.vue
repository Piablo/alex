<template>
  <div class="btn-backing-panel">
    <v-btn @click="onClick" block :disabled="disabled">{{label}}</v-btn>
  </div>
</template>

<script>
//Services
import { bus } from "@/services/Bus";

export default {
  //name: "HelloWorld",
  props: ["props"],

  data() {
    return {
      label: this.props.label,
      name: this.props.name,
      disabled: this.props.disabled
    };
  },

  methods: {
    onClick() {
      bus.$emit(this.name + "FromChild", true);
    }
  },
  created() {
    bus.$on(this.name + "FromParent", disabled => {
      this.disabled = disabled;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn-backing-panel {
  background-color: aquamarine;
  padding: 2px;
}
</style>
