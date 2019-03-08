import Vue from "vue";
import Vuex from "vuex";

import firebase from "./firebase";
import fireOBJ from "firebase"
import { debug } from "util";
import router from "../router";

Vue.use(Vuex);
Vue.use(firebase);

export const store = new Vuex.Store({
  state: {
    loaded: false,
    invitati: [],
    invitatiNesositi: [],
    invitatiSositi: [],
    statusList: [],
    groupByStatus: {},
    familii: [],
    familiiConf: [],
    user:null,
    errObj:null,
  },
  getters: {
    errObj(state){
      return state.errObj
    },
    user(state){
      return state.user
    },
    getStatusList(state) {
      return state.statusList;
    },
    getFamilii(state) {
      return state.familii;
    },
    getGroupStatus(state) {
      var groupByStatus = {};

      state.statusList.forEach(stat => {
        groupByStatus[stat.replace(" ", "_")] = [];
      });
      state.familii.forEach(fam => {
        groupByStatus[fam.Status.replace(" ", "_")].push(fam);
      });

      return groupByStatus;
    },
    getGraphFams(state) {
      var groupByStatus = {};

      state.statusList.forEach(stat => {
        groupByStatus[stat.replace(" ", "_")] = [];
      });
      state.familii.forEach(fam => {
        groupByStatus[fam.Status.replace(" ", "_")].push(fam);
      });

      var GraphTest = [];
      // console.log(this.famByStat);
      // var famsObj = this.famByStat;

      // get total
      var Total = 0;
      for (var key in groupByStatus) {
        Total += groupByStatus[key].length;
      }
      var Offset = 0;
      for (var key in groupByStatus) {
        var graphObj = {};
        graphObj.lbl = key.replace("_", " ");
        graphObj.val = groupByStatus[key].length;
        graphObj.proc = (groupByStatus[key].length / Total) * 100;
        graphObj.offset = Offset;

        Offset = graphObj.proc + Offset;

        GraphTest.push(graphObj);
      }
      return GraphTest;
    },
    getPieFams(state) {
      var groupByStatus = {};

      state.statusList.forEach(stat => {
        groupByStatus[stat.replace(" ", "_")] = [];
      });
      state.familii.forEach(fam => {
        groupByStatus[fam.Status.replace(" ", "_")].push(fam);
      });

      var GraphTest = [["Familii", "Numar"]];

      for (var key in groupByStatus) {
        var graphArr = [];
        graphArr.push(key.replace("_", " "));
        graphArr.push(groupByStatus[key].length);

        GraphTest.push(graphArr);
      }
      return GraphTest;
    },
    getPieInvitati(state) {
      var GraphTest = [["Familii", "Numar"]];

      var graphArr = [];
      graphArr.push("Nesositi");
      graphArr.push(state.invitatiNesositi.length);

      GraphTest.push(graphArr);

      graphArr = [];
      graphArr.push("Veniti");
      graphArr.push(state.invitati.length - state.invitatiNesositi.length);

      GraphTest.push(graphArr);
      return GraphTest;
    },
    getGraphInvitati(state) {
      var GraphTest = [];

      // get total
      var Total = state.invitati.length;

      var Offset = 0;
      //Nesositi
      var graphObj = {};
      graphObj.lbl = "Nesositi";
      graphObj.val = state.invitatiNesositi.length;
      graphObj.proc = (graphObj.val / Total) * 100;
      graphObj.offset = Offset;

      Offset = graphObj.proc + Offset;

      GraphTest.push(graphObj);
      //Ramasi
      graphObj = {};
      graphObj.lbl = "Veniti";
      graphObj.val = Total - state.invitatiNesositi.length;
      graphObj.proc = (graphObj.val / Total) * 100;
      graphObj.offset = Offset;

      Offset = graphObj.proc + Offset;
      GraphTest.push(graphObj);
      return GraphTest;
    },
    // getGraph_groupStatus(state){
    //   var groupByStatus = {};
    //   var graphObj={}

    //   state.statusList.forEach(stat => {
    //     groupByStatus[stat.replace(" ", "_")] =[];
    //   });
    //   state.familii.forEach(fam => {
    //     groupByStatus[fam.Status.replace(" ", "_")].push(fam);
    //   });

    //   for (let key in groupByStatus) {
    //     graphObj[key]=groupByStatus[key].length
    //   }
    //     return graphObj

    // },
    getFamilie(state) {
      return payload => {
        return state.familii.find(fam => {
          return fam.FamID == payload.famID;
        });
      };
    },
    getInvitat(state) {
      return invID => {
        console.log(invID.famID, invID.memID);
        return state.invitati.find(om => {
          return om.GId == invID.famID && om.id == invID.memID;
        });
      };
    },
    getInvitati(state) {
      return state.invitati;
    },    
    getInvitatiFaraLoc(state){
      return state.invitati.filter(om=>{
        return om.Masa==undefined
      }
      )
    },
    getIndivNesositi(state) {
      return state.invitatiNesositi;
    },
    getIndivSositi(state) {
      return state.invitatiSositi;
    },
    loaded(state) {
      return state.loaded;
    }
  },
  mutations: {
    setUser(state, payload){
      state.user =payload
    },
    setError(state,payload){
      state.errObj=payload
    },
    removeUser(state, payload){
      state.user =null
    },
    
    updateStatus(state, payload) {
      state.statusList = payload.split("#");
      state.groupByStatus = {};

      state.statusList.forEach(stat => {
        state.groupByStatus[stat.replace(" ", "_")] = [];
      });
    },
    updateFamilii(state, payload) {
      state.loaded = false;
      //set familii
      state.familii = [];
      // state.famOBJ=payload
      for (let key in payload) {
        const fam = payload[key];
        fam.FamID = key;
        state.familii.push(fam);
      }

      state.familiiConf = state.familii.filter(fam => {
        return fam.Status == "Confirmat";
      });
      // set invitati
      state.invitati = [];

      state.familiiConf.forEach(fam => {
        for (let key in fam.Membri) {
          const myObj = fam.Membri[key];
          myObj.id = key;
          myObj.Locatie = fam.Locatie;
          state.invitati.push(myObj);
        }
      });

      //Set invitati confirmati
      state.invitatiNesositi = state.invitati.filter(om => {
        return !om.Sosit;
      });
      //Set invitati sositi
      state.invitatiSositi = state.invitati.filter(om => {
        return om.Sosit;
      });
      state.loaded = true;
    }
  },
  actions: {
    autoSingIn({commit},payload){
      console.log("autosign")
      let isAdmin=false
      let isEditor=false

        firebase.database.ref("Users/"+payload.uid).on("value", querySnapshot => {
          console.log(querySnapshot.val())
          if(querySnapshot.val().hasAdmin){
            isAdmin=true
            isEditor=true
          }else{
            isEditor=true
          }          
          let userObj={
            id:payload.uid,
            email:payload.email,
            hasAdmin:isAdmin,
            hasEdit:isEditor
          }
        commit('setUser',userObj)
        })
        
    },
    signUserIn({commit},payload){
      fireOBJ.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(clbuser=>{
        //check user permissions
        let isAdmin=false
        let isEditor=false
        firebase.database.ref("Users/"+clbuser.user.uid).on("value", querySnapshot => {
          if(querySnapshot.val().hasAdmin){
            isAdmin=true
            isEditor=true
          }else{
            isEditor=true
          }
          let userObj={
            id:clbuser.user.uid,
            email:clbuser.user.email,
            hasAdmin:isAdmin,
            hasEdit:isEditor
          }
          console.log("sign user in")
          commit('setUser',userObj)
        })
      }).catch(error=>{
        commit("setError",error)
        console.log(error)
      })
    },
    signUserOut({commit}){
      fireOBJ.auth().signOut().then(()=>{
        console.log("removed user")
        commit('removeUser')

        commit("setError",null)
        router.push("/login")
      })
    },
    //API calls - and commit mutations
    loadFireStatus({ commit }) {
      firebase.database.ref("Liste/Status").on("value", querySnapshot => {
        commit("updateStatus", querySnapshot.val());
      });
      firebase.database.ref("Group").on("value", querySnapshot => {
        commit("updateFamilii", querySnapshot.val());
      });
    },
    update_Familia({ commit }, payload) {
      firebase.database.ref("Group/" + payload.FamID + "/").update({
        Nume: payload.Nume,
        Locatie: payload.Locatie,
        Status: payload.Status,
        Comments: payload.Comments
      });
    },
    updateFam_Field({ commit }, payload) {
      firebase.database.ref("Group/" + payload.FamID + "/").update({
        [payload.Field]: payload.Val
      });
    },
    updateIniv_Masa({ commit }, payload) {
      firebase.database
        .ref("Group/" + payload.FamId + "/Membri/" + payload.UID)
        .update({
          Masa: payload.Masa,
          Loc: payload.Loc
        });
    },
    update_Invitat({ commit }, payload) {
      firebase.database
        .ref("Group/" + payload.GId + "/Membri/" + payload.id)
        .update({
          Prenume: payload.Prenume,
          Masa: payload.Masa,
          Loc: payload.Loc,
          Sosit: payload.Sosit
        });
    },
    update_Sosit({ commit }, payload) {
      firebase.database
        .ref("Group/" + payload.GId + "/Membri/" + payload.id)
        .update({ Sosit: payload.val });
    },
    delete_Familia({ commit }, payload) {
      firebase.database.ref("Group/" + payload).remove();
    },
    delete_Invitat({ commit }, payload) {
      firebase.database
        .ref("Group/" + payload.GId + "/Membri/" + payload.id)
        .remove();
    },
    add_Fam({ commit }, payload) {
      var group = {};
      group.Locatie = payload.Locatie;
      group.Nume = payload.Nume;
      group.Status = payload.Status;
      group.Membri = {};

      var newFamKey = firebase.database.ref("Group").push().key;

      firebase.database
        .ref("Group/" + newFamKey + "/")
        .set(group)
        .then(clbFun => {
          payload.Membri.forEach(om => {
            var memObj = {};
            (memObj.GId = newFamKey),
              (memObj.Loc = ""),
              (memObj.Nume = group.Nume),
              (memObj.Prenume = om),
              (memObj.Sosit = false);

            firebase.database
              .ref("Group/" + newFamKey + "/Membri/")
              .push(memObj);
          });
        });
    },
    add_Memb({ commit }, payload) {
      // debugger;
      var memObj = {};
      (memObj.GId = payload.FamID),
        (memObj.Loc = ""),
        (memObj.Nume = payload.FamName),
        (memObj.Prenume = payload.MembName),
        (memObj.Sosit = false);

      firebase.database.ref("Group/" + payload.FamID + "/Membri/").push(memObj);
    }
  }
});
