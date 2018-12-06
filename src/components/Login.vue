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
            prepend-icon="delete_forever"
          ></v-text-field>
          <v-text-field v-model="pass" :rules="noBlankRules" label="Locatie"></v-text-field>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: "Edit_Group",
  data() {
    return {
      email: "",
      pass: "",
      valid: false,
      noBlankRules: [v => !!v || "Camp obligatoriu"]
    };
  },
  methods: {
    login() {}
  }
};
</script>