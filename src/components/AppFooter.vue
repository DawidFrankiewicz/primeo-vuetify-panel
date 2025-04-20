<template>
    <v-footer class="justify-space-between" app height="60">
        <a
            v-for="item in items"
            :key="item.title"
            class="d-inline-block mx-2 social-link"
            :href="item.href"
            rel="noopener noreferrer"
            target="_blank"
            :title="item.title"
        >
            <v-icon :icon="item.icon" :size="item.icon === '$vuetify' ? 24 : 16" />
        </a>
        <div class="d-flex justify-center ga-4">
            <v-btn variant="tonal" @mousedown="store.massAdd(10)">Dodaj 10 (Debug)</v-btn>
        </div>

        <div class="text-caption text-disabled">
            &copy; 2025
            <span class="d-none d-sm-inline-block">Dawid Frankiewicz</span>
        </div>
    </v-footer>
</template>

<script setup lang="ts">
import { useEmployeeListStore } from '@/stores/employeeList'

const store = useEmployeeListStore()

const items = [
    {
        title: 'GitHub',
        icon: `mdi-github`,
        href: 'https://github.com/DawidFrankiewicz',
    },
]
</script>

<style scoped lang="sass">
.social-link :deep(.v-icon)
  color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
  text-decoration: none
  transition: .2s ease-in-out

  &:hover
    color: rgba(25, 118, 210, 1)
</style>
