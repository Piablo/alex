<template>
  <div class="toolbar-backing-panel">
    <v-layout row wrap>
      <div class="nav-btn-styles" @click="navigateTo('admin')">Admin</div>
      <div class="nav-btn-styles" @click="navigateTo('collections')">Collections</div>
      <div class="nav-btn-styles" @click="navigateTo('sales')">Sales</div>
      <div class="nav-btn-styles" @click="navigateTo('accounts')">Accounts</div>
      <div class="nav-btn-styles" @click="navigateTo('reports')">Reports</div>
    </v-layout>
  </div>
</template>

<script>
//Services
import { bus } from "@/services/Bus";

//Components
import ButtonComponent from "./common/ButtonComponent";

export default {
  //name: "HelloWorld",
  props: {
    //msg: String
  },

  data() {
    return {
      adminPageButtonComponentProps: {
        name: "adminPageButtonComponent",
        label: "admin"
      },

      collectionsPageButtonComponentProps: {
        name: "collectionsPageButtonComponent",
        label: "Collections"
      },

      salesPageButtonComponentProps: {
        name: "salesPageButtonComponent",
        label: "sales"
      }
    };
  },

  methods: {
    navigateTo(urlString) {
      this.$router.push(urlString);
    }
  },

  created() {
    bus.$on(this.adminPageButtonComponentProps.name + "FromChild", payload => {
      this.navigateTo("admin");
    });

    bus.$on(
      this.collectionsPageButtonComponentProps.name + "FromChild",
      payload => {
        this.navigateTo("collections");
      }
    );

    bus.$on(this.salesPageButtonComponentProps.name + "FromChild", payload => {
      this.navigateTo("sales");
    });
  },

  components: {
    ButtonComponent
  }
};
</script>

<style scoped>
.toolbar-backing-panel {
  background-color: red;
}

.nav-btn-styles {
  background-color: grey;
  cursor: pointer;
  color: lightgrey;
  padding: 5px;
}
.nav-btn-styles:hover {
  background-color: #000000;
}
</style>
