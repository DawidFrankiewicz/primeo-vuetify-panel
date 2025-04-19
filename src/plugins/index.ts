/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '../stores'
import router from '../router'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import '@styles/vue3-toastify-override.scss'

// Types
import type { App } from 'vue'

// Settings
const toastifyOptions: ToastContainerOptions = {
    autoClose: 3000,
    position: 'bottom-left',
    theme: 'dark',
}

export function registerPlugins(app: App) {
    app.use(vuetify).use(router).use(pinia).use(Vue3Toastify, toastifyOptions)
}
