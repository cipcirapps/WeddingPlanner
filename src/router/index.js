import Vue from "vue";
import Router from "vue-router";
import Dashboard from "@/components/Dashboard";
import conf_notArr from "@/components/conf_notArr";
import confirmed from "@/components/confirmed";
import view_all from "@/components/view_all";
import layout from "@/components/layout";

import editInvitat from "@/components/edit_Invitat";
import edit_group from "@/components/edit_group";

import add_new_group from "@/components/add_new_Group";
import login from "@/components/Login";
import Cip from "@/components/test/cip";
import Ramo from "@/components/test/ramo";
import AuthGuard from "./auth-guard"
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Dashboard",
      component: Dashboard
      
    },
    {
      path: "/login",
      name: "login",
      component: login
    },
    {
      path: "/confirmed",
      name: "confirmed",
      component: confirmed,
      beforeEnter:AuthGuard.guardEdit
    },
    {
      path: "/conf_notArr",
      name: "conf_notArr",
      component: conf_notArr,
      beforeEnter:AuthGuard.guardEdit
    },
    {
      path: "/view_all",
      name: "view_all",
      component: view_all,
      beforeEnter:AuthGuard.guardAdmin
    },
    {
      path: "/layout",
      name: "layout",
      component: layout,
      beforeEnter:AuthGuard.guardAdmin
    },
    {
      path: "/add_new_group",
      name: "add_new_group",
      component: add_new_group,
      beforeEnter:AuthGuard.guardAdmin
    },
    {
      path: "/editInvitat/:gid",
      name: "editInvitat",
      component: editInvitat,
      beforeEnter:AuthGuard.guardAdmin
    },
    {
      path: "/edit_group/:gid",
      name: "edit_group",
      component: edit_group,
      beforeEnter:AuthGuard.guardAdmin
    },
    {
      path: "/cip",
      name: "Cip",
      component: Cip
    },
    {
      path: "/ramo",
      name: "Ramo",
      component: Ramo
    }
  ]
});
