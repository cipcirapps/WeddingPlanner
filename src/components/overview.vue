<template>
  <v-container fluid>
    <!-- <v-layout align-center justify-space-between row fill-height>
      <v-flex class="xs5 text-xs-center">
        <v-text-field v-model="FamFilter" clearable label="Cauta familie"></v-text-field>
      </v-flex>
      <v-flex xs5>
        <v-text-field v-model="PrenumeFilter" clearable label="Cauta nume"></v-text-field>
      </v-flex>
    </v-layout>-->
    <!-- tabel -->
    <v-card>
      <!-- header -->
      <v-layout class="pt-2 header subheading primary white--text hidden-xs-only" fill-height>
        <v-flex xs12 sm5>
          <span class="text-uppercase">Prenume</span> Nume
        </v-flex>
        <v-flex xs12 sm2>Locatie</v-flex>
        <!-- <v-flex xs12 sm2>Masa : Loc</v-flex> -->
        <v-flex xs12 sm3 class="text-xs-right">Actions</v-flex>
      </v-layout>

      <div v-for="(locatie,valoare,i) in GroupByLocatie" :key="i">
        <v-subheader>{{valoare}}: {{locatie.length}}</v-subheader>
        <v-layout
          v-for="fam in locatie"
          v-bind:key="fam.id"
          class="my-1 tblBod blue lighten-5"
          wrap
        >
          <v-flex class="font-weight-bold" xs6 sm5>
            <span class="mb-0 mr-2 text-uppercase">{{fam.Nume}}</span>
          </v-flex>
          <v-flex xs6 sm2>{{fam.Locatie}}</v-flex>
          <!-- <v-flex xs6 sm2 class="text-xs-center subheading"></v-flex> -->
          <v-flex xs6 sm5>
            <v-layout v-for="indiv in fam.Membri" :key="indiv.id">
              <v-chip outline color="black">{{indiv.Masa}}</v-chip>
              <v-icon small left color="blue">event_seat</v-icon>
              <span class="blue--text text--darken-4">{{indiv.Loc}}</span>
              <v-flex>{{indiv.Prenume}}</v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "conf_notArr",
  data() {
    return {
      FamFilter: null,
      PrenumeFilter: null
    };
  },
  methods: {
    setSosit(fam, indiv, myBol) {
      this.$store.dispatch("update_Sosit", { GId: fam, id: indiv, val: myBol });
    }
  },
  computed: {
    GroupByLocatie() {
      let confirmati = this.$store.getters.getGroupStatus.Confirmat;
      let grupati = {};

      confirmati.forEach(element => {
        if (typeof grupati[element.Locatie] == "undefined") {
          grupati[element.Locatie] = [];
        }
        grupati[element.Locatie].push(element);
      });
      // sort
      function sortName(a, b) {
        if (a.Nume < b.Nume) return -1;
        if (a.Nume > b.Nume) return 1;
        return 0;
      }

      Object.keys(grupati).forEach(function(key) {
        grupati[key].sort(sortName);
      });

      return grupati;
    }
  }
};
</script>
<style>
/* .flex{
  border: solid 1px lightblue
} */
.header .flex {
  margin: 0 3px;
  padding: 5px;
}
/* .tblBod{
  border:solid 2px lightgray;
} */
.tblBod .flex {
  /* background-color: whitesmoke; */
  /* margin: 0 3px; */
  padding: 0 3px;
  align-items: center;
  display: flex;
}

.tblBodAjunsi .flex {
  /* background-color: lightgray; */
  color: grey;
  /* margin: 0 3px; */
  padding: 0 3px;
  align-items: center;
  display: flex;
}
.tabindex:focus {
  background-color: lightblue;
}
</style>
