<template> 
    <!-- Main content -->    
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
          </template>
        </v-data-table>

        
        
      </v-container>    
</template>

<script>


  export default {    
    props: {
      source: String
    },
    data(){
      return{
         headers: [
          {
            text: 'Familia', value: 'familia'},
          { text: 'Prenume', value: 'prenume'},
          { text: 'Locatie', value: 'locatie'},
          { text: 'Status', value: 'status'}
        ],
      }
    },
    computed:{
      invitati(){
        return this.$store.getters.SortedInvitati
      }
    }
  //   created() {
  //   // if (firebase.auth().currentUser) {
  //     // this.isLoggedIn = true;
  //     db
  //       .collection('Invitati')        
  //       // .where("t_isActive", "==", true)
  //       .onSnapshot(querySnapshot => {
  //         this.invitati = [];
  //         querySnapshot.forEach(doc => {
  //           const data = {
  //             id: doc.id,
  //             name: doc.data().Nume,
  //             locatie:doc.data().Din
  //           };
  //           this.invitati.push(data);
  //         });
  //       });
     
  //   // }
  // },
  }
</script>