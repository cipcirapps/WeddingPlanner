<template>
    <!-- Main content -->
    <v-container fluid>
        <v-layout row wrap justify-center>
            <v-flex xs6>

                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field disabled
                        v-model="invitat.GId"
                        :rules="noBlankRules"
                        label="FamID"
                        required></v-text-field>
                    <v-text-field disabled
                        v-model="invitat.Nume"
                        :rules="noBlankRules"
                        label="Familia"></v-text-field>
                    <v-text-field disabled
                        v-model="invitat.Locatie"
                        :rules="noBlankRules"
                        label="Locatie"></v-text-field>    
                    <v-text-field
                        v-model="invitat.Prenume"
                        :rules="noBlankRules"
                        label="Prenume"
                        required></v-text-field>
                    
                    <!-- <v-text-field
                        v-model="invitat.masa"
                        :rules="noBlankRules"
                        label="Masa"
                        required></v-text-field> -->
                    <v-text-field
                        v-model="invitat.Loc"
                        :rules="noBlankRules"
                        label="Loc"
                        required></v-text-field>                    
                    <v-checkbox
                    :label="'Sosit'"
                    v-model="invitat.Sosit"
                  ></v-checkbox>    
                    <v-flex xs6>
                    <!-- <v-select
                        v-model="invitat.status"
                        :items="statuses"
                        box
                        label="Status"></v-select> -->
                    </v-flex>    


                </v-form>
            </v-flex>
        </v-layout>        
         <!-- footer nav -->
        <v-footer  height="auto" class="pa-3">   
         <v-layout
          justify-center
          row
          wrap
        >       
            <v-flex xs4>
              <v-btn  @click="submit" color="accent">Update</v-btn>
              <v-btn color="black" outline :to="'/'">Cancel</v-btn>          
            </v-flex>
          </v-layout>
        </v-footer>

        <v-btn fab small 
        @click="deleteOm()" 
        color="error"
        fixed bottom right>
          <v-icon >delete_forever</v-icon>
        </v-btn>
        <!-- footer nav end-->
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
  mounted() {
    // console.log( this.$route.query.memid)
    // console.log(  this.$route.params.gid)
  },
  computed: {
    invitat() {
      // this.show=true;
      return this.$store.getters.getInvitat({
        famID: this.$route.params.gid,
        memID: this.$route.query.memid
      });
    }
    // statuses() {
    //   return this.$store.getters.getStatusList;
    // }
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