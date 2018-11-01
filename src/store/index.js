import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    invitati:[],
    invitatiNesositi:[]
  },
  mutations: {
    updateLoadedInvitati (state, payload) {    
      state.invitatiNesositi=[]
      payload.forEach(invitat =>{                
        if (!invitat.sosit){          
          state.invitatiNesositi.push(invitat)
        }
      })    
      state.invitati= payload
    },
    markSosit(state,FamId){
      firebase.firestore()
      .collection('Invitati')
      .doc(FamId)
      .update({
        Sosit:true
      })
    }
    
  },
  actions: {
    loadInvitati ({commit}) { 
        firebase.firestore()
        .collection('Invitati')        
        // .where("t_isActive", "==", true)
        .onSnapshot(querySnapshot => {
            var fireInvitati=[]
            querySnapshot.forEach(doc => {
                        
            const data = {
                id: doc.id,
                prenume:doc.data().Prenume,
                familia: doc.data().Familia,
                // name:doc.data().Name,
                locatie:doc.data().Locatie,
                masa:doc.data().Masa,
                loc:doc.data().Loc,
                famID:doc.data().FamID,
                sosit:doc.data().Sosit,
            };
                fireInvitati.push(data)
            });
        commit('updateLoadedInvitati', fireInvitati)            
        });
    },
    update_Sosit ({commit},payload) {      
      firebase.firestore()
      .collection('Invitati')
      .doc(payload.famid)
      .update({
        Sosit:payload.venit
      })    
    },
    add_Invitat ({commit},payload) {
      firebase.firestore()
      .collection('Invitati')
      .add({
        Prenume:payload.Prenume,
        Familia:payload.Familia,
        Locatie:payload.Locatie,
        Masa:0,
        Loc:0,
        FamID:"test",    
        Sosit:false
      }
      )
      
   
    }
  },
  getters: {
    SortedInvitati (state) {
      return state.invitati.sort((a, b) => {
        if (a.familia < b.familia) return -1;
        if (a.familia > b.familia) return 1;
        return 0;
      })
    },
    NesositiSort (state) {
      return state.invitatiNesositi.sort((a, b) => {
        if (a.familia < b.familia) return -1;
        if (a.familia > b.familia) return 1;
        return 0;
      })
    }
  }
})

