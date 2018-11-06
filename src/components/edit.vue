<template>
    <!-- Main content -->
    <v-container fluid>
        <v-layout row wrap justify-center>
            <v-flex xs6>

                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                        v-model="invitat.famID"
                        :rules="noBlankRules"
                        label="FamID"
                        required></v-text-field>
                    <v-text-field
                        v-model="invitat.familia"
                        :rules="noBlankRules"
                        label="Familia"></v-text-field>
                    <v-text-field
                        v-model="invitat.prenume"
                        :rules="noBlankRules"
                        label="Prenume"
                        required></v-text-field>
                    <v-text-field
                        v-model="invitat.locatie"
                        :rules="noBlankRules"
                        label="Locatie"></v-text-field>
                    <v-text-field
                        v-model="invitat.masa"
                        :rules="noBlankRules"
                        label="Masa"
                        required></v-text-field>
                    <v-text-field
                        v-model="invitat.loc"
                        :rules="noBlankRules"
                        label="Loc"
                        required></v-text-field>
                    <v-flex xs3>
                    <v-select
                        v-model="invitat.status"
                        :items="statuses"
                        box
                        label="Status"></v-select>
                    </v-flex>    


                </v-form>
            </v-flex>
        </v-layout>
        <v-footer  height="auto" class="pa-3">   
         <v-layout
          justify-center
          row
          wrap
        >       
          <v-flex xs4>
            <v-btn  @click="submit" color="accent">Update</v-btn>
          </v-flex>
            <!-- <v-spacer></v-spacer> -->
          
            <v-btn icon                
                @click="deleteOm()" color="error"><v-icon>delete_forever</v-icon>
            </v-btn>
          
          </v-layout>
        </v-footer>
    </v-container>
</template>

<script>
export default {
  name: "Edit",
  data() {
    return {
      show: false,
      valid: false,
      output: {
        familia: ""
      },
      noBlankRules: [v => !!v || "Camp obligatoriu"]
    };
  },
  // mounted(){
  //   // this.output=this.invitat
  // },
  computed: {
    invitat() {
      // this.show=true;
      return this.$store.getters.getInvitat(this.$route.params.id);
    },
    statuses() {
      return this.$store.statusList;
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("update_Invitat", this.invitat);
        this.$router.push("/view_all");
      }
    },
    deleteOm() {
      this.$store.dispatch("delete_Invitat", this.invitat);
      this.$router.push("/view_all");
    }
  }
};
</script>