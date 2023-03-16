<template>
	<div class="border-2 p-3 relative rounded-lg bg-zinc-700">
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
</template>

<script setup>
const { user } = defineProps({
	user: {
		require: true,
		type: Object,
	},
})
</script>

