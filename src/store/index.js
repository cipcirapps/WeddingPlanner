import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    invitati:[],
    invitatiNesositi:[],
    statusList:[],
    groupByStatus:{}
  },
  mutations: {
    updateLoadedInvitati (state, payload) {    
      state.invitatiNesositi=[]
      payload.forEach(invitat =>{                
        if (!invitat.sosit && invitat.status=="Confirmat"){          
          state.invitatiNesositi.push(invitat)
        }
      })    
      state.invitati= payload
    },
    updateStatus (state, payload) {       
      state.statusList= payload
      state.groupByStatus={}
      
      state.statusList.forEach(stat=>{        
        state.groupByStatus[stat.replace(" ","_")]=[]
      })
      
      state.invitati.forEach(om=>{
        state.groupByStatus[om.status.replace(" ","_")].push(om)
      })
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
                status:doc.data().Status
            };
                fireInvitati.push(data)
            });
        commit('updateLoadedInvitati', fireInvitati)  
        
          firebase.firestore()
          .collection('Liste')
          .doc("Status").get().then(item=>{                
            commit('updateStatus', item.data().Itms)  
          })
               
        });
    },
    // loadStatuses({commit}){
    //   firebase.firestore()
    //   .collection('Liste')
    //   .doc("Status").get().then(item=>{                
    //     commit('updateStatus', item.data().Itms)  
    //   })
    // },
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
        Status:"De invitat",
        Sosit:false
      }
      )
    },
    update_Invitat ({commit},payload) {      
      firebase.firestore()
      .collection('Invitati')
      .doc(payload.id)
      .update({
        Prenume:payload.prenume,
        Familia:payload.familia,
        Locatie:payload.locatie,
        Masa:payload.masa,
        Loc:payload.loc,
        FamID:payload.famID,
        Status:payload.status,//De trimis, invitat, de confirmat, confirmat
        Sosit:payload.sosit
      })
      .catch(function(error) {        
        console.error("Error writing document: ", error);
      })
    },
    delete_Invitat({commit},payload) {      
      firebase.firestore()
      .collection('Invitati')
      .doc(payload.id)
      .delete()
      .catch(function(error) {        
        console.error("Error writing document: ", error);
      })
    },
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
    },    
    getInvitat(state) {
      return (invID) => {
        return state.invitati.find((om) => {
          return om.id === invID
        })
      }
    },
    getStatusList(state){
      return state.statusList
    },
    getGroupStatus(state){
      
      return state.groupByStatus

      // return (stat) => {
      //   return state.invitati.filter(om=>{
      //     return om.status===stat
      //   })        
      // }



    }
  }
})

