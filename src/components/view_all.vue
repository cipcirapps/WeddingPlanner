<template> 
  <v-container fluid >
      <v-layout row wrap  class="mt-2">
      <v-flex xs4 class="text-xs-center">
         <v-text-field            
            v-model="FamFilter"
            label="Cauta familie"
            clearable
          ></v-text-field>
      </v-flex>
    </v-layout>
      <!-- cards -->
         <v-container grid-list-xl>        
        <v-layout align-center justify-space-around row wrap>
            <v-flex 
            xs12 sm3 
            v-for="record in invitati" v-bind:key="record.id"> 
                <v-card >
                  <v-card-title class="pb-2 lighten-1" :class="record.sosit?'green':'blue'">
                    <div>
                      <span class="headline mb-0">{{record.prenume}} </span>
                      <span class="headline mb-0 text-uppercase">{{record.familia}}</span>
                    </div>
                  </v-card-title>                 
                  <v-card-text>
                    <div>Locatie : {{record.locatie}}</div>
                    <div>Masa: <b>{{record.masa}}</b></div>
                    <div>Loc: 
                      <span>{{record.loc}} </span>
                    </div>                    
                  </v-card-text>
                   <v-card-actions>
                    <v-btn v-if="!record.sosit" flat color="success" @click="setSosit(record.id)">
                        <v-icon left dark>done</v-icon>
                          Sosit
                    </v-btn>  
                    <div v-else>
                      <v-chip class="green lighten-1">
                        Deja venit
                      </v-chip>                  
                      <v-btn  flat color="alert" @click="UnsetSosit(record.id)">
                        <v-icon left dark>undo</v-icon>
                          nesosit
                    </v-btn>  
                    </div>
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
      FamFilter:null,
      selected: []
    };
  },
  methods:{
    setSosit(id){
      this.$store.dispatch('update_Sosit',{famid:id,venit:true})      
    },    
    UnsetSosit(id){
      this.$store.dispatch('update_Sosit',{famid:id,venit:false})
      
    },

  },
  computed: {
    invitati() {
      var query=this.FamFilter

      if(query==null){
        return this.$store.getters.SortedInvitati;
      }else{
        return this.$store.getters.SortedInvitati.filter(function(el) {
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
