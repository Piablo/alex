<template>
  <div v-if="loaded">
    <PanelComponent :props="clientDetailsPanelComponentProps">
      <SelectComponent :props="titleSelectComponentProps"></SelectComponent>
      <InputComponent :props="firstNameInputComponentProps"></InputComponent>
      <InputComponent :props="middleNameInputComponentProps"></InputComponent>
      <InputComponent :props="lastNameInputComponentProps"></InputComponent>
      <InputStringArrayComponent :props="addressDetailsInputStringArrayComponentProps"></InputStringArrayComponent>
      <InputStringArrayComponent :props="contactDetailsInputStringArrayComponentProps"></InputStringArrayComponent>
    </PanelComponent>
  </div>
</template>

<script>
//Components
import PanelComponent from "../common/PanelComponent";
import SelectComponent from "../common/SelectComponent";
import InputComponent from "../common/InputComponent";
import InputStringArrayComponent from "../common/InputStringArrayComponent";
//Services
import { bus } from "@/services/Bus";
import SanitizeString from "../../services/SanitizeString";

//Vuex
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["props"],
  components: {
    SelectComponent,
    InputComponent,
    PanelComponent,
    InputStringArrayComponent
  },

  data() {
    return {
      loaded: false,

      name: this.props.name,

      clientDetailsPanelComponentProps: {
        title: "Add client details"
      },

      titleSelectComponentProps: {
        items: "",
        label: "Select Title",
        name: "titleSelectComponent"
      },

      firstNameInputComponentProps: {
        name: "firstNameInputComponent",
        placeholder: "Firstname"
      },

      middleNameInputComponentProps: {
        name: "middleNameInputComponent",
        placeholder: "Middlename"
      },

      lastNameInputComponentProps: {
        name: "lastNameInputComponent",
        placeholder: "Lastname"
      },

      addressDetailsInputStringArrayComponentProps: {
        name: "addressDetailsInputStringArrayComponent",
        placeholder: "Address line"
      },

      contactDetailsInputStringArrayComponentProps: {
        name: "constactDetailsInputStringArrayComponent",
        placeholder: "Contact detail"
      },

      clientDetails: {
        titleId: null,
        firstName: "",
        middleName: "",
        lastName: "",
        address: "",
        contacts: ""
      }
    };
  },

  methods: {
    ...mapActions(["fetchTitles"]),

    sanitizeDataForTitleSelect(responseData) {
      const listLength = responseData.length;
      const returnValue = [];
      for (var i = 0; i < listLength; i++) {
        var item = {
          text: responseData[i].Title,
          value: responseData[i].TitleID
        };
        returnValue.push(item);
      }
      return returnValue;
    },

    allRequiredFieldsEntered() {
      var formIsValid = true;
      if (this.clientDetails.firstName === "") {
        formIsValid = false;
      }

      if (this.clientDetails.lastName === "") {
        formIsValid = false;
      }

      if (this.clientDetails.address === "") {
        formIsValid = false;
      }
      if (this.clientDetails.contacts === "") {
        formIsValid = false;
      }
      return formIsValid;
    }
  },

  computed: { ...mapGetters(["allTitles"]) },

  async created() {
    //TitleSelectComponent onSelect
    bus.$on(this.titleSelectComponentProps.name + "FromChild", userSelected => {
      this.clientDetails.titleId = userSelected;
    });

    //FirstNameInoutComponent onBlur
    bus.$on(
      this.firstNameInputComponentProps.name + "FromChild",
      userEntered => {
        this.clientDetails.firstName = SanitizeString.FirstToUpper(userEntered);
      }
    );

    //MidddleNameInputComponent onBlur
    bus.$on(
      this.middleNameInputComponentProps.name + "FromChild",
      userEntered => {
        this.clientDetails.middleName = SanitizeString.FirstToUpper(
          userEntered
        );
      }
    );

    //LastNameInoutComponent onBlur
    bus.$on(
      this.lastNameInputComponentProps.name + "FromChild",
      userEntered => {
        this.clientDetails.lastName = SanitizeString.FirstToUpper(userEntered);
      }
    );

    //ParentComponent Requesting Data
    bus.$on(this.name + "FromParent", command => {
      if (command === "ReturnData") {
        if (this.allRequiredFieldsEntered()) {
          bus.$emit(this.name + "FromChild", this.clientDetails);
        }
      }
    });

    //Address details array fromChild
    bus.$on(
      this.addressDetailsInputStringArrayComponentProps.name + "FromChild",
      data => {
        this.clientDetails.address = JSON.stringify(data);
      }
    );

    //contact details array fromChild
    bus.$on(
      this.contactDetailsInputStringArrayComponentProps.name + "FromChild",
      data => {
        this.clientDetails.contacts = JSON.stringify(data);
      }
    );

    await this.fetchTitles();

    this.titleSelectComponentProps.items = this.sanitizeDataForTitleSelect(
      this.allTitles
    );

    this.loaded = true;
  },

  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
