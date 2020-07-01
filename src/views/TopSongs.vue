<template>
  <div>
    <top-songs/>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
	name: 'Main',
	components: {
		TopSongs:()=>import('../components/TopSongs/TopSongs.vue')
	}
}
</script>
