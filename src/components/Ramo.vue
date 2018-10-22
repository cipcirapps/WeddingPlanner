<template> 
    <!-- Main content -->
    <v-content>
      <v-container fluid fill-height>
        <v-layout
          justify-center
          align-center
        >
          <v-flex text-xs-center>

         Ceva continut din Ramo Component:
          <v-card v-for="om in invitati" v-bind:key="om.id">
             <v-card-title primary-title>
               <div>
                <h3 class="headline mb-0">{{om.locatie}}</h3>
                <div>Locatie : {{om.nume}}</div>
               </div>
             </v-card-title>
              <v-card-actions>
                <v-btn flat color="red">Explore</v-btn>                
              </v-card-actions>
          </v-card>
            
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
import db from "./firebaseInit";
import firebase from "firebase";

  export default {
    data: () => ({      
      invitati:[]
    }),

    props: {
      source: String
    },
    created() {
    // if (firebase.auth().currentUser) {
      // this.isLoggedIn = true;
      db
        .collection('Invitati')        
        // .where("t_isActive", "==", true)
        .onSnapshot(querySnapshot => {
          this.invitati = [];
          querySnapshot.forEach(doc => {
            const data = {
              id: doc.id,
              name: doc.data().Nume,
              locatie:doc.data().Din
            };
            this.invitati.push(data);
          });
        });
     
    // }
  },
  }
</script>