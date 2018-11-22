<template> 
    <!-- Main content -->
      <v-container fluid >
        <v-layout row wrap justify-center >
          <v-flex xs6>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="output.FamID"
                :rules="noBlankRules"          
                label="Famid"            
              ></v-text-field>
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

               <v-autocomplete
                v-model="output.FamID"
                @change="updateFam()"
               
                :items="famNames"
                persistent-hint
                prepend-icon="mdi-city"
              ></v-autocomplete>

              <!-- v-if="fam.nume==output.Prenume" -->
              <div v-for="fam in famObj" :key="fam.id">
                <span v-if="fam.id==output.FamID">
                  Label: {{fam.nume}}<br/>
                  Membri:
                  <div v-for="memb in fam.membr" :key="memb" style="background-color:lightgrey">
                    {{memb}}
                  </div>
                </span>
              </div>



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
      famNames:[],
      famObj:[],
      
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
    familii(){
      var vueObj=this
       vueObj.famNames=[]
      this.famObj=this.$store.getters.getFamilii
      this.famObj.forEach(fam=>{
        vueObj.famNames.push(fam.id)
      })
      
      return  vueObj.famNames
    }
    
  },
    methods: {
      updateFam(){
        var vueObj=this;

       this.output.Familia= this.famObj.find(function(element) {
          return element.id== vueObj.output.FamID;
        }).nume;
        
      },
      submit () {
         if (this.$refs.form.validate()) {
           this.$store.dispatch('add_Invitat',this.output)   
           this.$router.push("/")
         }
      }
    }
};
</script>