<template>
  <v-container fluid>
    <v-container grid-list-xl>
      <v-layout align-center justify-space-around row wrap>
       
         <v-flex style="text-align:center" xs12 sm6>
          <!-- cards -->
          <v-card class="mb-2">
            <v-card-title class="blue lighten-1 mb-2 pb-0 pt-1 white--text">
              <div>Status invitati</div>
            </v-card-title>
            <v-card-text class="pt-0 pb-0">
              <v-layout style="flex-wrap:wrap">
                <v-flex v-for="(fam,index) in IndivByStat" :key="index">
                  {{fam.lbl}}
                  <!-- ddd -->
                  <v-progress-circular
                    :rotate="270"
                    :size="100"
                    :width="15"
                    :value="fam.proc"
                    :color="colorsArr[index]"
                  >
                    {{ fam.val }}
                    <!-- {{ fam.proc.toFixed(0) }} -->
                  </v-progress-circular>
                </v-flex>
              </v-layout>
            </v-card-text>            
          </v-card>
        </v-flex>

         <v-flex style="text-align:center" xs12 sm8>
          <!-- cards -->
          <v-card class="mb-2">
            <v-card-title class="blue lighten-1 mb-2 pb-0 pt-1 white--text">
              <div>Status familii</div>
            </v-card-title>
            <v-card-text class="pt-0 pb-0">
              <v-layout style="flex-wrap:wrap">
               <v-flex>
                <GChart
                  type="PieChart" 
                  :data="famsPie"
                  :options="chartOptions"
                  style="width: 50vw; height: 300px;"
                />
               </v-flex>
              </v-layout>
            </v-card-text>            
          </v-card>
        </v-flex>

 <v-flex style="text-align:center" xs12 sm8>
          <!-- cards -->
          <v-card class="mb-2">
            <v-card-title class="blue lighten-1 mb-2 pb-0 pt-1 white--text">
              <div>Status invitati</div>
            </v-card-title>
            <v-card-text class="pt-0 pb-0">
              <v-layout style="flex-wrap:wrap">
               <v-flex>
                <GChart
                  type="PieChart" 
                  :data="invitatiPie"
                  :options="chartOptions"
                  style="width: 50vw; height: 300px;"
                />
               </v-flex>
              </v-layout>
            </v-card-text>            
          </v-card>
        </v-flex>

      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import { GChart } from 'vue-google-charts'

export default {
   components: {
    GChart
  },
  data() {
    return {
      colorsArr: ["#a0cfff", "#FFC107", "#69c56c", "#989898"],
      chartSize: "40vw",
      value: 80,
      TotalBar: {
        X: 10,
        Y: 10,
        Width: 30,
        Height: 80
      },
      dataPathsArr: [],
      chartData: [        
         ['Familii', 'Numar'],
          ['De invitat',1],
          ['In asteptare',1],
          ['Confirmat',3],
          ['Nu vine',1]
      ],
      chartOptions: {
        chart: {
          title: 'Company Performance',
        },
        chartArea:{left:20,top:40,width:'100%',height:'75%'},
        height:300,        
        // width:500,
        pieHole: 0.4,
        slices: [{color: '#a0cfff'}, {color: '#FFC107'}, {color: '#69c56c'}, {color: '#d6d6d6'}],
        legend: {position:'top',maxLines:2,alignment:"center"},
        tooltip:{trigger:"selection"},
        pieSliceText:"value",
        pieSliceTextStyle:{color: "black"}
          
      }
    }
  },
  // created() {

  // },
  methods: {
    // getCoordinatesForPercent(percent) {
    //   const x = Math.cos(2 * Math.PI * percent);
    //   const y = Math.sin(2 * Math.PI * percent);
    //   return [x, y];
    // }
  },
  computed: {
    IndivByStat() {
      console.log(this.$store.getters.getGraphInvitati);
      return this.$store.getters.getGraphInvitati;
    },
    famByStat() {
      return this.$store.getters.getGraphFams;
    },
    famsPie(){
      return this.$store.getters.getPieFams;
    },
    invitatiPie(){
      return this.$store.getters.getPieInvitati;
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
/* text {
  font-size: 2vw;
} */
</style>
