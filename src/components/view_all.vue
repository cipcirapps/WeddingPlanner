<template>
  <v-container fill-width align-center>
    <!-- Search field -->
    <v-flex xs12 md6 mb-2>
      <v-text-field
        v-model="searchDeinv"
        clearable
        append-icon="search"
        label="Familia"
        single-line
        hide-details
      ></v-text-field>
    </v-flex>

    <div v-for="(itm ,keyFam,index) in GroupedStatus" :key="index">
      <v-layout row wrap>
        <v-flex xs6 mt-4>
          <div class="blue-grey--text darken-4">{{keyFam.replace("_"," ")}} : {{itm.length}}</div>
        </v-flex>
      </v-layout>
      <!-- Structura tabel -->
      <v-data-table
        :headers="headers"
        :items="itm"
        item-key="Nume"
        class="elevation-1"
        :search="searchDeinv"
      >
        <template slot="items" slot-scope="props">
          <tr @click="props.expanded = !props.expanded">
            <td>
              <v-btn
                :to="{name:'edit_group',params:{gid:props.item.FamID}}"
                outline
                round
                color="primary"
              >{{ props.item.Nume }}</v-btn>
            </td>
            <td>{{ props.item.Locatie }}</td>
            <td>
              <v-container grid-list-md text-xs-center>
                <v-layout
                  row
                  v-for="(om,key,index) in props.item.Membri"
                  :key="key"
                  :class="{BtmBorder: index< Object.keys(props.item.Membri).length-1}"
                >
                  <v-flex xs4>{{om.Prenume}}</v-flex>
                  <v-flex xs4 v-if="keyFam=='Confirmat'">
                    <v-icon class="green--text" v-if="om.Sosit ">check</v-icon>
                    <v-icon v-else class="orange--text">directions_run</v-icon>
                  </v-flex>
                  <v-flex xs4 style="text-align:right" v-if="keyFam=='Confirmat'">
                    <v-btn
                      flat
                      icon
                      small
                      class="accent"
                      :to="{name:'editInvitat',params:{gid:om.GId},query:{memid:key}}"
                    >
                      <v-icon small>edit</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </td>
          </tr>
        </template>
        <template slot="expand" slot-scope="props">
          <v-layout row wrap pl-2>
            <v-flex flat>Update status :
              <v-btn
                style="cursor:pointer!important"
                @click="updateStat(stat, props.item.FamID)"
                v-for="(stat,i) in statuses"
                :key="i"
                round
                :selected="stat==props.item.Status"
                :disabled="stat==props.item.Status"
                :outline="stat==props.item.Status"
              >{{stat}}</v-btn>
            </v-flex>
          </v-layout>
        </template>
      </v-data-table>
    </div>

    <v-btn icon fixed class="primary" large bottom right :to="'/add_new_group/'">
      <v-icon>group_add</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      searchDeinv: null,
      headers: [
        {
          text: "Familia",
          value: "Nume"
        },

        { text: "Locatie", value: "locatie" },
        { text: "Membri", value: "prenume", align: "center" }
        // { text: 'Sosit', value: 'sosit'},
        // { text: 'Edit', value: 'status', sortable: false,align: 'right',},
      ]
    };
  },
  methods: {
    updateStat(NewVal, UFamID) {
      // console.log(Val, FamID);
      this.$store.dispatch("updateFam_Field", {
        FamID: UFamID,
        Field: "Status",
        Val: NewVal
      });
    }
  },
  computed: {
    GroupedStatus() {
      return this.$store.getters.getGroupStatus;
    },
    fams() {
      return this.$store.getters.getFamilii;
    },
    statuses: function() {
      return this.$store.getters.getStatusList;
    }
  }
};
</script>
<style scoped>
.v-chip .v-chip__content {
  cursor: pointer;
}
.v-messages {
  min-height: unset;
}
.BtmBorder {
  border-bottom: solid 1px lightgrey;
}
</style>
