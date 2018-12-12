<template>
  <v-container>

    <!-- Nealocati -->
    <div v-for="(element, i) in nealocati" :key="element.id" class="header">
      <drop class="drop list" @drop="handleDrop(nealocati,i,-1, ...arguments)">
        <drag
          v-for="item in element"
          :key="item.id"
          class="drag"
          :transfer-data="{ item: item, list: nealocati, example: 'mese_array', listnri: i, listnrj: -1}"
        >X {{ item.name }}</drag>
      </drop>
    </div>

    <!-- Mese * Locuri -->

    <div v-for="(masa, i) in mese_array" :key="i">
        masa:{{i}}
      <div v-for="(element, j) in masa" :key="i*nrLocuri+j" class="drops">
          loc:{{i*nrLocuri + j}}
        <drop class="drop list" @drop="handleDrop(mese_array[i],i,j, ...arguments)">
          <drag
            v-for="item in element"
            :key="item.id"
            class="drag"
            :transfer-data="{ item: item, list: mese_array[i], example: 'mese_array', listnri: i, listnrj: j}"
          >Y {{ item.name }}</drag>
        </drop>
      </div>
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
      nrLocuri: 4,
    //   mese_array: [['1'], ['2'], ['3']],
    mese_array:[],
      nealocati: [[{ name: "a", id: "1sdfsdf" }, { name: "b", id: "dfdf2" }]]
    };
  },
  created: function() {
       for (var i=0; i<this.nrMese; i++){
            this.mese_array.push([]);
        for (var j=0; j<this.nrLocuri; j++){
                this.mese_array[i].push([]);
                
        }
       }
  },
  computed: {
    Indivizi() {
      return this.$store.getters.getInvitati;
    },
    famByStat() {
      return this.$store.getters.getGraphFams;
    },
    scopedData: () => ({
      dragText: "scoped drag",
      dropText: "scoped drop"
    })
  },
  methods: {
    handleDrop(toList, iIndex, jIndex, data) {
      const fromList = data.list;
      var global = (iIndex - 1) * this.nrLocuri + jIndex + 1;
    //   debugger;

      if (data.listnrj != -1) {

         console.log("to header");
          
          console.log(this.nealocati);
          
          this.nealocati[0].push(data.item);
          
          
          this.mese_array[data.listnri][data.listnrj]=[];
          
          toList.sort((a, b) => a > b);
          
        
      } else {
        console.log("from header");
          
          this.mese_array[iIndex][jIndex]=[data.item];
          this.nealocati[0].splice(this.nealocati[0].indexOf(data.item), 1);


          toList.sort((a, b) => a > b);
          
        
      }
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
  height: 50px;
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
  cursor: move;
  background: #777;
  border-right: 2px solid #666;
  border-bottom: 2px solid #666;
}

.drop {
  background: #eee;
  border-top: 2px solid #ccc;
  border-left: 2px solid #ddd;
}

.header .drop {
  background-color: rgb(193, 219, 193);
  width: 100%;
}
</style>