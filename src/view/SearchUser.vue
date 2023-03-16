<template>
	<div>
		<input
			v-model="keyword"
			@change="searchUser"
			type="text"
			placeholder="Szukaj..."
			class="mt-10  p-2 border-2 border-gray-500 w-1/2 mx-auto flex" />

		<Searches v-if="keyword" :users="users" />
		<div v-else class="text-center mt-20 text-4xl font-medium font-serif" >
			<p>↑</p>
			<p>Wprowadź nazwę uzytkownika</p>
			<p>👤</p>
		</div>
	</div>
</template>

<script setup>
import { computed } from '@vue/reactivity'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Searches from '../components/Searches.vue'
import store from '../store'

const route = useRoute()
const keyword = ref('')
const users = computed(() => store.state.searchedUsers)

function searchUser() {
	if (keyword.value) {
		store.dispatch('searchUsers', keyword.value)
	} else {
		store.commit('setSearchedUsers', [])
	}
}
watch(keyword, newValue => {
	searchUser(newValue)
})
onMounted(() => {
	keyword.value = route.params.name
	if (keyword.value) {
		searchUsers()
	} else {
	}
})
</script>
