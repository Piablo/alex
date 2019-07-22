<template>
  <div>
    <div v-if="!showInputField">
      <v-layout row wrap>
        <v-flex xs11>
          <div class="select-component-backing-panel">
            <v-select :items="items" :label="label" solo @change="onSelect" v-model="userSelected"></v-select>
          </div>
        </v-flex>
        <v-flex xs1>
          <div class="add-item-button-backing-panel">
            <v-icon size="45px" @click="onAddItemClick">add_circle</v-icon>
          </div>
        </v-flex>
      </v-layout>
    </div>
    <div v-if="showInputField">
      <v-layout row wrap>
        <v-flex xs11>
          <InputComponent :props="selectAddInputComponentProps"></InputComponent>
        </v-flex>
        <v-flex xs1>
          <div class="add-item-button-backing-panel">
            <v-icon size="45px" @click="onSaveItemClick">save</v-icon>
          </div>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
//Components
import InputComponent from "../common/InputComponent";
import ButtonComponent from "../common/ButtonComponent";

//Services
import { bus } from "@/services/Bus";

//Vuex

export default {
  props: ["props"],
  components: {
    InputComponent,
    ButtonComponent
  },

  data() {
    return {
      items: this.props.items,
      label: this.props.label,
      name: this.props.name,

      userSelected: null,
      showInputField: false,

      selectAddInputComponentProps: {
        name: this.props.name + "selectAddInputComponent",
        placeholder: "Enter details"
      }
    };
  },

  methods: {
    onSelect() {
      var payload = {
        command: "Selection",
        data: this.userSelected
      };
      bus.$emit(this.name + "FromChild", payload);
    },

    onAddItemClick() {
      this.showInputField = true;
    },

    onSaveItemClick() {
      this.showInputField = false;
    }
  },

  created() {
    bus.$on(this.selectAddInputComponentProps.name + "FromChild", userInput => {
      var payload = {
        command: "Saved",
        data: userInput
      };
      bus.$emit(this.name + "FromChild", payload);
    });
  },

  mounted() {},

  destroyed() {
    bus.$off(this.selectAddInputComponentProps.name + "FromChild");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.select-component-backing-panel {
  background-color: lightpink;
  padding: 5px;
  height: 58px;
}
.add-item-button-backing-panel {
  background-color: lightpink;
  padding: 5px;
  height: 58px;
}
.button-wrapper-div {
  padding: 4px;
  background-color: aqua;
}
</style>
