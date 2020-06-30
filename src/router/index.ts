import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
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
    component: () => import(/* webpackChunkName: "about" */ '../views/Main.vue')
  },
  // {
  //   path: '/TopSongs',
  //   name: 'TopSongs',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/TopSongs.vue')
  // },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
