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
      </v-list>      
    </v-navigation-drawer>
  <!-- top toolbar -->
    <v-toolbar dark class="primary"  fluid>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-md-and-up">

      </v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor:pointer">Dashboard</router-link>
        </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn 
          flat v-for="item in menuItems" 
          :key="item.title"
           :to="item.link">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <!-- main section -->
    
    <v-content fluid>
      <router-view></router-view>
    </v-content>    
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,

      menuItems: [
        { icon: "done", title: "Confirmati",link:"/confirmed" },
        { icon: "people", title: "Toti invitatii",link:"/view_all" },
        { icon: "view_module", title: "Asezare",link:"/layout" },
        // { icon: "person_add", title: "Adauga",link:"/add_new" },

        { icon: "supervisor_account", title: "Test Cip",link:"/cip" },
        { icon: "person", title: "Test Ramo",link:"/ramo" },
      ]
    };
  },
  name: "App"
};
</script>
