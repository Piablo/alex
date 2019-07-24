<template>
  <div v-if="loaded">
    <div v-if="!showUpliftmentDisplayComponent">
      <v-layout row wrap>
        <v-flex xs4>
          <PanelComponent :props="clientDetailsPanelComponentProps">
            <SelectComponent :props="titleSelectComponentProps"></SelectComponent>
            <InputComponent :props="firstNameInputComponentProps"></InputComponent>
            <InputComponent :props="middleNameInputComponentProps"></InputComponent>
            <InputComponent :props="lastNameInputComponentProps"></InputComponent>
            <InputStringArrayComponent :props="addressDetailsInputStringArrayComponentProps"></InputStringArrayComponent>
            <InputStringArrayComponent :props="contactDetailsInputStringArrayComponentProps"></InputStringArrayComponent>
          </PanelComponent>
        </v-flex>
        <v-flex xs8>
          <DisplayClientOptionsComponent :props="displayClientOptionsComponentProps"></DisplayClientOptionsComponent>
        </v-flex>
      </v-layout>
    </div>
    <div v-if="showUpliftmentDisplayComponent">
      <UpliftmentDisplayComponent :props="addClientDetailsUpliftmentDisplayComponentProps"></UpliftmentDisplayComponent>
    </div>
    <div>
      <ButtonComponent :props="acceptButtonComponentProps"></ButtonComponent>
    </div>
  </div>
</template>

<script>
//Components
import PanelComponent from "../common/PanelComponent";
import SelectComponent from "../common/SelectComponent";
import InputComponent from "../common/InputComponent";
import InputStringArrayComponent from "../common/InputStringArrayComponent";
import ButtonComponent from "../common/ButtonComponent";
import UpliftmentDisplayComponent from "../common/UpliftmentDisplayComponent";
import DisplayClientOptionsComponent from "../common/DisplayClientOptionsComponent";

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
    InputStringArrayComponent,
    ButtonComponent,
    UpliftmentDisplayComponent,
    DisplayClientOptionsComponent
  },

  data() {
    return {
      loaded: false,
      showUpliftmentDisplayComponent: false,

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

      addClientDetailsUpliftmentDisplayComponentProps: {
        name: "addClientDetailsUpliftmentDisplayComponent"
      },

      displayClientOptionsComponentProps: {
        name: "displayClientOptionsComponent"
      },

      clientDetails: {
        titleId: null,
        firstName: "",
        middleName: "",
        lastName: "",
        address: "",
        contacts: ""
      },

      acceptButtonComponentProps: {
        name: "acceptButtonComponent",
        disabled: true,
        label: "Accept"
      },

      showAcceptButton: false
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
    },

    updateDisplayClientOptionsComponent(field, data) {
      var payload = {
        field: field,
        data: data
      };
      bus.$emit(
        this.displayClientOptionsComponentProps.name + "FromParent",
        payload
      );
    },

    checkFormValidity() {
      var formIsValid = true;
      if (
        this.clientDetails.firstName === undefined ||
        this.clientDetails.firstName === ""
      ) {
        formIsValid = false;
      } else if (
        this.clientDetails.lastName === undefined ||
        this.clientDetails.lastName === ""
      ) {
        formIsValid = false;
      } else if (
        this.clientDetails.address === undefined ||
        this.clientDetails.address === ""
      ) {
        formIsValid = false;
      } else if (
        this.clientDetails.contacts === undefined ||
        this.clientDetails.contacts === ""
      ) {
        formIsValid = false;
      }
      bus.$emit(
        this.acceptButtonComponentProps.name + "FromParent",
        !formIsValid
      );
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
        if (userEntered !== "") {
          this.clientDetails.firstName = SanitizeString.FirstToUpper(
            userEntered
          );
          this.updateDisplayClientOptionsComponent(
            "firstName",
            this.clientDetails.firstName
          );
        } else {
          this.clientDetails.firstName = "";
        }
        this.checkFormValidity();
      }
    );

    //MidddleNameInputComponent onBlur
    bus.$on(
      this.middleNameInputComponentProps.name + "FromChild",
      userEntered => {
        this.clientDetails.middleName = SanitizeString.FirstToUpper(
          userEntered
        );
        this.updateDisplayClientOptionsComponent(
          "middleName",
          this.clientDetails.middleName
        );
      }
    );

    //LastNameInoutComponent onBlur
    bus.$on(
      this.lastNameInputComponentProps.name + "FromChild",
      userEntered => {
        if (userEntered !== "") {
          this.clientDetails.lastName = SanitizeString.FirstToUpper(
            userEntered
          );
          this.updateDisplayClientOptionsComponent(
            "lastName",
            this.clientDetails.lastName
          );
        } else {
          this.clientDetails.lastName = "";
        }
        this.checkFormValidity();
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
        if (data.length > 0) {
        } else {
          this.clientDetails.address = "";
        }
        this.checkFormValidity();
      }
    );

    //contact details array fromChild
    bus.$on(
      this.contactDetailsInputStringArrayComponentProps.name + "FromChild",
      data => {
        this.clientDetails.contacts = JSON.stringify(data);
        if (data.length > 0) {
        } else {
          this.clientDetails.contacts = "";
        }
        this.checkFormValidity();
      }
    );

    //This is the event that registers the cancel button click from UpliftmentDisplayComponent
    bus.$on(
      this.addClientDetailsUpliftmentDisplayComponentProps.name + "FromChild",
      clicked => {
        this.showUpliftmentDisplayComponent = false;
      }
    );

    bus.$on(
      this.displayClientOptionsComponentProps.name + "FromChild",
      selection => {
        this.showUpliftmentDisplayComponent = true;
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
