<template>
	<section v-if="user.data && user.description" class="pt-4">
		<div class="w-full lg:w-4/12 px-4 mx-auto">
			<div class="relative flex flex-col min-w-0 break-words bg-gray-200 w-full mb shadow-xl rounded-lg">
				<div class="flex flex-wrap px-6 justify-center">
					<div class="w-full px-4 flex justify-center">
						<div v-if="user" class="relative">
							<img
								v-if="user.images[1] && user.data.gender === 'male'"
								alt="user photo"
								:src="user.images[1].download_url"
								class="mt-10" />
							<img v-else alt="user photo" src="https://random.imagecdn.app/500/250" class="mt-10" />
						</div>
					</div>
				</div>
				<div class="text-center mt-5">
					<h3 class="text-2xl font-semibold leading-normal text-blueGray-700 mb-2">{{ user.data.name }}</h3>
					<p class="font-semibold">
						Płeć : <span v-if="user.data.gender === 'male'"> Mężczyzna </span> <span v-else>Kobieta</span>
					</p>
					<a href="mailto: weqwqwe@gmail.com" class="text-sm transition-colors hover:text-blue-400 font-semibold">
						Kontakt : {{ user.data.email }}
					</a>
				</div>
				<div class="pt-5 border-gray-200">
					<div class="flex justify-center">
						<div class="w-full px-4">
							<label for="description" class="mb-3 text-lg font-semibold block">Opis użytkownika:</label>
							<p class="mb-4" id="tag">{{ user.description.body }}</p>
							<textarea
								id="editcontent2"
								name="description"
								v-model="user.description.body"
								class="hidden rounded-lg p-2 border-black w-full h-56 mb-4 text-blueGray-700" />
						</div>
					</div>
				</div>
				<div class="flex justify-around mb-4">
					<button
						class="px-2 transition-colors py-1 bg-blue-400 font-semibold rounded-lg shadow-md hover:bg-blue-500"
						@click="editOrSave()">
						{{ user.buttonText }}
					</button>
					<button
						id="cancel"
						class="hidden px-2 transition-colors py-1 bg-blue-400 font-semibold rounded-lg shadow-md hover:bg-blue-500"
						@click="cancel">
						Anuluj
					</button>
				</div>
			</div>
		</div>
	</section>
	<section v-else>
		<div class="text-center">
			<div role="status">
				<svg
					aria-hidden="true"
					class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
					viewBox="0 0 100 101"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
						fill="currentColor" />
					<path
						d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
						fill="currentFill" />
				</svg>
			</div>
			<span>Loading...</span>
		</div>
	</section>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
const route = useRoute()
const user = reactive({
	data: [],
	images: [],
	description: '',
	buttonText: 'Edytuj',
	originalContent: '',
})
onMounted(() => {
	const id = route.params.id
	axios.get(`https://gorest.co.in/public/v2/users/${id}`).then(async response => {
		user.data = response.data

		await axios.get(`https://picsum.photos/v2/list`).then(res => {
			user.images = res.data
		})
	})
	axios.get(`https://gorest.co.in/public/v2/posts`).then(r => {
		user.description = r.data[0]
	})
})
function editOrSave() {
	const btn = user.buttonText
	if (btn === 'Edytuj') {
		user.originalContent = user.description.body
		user.buttonText = 'Zapisz'
		document.getElementById('tag').style.display = 'none'
		document.getElementById('editcontent2').style.display = 'block'
		document.getElementById('cancel').style.display = 'block'
	} else {
		document.getElementById('tag').textContent = user.description.body
		document.getElementById('editcontent2').style.display = 'none'
		document.getElementById('tag').style.display = 'block'
		document.getElementById('cancel').style.display = 'none'
		user.buttonText = 'Edytuj'
	}
}
function cancel() {
	user.description.body = user.originalContent
	document.getElementById('editcontent2').style.display = 'none'
	document.getElementById('tag').style.display = 'block'
	document.getElementById('cancel').style.display = 'none'
	user.buttonText = 'Edytuj'
}
</script>
