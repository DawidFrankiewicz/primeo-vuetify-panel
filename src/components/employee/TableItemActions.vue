<template>
    <div class="d-flex justify-end ga-4">
        <v-dialog v-model="isEditEmployeeDialogActive" max-width="900">
            <template #activator="{ props: activatorAttrs }">
                <v-btn
                    v-bind="activatorAttrs"
                    :icon="'mdi-human-edit'"
                    base-color="primary"
                    variant="tonal"
                    @mousedown="isEditEmployeeDialogActive = true"
                    @click.stop
                ></v-btn>
            </template>

            <template #default="{ isActive }">
                <EmployeeForm
                    title="Edytuj dane pracownika"
                    has-close-button
                    :initial-data="employee"
                    @close="isActive.value = false"
                    @submit="
                        data => {
                            isActive.value = false
                            store.editEmployee(employee.id, data)
                        }
                    "
                />
            </template>
        </v-dialog>
        <v-dialog v-model="isRemoveDialogActive" max-width="370">
            <template #activator="{ props: activatorAttrs }">
                <v-btn
                    v-bind="activatorAttrs"
                    variant="tonal"
                    @mousedown="isRemoveDialogActive = true"
                    @click.stop
                    :icon="'mdi-delete'"
                    base-color="red-darken-2"
                ></v-btn>
            </template>

            <template #default="{ isActive }">
                <v-card>
                    <v-card-text>Czy na pewno chcesz usunąć pracownika?</v-card-text>

                    <v-card-actions>
                        <v-btn size="42" min-width="60" @mousedown="isActive.value = false">
                            Nie
                        </v-btn>
                        <v-btn
                            variant="tonal"
                            size="42"
                            min-width="60"
                            @mousedown="
                                () => {
                                    isActive.value = false
                                    store.removeEmployee(employee.id)
                                }
                            "
                        >
                            Tak
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
    </div>
</template>

<script lang="ts" setup>
import { useEmployeeListStore } from '@/stores/employeeList'
import type { Employee } from '@/types/employee'

const store = useEmployeeListStore()

defineProps<{ employee: Employee }>()

const isRemoveDialogActive = ref<boolean>(false)
const isEditEmployeeDialogActive = ref<boolean>(false)
</script>
