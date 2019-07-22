<template>
  <div class="hello">
    <PanelComponent :props="adminPageLeftNaveComponentProps">
      <div
        class="tile-display-styles"
        v-for="(upliftment, index) in allUpliftments"
        :key="index"
      >{{upliftment.number}}</div>
    </PanelComponent>
  </div>
</template>

<script>
//Components
import PanelComponent from "@/components/common/PanelComponent";
//Services
//import { bus } from "@/services/Bus";

//Vuex
import { mapGetters } from "vuex";

export default {
  //name: "HelloWorld",
  props: ["props"],

  components: {
    PanelComponent
  },

  computed: mapGetters(["allUpliftments"]),

  data() {
    return {
      headers: [
        { text: "Id", align: "middle", sortable: false },
        { text: "Numbers", align: "middle", sortable: false }
      ],

      adminPageLeftNaveComponentProps: {
        title: "Left nav"
      }
    };
  },

  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tile-display-styles {
  background-color: aquamarine;
  margin-top: 2px;
  margin-left: 2px;
  margin-right: 2px;
  border-radius: 5px;
  height: 48px;
}
</style>
