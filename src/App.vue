<template>
  <v-app id="inspire">
    <!-- meniu stanga -->
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile >
          <v-list-tile-action>            
            <!-- de cautat cum se pune -->
            <router-link to="/"><v-icon>home</v-icon></router-link>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile >
          <v-list-tile-action>
            <router-link to="/Ramo"><v-icon>contact_mail</v-icon></router-link>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Ramo</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <!-- Menu bar -->
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-toolbar>

    <!-- Main content -->
      <router-view/>

    <v-footer color="indigo" app>
      <span class="white--text">&copy; Ciresaru</span>
    </v-footer>
  </v-app>
</template>

<script>
import Cip from "./components/Cip"

  export default {
    name:'App',
    components: {Cip},
    data: () => ({
      drawer: null,
    })
  }
</script>