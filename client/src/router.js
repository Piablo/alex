import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/admin",
      name: "admin",
      component: function() {
        return import("./views/AdminPage.vue");
      }
    },
    {
      path: "/collections",
      name: "collections",
      component: function() {
        return import("./views/CollectionsPage.vue");
      }
    },
    {
      path: "/sales",
      name: "sales",
      component: function() {
        return import("./views/SalesPage.vue");
      }
    },
    {
      path: "/accounts",
      name: "accounts",
      component: function() {
        return import("./views/AccountsPage.vue");
      }
    },
    {
      path: "/reports",
      name: "reports",
      component: function() {
        return import("./views/ReportsPage.vue");
      }
    }
  ]
});
