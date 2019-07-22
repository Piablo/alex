<template>
  <div class="input-backing-panel">
    <v-text-field :placeholder="placeholder" @blur="onBlur" solo v-model="userEntered"></v-text-field>
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
      name: this.props.name,
      placeholder: this.props.placeholder,
      userEntered: this.props.userEntered
    };
  },

  methods: {
    onBlur() {
      bus.$emit(this.name + "FromChild", this.userEntered);
    }
  },

  created() {
    bus.$on(this.name + "FromParent", payload => {
      if (payload.command === "ClearInput") {
        this.userEntered = "";
      } else if (payload.command === "SetInput") {
        this.userEntered = payload.data;
      }
    });
  },

  destroyed() {
    bus.$off(this.name + "FromParent");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input-backing-panel {
  background-color: aquamarine;
  padding: 5px;
  height: 58px;
}
</style>
