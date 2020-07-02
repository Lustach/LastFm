<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="8">
        <!-- todo при наведении на tr показывать данные справа-->
        <v-data-table
          height="90vh"
          v-if="loaded"
          :headers="headers"
          :items="items"
          :items-per-page="20"
          :sort-desc="true"
          class="elevation-1"
          hide-default-footer
          sort-by="playcount"
          no-data-text="Нет данных"
        >

          <template #item.image="{item}">
            <img :src="item.image" alt="">
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
              @click="openArtistAlbums(item.name)"
            >
              mdi-eye
            </v-icon>
          </template>
        </v-data-table>
        <v-skeleton-loader
          v-if="!loaded"
          class="mx-auto"
          type="table"
        ></v-skeleton-loader>
      </v-col>
      <v-col cols="4">
        <TopAlbumsOfArtist  :albums="artistTopAlbums" :artist="artistName" v-if="showTopArtistAlbums&& loaded"/>
        <v-skeleton-loader
          v-if="!loaded"
          class="mx-auto"
          type="card"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
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
export default class HelloWorld extends Vue {
  items: Array<RecordCounter> = []
  artistTopAlbums: Array<RecordCounter> = [{
    name: '',
    image: '',
    playcount: 0,
  }]
  // tsc говорит что объявление простых типов излишне, поэтому такой подход он осуждает
  // artistName: string = ''
  // а вот такой подход tsc одобряет artistName?: string = '', или подход на строчку ниже
  artistName = ''
  showTopArtistAlbums = false
  loaded=false
  headers = [
    {
      text: 'Обложка',
      sortable: false,
      width: '10%',
      value: 'image'
    },
    {
      text: 'Одновременных слушателей',
      sortable: true,
      width: '10%',
      value: 'listeners'
    },
    {
      text: 'Название',
      sortable: false,
      width: '',
      value: 'name'
    },
    {
      text: 'Всего прослушано',
      sortable: true,
      width: '',
      value: 'playcount'
    },
    {
      sortable: true,
      width: '',
      value: 'actions'
    },

  ]
  $lastfm: any

  created() {
    this.loadPage()
    if (this.$route.query.artistName) {
      this.openArtistAlbums(this.$route.query.artistName)
    }
  }

  async loadPage() {
    const result = await this.$lastfm.chart.getTopArtists()
    this.loaded=true
    /* todo придумать возможность фильтрации данных с любыми ключами */
    // this.items = result.data.artists.artist.map((e: RecordCounter, i: number) => {
    //     const hi = Object.keys(e).filter((el: any,i,array) => {
    //         console.log(el,'EL',i,'I',array,'array',e,'HERE')
    //         return Object.prototype.hasOwnProperty.call(this.items, el) ? e[el] : null
    //     })
    // })
    this.items = result.data.artists.artist.map((e: RecordCounter) => {
      const data: RecordCounter = {
        name: e.name,
        image: e.image[0]['#text'],
        playcount: e.playcount,
        listeners: e.listeners,
      }
      return data
    })
  }

  async openArtistAlbums(item: string) {
    /* todo */
    if (item === this.artistName) return
    if (item !== this.$route.query.artistName)
      this.$router.push({ path: '/TopArtists', query: { artistName: item } })
    this.showTopArtistAlbums = true
    this.artistName = item
    const result = await this.$lastfm.artist.getTopAlbums(item)
    this.artistTopAlbums = result.data.topalbums.album.map((e: RecordCounter) => {
      const data: RecordCounter = {
        image: e.image[3]['#text'],
        playcount: e.playcount,
        name: e.name
      }
      return data
    })
  }
}
</script>
