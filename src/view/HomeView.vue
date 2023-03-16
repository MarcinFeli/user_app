<template>
	<div class="bg-gray-700 h-full">
		<h1 class="text-5xl text-center p-6 tracking-wider font-semibold uppercase text-gray-200">Nasi użytkownicy</h1>
		<div v-if="users.data" class="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-6 text-white">
			<div v-for="(user, index) in users.data" :key="user.id" class="border-2 relative rounded-lg bg-zinc-700">
				<div>
					<img
						v-if="users.images[index]"
						class="mx-auto mt-3 mb-3 rounded-2xl h-14 w-16"
						:src="users.images[index].download_url"
						alt="User photo" />

					<div class="ml-2 py-1">
						<p><span class="font-bold">Imię:</span> {{ user.name }}</p>
						<p><span class="font-bold">E-mail:</span> {{ user.email }}</p>
					</div>
					<router-link
						:to="{ name: 'UserView', params: { id: user.id } }"
						class="border-1 flex items-center absolute top-0 right-0 text-sm rounded-md p-2 hover:text-sky-600 text-sky-500 mx-auto">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="mr-1 w-6 h-7">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						Szczegóły
					</router-link>
				</div>
			</div>
		</div>
		<div v-else class="bg-yellow-400">Loading....</div>
		<vue-awesome-paginate
			:total-items="100"
			:items-per-page="10"
			:max-pages-shown="5"
			v-model="currentPage"
			:on-click="onClickHandler" />
	</div>
	<!-- <div v-else class="bg-yellow-300">Ładowanie...</div> -->
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import axios from 'axios'

const onClickHandler = (page: number) => {
	axios.get(`https://gorest.co.in/public/v2/users?page=${page}&per_page=12`).then(respons => {
		users.data = respons.data
	})
}

const currentPage = ref(1)
const users = reactive({
	data: [],
	images: [],
})

onMounted(() => {
	axios.get(`https://gorest.co.in/public/v2/users?page=1&per_page=12`).then(response => {
		users.data = response.data
		axios.get(`https://picsum.photos/v2/list`).then(res => {
			users.images = res.data
		})
	})
})
</script>

<style>
.pagination-container {
	display: flex;
	width: 100%;
	padding: 10px 0px;
	justify-content: center;
	column-gap: 10px;
}
.paginate-buttons {
	height: 40px;
	width: 40px;
	border-radius: 20px;
	cursor: pointer;
	background-color: rgb(242, 242, 242);
	border: 1px solid rgb(217, 217, 217);
	color: black;
}
.paginate-buttons:hover {
	background-color: #d8d8d8;
}
.active-page {
	background-color: #3498db;
	border: 1px solid #3498db;
	color: white;
}
.active-page:hover {
	background-color: #2988c8;
}
</style>
