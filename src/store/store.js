import Vue from 'vue'
import Vuex from 'vuex'

import firebase from './firebase'

Vue.use(Vuex)
Vue.use(firebase)

export const store = new Vuex.Store({
  state: {
    invitati:[],
    invitatiNesositi:[],
    statusList:[],
    groupByStatus:{},
    familii:[],
    familiiConf:[],
    indivConf:[]
     
    
  },
  getters: {   
    getStatusList(state){
      return state.statusList
    },
    getFamilii(state){
      return state.familii
    },
    getGroupStatus(state){      
      var groupByStatus={}
      
      state.statusList.forEach(stat=>{        
        groupByStatus[stat.replace(" ","_")]=[]
      })
      state.familii.forEach(fam=>{
        groupByStatus[fam.Status.replace(" ","_")].push(fam)
      })

      return groupByStatus
    },
    getInvitat(state) {
      return (invID) => {        
        return state.invitati.find(om=>{
          return om.GId==invID.famID&& om.id==invID.memID
        })        
      }
    },
  },
  mutations: {
    updateStatus (state, payload) {       
      state.statusList= payload.split("#")
      state.groupByStatus={}
      
      state.statusList.forEach(stat=>{        
        state.groupByStatus[stat.replace(" ","_")]=[]
      })
      
      
    },
    updateFamilii(state,payload){
      state.familii=[]
      // state.famOBJ=payload
      for (let key in payload) {
        const fam=payload[key]
        fam.FamID=key
        state.familii.push(fam)        
      }
     // set invitati
     state.invitati=[]
     state.familii.forEach(fam=>{
      for (let key in fam.Membri) {
        const myObj=fam.Membri[key]
        myObj.id=key
        myObj.Locatie=fam.Locatie
        state.invitati.push(myObj)
      }

     })

      state.familiiConf= state.familii.filter(fam=>{
        return fam.Status=="Confirmat"
      })
      //Set invitati confirmati
      state.indivConf=[]
      state.familiiConf.forEach(fam=>{
        for (let key in fam.Membri) {
          if(!fam.Membri[key].Sosit){
            const myObj=fam.Membri[key]
            myObj.id=key
            myObj.Locatie=fam.Locatie
            state.indivConf.push(myObj)
          }                
        }
      })
      
    },
    // addFamsinStatus(state){
    //   state.statusList.forEach(stat=>{        
    //     state.groupByStatus[stat.replace(" ","_")]=[]
    //   })
    //   state.familii.forEach(fam=>{
    //     state.groupByStatus[fam.Status.replace(" ","_")].push(fam)
    //   })
    // },
  },
  actions: {
    loadFireStatus({commit}){      
      firebase.database.ref("Liste/Status").on("value",querySnapshot=>{
        commit('updateStatus',   querySnapshot.val() )
      })
      firebase.database.ref("Group").on("value",querySnapshot=>{
        // debugger
        commit('updateFamilii', querySnapshot.val())  
        // commit('addFamsinStatus')  
      })
    },
    update_Invitat ({commit},payload) {      
      // console.log(payload.GId)
      // console.log(payload.id)
      firebase.database.ref("Group/"+payload.GId+"/Membri/"+payload.id).update({
        Prenume:payload.Prenume,
        Loc:payload.Loc,
        Sosit:payload.Sosit
      })

    },
    delete_Invitat({commit},payload) {      
      firebase.database.ref("Group/"+payload.GId+"/Membri/"+payload.id).remove()
    },
  } 
})

