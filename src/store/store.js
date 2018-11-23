import Vue from "vue";
import Vuex from "vuex";

import firebase from "./firebase";

Vue.use(Vuex);
Vue.use(firebase);

export const store = new Vuex.Store({
  state: {
    loaded: false,
    invitati: [],
    invitatiNesositi: [],
    statusList: [],
    groupByStatus: {},
    familii: [],
    familiiConf: [],
    indivConf: []
  },
  getters: {
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
    getFamilie(state) {
      return payload => {
        return state.familii.find(fam => {
          return fam.FamID == payload.famID;
        });
      };
    },
    getInvitat(state) {
      return invID => {
        return state.invitati.find(om => {
          return om.GId == invID.famID && om.id == invID.memID;
        });
      };
    },
    loaded(state) {
      return state.loaded;
    }
  },
  mutations: {
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
      // set invitati
      state.invitati = [];

      state.familii.forEach(fam => {
        for (let key in fam.Membri) {
          const myObj = fam.Membri[key];
          myObj.id = key;
          myObj.Locatie = fam.Locatie;
          state.invitati.push(myObj);
        }
      });

      state.familiiConf = state.familii.filter(fam => {
        return fam.Status == "Confirmat";
      });
      //Set invitati confirmati
      state.indivConf = [];
      state.familiiConf.forEach(fam => {
        for (let key in fam.Membri) {
          if (!fam.Membri[key].Sosit) {
            const myObj = fam.Membri[key];
            myObj.id = key;
            myObj.Locatie = fam.Locatie;
            state.indivConf.push(myObj);
          }
        }
      });
      state.loaded = true;
    }
  },
  actions: {
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
        Status: payload.Status
      });
    },
    update_Invitat({ commit }, payload) {
      firebase.database
        .ref("Group/" + payload.GId + "/Membri/" + payload.id)
        .update({
          Prenume: payload.Prenume,
          Loc: payload.Loc,
          Sosit: payload.Sosit
        });
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
              (memObj.Loc = 0),
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
      debugger;
      var memObj = {};
      (memObj.GId = payload.FamID),
        (memObj.Loc = 0),
        (memObj.Nume = payload.FamName),
        (memObj.Prenume = payload.MembName),
        (memObj.Sosit = false);

      firebase.database.ref("Group/" + payload.FamID + "/Membri/").push(memObj);
    }
  }
});
