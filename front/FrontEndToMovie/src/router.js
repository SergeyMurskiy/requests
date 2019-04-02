import Vue from "vue";
import Router from "vue-router";

import Directos from "@/pages/Directors.vue"
import Admin from "@/pages/Admin.vue"
import Films from "@/pages/Films.vue"
Vue.use(Router);

export default new Router({
  mode: 'history',

  routes: [
    {
      path: '/directors',
      name: 'home',
      component: Directos
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/Films',
      name: 'films',
      component: Films
    }
  ]
})