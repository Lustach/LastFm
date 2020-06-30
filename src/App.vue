<template>
  <v-app>
    <v-app-bar
      app
      color="red accent-4"
      dark
    >
      <router-link to="/TopArtists" class="d-flex align-center">
        <v-img
          class="shrink mr-2"
          contain
          src="https://lh3.googleusercontent.com/9PeW7X2dERrVT2LeNV1ij-OsNhatfBSK-GmXTnslj69BM2TJoKlLcgDnqyY4fAzbqrM"
          transition="scale-transition"
          width="130"
        />
      </router-link>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue';

export default Vue.extend({
  name: 'App',

  data: () => ({
    //
  }),
});
</script>
