<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="8">
        <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="20"
          :sort-desc="true"
          class="elevation-1"
          height="88vh"
          hide-default-footer
          no-data-text="Нет данных"
          sort-by="playcount"
          v-if="loaded"
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
          class="mx-auto"
          type="table"
          v-if="!loaded"
        ></v-skeleton-loader>
      </v-col>
      <v-col cols="4">
        <TopAlbumsOfArtist :albums="artistTopAlbums" :artist="artistName" v-if="showTopArtistAlbums&& loaded"/>
        <v-skeleton-loader
          class="mx-auto"
          type="card"
          v-if="!loaded"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import router from '@/router'

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
  },
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
  loaded = false
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
  dataTable!: HTMLElement
  $lastfm: any

  mounted() {
    this.loadPage()
    if (this.$route.query.artistName) {
      this.openArtistAlbums(this.$route.query.artistName)
    }
    router.beforeResolve((to, from, next) => {
      if (to.query.artistName) {
        next()
        this.openArtistAlbums(this.$route.query.artistName)
      } else {
        next()
      }
    })
  }

  async loadPage() {
    const result = await this.$lastfm.chart.getTopArtists()
    this.loaded = true
    this.items.push(...result.data.artists.artist.map((e: RecordCounter) => {
        const data: RecordCounter = {
          name: e.name,
          image: e.image[0]['#text'],
          playcount: e.playcount,
          listeners: e.listeners,
        }
        return data
      })
    )
  }

  // @Watch('$route')
  async openArtistAlbums(item = String(this.$route.query.artistName)) {
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
