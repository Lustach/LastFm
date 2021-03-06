import axios from 'axios'

const BASE_URL = 'https://ws.audioscrobbler.com/2.0/'
const token = process.env.VUE_APP_KEY

const API = {
  lastfm: {
    chart: {
      getTopArtists: (page?: number, limit?: number) => axios.get(`${BASE_URL}?method=chart.gettopartists&api_key=${token}&format=json`,
        { params: { page: page, limit: limit } }),
      getTopTracks: (page?: number, limit?: number) =>
        axios.get(`${BASE_URL}?method=chart.gettoptracks&api_key=${token}&format=json`),
    },
    artist: {
      getTopAlbums: (artist: string) => axios.get(`${BASE_URL}?method=artist.gettopalbums&api_key=${token}&format=json`,
        { params: { artist: artist } }),
      getTopTracks: (artist: string) => axios.get(`${BASE_URL}?method=artist.gettoptracks&api_key=${token}&format=json`),

    },
    album: {
      getInfo: (artist: string, album: string) => axios.get(`${BASE_URL}?method=album.getinfo&api_key=${token}&format=json`,
        { params: { artist: artist, album: album } }),
    }
  },
}

export default {
  install(Vue: any) {
    console.log(process.env.VUE_APP_KEY)
    Object.defineProperty(Vue.prototype, '$lastfm', { value: API.lastfm })
  }
}
