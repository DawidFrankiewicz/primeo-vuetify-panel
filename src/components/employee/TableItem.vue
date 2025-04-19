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
            <EmployeeTableItemActions :employee />
        </td>
    </tr>
</template>

<script lang="ts" setup>
import type { Employee } from '@/types/employee'

defineProps<{ employee: Employee }>()
</script>
