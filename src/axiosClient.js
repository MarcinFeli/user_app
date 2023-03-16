import axios from 'axios'

const axiosClient = axios.create({
	baseUrl: 'https://gorest.co.in/public/v2/users?',
})

export default axiosClient
