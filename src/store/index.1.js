import Vue from 'vue'
import Vuex from 'vuex'
// import firebase from 'firebase/app'
// import firebase from 'firebase'
import firebase from 'firebase/app'

Vue.use(Vuex)

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
    updateFamConf(state,payload){
      state.familiiConf=[]
      state.indivConf=[]

      state.familiiConf.push(payload)
      // state.familiiConf.forEach(fam=>{
      //   fam.Membri.forEach(mem=>{
      //     state.indivConf.push(mem)
      //   })
      // })
    },
    updateStatus (state, payload) {       
      state.statusList= payload.split("#")
      state.groupByStatus={}
      
      state.statusList.forEach(stat=>{        
        state.groupByStatus[stat.replace(" ","_")]=[]
      })
      
      
    },
    addFamsinStatus(state){
      state.statusList.forEach(stat=>{        
        state.groupByStatus[stat.replace(" ","_")]=[]
      })
      state.familii.forEach(fam=>{
        state.groupByStatus[fam.Status.replace(" ","_")].push(fam)
      })
    },
    setFams(state,payload){
      
      state.familii=payload

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
    loadFams({commit}){
      
      firebase.database().ref("Liste/Status").once("value",querySnapshot=>{
        commit('updateStatus',   querySnapshot.val() )
      })
      
          firebase.database().ref("Group").on("value",querySnapshot=>{
          // debugger
          commit('updateFamilii', querySnapshot.val())  
          commit('addFamsinStatus')  
            // console.log(querySnapshot.val())
            // querySnapshot.forEach(fam=>{
            //   if(fam.val().Status=="Confirmat"){
            //     commit('updateFamConf', fam.val())  

            //   }
            // })
          
        })
      
    },
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

          firebase.firestore()
          .collection('Fams')
          // .doc("Status")
          .get().then(snapShot=>{  
            var myArr=[]
            snapShot.forEach(doc=>{
              const data={
                id:doc.id,
                nume:doc.data().Label,
                membr:doc.data().Membr
              }
              myArr.push(data)

              // console.log(doc.id)            
            })
            commit('setFams', myArr)  
          })     
        });
    },
    update_Sosit ({commit},payload) {
      // console.log("Group/"+payload.famid+"/Membri/"+payload.indivID)
      firebase.database().ref("Group/"+payload.famid+"/Membri/"+payload.indivID).update(
        {Sosit:true}
      )
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
      // console.log(payload.GId)
      // console.log(payload.id)
      firebase.database().ref("Group/"+payload.GId+"/Membri/"+payload.id).update({
        Prenume:payload.Prenume,
        Loc:payload.Loc,
        Sosit:payload.Sosit
      })

    },
    delete_Invitat({commit},payload) {      
      firebase.database().ref("Group/"+payload.GId+"/Membri/"+payload.id).remove()
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
        return state.invitati.find(om=>{
          return om.GId==invID.famID&& om.id==invID.memID
        })        
      }
    },
    getStatusList(state){
      return state.statusList
    },
    getFamilii(state){
      return state.familii
    },
    getFamByStat(state){
      return (stat) => {
        return state.familii.filter((fam) => {
          return fam.Status === stat
        })
      }
    },
    getFamConf(state){
      return state.familiiConf
    },
    getIndivNesositi(state){
      return state.indivConf
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

