<template>
    <v-card class="px-6 py-10">
        <div class="d-flex align-center justify-space-between flex-wrap gc-10 gr-6 mb-10">
            <h1 class="text-h4 text-center">Lista pracowników</h1>
            <v-dialog v-model="isAddEmployeeDialogActive" max-width="900">
                <template #activator="{ props: activatorAttrs }">
                    <v-btn
                        v-bind="activatorAttrs"
                        prepend-icon="mdi-plus"
                        color="primary mr-4"
                        min-width="116"
                        @mousedown="isAddEmployeeDialogActive = true"
                        @click.stop
                    >
                        Dodaj
                    </v-btn>
                </template>

                <template #default="{ isActive }">
                    <EmployeeForm
                        title="Dodaj pracownika"
                        has-close-button
                        @close="isActive.value = false"
                        @submit="
                            data => {
                                isActive.value = false
                                store.addEmployee(data)
                            }
                        "
                    />
                </template>
            </v-dialog>
        </div>
        <EmployeeTable :employee-list="store.employeeList" />
    </v-card>
</template>
<script lang="ts" setup>
import { useEmployeeListStore } from '@/stores/employeeList'

const store = useEmployeeListStore()

const isAddEmployeeDialogActive = ref(false)
</script>
