<template>
  <v-container>
    <!-- Nealocati -->
    <div class="header">
      <drop class="drop list" @drop="droped(InvitFaraLoc,false,...arguments)">
        <drag
          v-for="item in InvitFaraLoc"
          :key="item.id"
          class="drag"
          :transfer-data="{ item: item,from:'head', list: InvitFaraLoc}"
        >{{ item.Prenume }} {{ item.Nume }}</drag>
      </drop>
    </div>
    <!-- Mese * Locuri -->
    <div v-for="(masa,masaI) in MeseInvitati" :key="masa.nr">
      masa:{{masaI}}
      <drop
        v-for="(loc,indx) in masa.locuri"
        :id="'drop_'+masaI+'_'+indx"
        :key="indx"
        class="drop list"
        @drop="droped(loc, true,...arguments)"
      >
        loc:{{indx}}
        <drag
          v-for="(item,j) in loc"
          :key="j"
          class="drag"
          :transfer-data="{ item: item, from:'loc', list: loc, inxLocuri:indx,inxMasa:masaI}"
        >{{ item.Prenume }} {{ item.Nume }}</drag>
      </drop>
    </div>
  </v-container>
</template>
<script>
import { Drag, Drop } from "vue-drag-drop";

export default {
  components: { Drag, Drop },
  data() {
    return {
      nrMese: 3,
      nrLocuri: 5,

      mese_array: [],
      invitatiDepus: []
    };
  },
  created() {
    this.genMeseArr();
  },
  updated() {
    // this.genMeseArr()
    console.log("updated");
  },
  computed: {
    InvitFaraLoc() {
      // invitatiDepus=this.$store.getters.getInvitati;
      return this.$store.getters.getInvitatiFaraLoc;
    },
    MeseInvitati() {
      return this.$store.getters.getMeseInvitati;
    },
    famByStat() {
      return this.$store.getters.getGraphFams;
    }
  },
  methods: {
    genMeseArr() {
      for (var i = 1; i <= this.nrMese; i++) {
        this.mese_array.push({
          nr: i,
          locuri: []
        });
        for (var j = 1; j <= this.nrLocuri; j++) {
          this.mese_array[i - 1].locuri.push([]);
        }
      }
    },
    droped(toList, inLoc, data, event) {
      var fromList = data.list;
      var TargetID = event.target.id;
      var tMasa = TargetID.split("_")[1];
      var tLoc = TargetID.split("_")[2];

      if (inLoc) {
        // debugger;
        // this.InvitFaraLoc.splice(this.InvitFaraLoc.indexOf(data.item),1)
        var payload = {
          FamId: data.item.GId,
          UID: data.item.id,
          Masa: tMasa,
          Loc: tLoc
        };
        this.$store.dispatch("updateIniv_Masa", payload);
      } else {
        var payload = {
          FamId: data.item.GId,
          UID: data.item.id,
          Masa: "",
          Loc: ""
        };
        this.$store.dispatch("updateIniv_Masa", payload);
      }
      // toList.push(data.item)
    }
  }
};
</script>

<style>
.drag {
  display: inline-block;
}
.drag.A {
  background: #aaa;
}
.drag.B {
  background: #888;
}
.drag.C {
  background: #666;
}
.drag.D {
  background: #444;
}
.drag.E {
  background: #222;
}
.drag.F {
  background: #000;
}
.drop {
  display: inline-block;
  vertical-align: top;
  /* padding: 15px; */
  margin-bottom: 20px;
  width: auto;
  height: auto;
}

.drag,
.drop {
  box-sizing: border-box;
  display: inline-block;
  border-radius: 10px;
  width: 100px;
  /* height: 50px; */
  background: #ccc;
  vertical-align: middle;
  margin-right: 20px;
  position: relative;
  /* padding: 5px; */
  /* padding-top: 35px; */
  text-align: center;
  margin: 0px;
}

.drag {
  color: #fff;
  width: 80px;
  /* height: 20px; */
  cursor: move;
  background: #777;
  border-right: 2px solid #666;
  border-bottom: 2px solid #666;
}

.drop {
  background: #eee;
  padding: 3px;
  height: 100px;
  border-top: 2px solid #ccc;
  border-left: 2px solid #ddd;
}

.header .drop {
  background-color: rgb(193, 219, 193);
  width: 100%;
}
</style>