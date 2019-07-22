<template>
  <div>
    <div class="main-items-array-backing-panel">
      <div v-for="(item, index) in items" :key="index">
        <div v-if="!item.showEditItem" class="added-item-backing-panel">
          <v-layout row wrap>
            <v-flex class="items-array-content-backing-panel" xs10>{{item.userInput}}</v-flex>
            <v-flex class="items-array-control-backing-panel" xs1>
              <v-icon @click="editItemAt(index)">edit</v-icon>
            </v-flex>
            <v-flex class="items-array-control-backing-panel" xs1>
              <v-icon @click="deleteItemAt(index)">delete</v-icon>
            </v-flex>
          </v-layout>
        </div>
        <div v-if="item.showEditItem">
          <InputComponent :props="inputStringArrayComponentEditItemInputComponentProps"></InputComponent>
        </div>
      </div>
    </div>
    <div>
      <InputComponent :props="inputStringArrayComponentInputComponentProps"></InputComponent>
    </div>
  </div>
</template>

<script>
//components
import InputComponent from "../common/InputComponent";

//Services
import { bus } from "@/services/Bus";
import SanitizeString from "../../services/SanitizeString";

export default {
  props: ["props"],
  components: {
    InputComponent
  },

  data() {
    return {
      name: this.props.name,
      placeholder: this.props.placeholder,
      items: [],

      inputStringArrayComponentInputComponentProps: {
        placeholder: this.props.placeholder,
        name: this.props.name + "inputStringArrayComponentInputComponent"
      },

      inputStringArrayComponentEditItemInputComponentProps: {
        placeholder: this.props.placeholder,
        name:
          this.props.name + "inputStringArrayComponentEditItemInputComponent",
        userEntered: ""
      },

      indexBeingEdited: 0
    };
  },
  mounted() {},

  methods: {
    onBlur(userInput) {
      if (userInput !== "" && userInput !== undefined) {
        var item = {
          userInput: SanitizeString.FirstToUpper(userInput),
          showEditItem: false
        };
        this.items.push(item);
        this.updateParent();
        this.clearInput();
      } else {
      }
    },

    clearInput() {
      var payload = {
        command: "ClearInput",
        data: null
      };
      bus.$emit(
        this.inputStringArrayComponentInputComponentProps.name + "FromParent",
        payload
      );
    },

    editItemAt(index) {
      this.indexBeingEdited = index;
      this.inputStringArrayComponentEditItemInputComponentProps.userEntered = this.items[
        index
      ].userInput;
      this.items[index].showEditItem = true;
    },

    deleteItemAt(index) {
      this.items.splice(index, 1);
      this.updateParent();
    },

    updateParent() {
      var payload = this.sanitizeDataForEmmisionToParent(this.items);
      bus.$emit(this.name + "FromChild", payload);
    },

    sanitizeDataForEmmisionToParent(items) {
      var listLength = items.length;
      var returnValue = [];
      for (var i = 0; i < listLength; i++) {
        returnValue.push(items[i].userInput);
      }

      return returnValue;
    }
  },

  created() {
    bus.$on(
      this.inputStringArrayComponentInputComponentProps.name + "FromChild",
      userInput => {
        this.onBlur(userInput);
      }
    );

    bus.$on(
      this.inputStringArrayComponentEditItemInputComponentProps.name +
        "FromChild",
      userInput => {
        this.items[
          this.indexBeingEdited
        ].userInput = SanitizeString.FirstToUpper(userInput);
        this.items[this.indexBeingEdited].showEditItem = false;
        this.updateParent();
      }
    );
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-items-array-backing-panel {
  background-color: lightcyan;
}
.added-item-backing-panel {
  background-color: lightgreen;
  margin: 5px;
  border-radius: 5px;
  height: 48px;
}
.items-array-content-backing-panel {
  padding-top: 15px;
  padding-left: 10px;
  text-align: left;
  font-size: 15px;
}
.items-array-control-backing-panel {
  padding-top: 10px;
}
</style>
