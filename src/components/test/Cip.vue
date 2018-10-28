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
            v-for="record in invitati" v-bind:key="record.id"> 
                <v-card >
                  <v-card-title class="pb-2 blue lighten-1" >
                      <div>
                      Familia: <span class="headline mb-0">{{record.familia}}</span>
                      <div>Locatie : {{record.locatie}}</div>
                      </div>
                  </v-card-title>
                  <v-card-text class="pt-0 mt-2">
                    <div class="mb-2">Membri:</div>
                    <v-checkbox
                    v-for="membru in record['membri']" :key="membru.id"
                    v-model="selected" 
                    class="mt-0"
                    height="5"
                    :label="membru"
                    :value="membru">                          
                    </v-checkbox>
                  </v-card-text>
                  <v-card-text class="pt-0 pb-0">
                    <div>Masa: <b>{{record.masa}}</b></div>
                    <div>Locuri: 
                      <span v-for="loc in record['locuri']" :key="loc">{{loc}} </span>
                    </div>                    
                  </v-card-text>
                  <v-card-actions>
                  <v-btn flat color="success" @click="setSosit(record.id)">
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
    invitati() {
      var query=this.NameFilter

      if(query==""){
        return this.$store.getters.NesositiSort;
      }else{
        return this.$store.getters.NesositiSort.filter(function(el) {
            return el.familia.toLowerCase().indexOf(query.toLowerCase()) > -1;
        })
      }
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
