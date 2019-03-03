// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import fireOBJ from "firebase"

import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";


import { store } from "./store/store";
import VueGoogleCharts from 'vue-google-charts'

// import firebase from 'firebase'
// import 'firebase/app'
// import 'firebase/auth'
// import 'firebase/firestore'

Vue.use(Vuetify, {
  theme: {
    primary: "#009688", // teal
    // primary:"#ff80ab",// pink accent-1
    secondary: "#424242",
    accent: "#1867c0",
    error: "#FF5252",
    info: "#2196F3",
    success: "#00c853", // green accent-4
    warning: "#FFC107",
    veniti:"#e1f5fe",//"#a0cfff",
    nesositi:"#ffc107",//"#ffc107" "#cfd8dc"
    
  }
});
Vue.use(VueGoogleCharts)

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>",
  created: function() {
    fireOBJ.auth().onAuthStateChanged((user)=>{
      if(user){        
        this.$store.dispatch('autoSingIn',user)
      }
      // }else{
      //   this.$store.dispatch('signUserOut',user)
      // }
    })
    this.$store.dispatch("loadFireStatus");
  }
});
