// Utilities
import { JobTitle, type Employee, type EmployeeData } from '@/types/employee'
import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'
import { toast } from 'vue3-toastify'

export const useEmployeeListStore = defineStore('employeeList', {
    state: (): { employeeList: Employee[] } => ({
        employeeList: [
            {
                id: nanoid(),
                firstNameAndLastName: 'John Doe',
                email: 'john.doe@gmail.com',
                jobTitle: JobTitle.FRONT_END,
                phone: '123-456-7890',
                residentialAddress: {
                    city: 'New York',
                    country: 'United States',
                    postalCode: '10001',
                    houseNumber: '27',
                    apartmentNumber: '9',
                },
                mailingAddress: {
                    city: 'New York',
                    country: 'United States',
                    postalCode: '10001',
                    houseNumber: '27',
                    apartmentNumber: '9',
                },
            },
            {
                id: nanoid(),
                firstNameAndLastName: 'Alice Smith',
                email: 'alice.smith@example.com',
                jobTitle: JobTitle.BACK_END,
                phone: '234-567-8901',
                residentialAddress: {
                    city: 'Toronto',
                    country: 'Canada',
                    postalCode: 'M5V 2T6',
                    houseNumber: '123',
                },
                mailingAddress: {
                    city: 'Toronto',
                    country: 'Canada',
                    postalCode: 'M5V 2T6',
                    houseNumber: '123',
                },
            },
            {
                id: nanoid(),
                firstNameAndLastName: 'Michael Brown',
                email: 'michael.brown@example.co.uk',
                jobTitle: JobTitle.BACK_END,
                residentialAddress: {
                    city: 'London',
                    country: 'United Kingdom',
                    postalCode: 'SW1A 2AA',
                    houseNumber: '10',
                    apartmentNumber: '5B',
                },
            },
            {
                id: nanoid(),
                firstNameAndLastName: 'Emma Davis',
                email: 'emma.davis@company.com',
                jobTitle: JobTitle.PM,
                phone: '345-678-9012',
                residentialAddress: {
                    city: 'Sydney',
                    country: 'Australia',
                    postalCode: '2000',
                    houseNumber: '50',
                    apartmentNumber: '12',
                },
                mailingAddress: {
                    city: 'Melbourne',
                    country: 'Australia',
                    postalCode: '3000',
                    houseNumber: '75',
                },
            },
            {
                id: nanoid(),
                firstNameAndLastName: 'Carlos Garcia',
                email: 'carlos.garcia@business.es',
                jobTitle: JobTitle.TESTER,
                residentialAddress: {
                    city: 'Madrid',
                    country: 'Spain',
                    postalCode: '28013',
                    houseNumber: '22',
                },
                mailingAddress: {
                    city: 'Barcelona',
                    country: 'Spain',
                    postalCode: '08001',
                    houseNumber: '33',
                    apartmentNumber: '2',
                },
            },
            {
                id: nanoid(),
                firstNameAndLastName: 'Priya Patel',
                email: 'priya.patel@design.in',
                jobTitle: JobTitle.DESIGNER,
                residentialAddress: {
                    city: 'Mumbai',
                    country: 'India',
                    postalCode: '400001',
                    houseNumber: '5',
                    apartmentNumber: '101',
                },
            },
            {
                id: nanoid(),
                firstNameAndLastName: 'Lars Andersen',
                email: 'lars.andersen@qa.dk',
                jobTitle: JobTitle.FRONT_END,
                phone: '456-789-0123',
                residentialAddress: {
                    city: 'Copenhagen',
                    country: 'Denmark',
                    postalCode: '1050',
                    houseNumber: '7',
                },
            },
            {
                id: nanoid(),
                firstNameAndLastName: 'Fatima Al-Hashimi',
                email: 'fatima.alhashimi@data.ae',
                jobTitle: JobTitle.TESTER,
                phone: '567-890-1234',
                residentialAddress: {
                    city: 'Dubai',
                    country: 'United Arab Emirates',
                    postalCode: '00000',
                    houseNumber: '1',
                    apartmentNumber: '202',
                },
                mailingAddress: {
                    city: 'Abu Dhabi',
                    country: 'United Arab Emirates',
                    postalCode: '99999',
                    houseNumber: '2',
                    apartmentNumber: '303',
                },
            },
        ],
    }),
    actions: {
        removeEmployee(
            id: string,
            options: {
                /** Defaults to: `true`*/
                notify?: boolean
            } = { notify: true },
        ) {
            const { notify = true } = options

            this.employeeList = this.employeeList.filter(employee => employee.id !== id)
            if (notify) toast.success('Usunięto pracownika')
        },
        /**
         * Add a new employee (generates an `id` for you).
         */
        addEmployee(
            data: EmployeeData,
            options: {
                /** Defaults to: `true`*/
                notify?: boolean
            } = { notify: true },
        ) {
            const { notify = true } = options

            this.employeeList.push({ id: nanoid(), ...data })
            if (notify) toast.success('Dodano nowego pracownika')
        },
    },
})
