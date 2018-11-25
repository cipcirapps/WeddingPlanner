<template> 
  <v-container fluid >      
      <v-container grid-list-xl>        
        <v-layout align-center justify-space-around row wrap>
            <v-flex style="text-align:center"> 
      <!-- cards -->
              <v-card class="mb-2">
                <v-card-title class="blue lighten-1 pb-0 pt-1" >
                    <div>
                    Ajunsi                      
                    </div>
                </v-card-title>                  
                <v-card-text class="pt-0 pb-0">                    
                  <svg :width="chartSize" :height="chartSize" id="SVGtag">
                    <g v-for="(bar,index) in barsH" :key="index">
                      <text :x="barX+((barWidth+5)*index)-1+'%'" y="10%" fill="red">{{bar.part}} din {{bar.tot}}</text>
                      <rect class="BarTot" :x="barX+((barWidth+5)*index)+'%'" :y="barY+'%'" :width="barWidth+'%'" height="80%" />
                      <rect class="BarPart" :x="barX+((barWidth+5)*index)+'%'" :y="barY+80*(1-bar.part/bar.tot)+'%'" :width="barWidth+'%'" :height="(80*bar.part/bar.tot)+'%'" />
                      <text :x="barX+((barWidth+5)*index)+barWidth/2.5+'%'" y="50%" fill="black">{{Math.round(bar.part/bar.tot*100)+'%'}}</text>
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
      chartSize:'50vw',
      barX:10,
      barY:15,
      barWidth:30,
      barsH:[
        {tot:15,part:10},
        {tot:20,part:12}
        ]
    };
  },
  methods:{
    setSosit(id){
      this.$store.dispatch('update_Sosit',id)
      
    }
  },
  computed: {
    fams() {
      return this.$store.getters.getFamilii
    }
    
  }
};
</script>
<style>
#SVGtag{
  margin:10px 0px;
  border: solid 1px black;  
}

.BarTot{
  fill: #ffc107 ;stroke-width:3;stroke:rgb(0,0,0)
}
.BarPart{
  fill:#a0cfff;fill-opacity:0.9;stroke-width:2;stroke:rgb(0,0,0)
}

</style>
