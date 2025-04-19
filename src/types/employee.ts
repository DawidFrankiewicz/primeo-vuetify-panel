export enum JobTitle {
    FRONT_END = 'front-end',
    BACK_END = 'back-end',
    PM = 'pm',
    DESIGNER = 'designer',
    TESTER = 'tester',
}

export interface Address {
    country: string
    postalCode: string
    city: string
    houseNumber: string
    apartmentNumber?: string
}

export interface Employee {
    firstNameAndLastName: string
    email: string
    phone?: string
    jobTitle: JobTitle
    residentialAddress: Address
    mailingAddress?: Address
}
