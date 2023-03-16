import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import routes from './routes'
import VueAwesomePaginate from 'vue-awesome-paginate'
import 'vue-awesome-paginate/dist/style.css'
import store from './store'
createApp(App).use(store).use(VueAwesomePaginate).use(routes).mount('#app')
