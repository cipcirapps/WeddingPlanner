<template>
  <v-container grid-list-xl>
    <v-layout align-center justify-space-around row wrap>
      <v-flex style="text-align:center" xs12 sm6>
        <!-- cards -->
        <v-card class="mb-2">
          <v-card-title class="blue lighten-1 pb-0 pt-1 white--text">
            <div>Status familii</div>
          </v-card-title>
          <v-card-text class="pt-0 pb-0">
            <svg :width="chartSize" :height="chartSize" id="SVGtag">
              <!-- <rect class="BarTot" :x="TotalBar.X+'%'" :y="TotalBar.Y+'%'" :width="TotalBar.Width+'%'" :height="TotalBar.Height+'%'"
              rx="20" ry="20" />-->
              <g v-for="(bar,index) in famByStat" :key="index">
                <rect
                  class="BarPart"
                  :x="TotalBar.X+'%'"
                  :y="(100-bar.proc-bar.offset)*TotalBar.Height/100+TotalBar.Y+'%'"
                  :height="bar.proc*TotalBar.Height/100+'%'"
                  :width="TotalBar.Width+'%'"
                  :style="'fill:'+colorsArr[index]"
                  rx="10"
                  ry="10"
                ></rect>
                <text
                  :x="TotalBar.X+TotalBar.Width*1.1+'%'"
                  :y="(100-bar.proc-bar.offset)*TotalBar.Height/100+TotalBar.Y+(bar.proc*TotalBar.Height/100)*0.6+'%'"
                  fill="black"
                >{{bar.lbl}}</text>
                <text
                  :x="TotalBar.X+TotalBar.Width*0.4+'%'"
                  :y="(100-bar.proc-bar.offset)*TotalBar.Height/100+TotalBar.Y+(bar.proc*TotalBar.Height/100)*0.6+'%'"
                  fill="black"
                >{{bar.val}}</text>
                <!-- {{(bar.proc).toFixed(0)}}% -->
              </g>
            </svg>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex style="text-align:center" xs12 sm6>
        <!-- cards -->
        <v-card class="mb-2">
          <v-card-title class="blue lighten-1 pb-0 pt-1 white--text">
            <div>Status invitati</div>
          </v-card-title>
          <v-card-text class="pt-0 pb-0">
            <svg :width="chartSize" :height="chartSize" id="SVGtag">
              <rect
                class="BarTot"
                :x="TotalBar.X+'%'"
                :y="TotalBar.Y+'%'"
                :width="TotalBar.Width+'%'"
                :height="TotalBar.Height+'%'"
              ></rect>
              <g v-for="(bar,index) in IndivByStat" :key="index">
                <rect
                  class="BarPart"
                  :x="TotalBar.X+'%'"
                  :y="(100-bar.proc-bar.offset)*TotalBar.Height/100+TotalBar.Y+'%'"
                  :height="bar.proc*TotalBar.Height/100+'%'"
                  :width="TotalBar.Width+'%'"
                  :style="'fill:'+colorsArr[index]"
                ></rect>
                <text
                  :x="TotalBar.X+TotalBar.Width*1.1+'%'"
                  :y="(100-bar.proc-bar.offset)*TotalBar.Height/100+TotalBar.Y+(bar.proc*TotalBar.Height/100)*0.6+'%'"
                  fill="black"
                >{{bar.lbl}}</text>
                <text
                  :x="TotalBar.X+TotalBar.Width*0.4+'%'"
                  :y="(100-bar.proc-bar.offset)*TotalBar.Height/100+TotalBar.Y+(bar.proc*TotalBar.Height/100)*0.6+'%'"
                  fill="black"
                >{{bar.val}}</text>
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
      colorsArr: ["#a0cfff", "#FFC107", "#69c56c", "#d6d6d6"],
      chartSize: "30vw",
      TotalBar: {
        X: 10,
        Y: 10,
        Width: 30,
        Height: 80
      },
      dataPathsArr: []
    };
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
