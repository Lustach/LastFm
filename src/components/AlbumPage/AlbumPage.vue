<template>
  <v-container>
    <v-card style="overflow-y: auto;max-height: 90vh">
      <v-img :src="albumInfo.image" height="600" width="600" max-height="600"></v-img>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

interface RecordCounter {
  name: string;
  image: string;
  playcount: number;
  listeners?: number;
}

@Component({
  name: 'AlbumPage',
})

export default class AlbumPage extends Vue {
  loaded = false
  albumInfo: any
  $albumProp = {}
  $lastfm: any

  created() {
    this.albumInfo = Vue.prototype.$albumInfo
    this.loadPage(Vue.prototype.$albumInfo)
  }

  async loadPage(albumProp: object) {
    console.log(albumProp, 'albumPage')
    const result = await this.$lastfm.album.getInfo(albumProp.artist, albumProp.album)
    this.loaded = true
    console.log(result)
    // this.albumInfo = result.data.artists.artist.map((e: RecordCounter) => {
    //   const data: RecordCounter = {
    //     name: e.name,
    //     image: e.image[0]['#text'],
    //     playcount: e.playcount,
    //     listeners: e.listeners,
    //   }
    //   return data
    // })
  }
}
</script>
