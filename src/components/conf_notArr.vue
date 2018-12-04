<template> 
  <v-container fluid >
      <v-layout align-center justify-space-between row fill-height>
      <v-flex class="xs4 text-xs-center">
         <v-text-field
            v-model="PrenumeFilter"            
            clearable
            label="Cauta prenume"
          ></v-text-field>
      </v-flex>
      <v-flex xs4>  
         <v-text-field         
            v-model="FamFilter"            
            clearable
            label="Cauta familie"
          ></v-text-field>
      </v-flex>
    </v-layout>
      <!-- cards -->
      <v-container grid-list-xl>        
          Ramasi: <b>{{Nesositi.length}}</b>
        <v-layout align-center justify-space-around row wrap>
            <v-flex 
            xs12 sm3 
            v-for="indiv in Nesositi" v-bind:key="indiv.id"> 
                <v-card                
                class="mb-2"
                >
                  <v-card-title class="pb-2 nesositi" >
                    <div class="subheading">
                      <span class="mb-0">{{indiv.Prenume}} </span>
                      <span class="mb-0 text-uppercase">{{indiv.Nume}}</span>
                    </div>
                  </v-card-title>                 
                  <v-card-text>
                    <div>Locatie : {{indiv.Locatie}}</div>
                    <v-chip class="cyan lighten-2"><span>Masa: <b>{{indiv.Masa}}</b></span></v-chip>
                    <v-chip class="teal lighten-3"><span>Loc: {{indiv.Loc}} </span>
                    </v-chip>
                  </v-card-text>
                  <v-card-actions>
                  <v-btn flat class="veniti" @click="setSosit(indiv.GId,indiv.id)">
                      <v-icon left dark>done</v-icon>Sosit                        
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
  name:"conf_notArr",
  data() {
    return {
      FamFilter:null,
      PrenumeFilter:null
    };
  },
  methods:{
    setSosit(fam, indiv){
      this.$store.dispatch('update_Sosit',{GId:fam,id:indiv,val:true})
    }
  },
  computed: {
    Nesositi() {
      var FamFilter=this.FamFilter
      var PrenumeFilter=this.PrenumeFilter

      if(FamFilter==null&&PrenumeFilter==null){
        return this.$store.getters.getIndivNesositi;
      }else{        
        return this.$store.getters.getIndivNesositi.filter(function(el) {          
          if(FamFilter==null){
            return el.Prenume.toLowerCase().indexOf(PrenumeFilter.toLowerCase()) > -1
          }
          if(PrenumeFilter==null){          
            return el.Nume.toLowerCase().indexOf(FamFilter.toLowerCase()) > -1
          }  
          return el.Prenume.toLowerCase().indexOf(PrenumeFilter.toLowerCase()) > -1 && el.Nume.toLowerCase().indexOf(FamFilter.toLowerCase()) > -1
        })
      }
    }
  }
};
</script>