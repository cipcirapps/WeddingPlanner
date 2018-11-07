<template> 
  <v-container fill-width align-center>
    <!-- templatefor     -->
    <div v-for="(itm ,key) in GroupedStatus" :key="key">
    
        <v-layout row wrap>
          <v-flex xs6 mt-4>            
            <div class="blue-grey--text darken-4">{{key.replace("_"," ")}} </div>
          </v-flex>
        </v-layout>
        
         <v-data-table
          :headers="headers"
          :items="itm"
          
          
          class="elevation-1"          
        >
        
          <template slot="items" slot-scope="props">
            <td>{{ props.item.familia }}</td>
            <td>{{ props.item.prenume }}</td>
            <td>{{ props.item.locatie }}</td>                      
            <td> 
              <v-icon class="green--text" v-if="props.item.sosit ">check</v-icon>              
                <v-icon v-else class="orange--text" >directions_run</v-icon>
              
              </td>     
            <td  class="text-xs-right">
              <v-btn flat icon small  class="accent"               
               :to="'/edit/'+props.item.id"><v-icon small>edit</v-icon></v-btn>
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
            text: 'Familia', value: 'familia'},
          { text: 'Prenume', value: 'prenume'},
          { text: 'Locatie', value: 'locatie'},
          { text: 'Sosit', value: 'sosit'},
          { text: 'Edit', value: 'status', sortable: false,align: 'right',},
        ],
    };
  },
  methods:{
   

  },
  computed: {
    GroupedStatus(){
        return this.$store.getters.getGroupStatus
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
