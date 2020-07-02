<template>
  <v-card style="overflow-y: auto;max-height: 88vh">
    <v-card-text>
      <h1 class="pb-5">{{artist}}</h1>
      <div :key="i" v-for="(album,i) in albums">
        <!--Вот тут конечно пригодился бы vuex, но vuex ради геттеров использовать это такое, пока удалять не буду, может пригодится-->
        <router-link  :to="{ path: '/album', query: { name: album.name }}"  tag="div">
          <v-col @click="setData(album)" class="py-1 elevation-2">
            <v-row justify="center">
              <v-img :src="album.image" height="100px"
                     max-width="100px"></v-img>
              <v-col align-self="center" class="py-1 elevation-2">
                <p class="text--primary">{{album.name}}</p>
                <p class="text--primary">Всего прослушиваний{{album.playcount}}</p>
              </v-col>
            </v-row>
          </v-col>
        </router-link>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

interface RecordCounter {
  name: string;
  image: string;
  playcount: number;
  listeners?: number;
}

@Component({
  name: 'TopArtists',
  components: {
    TopAlbumsOfArtist: () => import('../TopAlbumsOfArtist/TopAlbumsOfArtist.vue')
  }
})

export default class TopArtistAlbums extends Vue {
  @Prop({ default: 'NULL' }) readonly artist!: string
  @Prop({ default: {} }) readonly albums!: RecordCounter

  setData(album: object){
    Vue.prototype.$albumInfo = {
      artist: this.artist,
      album: album.name,
      image: album.image
    }
  }
}
</script>
