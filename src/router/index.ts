import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/album/:name?',
    name: 'albumPage',
    component: () => import('../views/AlbumInfo.vue')
  },
  {
  //
    path: '/TopArtists/:artistName?',
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
