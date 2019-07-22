<template>
  <div class="hello"></div>
</template>

<script>
//Components

//Services
import { bus } from "@/services/Bus";

//Vuex
//import { mapGetters } from "vuex";

export default {
  props: ["props"],
  components: {},

  data() {
    return {};
  },

  methods: {},

  //computed: mapGetters(["allUpliftments"]),

  created() {
    // bus.$on(this.clientDetailsFormProps.name + "FromChild", payload => {
    // });
  },

  mounted() {},

  destroyed() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
