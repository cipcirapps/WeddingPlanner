<template> 
    <!-- Main content -->
      <v-container fluid>
  <v-layout row wrap justify-center>
    <v-flex xs6>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="output.Nume"
          :rules="noBlankRules"
          label="Nume"
        ></v-text-field>
        <v-text-field
          v-model="output.Locatie"
          :rules="noBlankRules"
          label="Locatie"
        ></v-text-field>

        <v-select
          v-model="output.Status"
          :items="statuses"
          box
          label="Status"
        ></v-select>

        <!-- <v-autocomplete
          v-model="output.FamID"
          @change="updateFam()"
          :items="famNames"
          persistent-hint
          prepend-icon="mdi-city"
        ></v-autocomplete> -->

        <!-- v-if="fam.nume==output.Prenume" -->
        <v-flex>
            Members:
        </v-flex>

        <v-layout row wrap>
          <v-text-field
            v-model="AddMemb"
            @keydown.enter="addMembru"
            @keydown.delete="removeMembru"
            label="Edit membri (Enter to add, Del to remove)"
          ></v-text-field>
        </v-layout>
        <v-layout row wrap>
          <v-chip v-for="(om,index) in output.Membri" :key="index"
          >{{om}}</v-chip>
        
        </v-layout>
            <!-- footer nav -->
        <v-footer  height="auto" class="pa-3">   
         <v-layout
          justify-center
          row
          wrap
        >       
            <v-flex xs4>
              <v-btn  @click="submit" color="accent">Add</v-btn>
            </v-flex>
            <v-flex xs4>  
              <v-btn color="black" outline :to="'/'">Cancel</v-btn>          
            </v-flex>
          </v-layout>
        </v-footer>

        <!-- footer nav end-->        
        
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
      famNames: [],
      famObj: [],
      AddMemb: "",

      output: {
        Locatie: "",
        Membri: [],
        Nume: null,
        Status: "De invitat"
      },
      noBlankRules: [v => !!v || "Camp obligatoriu"]
    };
  },
  computed: {
    // familii() {
    //   var vueObj = this;
    //   vueObj.famNames = [];
    //   this.famObj = this.$store.getters.getFamilii;
    //   this.famObj.forEach(fam => {
    //     vueObj.famNames.push(fam.id);
    //   });

    //   return vueObj.famNames;
    // },
    statuses() {
      return this.$store.getters.getStatusList;
    }
  },
  methods: {
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

    submit() {
      if (this.$refs.form.validate()) {
        //format object
        // var vueObj=this

        // var payload={}
        // payload.Locatie=vueObj.output.Locatie
        // payload.Nume=vueObj.output.Nume
        // payload.Status=vueObj.output.Status
// console.log(this.output)
        this.$store.dispatch("add_Fam", this.output);

        // vueObj.output.Membri.forEach(om=>{
        //     var omObj={}
        //     omObj.GId = 1232,
        //     omObj.Loc = 0,
        //     omObj.Nume = vueObj.output.Nume,
        //     omObj.Prenume = om,
        //     omObj.Sosit = false

        //     vueObj.$store.dispatch("add_Membr", omObj);
        // })

        this.$router.push("/");
          //  this.output.Membri= []
          //  this.output.Nume= null
              // Status: "De invitat"O
            
            
            
      }
    }
  }
};
</script>