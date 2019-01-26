<template>
  <v-container grid-list-xl>
    <v-layout align-center justify-space-around row wrap>
      <v-flex style="text-align:center" xs12>
        <!-- cards -->
        <v-card class="mb-2">
          <v-card-title class="blue lighten-1 pb-0 pt-1 white--text">
            <div>Status familii</div>
          </v-card-title>
          <v-card-text class="pt-0 pb-0">
            <svg :width="chartSize" :height="chartSize" id="SVGtag">
              <!-- <rect class="BarTot" :x="TotalBar.X+'%'" :y="TotalBar.Y+'%'" :width="TotalBar.Width+'%'" :height="TotalBar.Height+'%'"
              rx="20" ry="20" />-->
              <g v-for="(masa,index) in Mese" :key="index">
                <circle
                  class="Masa"
                  :cx="150+masaDistX*index"
                  :cy="100"

                  :r="5+'%'"                  
                  :style="'fill:'+colorsArr[0]"                  
                ></circle>
                <circle
                  class="satelite"
                  v-for="(loc,n) in masa.locs"
                  :key="n"
                  :id="masa.nume+'_loc'+loc.id"
                  :cx="getSatelite((150+masaDistX*index)*2,n,masa.locs.length,50).x"
                  :cy="getSatelite(200,n,masa.locs.length,50).y"
                  :r="'10px'"
                >
                </circle>  
                <!-- {{(bar.proc).toFixed(0)}}% -->
              </g>
            </svg>
          </v-card-text>
        </v-card>
      </v-flex>
      
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      colorsArr: ["#bb9f4c", "#FFC107", "#69c56c", "#d6d6d6"],
      chartSize: "60vw",
      masaDistX:200,
      TotalBar: {
        X: 10,
        Y: 10,
        Width: 30,
        Height: 80
      },
      dataPathsArr: [],
      Mese:[        
        {
          nume:"m1",
          locs:[
           {id:1, om: "a"},
           {id:2, om: ""},
           {id:3, om: "b"},
           {id:4, om: ""},
           {id:5, om: ""},
           {id:6, om: ""},
           {id:7, om: ""},
           {id:8, om: ""},
           {id:9, om: ""},
           {id:10, om: ""},
          ]
        },
         {
          nume:"m2",
          locs:[
           {id:1, om: "a"},
           {id:2, om: ""},
           {id:3, om: "b"},
           {id:4, om: ""},
           {id:5, om: ""},
           {id:6, om: ""},
           {id:7, om: ""},
           {id:8, om: ""},
           {id:9, om: ""},
           {id:10, om: ""},
          ]
        },
      ]
    };
  },
  methods:{
    getSatelite(mx,curNum,numNodes,radius){
      var nodes = [], 
             width = mx,//(radius * 2) + 50,
             ///height =my,// (radius * 2) + 50,
             angle,
             x,
             y,
             i;

      angle = (curNum / (numNodes/2)) * Math.PI; // Calculate the angle at which the element will be placed.
                                                // For a semicircle, we would use (i / numNodes) * Math.PI.
      x = (radius * Math.cos(angle)) + (width/2); // Calculate the x position of the element.
      y = (radius * Math.sin(angle)) + (width/2); // Calculate the y position of the element.
    return {'x': x, 'y': y}
    }
  },
  computed: {
    IndivByStat() {
      // console.log(this.$store.getters.getGraphInvitati);
      return this.$store.getters.getGraphInvitati;
    },
    famByStat() {
      return this.$store.getters.getGraphFams;
    }
  }
};
</script>
<style scoped>
#PieChart {
  height: 200px;
}
#SVGtag {
  margin: 10px 0px;
  border: solid 1px black;
}

.BarTot {
  fill: white;
  stroke-width: 3;
  stroke: rgb(0, 0, 0);
}
.BarPart {
  /* fill: #a0cfff; */
  fill-opacity: 0.9;
  stroke-width: 2;
  stroke: rgb(0, 0, 0);
}
text {
  font-size: 2vw;
}
</style>
