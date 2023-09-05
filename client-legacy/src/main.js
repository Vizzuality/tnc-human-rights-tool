import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './style.css';
import App from './App.vue';
import router from './router/router.js';

// prime vue imports
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Dropdown from 'primevue/dropdown';
import Tooltip from 'primevue/tooltip';

import 'primeflex/primeflex.css';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

// init pinia store
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)

// create Vue app, add libs, and mount
const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(PrimeVue);
app.mount('#app');
