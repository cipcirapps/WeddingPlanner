<template>
    <!-- Main content -->
    <v-container fluid>
        <v-layout row wrap justify-center>
            <v-flex xs6>

                <v-form ref="form" v-model="valid">
                    
                    <v-text-field
                        v-model="Familia.Nume"
                        :rules="noBlankRules"
                        label="Familia"></v-text-field>
                    <v-text-field
                        v-model="Familia.Locatie"
                        :rules="noBlankRules"
                        label="Locatie"></v-text-field>
                     <v-select
                      v-model="Familia.Status"
                      :items="statuses"
                      box
                      label="Status"
                    ></v-select>
                        
                     <v-flex>
                          Existing members:
                      </v-flex>
                      <v-layout row wrap>
                        <v-chip disabled 
                        color="primary" text-color="white" 
                        v-for="(om,index) in Familia.Membri" :key="index"
                        >{{om.Prenume}}</v-chip>                      
                      </v-layout>
                      
                      <v-layout row wrap>
                        <v-text-field
                          v-model="AddMemb"
                          @keydown.enter="addMembru"
                          @keydown.delete="removeMembru"
                          label="Add member name (Enter to add, Del to remove)"
                        ></v-text-field>
                      </v-layout>
                      <v-layout row wrap>
                        <v-chip v-for="(om,index) in output.Membri" :key="index"
                        >{{om}}</v-chip>
                      
                      </v-layout>   
                    

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
        @click="deleteFam()" 
        color="error"
        fixed bottom right>
          <v-icon >delete_forever</v-icon>
        </v-btn>
        <!-- footer nav end-->
    </v-container>
</template>

<script>
export default {
  name: "Edit_Group",
  data() {
    return {
      show: false,
      valid: false,
      AddMemb: "",
      output: {
        nume: "",
        Membri: []
      },
      noBlankRules: [v => !!v || "Camp obligatoriu"]
    };
  },
  mounted() {
    // console.log( this.$route.query.memid)
    // console.log(  this.$route.params.gid)
  },
  computed: {
    Familia() {
      return this.$store.getters.getFamilie({ famID: this.$route.params.gid });
    },
    statuses() {
      return this.$store.getters.getStatusList;
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        // update fam
        this.$store.dispatch("update_Familia", this.Familia);

        // update invitat
        this.output.Membri.forEach(om => {
          this.$store.dispatch("add_Memb", {
            FamID: this.Familia.FamID,
            FamName: this.Familia.Nume,
            MembName: om
          });
        });

        this.$router.push("/view_all");
      }
    },
    addMembru() {
      this.output.Membri.push(this.AddMemb);
      this.AddMemb = null;
    },
    removeMembru() {
      if (this.output.Membri.indexOf(this.AddMemb) > -1) {
        this.output.Membri.splice(this.output.Membri.indexOf(this.AddMemb), 1);
        this.AddMemb = null;
      }
    },
    deleteFam() {
      this.$store.dispatch("delete_Familia", this.$route.params.gid);
      this.$router.push("/view_all");
    }
  }
};
</script>