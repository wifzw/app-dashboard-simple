<template>
	<v-app-bar
		app
		prominent
		class="elevation-0 px-0"
		color="appBarBg"
		height="60px"
		style="border-bottom: 1px solid var(--v-borderColor-base) !important;"
	>
		<app-bar-action />
	</v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppBarAction from './AppBarAction.vue';

@Component({
  name: 'AppBar',
  components: {
    AppBarAction,
  },
})
export default class AppBar extends Vue {}
</script>

<style lang="scss" scoped>

</style>
