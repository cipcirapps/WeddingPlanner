<template> 
    <!-- Main content -->
    
      <v-container fluid fill-height>
        <div v-for="om in invitati" :key="om.id">
          {{om.name}}

        </div>
      </v-container>
    
</template>

<script>


  export default {    
    props: {
      source: String
    },
    computed:{
      invitati(){
        return this.$store.getters.loadedMeetups
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