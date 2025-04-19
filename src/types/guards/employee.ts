import { JobTitle, type Address, type Employee, type EmployeeData } from '@/types/employee'

function isJobTitle(value: any): value is JobTitle {
    return typeof value === 'string' && Object.values(JobTitle).includes(value as JobTitle)
}

function isAddress(object: any): object is Address {
    return (
        object !== null &&
        typeof object === 'object' &&
        object.country &&
        typeof object.country === 'string' &&
        typeof object.postalCode === 'string' &&
        typeof object.city === 'string' &&
        typeof object.houseNumber === 'string' &&
        // apartmentNumber is optional
        (object.apartmentNumber === undefined || typeof object.apartmentNumber === 'string')
    )
}

export function isEmployeeData(object: any): object is EmployeeData {
    if (object === null || typeof object !== 'object') return false

    // required string fields
    const hasStrings =
        typeof object.firstNameAndLastName === 'string' &&
        typeof object.email === 'string' &&
        (object.phone === undefined || typeof object.phone === 'string') &&
        isJobTitle(object.jobTitle)

    if (!hasStrings) return false

    // residentialAddress must be present and valid
    if (!isAddress(object.residentialAddress)) return false

    // mailingAddress is optional, but if present must be valid
    if (object.mailingAddress !== undefined && !isAddress(object.mailingAddress)) {
        return false
    }

    return true
}

export function isEmployee(object: any): object is Employee {
    if (!isEmployeeData(object)) return false
    return typeof (object as Employee).id === 'string'
}
