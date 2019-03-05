<template>
  <v-container fluid>
    <v-layout align-center justify-space-between row fill-height>
      <v-flex class="xs5 text-xs-center">
        <v-text-field v-model="FamFilter" clearable label="Cauta familie"></v-text-field>
      </v-flex>
      <v-flex xs5>
        <v-text-field v-model="PrenumeFilter" clearable label="Cauta nume"></v-text-field>
      </v-flex>
    </v-layout>
    <!-- tabel -->
    <v-card>
      <!-- header -->
      <v-layout class="pt-2 header subheading primary white--text hidden-xs-only" fill-height>
        <v-flex xs12 sm5><span class="text-uppercase">Prenume</span> Nume</v-flex>
        <v-flex xs12 sm2>Locatie</v-flex>
        <v-flex xs12 sm2>Masa : Loc</v-flex>
        <v-flex xs12 sm3 class="text-xs-right">Actions</v-flex>
      </v-layout>
      <!-- rows Nesositi-->
      <v-subheader>Nesositi: {{Nesositi.length}}</v-subheader>
      <v-layout v-for="indiv in Nesositi" v-bind:key="indiv.id" class="my-1 tblBod blue lighten-5" wrap>
        <v-flex  class="font-weight-bold" xs6 sm5>
          <span class="mb-0 mr-2 text-uppercase">{{indiv.Nume}}</span>
          <span class="mb-0">{{indiv.Prenume}}</span>
        </v-flex>
        <v-flex xs6 sm2>{{indiv.Locatie}}</v-flex>
        <v-flex xs6 sm2 class="text-xs-center subheading">
          <v-chip outline color="black">{{indiv.Masa}}</v-chip>
          <v-icon small left color="blue">event_seat</v-icon>
          <span class="blue--text text--darken-4">{{indiv.Loc}}</span>
        </v-flex>
        <v-flex xs6 sm3 class="text-xs-right" style="justify-content:flex-end">
          <v-btn
            outline
            color="#26a69a"
            @click="setSosit(indiv.GId,indiv.id,!indiv.Sosit)"
            v-if="!indiv.Sosit"
          >
            <v-icon left dark>done</v-icon>Sosit
          </v-btn>
          
        </v-flex>
      </v-layout>
       <v-divider class="mb-1"/>
       <!-- rows Sositi-->       
       <v-subheader>Ajunsi: {{Sositi.length}}</v-subheader>
      <v-layout v-for="indiv in Sositi" v-bind:key="indiv.id" class="my-1 tblBodAjunsi blue-grey lighten-4" wrap>
        <v-flex tabindex="1" class="font-weight-bold" xs6 sm5>
          <span class="mb-0 mr-2 text-uppercase">{{indiv.Nume}}</span>
          <span class="mb-0">{{indiv.Prenume}}</span>
        </v-flex>
        <v-flex xs6 sm2>{{indiv.Locatie}}</v-flex>
        <v-flex xs6 sm2 class="text-xs-center subheading">
          <v-chip outline color="black">{{indiv.Masa}}</v-chip>
          <v-icon small left color="blue" class="mr-2">event_seat</v-icon>
          <span class="blue--text text--darken-4">{{indiv.Loc}}</span>
        </v-flex>
        <v-flex xs6 sm3 class="text-xs-right" style="justify-content:flex-end">         
          <v-btn outline color="#64b5f6" @click="setSosit(indiv.GId,indiv.id,!indiv.Sosit)">
            <v-icon left dark>undo</v-icon>Ne venit
          </v-btn>
        </v-flex>
      </v-layout>
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
    Nesositi() {
      var FamFilter = this.FamFilter;
      var PrenumeFilter = this.PrenumeFilter;

      if (FamFilter == null && PrenumeFilter == null) {
        return this.$store.getters.getIndivNesositi;
      } else {
        return this.$store.getters.getIndivNesositi.filter(function(el) {
          if (FamFilter == null) {
            return (
              el.Prenume.toLowerCase().indexOf(PrenumeFilter.toLowerCase()) > -1
            );
          }
          if (PrenumeFilter == null) {
            return el.Nume.toLowerCase().indexOf(FamFilter.toLowerCase()) > -1;
          }
          return (
            el.Prenume.toLowerCase().indexOf(PrenumeFilter.toLowerCase()) >
              -1 && el.Nume.toLowerCase().indexOf(FamFilter.toLowerCase()) > -1
          );
        });
      }
    },
     Sositi() {
      var FamFilter = this.FamFilter;
      var PrenumeFilter = this.PrenumeFilter;

      if (FamFilter == null && PrenumeFilter == null) {
        return this.$store.getters.getIndivSositi;
      } else {
        return this.$store.getters.getIndivSositi.filter(function(el) {
          if (FamFilter == null) {
            return (
              el.Prenume.toLowerCase().indexOf(PrenumeFilter.toLowerCase()) > -1
            );
          }
          if (PrenumeFilter == null) {
            return el.Nume.toLowerCase().indexOf(FamFilter.toLowerCase()) > -1;
          }
          return (
            el.Prenume.toLowerCase().indexOf(PrenumeFilter.toLowerCase()) >
              -1 && el.Nume.toLowerCase().indexOf(FamFilter.toLowerCase()) > -1
          );
        });
      }
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
