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
      <router-link style="color:white;text-decoration: none;" to="/TopSongs" class="d-flex align-center">Топ треков</router-link>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  data: () => ({

  }),
});
</script>
