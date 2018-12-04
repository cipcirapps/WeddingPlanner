<template> 
  <v-container fluid >      
      <v-container grid-list-xl>        
        <v-layout align-center justify-space-around row wrap>
            <v-flex style="text-align:center" xs12 sm6> 
      <!-- cards -->
              <v-card class="mb-2">
                <v-card-title class="blue lighten-1 pb-0 pt-1" >
                    <div>
                    Fams                      
                    </div>
                </v-card-title>                  
                <v-card-text class="pt-0 pb-0">                                      
                  <svg :width="chartSize" 
                  :height="chartSize" id="SVGtag">                      
                      <rect class="BarTot" :x="TotalBar.X+'%'" :y="TotalBar.Y+'%'" :width="TotalBar.Width+'%'" :height="TotalBar.Height+'%'" />
                    <g v-for="(bar,index) in famByStat" :key="index">
                      <rect
                      class="BarPart" 
                      :x="TotalBar.X+'%'" 
                      :y="(100-bar.proc-bar.offset)*TotalBar.Height/100+TotalBar.Y+'%'" 
                      :height="bar.proc*TotalBar.Height/100+'%'" 
                      :width="TotalBar.Width+'%'" 
                      :style="'fill:'+colorsArr[index]"
                      />
                      <text 
                        :x="TotalBar.X+TotalBar.Width*1.1+'%'" 
                        :y="(100-bar.proc-bar.offset)*TotalBar.Height/100+TotalBar.Y+(bar.proc*TotalBar.Height/100)*0.6+'%'" 
                        fill="black">
                        <!-- {{bar.lbl}} -->
                         : {{bar.val}} = {{(bar.proc).toFixed(2)}}%
                        </text>
                    </g>
                  </svg>   
                </v-card-text>            
              </v-card>
          </v-flex>
           <v-flex style="text-align:center" xs12 sm6> 
      <!-- cards -->
              <v-card class="mb-2">
                <v-card-title class="blue lighten-1 pb-0 pt-1" >
                    <div>
                    Inv                      
                    </div>
                </v-card-title>                  
                <v-card-text class="pt-0 pb-0">                                      
                  <svg :width="chartSize" 
                  :height="chartSize" id="SVGtag">                      
                      <rect class="BarTot" :x="TotalBar.X+'%'" :y="TotalBar.Y+'%'" :width="TotalBar.Width+'%'" :height="TotalBar.Height+'%'" />
                    <g v-for="(bar,index) in IndivByStat" :key="index">
                      <rect
                      class="BarPart" 
                      :x="TotalBar.X+'%'" 
                      :y="(100-bar.proc-bar.offset)*TotalBar.Height/100+TotalBar.Y+'%'" 
                      :height="bar.proc*TotalBar.Height/100+'%'" 
                      :width="TotalBar.Width+'%'" 
                      :style="'fill:'+colorsArr[index]"
                      />
                      <text 
                        :x="TotalBar.X+TotalBar.Width*1.1+'%'" 
                        :y="(100-bar.proc-bar.offset)*TotalBar.Height/100+TotalBar.Y+(bar.proc*TotalBar.Height/100)*0.6+'%'" 
                        fill="black">
                        <!-- {{bar.lbl}} -->
                         : {{bar.val}} = {{(bar.proc).toFixed(2)}}%
                        </text>
                    </g>
                  </svg>   
                </v-card-text>
              </v-card>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex style="text-align:center" xs12 sm6> 
      <!-- cards -->
              <v-card class="mb-2">
                <v-card-title class="blue lighten-1 pb-0 pt-1" >
                    <div>
                    Inv                      
                    </div>
                </v-card-title>                  
                <v-card-text class="pt-0 pb-0">                                      
                 <svg viewBox="-1 -1 2 2" id="PieChart" style="transform: rotate(-90deg)">
                   <g v-for="(pat,index) in dataPathsArr" :key="index">
                    <path  
                      :d="pat.path"
                      :fill="colorsArr[index]"
                      >
                     </path> 
                     <text  fill="black">
                       XXX
                      </text>
                    </g>
                  </svg>  
                </v-card-text>
              </v-card>
          </v-flex>
        </v-layout>
      </v-container>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      colorsArr: ["#a0cfff", "#FFC107", "#69c56c", "#d6d6d6"],
      chartSize: "25vw",
      TotalBar: {
        X: 10,
        Y: 10,
        Width: 30,
        Height: 50
      },
      slices: [
        { percent: 0.1 },
        { percent: 0.7 },
        { percent: 0.1 },
        { percent: 0.1 }
      ],
      dataPathsArr: []
    };
  },
  created() {
    let cumulativePercent = 0;
    var vueObj = this;
    vueObj.slices.forEach(slice => {
      // destructuring assignment sets the two variables at once
      const [startX, startY] = vueObj.getCoordinatesForPercent(
        cumulativePercent
      );

      // each slice starts where the last slice ended, so keep a cumulative percent
      cumulativePercent += slice.percent;

      const [endX, endY] = vueObj.getCoordinatesForPercent(cumulativePercent);

      // if the slice is more than 50%, take the large arc (the long way around)
      const largeArcFlag = slice.percent > 0.5 ? 1 : 0;

      // create an array and join it just for code readability
      const pathData = [
        `M ${startX} ${startY}`, // Move
        `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
        `L 0 0` // Line
      ].join(" ");
      // create a <path> and append it to the <svg> element
      // const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      // pathEl.setAttribute('d', pathData);
      // pathEl.setAttribute('fill', slice.color);
      // svgEl.appendChild(pathEl);
      vueObj.dataPathsArr.push({ path: pathData });
    });
  },
  methods: {
    getCoordinatesForPercent(percent) {
      const x = Math.cos(2 * Math.PI * percent);
      const y = Math.sin(2 * Math.PI * percent);
      return [x, y];
    }
  },
  computed: {
    IndivByStat() {
      console.log(this.$store.getters.getGraphInvitati);
      return this.$store.getters.getGraphInvitati;
    },
    famByStat() {
      return this.$store.getters.getGraphFams;
    }
  }
};
</script>
<style>
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
</style>
