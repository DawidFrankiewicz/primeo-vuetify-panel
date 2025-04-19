<template>
    <tr>
        <td class="py-2">{{ employee.firstNameAndLastName }}</td>
        <td class="py-2">{{ employee.email }}</td>
        <td class="py-2">{{ employee.phone }}</td>
        <td class="py-2">{{ employee.jobTitle }}</td>
        <td class="py-2">
            <EmployeeDisplayAddressText :address="employee.residentialAddress" />
        </td>
        <td class="py-2">
            <EmployeeDisplayAddressText
                v-if="employee.mailingAddress"
                :address="employee.mailingAddress"
            />
        </td>

        <td>
            <div class="d-flex ga-4">
                <v-btn :icon="'mdi-human-edit'" base-color="primary"></v-btn>
                <v-btn :icon="'mdi-delete'" base-color="red-darken-2"></v-btn>
            </div>
        </td>
    </tr>
</template>

<script lang="ts" setup>
import type { Employee } from '@/types/employee'

defineProps<{ employee: Employee }>()
</script>
