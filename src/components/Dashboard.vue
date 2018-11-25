<template> 
    <!-- Main content -->    
      <v-container grid-list-sm fluid>
        <!-- Familii -->
         <v-layout row wrap>
           <v-flex xs6>
              <v-card>
             <v-card-title><h3>Status familii</h3></v-card-title>
             <v-card-text>
               <v-chip v-for="(fam,key,index) in fams" :key="key" :color="colorsArr[index]">
                 {{key.replace("_"," ")}}: <b>{{fam}}</b>
               </v-chip> 
             </v-card-text> 
             <v-card-text>
                <!-- grafic -->    
              <div class="row GraphContainer">      
                <div class="col m12 s12">
                  <center>
                    <pie-chart :data="fams" :colors="colorsArr" :donut="true" legend="none"></pie-chart>
                  </center>
                </div>
              </div>    
             </v-card-text>
           </v-card> 
           </v-flex>
           <v-flex xs6>
           <v-card>
             <v-card-title><h3>Status invitati</h3></v-card-title>
             <v-card-text>
               <v-chip v-for="(fam,key,index) in invitati" :key="key" :color="colorsArr[index]">
                 {{key.replace("_"," ")}}: <b>{{fam}}</b>
               </v-chip> 
             </v-card-text> 
             <v-card-text>
                <!-- grafic -->    
              <div class="row GraphContainer">      
                <div class="col m12 s12">
                  <center>
                  <pie-chart :data="invitati" :colors="colorsArr" :donut="true" legend="none" ></pie-chart>
                </center>
                </div>
              </div>    
             </v-card-text>
           </v-card> 
           </v-flex>
         </v-layout>           
      </v-container>    
</template>

<script>


  export default {
    data(){
      return{         
         colorsArr:['#a0cfff', '#FFC107', '#69c56c','#d6d6d6']
          //  ["done",3]
          //  ]
      }
    },
    computed:{
      fams(){
        const data=this.$store.getters.getGroupStatus
        
        var chart={}
        for (let key in data) {          
          chart[key]=data[key].length
        }

        return chart
        // return this.$store.getters.getGraph_groupStatus
      },
      invitati(){
        const toti=this.$store.getters.getInvitati
        const nesositi=this.$store.getters.getIndivNesositi
        var chart={}
        chart["Veniti"]=toti.length-nesositi.length
        chart["Neveniti"]=nesositi.length

        return chart
      }
    }
  //   created() {
  //  
  // },
  }
</script>