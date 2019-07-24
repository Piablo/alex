<template>
  <div class="admin-page">
    <v-layout row wrap>
      <v-flex xs12>
        <div class="toolbar">
          <v-layout row wrap>
            <v-flex xs1>
              <div @click="addUpliftment">Upliftment</div>
            </v-flex>
          </v-layout>
        </div>
        <div v-if="showAddClientDetails">
          <AddClientDetailsComponent :props="addClientDetailsComponentProps"></AddClientDetailsComponent>
        </div>
        <div v-if="showAddItems">
          <ItemsInputComponent></ItemsInputComponent>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
//Components
import ButtonComponent from "../components/common/ButtonComponent";
import AddClientDetailsComponent from "../components/common/AddClientDetailsComponent";
import ItemsInputComponent from "../components/common/ItemsInputComponent";

//Services
import { bus } from "@/services/Bus";

//Vuex
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["props"],

  components: {
    ButtonComponent,
    AddClientDetailsComponent,
    ItemsInputComponent
  },

  data() {
    return {
      selectComponentItems: this.allTitles,
      showAddClientDetails: false,
      showAddItems: false,

      saveButtonComponentProps: {
        name: "saveButtonComponentProps",
        label: "Save"
      },

      addUpliftmentState: "",

      addClientDetailsComponentProps: {
        name: "addClientDetailsComponent"
      }
    };
  },

  methods: {
    ...mapActions(["saveClient"]),

    showStageSelector(stage) {
      this.showAddClientDetails = false;
      this.showAddItems = false;

      if (stage === "AddClientDetails") {
        this.showAddClientDetails = true;
        this.addUpliftmentState = "AddItems";
      } else if (stage === "AddItems") {
        this.showAddItems = true;
        this.addUpliftmentState = "";
      }
    },

    addUpliftment() {
      if (this.addUpliftmentState === "") {
        this.showStageSelector("AddClientDetails");
      }
    },

    getDataFromChildComponents() {
      bus.$emit(
        this.addClientDetailsComponentProps.name + "FromParent",
        "ReturnData"
      );
    }
  },

  //computed: { ...mapGetters(["allTitles"])},

  created() {
    //Response data from child component
    bus.$on(this.addClientDetailsComponentProps.name + "FromChild", client => {
      this.saveClient(client);
      this.showStageSelector(this.addUpliftmentState);
    });

    bus.$on(this.saveButtonComponentProps.name + "FromChild", payload => {
      this.getDataFromChildComponents();
    });
  }
};
</script>

<style scoped>
.toolbar {
  background-color: lightblue;
}
</style>
