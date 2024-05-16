<template>
	<v-list-group
		v-if="item.items?.length"
		:value="getValue"
		:key="item.title"
    :prepend-icon="item.action"
    no-action
  >
    <template v-slot:activator>
      <v-list-item-content v-if="!getMiniVariant">
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item-content>
    </template>

    <v-list-item
      v-for="child in item.items"
      :key="child.title"
			:input-value="isActiveGroup(child.route)"
			@click="handleRedirectRoute(child.route)"
    >
      <v-list-item-content>
        <v-list-item-title>{{ child.title }}</v-list-item-title>
			</v-list-item-content>
		</v-list-item>
  </v-list-group>

		<v-list-item v-else :input-value="isActive" @click="handleRedirectRoute(item.route)">
			<v-list-item-icon :class="{ 'ml-0' : getMiniVariant}">
				<v-icon>{{ item.action }}</v-icon>
			</v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
			</v-list-item-content>
		</v-list-item>
</template>

<script lang="ts">
import { ConfigurationState } from '@/modules/configuration/store/types';
import { RootState } from '@/store/types';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { IListItem } from './types';

@Component({
  name: 'ListGroupExpand',
})
export default class ListGroupExpand extends Vue {
	@Prop({ type: Object, required: true }) item!: IListItem;

	@State((state: RootState) => state.Configuration)
	configuration!: ConfigurationState

	get getValue() {
	  if (!this.item.items) return false;

	  return !!this.item.items.find((currentItem) => currentItem.route === this.$route.name);
	}

	get isActiveGroup() {
	  return (route?: string): boolean => {
	    if (!route) return false;

	 	 	return this.$route.name === route;
	  };
	}

	get isActive(): boolean {
	  if (!this.item.route) return false;

	  return this.item.route === this.$route.name;
	}

	get getMiniVariant() {
	  return this.configuration.navigationDrawer.miniVariant;
	}

	handleRedirectRoute(route?: string): void {
	  if (!route) return;

	  if (this.$route.name !== route) {
	    this.$router.push({ name: route });
	  }
	}
}
</script>

<style lang="scss" scoped></style>
