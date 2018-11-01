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
        <v-layout align-center justify-space-around row wrap>
            <v-flex 
            xs12 sm3 
            v-for="record in Nesositi" v-bind:key="record.id"> 
                <v-card >
                  <v-card-title class="pb-2 blue lighten-1" >
                    <div class="subheading">
                      <span class="mb-0">{{record.prenume}} </span>
                      <span class="mb-0 text-uppercase">{{record.familia}}</span>
                    </div>
                  </v-card-title>                 
                  <v-card-text>
                    <div>Locatie : {{record.locatie}}</div>
                    <v-chip class="cyan lighten-2"><span>Masa: <b>{{record.masa}}</b></span></v-chip>
                    <v-chip class="teal lighten-3"><span>Loc: {{record.loc}} </span>
                    </v-chip>
                  </v-card-text>
                  <v-card-actions>
                  <v-btn flat color="success" @click="setSosit(record.id)">
                      <v-icon left dark>done</v-icon>                        
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
      FamFilter:null,
      PrenumeFilter:null
    };
  },
  methods:{
    setSosit(id){
      this.$store.dispatch('update_Sosit',{famid:id,venit:true})
    },
    CheckMember(recordId,index){
      this.$store.dispatch('update_MembSosit',{famid:recordId,indx:index})
    }
  },
  computed: {
    Nesositi() {
      var FamFilter=this.FamFilter
      var PrenumeFilter=this.PrenumeFilter

      if(FamFilter==null&&PrenumeFilter==null){
        return this.$store.getters.NesositiSort;
      }else{
        return this.$store.getters.NesositiSort.filter(function(el) {
          // debugger
          if(FamFilter==null){
            return el.prenume.toLowerCase().indexOf(PrenumeFilter.toLowerCase()) > -1
          }
          if(PrenumeFilter==null){
            return el.familia.toLowerCase().indexOf(FamFilter.toLowerCase()) > -1
          }  
          return el.familia.toLowerCase().indexOf(FamFilter.toLowerCase()) > -1 && el.prenume.toLowerCase().indexOf(PrenumeFilter.toLowerCase()) > -1
        })
      }
    }
  }
};
</script>