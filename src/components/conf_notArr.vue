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
    <!-- tabel -->
    

      <v-card>
        <!-- header -->
        <v-layout class="pt-2 header subheading primary white--text"  fill-height >
          <v-flex xs12 sm5>
            Nume prenume
          </v-flex>
          <v-flex xs12 sm2>Locatie</v-flex>
          <v-flex xs12 sm2>Masa : Loc</v-flex>          
          <v-flex xs12 sm3 class="text-xs-right" >Actions</v-flex>
        </v-layout>
        <!-- rows -->
        
        <v-layout v-for="indiv in Nesositi" v-bind:key="indiv.id" class="my-1 tblBod" >
          <v-flex tabindex="1" class="font-weight-bold" xs12 sm5>
            <span class="mb-0 mr-2">{{indiv.Prenume}}</span>
             <span class="mb-0 text-uppercase">{{indiv.Nume}}</span>
          </v-flex>
          <v-flex xs12 sm2>{{indiv.Locatie}}</v-flex>
          <v-flex xs12 sm2 class="text-xs-center subheading">            
              <v-chip outline color="black"> {{indiv.Masa}} </v-chip> 
            <v-icon small left color="blue" class="mr-2">event_seat</v-icon>
            <span class="blue--text text--darken-4">{{indiv.Loc}}</span>
            
          </v-flex>
          <v-flex xs12 sm3 class="text-xs-right" style="justify-content:flex-end">
            <v-btn right small outline color="blue" @click="setSosit(indiv.GId,indiv.id)">
                      <v-icon left dark>done</v-icon>Sosit                        
                  </v-btn>
            </v-flex>
        </v-layout>
        
      </v-card>
    

      <!-- cards -->
      <v-container v-if="false" grid-list-xl>        
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
<style>
/* .flex{
  border: solid 1px lightblue
} */
.header .flex{  
  margin: 0 3px;
  padding: 5px
}
.tblBod .flex{
  background-color: whitesmoke;
  margin: 0 3px;
  padding: 0 3px;
      align-items: center;
    display: flex;
}
.tabindex:focus{
  background-color:lightblue;
}

</style>
