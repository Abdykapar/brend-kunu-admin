import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueCookies from "vue-cookies";
import Buefy from "buefy";
import "./plugins/vee-calidate";
import "buefy/dist/buefy.css";
import "./plugins/font-awesome";

Vue.use(VueCookies);
Vue.use(Buefy);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
