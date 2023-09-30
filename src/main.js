import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/bootstrap-icons/bootstrap-icons.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import '@quasar/extras/line-awesome/line-awesome.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(Quasar, {
  plugins: {} // import Quasar plugins and add here
})

app.use(createPinia())
app.use(router)

app.mount('#app')
