<template>
    <v-card class="px-6 py-10">
        <div class="d-flex align-center justify-space-between flex-wrap gc-10 gr-6 mb-10">
            <h1 class="text-h4 text-center">Lista pracowników</h1>
            <v-btn prepend-icon="mdi-plus" color="primary">Dodaj</v-btn>
        </div>
        <EmployeeTable :employee-list="store.employeeList" />
    </v-card>
</template>
<script lang="ts" setup>
import { useEmployeeListStore } from '@/stores/employeeList'

const store = useEmployeeListStore()
</script>
