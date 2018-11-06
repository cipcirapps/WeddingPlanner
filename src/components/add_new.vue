<template> 
    <!-- Main content -->
      <v-container fluid >
        <v-layout row wrap justify-center >
          <v-flex xs6>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="output.Familia"
                :rules="noBlankRules"          
                label="Familia"            
              ></v-text-field>
              <v-text-field
                v-model="output.Prenume"
                :rules="noBlankRules"          
                label="Prenume"
                required
              ></v-text-field>
              <v-text-field
                v-model="output.Locatie"
                :rules="noBlankRules"          
                label="Locatie"            
              ></v-text-field>
              <v-btn @click="submit" color="accent">submit</v-btn>              
            </v-form>    
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
export default {
  name: "AddNew",
  data() {
    return {
      valid: false,
      output:{
        Prenume: null,
        Familia: "",      
        Locatie: "",      
        FamID: "asdfsdf",        

      },
       noBlankRules: [
        v => !!v || 'Camp obligatoriu'
      ],
    };
  },
  computed: {
    invitati() {
      return this.$store.getters.loadedMeetups;
    }
  },
    methods: {
      submit () {
         if (this.$refs.form.validate()) {
           this.$store.dispatch('add_Invitat',this.output)   
           this.$router.push("/")
         }
      }
    }
};
</script>