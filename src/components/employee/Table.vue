<template>
    <div v-if="employeeList.length <= 0" class="pa-4 d-flex align-center justify-center">
        <v-icon start icon="mdi-information-outline" />
        Brak pracowników do wyświetlenia
    </div>
    <v-data-table v-else :headers :items="employeeList" :items-per-page="-1">
        <template v-slot:[`item.jobTitle`]="{ item }">
            <v-chip :color="getJobTitleColor(item.jobTitle)">{{ item.jobTitle }}</v-chip>
        </template>
        <template v-slot:[`item.residentialAddress`]="{ item }">
            <EmployeeDisplayAddressText :address="item.residentialAddress" />
        </template>
        <template v-slot:[`item.mailingAddress`]="{ item }">
            <EmployeeDisplayAddressText v-if="item.mailingAddress" :address="item.mailingAddress" />
        </template>
        <template v-slot:[`item.actions`]="{ item }">
            <EmployeeTableItemActions :employee="item" />
        </template>
        <template #bottom></template>
    </v-data-table>
</template>

<script lang="ts" setup>
import { type Employee, JobTitle } from '@/types/employee'
import type { DataTableHeader } from 'vuetify'

defineProps<{ employeeList: Employee[] }>()

const headers: DataTableHeader<Employee>[] = [
    { title: 'Imię i nazwisko', key: 'firstNameAndLastName', width: '200px' },
    { title: 'Email', key: 'email', width: '200px' },
    { title: 'Telefon', key: 'phone', sortable: false, width: '160px' },
    { title: 'Stanowisko', key: 'jobTitle', width: '100px' },
    { title: 'Adres zamieszkania', key: 'residentialAddress', sortable: false, width: '200px' },
    { title: 'Adres do korespondencji', key: 'mailingAddress', sortable: false, width: '200px' },
    { key: 'actions', sortable: false, width: '116px', maxWidth: '116px', minWidth: '116px' },
]

const getJobTitleColor = (title: JobTitle) => {
    switch (title) {
        case JobTitle.FRONT_END:
            return 'primary'
        case JobTitle.BACK_END:
            return 'secondary'
        case JobTitle.DESIGNER:
            return 'warning'
        case JobTitle.TESTER:
            return 'error'
        case JobTitle.PM:
            return 'success'
        default:
            return undefined
    }
}
</script>
