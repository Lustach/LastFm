import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  // {
  //   path: '/album_page',
  //   name: 'AlbumPage',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AlbumPage.vue')
  // },
  // {
  //   path: '/topAlbumsOfArtist',
  //   name: 'TopAlbumsOfArtist',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/TopAlbumsOfArtist.vue')
  // },
  {
    path: '/TopArtists',
    name: 'TopArtists',
    component: () => import('../views/Main.vue')
  },
  {
    path: '/TopSongs',
    name: 'TopSongs',
    component: () => import(/* webpackChunkName: "about" */ '../views/TopSongs.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
