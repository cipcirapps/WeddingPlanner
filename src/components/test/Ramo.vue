<template>
  <v-container>
    <div id="mese_board">
      <div
        id="show_all_tables"
        class="masa_board"
        v-on:click="show_all_tables_flag = !show_all_tables_flag"
      >
        <span v-show="!show_all_tables_flag">All</span>
        <span v-show="show_all_tables_flag">x</span>
      </div>
      <div
        class="masa_board"
        v-for="(masa,indx) in MeseInvitati"
        :key="indx"
        v-on:click="masa_selectata = indx"
      >{{indx}}</div>
    </div>
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
    <div
      class="masa_display"
      ref="masa_display"
      v-for="(masa,masaI) in MeseInvitati"
      :key="masa.nr"
      v-show="masaI==masa_selectata || show_all_tables_flag"
      v-bind:style="contentHeight"
    >
      <drop
        v-for="(loc,indx) in masa.locuri"
        :id="'drop_'+masaI+'_'+indx"
        :key="indx"
        class="drop list movable"
        @drop="droped(loc, true,...arguments)"
        v-bind:style="styleObject[indx]"
        ref="mybox"
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
      styleObject: [],
      styleCenter: [],
      masa_selectata: 0,
      show_all_tables_flag: true,
      nrMese: 3,
      nrLocuri: 6,
      contentHeight: { height: "500px" },

      mese_array: [],
      invitatiDepus: []
    };
  },
  created() {
    this.genMeseArr();
    this.initialize_style();
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
  mounted: function() {
    window.addEventListener("resize", this.handleResize);
    this.rounded();
  },
  methods: {
    handleResize(event) {
      // this.fullHeight = document.documentElement.clientHeight;
      console.log("resize");
      this.rounded();
    },

    initialize_style() {
      // debugger;

      for (var i = 0; i < this.MeseInvitati[0].locuri.length; i++) {
        this.styleObject.push({
          left: "0px",
          top: "0px"
        });
      }
      for (var i = 0; i < this.MeseInvitati.length; i++) {
        this.styleCenter.push({
          left: "0px",
          top: "0px"
        });
      }
    },
    rounded() {
      var nr_elem = this.MeseInvitati[0].locuri.length;
      var arc = 360 / nr_elem;
      // debugger;
      var w_box = this.$refs.mybox[0].$el.offsetWidth;
      var h_box = this.$refs.mybox[0].$el.offsetHeight;
      var cont_max = this.$refs.masa_display[0].offsetWidth;
      var table_width = 0;
      var nr_layers = parseInt((nr_elem / 2 - 1) / 2);

      for (var i = 0; i < this.MeseInvitati.length; i++) {
        // debugger;
        this.styleCenter[i].left = (cont_max - table_width) / 2 + "px";
        this.styleCenter[i].top = (nr_layers + 1) * h_box + "px";
      }

      var mid_nr = nr_elem / 2;
      var lefty = 0;

      lefty = (cont_max - (mid_nr + 1) * w_box) / 2 - table_width;

      for (var i = 0; i < nr_elem; i++) {
        var topy = -1;
        if (i == 0 || i == mid_nr) {
          topy = topy + 0;
        } else if (i < nr_elem / 2) {
          if (i <= nr_elem / 4) {
            topy = topy + i / 2;
          } else {
            topy = topy + nr_elem / 8 - (i - nr_elem / 4) / 2;
          }
        } else {
          if (i <= (3 * nr_elem) / 4) {
            topy = topy - (i - nr_elem / 2) / 2;
          } else {
            topy = topy - nr_elem / 8 + (i - (3 * nr_elem) / 4) / 2;
          }

          lefty = lefty - 2 * w_box;
        }
        console.log(i, lefty);

        topy = -topy * h_box;
        this.styleObject[i].top = parseInt(topy * 2 * 1) + "px";
        this.styleObject[i].left = parseInt(lefty) + "px";

        // console.log("nr_elem", nr_elem / 2);
        if ((nr_elem / 2) % 2 == 0) {
          this.contentHeight.height = (nr_elem / 2 + 1) * h_box + "px";
        } else {
          this.contentHeight.height = (nr_elem / 2) * h_box + "px";
        }
      }

      console.log("h_box", h_box);
    },
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

#mese_board {
  width: 100%;
  background-color: #aaa;
}

.masa_board {
  width: 50px;
  height: 50px;
  background-color: #81d8d0;
  display: inline-flex;
  border: 1px solid #009688;
  border-radius: 50%;
  text-align: center;
  align-items: center;
  padding: 15px;
  font-size: 20px;
  margin: 5px;
}
.center_table {
  width: 100px;
  height: 100px;
  background-color: darkcyan;
  border-radius: 50%;
  line-height: 100px;
  position: relative;
}
.masa_display {
  border: 1px solid darkblue;
  display: flex;
}

.movable {
  border: 1px solid red;
  position: relative;
}
</style>