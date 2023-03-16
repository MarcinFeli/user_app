<template>
	<div class="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-6 text-gray-200">
		<SearchItem v-for="user in users" :key="user.id" :user="user" />
	</div>
	<div v-if="!users.length" class="text-center text-3xl font-semibold mt-52">
		Nie odnaleziono użytkownika o takim imieniu 🤔
	</div>
</template>

<script setup>
import SearchItem from './SearchItem.vue'

const { users } = defineProps({
	users: {
		required: true,
		type: Array,
	},
})
</script>

<style lang="scss" scoped></style>
