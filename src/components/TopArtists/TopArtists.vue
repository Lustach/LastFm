<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="20"
          class="elevation-1"
          hide-default-footer
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
  name: 'InfiniteLoading',
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
      text: 'Обложка',
      sortable: false,
      width: '10%',
      value: 'image'
    },
    {
      text: 'Одновременных слушателей',
      sortable: false,
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
      sortable: false,
      width: '',
      value: 'playcount'
    },

  ]
  $lastfm: any;
  @Prop() private msg!: string

  created() {
    this.loadPage()
    setTimeout(() => {
      console.log(this.items, 'this.items')

    }, 1000)
  }

  async loadPage() {
    const result = await this.$lastfm.chart.getTopArtists()
    // todo придумать возможность фильтрации данных с любыми ключами
    // this.items = result.data.artists.artist.map((e: RecordCounter, i: number) => {
    //     const hi = Object.keys(e).filter((el: any,i,array) => {
    //         console.log(el,'EL',i,'I',array,'array',e,'HERE')
    //         return Object.prototype.hasOwnProperty.call(this.items, el) ? e[el] : null
    //     })
    // })
      console.log(result,'RESULT')
    this.items = result.data.artists.artist.map((e: RecordCounter, i: number) => {
      const data: RecordCounter = {
        name: e.name,
        image: e.image[0]['#text'],
        playcount: e.playcount,
        listeners: e.listeners,
      }
      return data
    })
    console.log(this.items, 'data')
  }
}
</script>
