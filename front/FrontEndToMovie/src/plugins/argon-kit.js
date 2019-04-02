import "@/assets/css/bootstrap.min.css";
import "@/assets/css/style.css";
import globalDirectives from "./globalDirectives";
 import VueLazyload from "vue-lazyload";

export default {
  install(Vue) {
    Vue.use(globalDirectives);
    Vue.use(VueLazyload);
   // Vue.use(VueAxios, axios)
  }
};
