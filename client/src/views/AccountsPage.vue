<template>
  <div class="hello">Accounts</div>
</template>

<script>
//Components

//Services
import { bus } from "@/services/Bus";

export default {
  props: ["props"],
  components: {},

  data() {
    return {};
  },

  methods: {},

  computed: {},

  created() {
    // bus.$on(this.clientDetailsFormProps.name + "FromChild", payload => {
    // });
  },

  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
