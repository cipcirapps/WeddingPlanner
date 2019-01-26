<template>
  <!-- Main content -->
  <v-container fluid fill-height>
    <v-layout row  justify-center
          align-center>
      <div class="text-xs-center">
      
      <svg :width="Svg.w" :height="Svg.h">
        <!-- layouts -->
        <g v-for="(shape,n,i) in Layout" :key="i">
          <rect 
          :x="shape.x+'%'"
          :y="shape.y+'%'"
          :width="shape.w"
          :height="shape.h"
          :fill="shape.col"
          />
          <text 
          :x="shape.x+'%'"
          :y="shape.y-0.5+'%'"
          class="txtLayout"
          >
          {{shape.name}}
          </text>

        </g>
        <g v-for="(masa,indM) in MeseData" :key="indM">
          <circle :id="masa.id" :cx="masa.x" :cy="masa.y" :r="DeffMasa.r" class="masa"></circle>
          <text :x="masa.x-5" :y="masa.y+4" class="txtMasa">{{indM+1}}</text>
          <!-- sateliti -->
          <g v-for="(loc,indL) in masa.locuri" :key="indL">
            <circle
              :id="loc.id"
              :cx="calcSatelite(masa.x,masa.y,indL).x"
              :cy="calcSatelite(masa.x,masa.y,indL).y"
              :r="DeffLoc.r"
              class="clickable"
              :class="[{'ocupat':loc.inv!=''},{'selected':loc.selected}]"
              @click="LocClick(indM,indL,loc)"
            ></circle>
            <text
              v-if="loc.inv!=''"
              :x="calcText(masa.x,masa.y,indL,loc.inv).x"
              :y="calcText(masa.x,masa.y,indL,loc.inv).y"
              class="txtInv"              
            >{{loc.inv}}</text>
          </g>
        </g>
      </svg>
      </div>    
    </v-layout>
    
      <v-dialog persistent dark v-model="Stage.showRemain">
        <v-card >
          <v-card-title>
            <span class="headline">Invitati fara loc</span>
          </v-card-title>
          <v-card-text>
            <v-chip
              v-for="(om,i) in invRamasi"
              :key="i"
              @click="AddToLoc(om)"
              class="clickable"
            >{{om.Nume}} {{om.Prenume}}</v-chip>
          </v-card-text>
          <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            flat
            @click="CancelAsignare()"
          >
            Cancel
          </v-btn>
        </v-card-actions>
        </v-card>
      </v-dialog>
    
  </v-container>
</template>
<script>
export default {
  name: "MeseLayout",
  props: {
    msg: String
  },
  data() {
    return {
      Mese: 15,
      Locuri: 10,
      Svg:{w:800,h:1500},
      Stage: { showRemain: false },
      MesePoz: [
        { x: 150, y: 150 }, { x: 630, y: 150 }, 
        { x: 120, y: 300 }, { x: 650, y: 300 }, 
        { x: 120, y: 450 }, { x: 650, y: 500 }, 
        { x: 120, y: 600 }, { x: 650, y: 650 }, 
        { x: 120, y: 750 }, { x: 650, y: 800 }, 
        { x: 120, y: 900 }, { x: 650, y: 950 }, 
        { x: 120, y: 1050 }, { x: 650, y: 1100 }, 
                             { x: 650, y: 1250 },  
        ],
      Layout:[
        {name:"Masa Miri",x:35,y:1.5,w:200,h:50,col:"blue"},
        {name:"usa",x:98,y:25,w:10,h:50,col:"red"},
        {name:"usaB1",x:0,y:75,w:10,h:50,col:"red"},
        {name:"usaB2",x:0,y:85,w:10,h:50,col:"red"},
        {name:"usaMain",x:98,y:95,w:10,h:50,col:"red"},

        {name:"Col 1.1",x:30,y:30,w:50,h:50,col:"#f3f0f0"},
        {name:"Col 1.2",x:30,y:50,w:50,h:50,col:"#f3f0f0"},
        {name:"Col 1.3",x:30,y:70,w:50,h:50,col:"#f3f0f0"},

        {name:"Col 2.1",x:60,y:30,w:50,h:50,col:"#f3f0f0"},
        {name:"Col 2.2",x:60,y:50,w:50,h:50,col:"#f3f0f0"},
        {name:"Col 2.3",x:60,y:70,w:50,h:50,col:"#f3f0f0"},

        {name:"Scena",x:28,y:95,w:350,h:50,col:"lightblue"},
        ],
      DeffMasa: { r: 20 },
      DeffLoc: { r: 10, dist: 20 },
      MeseData: [],
      Transfer: {}
    };
  },
  created() {
    this.generateMeseData();
    this.populate();
  },
  methods: {
    generateMeseData() {
      var vueOBJ = this;

      for (var i = 1; i <= this.Mese; i++) {
        const data = {
          id: "M" + i,
          x: vueOBJ.MesePoz[i - 1].x,
          y: vueOBJ.MesePoz[i - 1].y,
          locuri: []
        };
        for (var j = 1; j <= vueOBJ.Locuri; j++) {
          const locObj = {
            id: "M" + i + "L" + j,
            inv: "",
            omID: "",
            selected:false
          };
          data.locuri.push(locObj);
        }
        vueOBJ.MeseData.push(data);
      }
    },
    populate() {
      var vueOBJ = this;
      this.InvArr.forEach(om => {
        if (om.Loc !== "") {
          vueOBJ.MeseData[parseInt(om.Masa) - 1].locuri[parseInt(om.Loc) - 1].inv = om.Nume+" "+om.Prenume
          vueOBJ.MeseData[parseInt(om.Masa) - 1].locuri[parseInt(om.Loc) - 1].omID = om.id
        }
      });
    },
    calcSatelite(ParentX, ParentY, LocNr) {
      var angle, X, Y;
      var distFromParent = this.DeffLoc.dist;

      angle = (LocNr / (this.Locuri / 2)) * Math.PI;
      X = (this.DeffMasa.r + distFromParent) * Math.cos(angle);
      Y = (this.DeffMasa.r + distFromParent) * Math.sin(angle);
      return { x: X + ParentX, y: Y + ParentY };
    },
    calcText(ParentX, ParentY, LocNr, txt) {      
      var angle;
      var X;
      var Y;
      var correctionX = 15;
      var correctionY = 13;
      var distFromParent = this.DeffLoc.dist;

      angle = (LocNr / (this.Locuri / 2)) * Math.PI;
      X = (this.DeffMasa.r + distFromParent) * Math.cos(angle);
      Y = (this.DeffMasa.r + distFromParent) * Math.sin(angle);
      if (X < 0) correctionX = -correctionX;
      if (Y < 0.1 && Y > -0.1) correctionY =0// correctionY / 10;
      if (Y < 0) correctionY = -correctionY;
      if (X < 0) correctionX = correctionX - txt.length * 7;
      return {
        x: X + ParentX + correctionX,
        y: Y + ParentY + correctionY
      };
    },
    LocClick(indMasa, indloc, loc) {
      // console.log(loc)
      // reset
      if (loc.inv !== "") {
        // if (window.confirm("Sigur eliberam locul?")) {
          this.MeseData[indMasa].locuri[indloc].inv = "";
          let target = this.InvArr.find(om => {
            return om.id === loc.omID;
          });
          var payload = {
            FamId: target.GId,
            UID: target.id,
            Masa: "",
            Loc: ""
          };

          this.$store.dispatch("updateIniv_Masa", payload);
        // } else {
        //   return false;
        // }
      }
      this.Stage.showRemain = true;
      this.Transfer.masa = indMasa;
      this.Transfer.loc = indloc;
      loc.selected=true
      // loc.inv = 'axxc nlk'
    },
    AddToLoc(om) {
      this.MeseData[this.Transfer.masa].locuri[this.Transfer.loc].inv =
        om.Nume + " " + om.Prenume;
      this.MeseData[this.Transfer.masa].locuri[this.Transfer.loc].omID = om.id;
      this.MeseData[this.Transfer.masa].locuri[this.Transfer.loc].selected=false
      //update om

      var payload = {
        FamId: om.GId,
        UID: om.id,
        Masa: this.Transfer.masa + 1,
        Loc: this.Transfer.loc + 1
      };

      this.$store.dispatch("updateIniv_Masa", payload);
      // om.Masa = this.Transfer.masa + 1;
      // om.Loc = this.Transfer.loc + 1;
      this.Transfer = {};
      this.Stage.showRemain = false;
    },
    CancelAsignare(){
      this.MeseData[this.Transfer.masa].locuri[this.Transfer.loc].selected=false
      this.Transfer = {};
      this.Stage.showRemain = false;
    }
  },
  computed: {
    invRamasi() {
      return this.InvArr.filter(om => {
        return om.Loc === "";
      });
    },
    InvArr() {
      return this.$store.getters.getInvitati;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
svg {
  border: solid 1px black;
}
.masa {
  stroke: green;
  stroke-width: 4;
  fill: #fdf0c4;
}
.loc {
  cursor: pointer;
}
.ocupat {
  fill: cadetblue;
}
.selected{
  fill: coral
}
.clickable {
  cursor: pointer;
}
.txtMasa{
  fill:blue;
  font-size: 120%;
  font-weight: bold;
}
.txtLayout{
  fill:gray;
  font-size: 80%;
}
.txtInv{
  fill:black;
  font-size: 110%
}

div .listOm {
  margin-top: 10px;
}
</style>
<style>
.v-chip__content{
  cursor: pointer !important;
}

</style>
