<template>
  <div class="select-component-backing-panel">
    <v-select :items="items" :label="label" solo @change="onSelect" v-model="userSelected"></v-select>
  </div>
</template>

<script>
//Components

//Services
import { bus } from "@/services/Bus";

//Vuex

export default {
  props: ["props"],
  components: {},

  data() {
    return {
      items: this.props.items,
      label: this.props.label,
      name: this.props.name,

      userSelected: null
    };
  },

  methods: {
    onSelect() {
      bus.$emit(this.name + "FromChild", this.userSelected);
    }
  },

  created() {
    console.log("FromSelecctComponent");
    console.log(this.props.items);
    // bus.$on(this.clientDetailsFormProps.name + "FromChild", payload => {
    // });
  },

  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.select-component-backing-panel {
  background-color: lightpink;
  padding: 5px;
  height: 58px;
}
</style>
