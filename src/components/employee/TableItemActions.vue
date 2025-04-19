<template>
    <div class="d-flex ga-4">
        <v-btn :icon="'mdi-human-edit'" base-color="primary"></v-btn>
        <v-dialog v-model="isRemoveDialogActive" max-width="370">
            <template #activator="{ props: activatorAttrs }">
                <v-btn
                    v-bind="activatorAttrs"
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

const isRemoveDialogActive = ref(false)
</script>
