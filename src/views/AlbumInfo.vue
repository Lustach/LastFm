<template>
  <div>
    <AlbumPage/>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
	name: 'Main',
	components: {
		AlbumPage:()=>import('../components/AlbumPage/AlbumPage.vue')
	}
}
</script>
