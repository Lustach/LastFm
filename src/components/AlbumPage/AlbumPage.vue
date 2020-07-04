<template>
  <v-container>
    <v-card style="overflow-y: auto;max-height: 90vh;overflow-x: hidden">
      <v-layout>
        <div>
          <v-img :src="albumProp.image" height="500px" max-height="500px" width="500px"></v-img>
        </div>
        <div class="pl-5">
          <h1>{{albumProp.name}}</h1>
          <h4>Опубликовано: {{albumProp.wiki.published}}</h4>
          <h4>Прослушано: {{albumProp.playcount}} раз</h4>
          <h4>Единовременных слушателей: {{albumProp.listeners}} раз</h4>
          <div class="pa-5">
          <p>{{albumProp.wiki.content}}</p>
          </div>
          <div class="ml-5 mr-5" v-for="(track,i) in albumProp.tracks" :key="i">
            <h5>{{track.name}}</h5>{{Math.floor(track.duration/ 60) + ': ' + track.duration % 60}}
          </div>
        </div>
      </v-layout>
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
  tracks: object[];
  wiki: WikiObject;
}

interface WikiObject {
  content: string;
  published: string;
}

@Component({
  name: 'AlbumPage',
})

export default class AlbumPage extends Vue {
  loaded = false
  albumInfo: any
  albumProp = {
    wiki:{content:'',published:''}
  }
  $lastfm: any

  created() {
    this.albumInfo = Vue.prototype.$albumInfo
    console.log(Vue.prototype.$albumInfo,'Vue.prototype.$albumInfo')
    this.loadPage(Vue.prototype.$albumInfo)
  }

  async loadPage(albumProp: object) {
    albumProp=this.$route.query
    console.log(albumProp)
    const result = (await this.$lastfm.album.getInfo(albumProp.artist, albumProp.name)).data.album
    this.loaded = true
    this.albumProp = {
        name: result.name,
        image: result.image[3]['#text'],
        playcount: result.playcount,
        listeners: result.listeners,
        tracks: result.tracks.track,
        wiki: { content: result.wiki.content.slice(0,result.wiki.content.indexOf('<a')), published: result.wiki.published }
      }
  }
}
</script>
