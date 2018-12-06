<template>
  <v-container fluid>
    <v-container grid-list-xl>
      <v-layout align-center justify-space-around row wrap>
        <v-flex style="text-align:center" xs12 sm6>
          <!-- cards -->
          <v-card class="mb-2">
            <v-card-title class="blue lighten-1 pb-0 pt-1">
              <!-- <div>Status familii</div> -->
            </v-card-title>
            <v-card-text class="pt-0 pb-0">
              <v-layout style="flex-wrap:wrap">
                <v-flex v-for="(fam,index) in famByStat" :key="index">
                  <!-- {{fam.lbl}} -->
                  ddd
                  <v-progress-circular
                    :rotate="360"
                    :size="100"
                    :width="15"
                    :value="fam.proc"
                    :color="colorsArr[index]"
                  >
                    <!-- {{ fam.val }} -->
                    {{ fam.proc.toFixed(0) }}
                  </v-progress-circular>
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
export default {
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
      dataPathsArr: []
    };
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
text {
  font-size: 2vw;
}
</style>
