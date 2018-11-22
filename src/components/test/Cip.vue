<template> 
  <v-container fluid >
      <v-layout row wrap  class="mt-2">
      <v-flex xs4 class="text-xs-center">
         <v-text-field            
            v-model="NameFilter"
            label="Cauta familie"
          ></v-text-field>
      </v-flex>
    </v-layout>
      <!-- cards -->
      <v-container grid-list-xl>        
        <v-layout align-center justify-space-around row wrap>
            <v-flex 
            xs12 sm4 
            v-for="fam in fams" v-bind:key="fam.id"> 
                <v-card v-for="memb in fam.Membri" v-bind:key="memb.id" class="mb-2">
                  <v-card-title class="blue lighten-1 pb-0 pt-1" >
                      <div>
                      Familia: <span class="headline mb-0">{{fam.Nume}}</span>
                      <div>Locatie : {{memb.Prenume}}</div>
                      </div>
                  </v-card-title>
                  <!-- <v-card-text class="pt-0 mt-2">
                    <div class="mb-2">Membri:</div>
                    <v-checkbox
                    v-for="membru in fam.Membri" :key="membru.id"
                    v-model="selected" 
                    class="mt-0"
                    height="5"
                    :label="membru.Prenume"
                    :value="membru.Prenume">                          
                    </v-checkbox>
                  </v-card-text> -->
                  <v-card-text class="pt-0 pb-0">
                    <div>Loc: <b>{{memb.Loc}}</b></div>
                                      
                  </v-card-text>
                  <v-card-actions>
                  <v-btn flat color="success" @click="setSosit(fam.id)">
                      <v-icon left dark>done</v-icon>
                        Sosit
                  </v-btn>                    
                  </v-card-actions>
                </v-card>
          </v-flex>
        </v-layout>
      </v-container>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      NameFilter:"",
      selected: []
    };
  },
  methods:{
    setSosit(id){
      this.$store.dispatch('update_Sosit',id)
      
    }
  },
  computed: {
    fams() {
      return this.$store.getters.getFamilii
    },
    famConf(){
      return this.$store.getters.getFamByStat("Confirmat")
    }
  }
};
</script>
<style>
.v-messages{
  min-height: unset;
}
/* .v-input--selection-controls{
  margin-top: 0px
} */
</style>
