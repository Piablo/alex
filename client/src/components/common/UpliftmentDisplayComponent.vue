<template>
  <div class="hello">
    Hello from UpliftmentDisplayComponent{{selectedClient}}
    <ButtonComponent :props="cancelUpliftmentDisplayButtonComponentProps"></ButtonComponent>
  </div>
</template>

<script>
//Components
import ButtonComponent from "../common/ButtonComponent";

//Services
import { bus } from "@/services/Bus";

//Vuex
import { mapGetters } from "vuex";

export default {
  props: ["props"],
  components: {
    ButtonComponent
  },

  data() {
    return {
      name: this.props.name,

      cancelUpliftmentDisplayButtonComponentProps: {
        label: "Cancel",
        name: this.props.name + "cancelUpliftmentDisplayButtonComponent"
      }
    };
  },

  methods: {},

  computed: mapGetters(["selectedClient"]),

  created() {
    bus.$on(
      this.cancelUpliftmentDisplayButtonComponentProps.name + "FromChild",
      clicked => {
        bus.$emit(this.name + "FromChild", true);
      }
    );
  },

  mounted() {},

  destroyed() {
    bus.$off(
      this.cancelUpliftmentDisplayButtonComponentProps.name + "FromChild"
    );
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
