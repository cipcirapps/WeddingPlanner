<template> 
  <v-container fluid >
      <v-layout row wrap  class="mt-2">
      <v-flex xs4 class="text-xs-center">
         <v-text-field            
            v-model="NameFilter"
            label="Search name"
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
                <v-card-title primary-title>
                    <div>
                    <h3 class="headline mb-0">{{record.familia}}</h3>
                    <div>Locatie : {{record.locatie}}</div>
                    </div>
                </v-card-title>
                    <v-card-actions>
                    <v-btn flat color="success">
                        <v-icon left dark>done</v-icon>
                          Venit
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
      NameFilter:""
    };
  },
  computed: {
    invitati() {
      var query=this.NameFilter

      if(query==""){
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