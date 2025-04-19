// Plugins
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Fonts from 'unplugin-fonts/vite'
import Layouts from 'vite-plugin-vue-layouts-next'
import Vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// Utilities
import { defineConfig, normalizePath } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        VueRouter({
            dts: 'src/typed-router.d.ts',
        }),
        Layouts(),
        AutoImport({
            imports: [
                'vue',
                VueRouterAutoImports,
                {
                    pinia: ['defineStore', 'storeToRefs'],
                },
            ],
            dts: 'src/auto-imports.d.ts',
            eslintrc: {
                enabled: true,
            },
            vueTemplate: true,
        }),
        Components({
            dts: 'src/components.d.ts',
            directoryAsNamespace: true,
        }),
        Vue({
            template: { transformAssetUrls },
        }),
        // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
        Vuetify({
            autoImport: true,
            styles: {
                configFile: 'src/styles/settings.scss',
            },
        }),
        Fonts({
            google: {
                families: [
                    {
                        name: 'Roboto',
                        styles: 'wght@100;300;400;500;700;900',
                    },
                ],
            },
        }),
        {
            // Fixes adding/removing page routes when using Docker
            name: 'restart-on-page-add-remove',
            configureServer(server) {
                const pagesDir = normalizePath(path.resolve(__dirname, 'src/pages'))
                server.watcher.add(pagesDir)

                const restartIf = (file: string) => {
                    if (file.startsWith(pagesDir)) {
                        console.log(`📄 pages changed - restarting Vite…`)
                        server.restart()
                    }
                }

                server.watcher.on('add', restartIf)
                server.watcher.on('unlink', restartIf)
            },
        },
    ],
    optimizeDeps: {
        exclude: [
            'vuetify',
            'vue-router',
            'unplugin-vue-router/runtime',
            'unplugin-vue-router/data-loaders',
            'unplugin-vue-router/data-loaders/basic',
        ],
    },
    define: { 'process.env': {} },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@types': fileURLToPath(new URL('./src/types', import.meta.url)),
        },
        extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
    },
    server: {
        host: '0.0.0.0',
        port: 3000,
        watch: {
            // use polling to detect changes in mounted volumes
            usePolling: true,
            interval: 100,
            ignored: ['**/node_modules/**', '**/.git/**'],
        },
        hmr: {
            host: 'localhost',
            port: 3000,
            protocol: 'ws',
        },
    },
    css: {
        preprocessorOptions: {
            sass: {
                api: 'modern-compiler',
            },
            scss: {
                api: 'modern-compiler',
            },
        },
    },
})
