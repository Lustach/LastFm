<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <!-- todo при наведении на tr показывать данные справа-->
        <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="20"
          :sort-desc="true"
          class="elevation-1"
          hide-default-footer
          sort-by="playcount"
        >
          <template #item.image="{item}">
            <img :src="item.image" alt="">
          </template>
        </v-data-table>
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
  listeners: number;
}

@Component({
  name: 'TopSongs',
})
export default class HelloWorld extends Vue {
  items: Array<RecordCounter> = [{
    name: '',
    image: '',
    playcount: 0,
    listeners: 0,
  }]
  headers = [
    {
      text: 'Обложка альбома',
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

  ]
  $lastfm: any
  @Prop() private msg!: string

  created() {
    this.loadPage()
  }

  async loadPage() {
    const result = await this.$lastfm.chart.getTopTracks()
    /* todo придумать возможность фильтрации данных с любыми ключами */
    // this.items = result.data.artists.artist.map((e: RecordCounter, i: number) => {
    //     const hi = Object.keys(e).filter((el: any,i,array) => {
    //         console.log(el,'EL',i,'I',array,'array',e,'HERE')
    //         return Object.prototype.hasOwnProperty.call(this.items, el) ? e[el] : null
    //     })
    // })
      console.log(result,'result')
    this.items = result.data.tracks.track.map((e: RecordCounter, i: number) => {
      const data: RecordCounter = {
        name: e.artist.name,
        image: e.image[0]['#text'],
        playcount: e.playcount,
        listeners: e.listeners,
      }
      return data
    })
  }
}
</script>
