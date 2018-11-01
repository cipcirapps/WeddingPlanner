// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import { store } from './store'

import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

Vue.use(Vuetify, { theme: {
  primary: '#009688',// teal
  secondary: '#424242',
  accent: '#1867c0',
  error: '#FF5252',
  info: '#2196F3',
  success: '#00c853',// green accent-4
  warning: '#FFC107'
}})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',  
  created () {
    firebase.initializeApp({
      apiKey: "AIzaSyACdSmRstYxIbJ0pFq73WZxMC3irMf1Iws",
      authDomain: "cirwedding-fccd9.firebaseapp.com",
      databaseURL: "https://cirwedding-fccd9.firebaseio.com",
      projectId: "cirwedding-fccd9",
      storageBucket: "cirwedding-fccd9.appspot.com",
      messagingSenderId: "979671492797"      
    }).firestore().settings({timestampsInSnapshots: true})
    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     this.$store.dispatch('autoSignIn', user)
    //   }
    // })
    this.$store.dispatch('loadInvitati')
  }
})
