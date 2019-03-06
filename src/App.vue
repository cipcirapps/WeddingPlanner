<template>
  <v-app fluid>
    <!-- left menu -->
    <v-navigation-drawer 
      v-model="drawer"
      fixed  
      temporary
      >
      <v-list dense>
        <v-list-tile to="/" >
          <v-list-tile-content>
            Dashboard
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile 
          v-for="item in menuItems" 
          :key="item.title"
          :to="item.link">
          <v-list-tile-action>
            <v-icon left>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{item.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="signOut" v-if="userIsAuthenticated">
          <v-list-tile-action>
            <v-icon left>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content  >
            <v-list-tile-title>Sign out</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>        
      </v-list>      
    </v-navigation-drawer>
  <!-- top toolbar -->
    <v-toolbar dark class="primary" fluid >
      <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-sm-and-up">

      </v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor:pointer">Dashboard</router-link>
         
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn 
          flat v-for="item in menuItems" 
          :key="item.title"
           :to="item.link">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
        <v-btn v-if="userIsAuthenticated" color="light-green lighten-3" small flat fab dark @click="signOut">
              <v-icon >exit_to_app</v-icon>
          </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <!-- main section -->
    <!-- <div v-for="fam in fams" :key="fam.FamID">
      <div v-for="mem in fam.Membri" :key="mem.id">
        {{mem.Prenume}}
        </div>
    </div> -->
    
    <v-content fluid >
      <router-view v-if="loaded"></router-view>
      <v-container v-else fill-width align-center>
        <v-progress-linear  :indeterminate="true"></v-progress-linear>
      </v-container>
    </v-content>    

  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
    };
  },
  name: "App",
  methods:{
    signOut(){
       this.$store.dispatch('signUserOut')
    }
  },
  computed: {
    statuses: function() {
      return this.$store.getters.getStatusList;
    },
    fams() {
      return this.$store.getters.getFamilii;
    },
    loaded() {
      return this.$store.getters.loaded;
    },
    menuItems(){
      let menuItems=[{
         icon: "contacts", title: "Confirmati", link: "/confirmed"},
         {icon: "people", title: "Login", link: "/login" 
      }]
      if(this.userIsAuthenticated){
        if(this.userIsAuthenticated.hasAdmin){
        menuItems=[
          // { icon: "done", title: "Nesositi", link: "/conf_notArr" },
          { icon: "contacts", title: "Confirmati", link: "/confirmed" },
          { icon: "people", title: "Toate Fams", link: "/view_all" },
          { icon: "view_module", title: "Asezare", link: "/layout" },
          // { icon: "supervisor_account", title: "Test Cip", link: "/cip" },
          // { icon: "person", title: "Test Ramo", link: "/ramo" }
          ]
        }
        //editors
        else{
          menuItems=[
          // { icon: "done", title: "Nesositi", link: "/conf_notArr" },
          { icon: "contacts", title: "Confirmati", link: "/confirmed" }
          ]

        }
      }
      return menuItems
    },
    userIsAuthenticated(){      
      return this.$store.getters.user
    }
  }
};
</script>
<style>
/* .v-content__wrap{
  display:none !important
} */
</style>
