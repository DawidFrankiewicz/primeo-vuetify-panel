<template>
    <div v-if="employeeList.length <= 0" class="pa-4 d-flex align-center justify-center">
        <v-icon start icon="mdi-information-outline" />
        Brak pracowników do wyświetlenia
    </div>
    <v-table v-else>
        <thead>
            <tr>
                <th class="text-left">Imię i nazwisko</th>
                <th class="text-left">Email</th>
                <th class="text-left">Telefon</th>
                <th class="text-left">Stanowisko</th>
                <th class="text-left">Adres zamieszkania</th>
                <th class="text-left">Adres do korespondencji</th>
                <th class="text-left"></th>
            </tr>
        </thead>
        <tbody>
            <EmployeeTableItem
                v-for="employee in employeeList"
                :key="employee.email"
                :employee="employee"
            />
        </tbody>
    </v-table>
</template>

<script lang="ts" setup>
import type { Employee } from '@/types/employee'

defineProps<{ employeeList: Employee[] }>()
</script>
