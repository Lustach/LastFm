<template>
  <div>
    <TopArtists msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
	name: 'Main',
	components: {
		TopArtists:()=>import('../components/TopArtists/TopArtists.vue')
	}
}
</script>
