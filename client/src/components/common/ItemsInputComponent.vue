<template>
  <div>
    <div v-if="showTypeSelectComponent">
      <SelectAddComponent :props="typeSelectComponentProps"></SelectAddComponent>
    </div>
    <div v-if="showCatagoriesSelectComponent">
      <SelectAddComponent :props="catagorySelectComponentProps"></SelectAddComponent>
    </div>
    <div v-if="showBrandsSelectComponent">
      <SelectAddComponent :props="brandSelectComponentProps"></SelectAddComponent>
    </div>
  </div>
</template>

<script>
//Components

//Services
import { bus } from "@/services/Bus";
import SelectAddComponent from "../common/SelectAddComponent";

//Vuex
import { mapGetters, mapActions } from "vuex";
import SanitizeString from "../../services/SanitizeString";

export default {
  props: ["props"],
  components: {
    SelectAddComponent
  },

  data() {
    return {
      showTypeSelectComponent: false,
      showCatagoriesSelectComponent: false,
      showBrandsSelectComponent: false,

      idOfSelectedItemType: null,
      idOfSelectedItemCatagory: null,

      typeSelectComponentProps: {
        label: "Select item type",
        name: "typeSelectComponentProps",
        formInputs: ["dave", "is", "a", "Doosh"],
        formHeader: "Add new item type",
        items: []
      },

      catagorySelectComponentProps: {
        label: "Select item catagory",
        name: "catagorySelectComponent",
        formInputs: ["dave", "is", "a", "Doosh"],
        items: []
      },

      brandSelectComponentProps: {
        label: "Select item brand",
        name: "brandSelectComponent",
        formInputs: ["dave", "is", "a", "Doosh"],
        items: []
      }
    };
  },

  methods: {
    ...mapActions([
      "fetchItemTypes",
      "fetchItemCatagories",
      "fetchItemBrands",
      "saveItemType",
      "saveItemCatagory",
      "saveItemBrand"
    ]),

    sanitizeDataForTypeSelectComponent(data) {
      this.typeSelectComponentProps.formInputs = data[0];
      var listLength = data.length;
      var returnValue = [];
      for (var i = 0; i < listLength; i++) {
        var item = {
          value: data[i].typeId,
          text: data[i].itemType
        };
        returnValue.push(item);
      }

      return returnValue;
    },

    sanitizeDataForCatagorySelectComponent(data) {
      var listLength = data.length;
      var returnValue = [];
      for (var i = 0; i < listLength; i++) {
        var item = {
          value: data[i].catagoryId,
          text: data[i].catagory
        };
        returnValue.push(item);
      }

      return returnValue;
    },

    sanitizeDataForBrandSelectComponent(data) {
      var listLength = data.length;
      var returnValue = [];
      for (var i = 0; i < listLength; i++) {
        var item = {
          value: data[i].brandId,
          text: data[i].brand
        };
        returnValue.push(item);
      }

      return returnValue;
    },

    async saveItemTypeToStore(data) {
      var sanitizedData = SanitizeString.FirstToUpper(data);
      var payload = {
        itemType: sanitizedData
      };
      await this.saveItemType(payload);
      this.typeSelectComponentProps.items = this.sanitizeDataForTypeSelectComponent(
        this.allItemTypes
      );
      this.setSelectionLevel(1);
    },

    async saveItemCatagoryToStore(data) {
      this.setSelectionLevel(1);
      var sanitizedData = SanitizeString.FirstToUpper(data);
      var payload = {
        typeId: this.idOfSelectedItemType,
        catagory: sanitizedData
      };

      await this.saveItemCatagory(payload);
      this.catagorySelectComponentProps.items = this.sanitizeDataForCatagorySelectComponent(
        this.allItemCatagories
      );
      this.setSelectionLevel(2);
    },

    async saveItemBrandToStore(data) {
      this.setSelectionLevel(2);
      var sanitizedData = SanitizeString.FirstToUpper(data);
      var payload = {
        catagoryId: this.idOfSelectedItemCatagory,
        brand: sanitizedData
      };

      await this.saveItemBrand(payload);
      this.brandSelectComponentProps.items = this.sanitizeDataForBrandSelectComponent(
        this.allItemBrands
      );
      this.setSelectionLevel(3);
    },

    setSelectionLevel(selectionLevel) {
      if (selectionLevel === 1) {
        this.showTypeSelectComponent = false;
        this.showCatagoriesSelectComponent = false;
        this.showBrandsSelectComponent = false;

        this.showTypeSelectComponent = true;
      } else if (selectionLevel === 2) {
        this.showBrandsSelectComponent = false;

        this.showCatagoriesSelectComponent = true;
        this.showTypeSelectComponent = true;
      } else if (selectionLevel === 3) {
        this.showCatagoriesSelectComponent = true;
        this.showTypeSelectComponent = true;
        this.showBrandsSelectComponent = true;
      }
    },

    loadTypeSelectComponentData() {
      this.typeSelectComponentProps.items = this.sanitizeDataForTypeSelectComponent(
        this.allItemTypes
      );
      this.setSelectionLevel(1);
    },

    async getItemCatagoriesBy(userSelectedItemTypeId) {
      var payload = {
        typeId: userSelectedItemTypeId
      };
      await this.fetchItemCatagories(payload);
      this.catagorySelectComponentProps.items = this.sanitizeDataForCatagorySelectComponent(
        this.allItemCatagories
      );
      this.setSelectionLevel(2);
    },

    async getItemBrandBy(userSelectedItemCatagoryId) {
      var payload = {
        catagoryId: userSelectedItemCatagoryId
      };

      await this.fetchItemBrands(payload);
      this.brandSelectComponentProps.items = this.sanitizeDataForBrandSelectComponent(
        this.allItemBrands
      );
      this.setSelectionLevel(3);
    }
  },

  computed: mapGetters(["allItemTypes", "allItemCatagories", "allItemBrands"]),

  created() {
    bus.$on(this.typeSelectComponentProps.name + "FromChild", payload => {
      if (payload.command === "Selection") {
        this.setSelectionLevel(1);
        this.idOfSelectedItemType = payload.data;
        this.getItemCatagoriesBy(this.idOfSelectedItemType);
      } else if (payload.command === "Saved") {
        this.showTypeSelectComponent = false;
        this.saveItemTypeToStore(payload.data);
      }
    });

    bus.$on(this.catagorySelectComponentProps.name + "FromChild", payload => {
      if (payload.command === "Selection") {
        this.setSelectionLevel(2);
        this.idOfSelectedItemCatagory = payload.data;
        this.getItemBrandBy(payload.data);
      } else if (payload.command === "Saved") {
        this.saveItemCatagoryToStore(payload.data);
      }
    });

    bus.$on(this.brandSelectComponentProps.name + "FromChild", payload => {
      if (payload.command === "Selection") {
        //this.setSelectionLevel(2);
        //this.getItemBrandBy(payload.data);
      } else if (payload.command === "Saved") {
        this.saveItemBrandToStore(payload.data);
      }
    });
  },

  async mounted() {
    await this.fetchItemTypes();
    this.loadTypeSelectComponentData();
  },

  destroyed() {
    bus.$off(this.catagorySelectComponentProps.name + "FromChild");
    bus.$off(this.typeSelectComponentProps.name + "FromChild");
    bus.$off(this.brandSelectComponentProps.name + "FromChild");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
