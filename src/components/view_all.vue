<template> 
  <v-container fill-width align-center>
    <!-- templatefor     -->
    <div v-for="(itm ,key,index) in GroupedStatus" :key="index">
               
        <v-layout row wrap>
          <v-flex xs6 mt-4>            
            <div class="blue-grey--text darken-4">{{key.replace("_"," ")}} : {{itm.length}} </div>
          </v-flex>
        </v-layout>
        
        <!-- <div v-for="fam in fams" :key="fam.FamID">          
          Fam:{{fam.Nume}}
          <div v-for="mem in fam.Membri" :key="mem.id">
            {{mem.Prenume}}
          </div>
        </div> -->

         <v-data-table
          :headers="headers"
          :items="itm"
          class="elevation-1"          
        >
        
          <template slot="items" slot-scope="props">
            <td>{{ props.item.Nume }}</td>            
            <td>{{ props.item.Locatie }}</td>         
            <td>
              <v-layout row justify-space-between v-for="(om,key) in props.item.Membri" :key="key">                
                <v-flex >
                  {{om.Prenume}}
                </v-flex>
                <v-flex >
                  <v-icon class="green--text" v-if="om.Sosit ">check</v-icon>                
                  <v-icon v-else class="orange--text" >directions_run</v-icon>
                </v-flex>
                <v-layout justify-end>                  
                    <v-btn flat icon small class="accent" :to="{name:'editInvitat',params:{gid:om.GId},query:{memid:key}}">
                      <v-icon small>edit</v-icon>
                    </v-btn>                  
               </v-layout>              
              </v-layout>
            </td>             
            
          </template>
        </v-data-table>
     </div>
   
      
      <v-btn icon fixed class="primary" large
              bottom
              right :to="'/add_new/'"><v-icon >person_add</v-icon></v-btn>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      headers: [
          {
            text: 'Familia', value: 'Nume'},
          { text: 'Locatie', value: 'locatie'},
          { text: 'Membri', value: 'prenume', align: 'center'},
          // { text: 'Sosit', value: 'sosit'},
          // { text: 'Edit', value: 'status', sortable: false,align: 'right',},
        ]
        
    };
  },
  methods:{
   

  },
  computed: {
    GroupedStatus(){
        return this.$store.getters.getGroupStatus
      },
    fams(){
      return this.$store.getters.getFamilii
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
