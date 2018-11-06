<template> 
  <v-container fill-width align-center>
     <v-data-table
          :headers="headers"
          :items="invitati"
          :total-items="2"
          hide-actions
          class="elevation-1"          
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.familia }}</td>
            <td>{{ props.item.prenume }}</td>
            <td>{{ props.item.locatie }}</td>
            <td>{{ props.item.status }}</td>                 
            <td  class="text-xs-right">
              <v-btn flat icon small  class="accent"               
               :to="'/edit/'+props.item.id"><v-icon small>edit</v-icon></v-btn>
              </td>     
          </template>
        </v-data-table>
        <v-layout row wrap style="height:50px">
        In asteptare: {{inAsteptare.length}}
        </v-layout>
         <v-data-table
          :headers="headers"
          :items="inAsteptare"
          :total-items="2"
          hide-actions
          class="elevation-1"          
        >
        
          <template slot="items" slot-scope="props">
            <td>{{ props.item.familia }}</td>
            <td>{{ props.item.prenume }}</td>
            <td>{{ props.item.locatie }}</td>
            <td>{{ props.item.status }}</td>                 
            <td  class="text-xs-right">
              <v-btn flat icon small  class="accent"               
               :to="'/edit/'+props.item.id"><v-icon small>edit</v-icon></v-btn>
              </td>     
          </template>
        </v-data-table>

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
          { text: 'Status', value: 'status'},
          { text: 'Edit', value: 'status', sortable: false,align: 'right',},
        ],
    };
  },
  methods:{
   

  },
  computed: {
    invitati(){
        return this.$store.getters.SortedInvitati
      },
    inAsteptare()  {
      return this.$store.getters.getGroupStatus("In asteptare")
    },
    deInvitat()  {
      return this.$store.getters.getGroupStatus("De invitat")
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
