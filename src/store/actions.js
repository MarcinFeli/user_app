import axios from 'axios'

export function searchUsers({ commit }, keyword) {
	axios.get(`https://gorest.co.in/public/v2/users?name=${keyword}&page=1&per_page=80`).then(({ data }) => {
		commit('setSearchedUsers', data)
	})
}
