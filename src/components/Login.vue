<template>
  <v-container fluid>
    <v-layout row wrap justify-center>
      <v-flex sm6>
        <v-form ref="form" v-model="valid" @submit.prevent="login">
          <v-text-field
            v-model="email"
            :rules="noBlankRules"
            label="Email"
            outline
            clearable
            prepend-icon="person"
            type="email"
          ></v-text-field>
          <v-text-field
            v-model="pass"
            :rules="noBlankRules"
            :append-icon="showPass ? 'visibility_off' : 'visibility'"
            :type="showPass ? 'text' : 'password'"
            label="Password"
            outline
            clearable
            prepend-icon="lock"
            @click:append="showPass = !showPass"
          ></v-text-field>
        </v-form>
      </v-flex>
    </v-layout>
    <v-layout row justify-center="">
      <v-flex xs6 md6 v-if="myError != null">
        <v-alert :value="myError" color="error" icon="warning" dismissible >{{myError.message}}</v-alert>
      </v-flex>
    </v-layout>
    <!-- footer nav -->
    <v-footer height="auto" class="pa-3">
      <v-layout justify-center row wrap>
        <!-- <v-flex md4> -->
        <v-btn @click="login" color="accent">Login</v-btn>
        <!-- </v-flex> -->
      </v-layout>
    </v-footer>
  </v-container>
</template>
<script>
import firebase from "firebase";
export default {
  name: "Edit_Group",
  data() {
    return {
      alert: false,
      alertMessage: "ddd",
      showPass: false,

      email: "",
      pass: "",
      valid: false,
      noBlankRules: [v => !!v || "Camp obligatoriu"]
    };
  },
  methods: {
    login() {
      if (this.valid) {
        this.$store.dispatch('signUserIn',{email:this.email, password:this.pass})
      }
    }
  },
  computed:{
    user(){
      return this.$store.getters.user
    },
    myError(){
      return this.$store.getters.errObj
    }

  },
  watch:{
    user(value){
      if (value !==null & value !== undefined){
        this.$router.push("/")
      }
    }
  }

};
</script>