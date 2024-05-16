<template>
	<v-list>
		<div v-for="item in items" class="d-contents" :key="item.name">
			<v-list-item v-if="!!item.name">
				<v-list-item-subtitle style="font-size: .75rem;">
						{{ item.name }}
				</v-list-item-subtitle>
			</v-list-item>

			<list-group-expand
				v-for="currentRoute in item.items"
				:key="currentRoute.title"
				:item="currentRoute"
			/>
		</div>
  </v-list>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ListGroupExpand from './ListGroupExpand.vue';
import { IListGroup } from './types';

@Component({
  name: 'ListGroupFactory',
  components: {
    ListGroupExpand,
  },
})
export default class ListGroupFactory extends Vue {
	@Prop({ type: Array, default: () => [] }) items!: Array<IListGroup>
}
</script>

<style lang="scss" scoped>

</style>
