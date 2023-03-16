import HomeView from '../view/HomeView.vue'
import UserView from '../view/UserView.vue'
import SearchUser from '../view/SearchUser.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		name: 'HomeView',
		component: HomeView,
	},
	{
		path: '/user/:id?',
		name: 'UserView',
		component: UserView,
	},
	{
		path: '/search-user/:name?',
		name: 'SearchUser',
		component: SearchUser,
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})
export default router
