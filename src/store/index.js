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
      console.log(FamId)

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
                familia: doc.data().Familia,
                locatie:doc.data().Locatie,
                locuri:doc.data().Locuri,
                masa:doc.data().Masa,
                membri:doc.data().Membri,
                sosit:doc.data().Sosit

            };
                fireInvitati.push(data)
            });
        commit('updateLoadedInvitati', fireInvitati)            
        });
    },
    update_Sosit ({commit},payload) {
      // console.log(payload)
      firebase.firestore()
      .collection('Invitati')
      .doc(payload.famid)
      .update({
        Sosit:payload.venit
      })    
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

