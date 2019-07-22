<template>
  <div class="backing-panel">
    <PanelComponent :props="contactDetailsInputPanelCompoentProps">
      <InputStringArrayComponent :props="contactInputStringArrayComponentProps"></InputStringArrayComponent>
    </PanelComponent>
  </div>
</template>

<script>
//components
import PanelComponent from "./common/PanelComponent";
import InputComponent from "./common/InputComponent";
import InputStringArrayComponent from "./InputStringArrayComponent";

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  components: {
    PanelComponent,
    InputComponent,
    InputStringArrayComponent
  },

  data() {
    return {
      contacts: [],
      contactDetailsInputPanelCompoentProps: {
        title: "Contact Details"
      },

      contactInputStringArrayComponentProps: {
        placeholder: "Contact"
      }
    };
  },
  created() {
    this.pushContact();
  },

  methods: {
    onBlur() {
      this.pushContact();
    },

    pushContact() {
      var model = {
        placeholder: "Contact " + (this.contacts.length + 1)
      };
      this.contacts.push(model);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.backing-panel {
  background-color: lightcoral;
  padding: 2px;
}
.contact-inpput-backing-panel {
  background-color: lightblue;
  padding: 5px;
  height: 58px;
}
</style>
