<template>
    <v-card class="py-8 px-12">
        <v-form novalidate @submit.prevent>
            <h2 class="text-h3 pb-8">Dane pracownika</h2>
            <v-text-field
                v-model="firstNameAndLastName"
                v-bind="firstNameAndLastNameAttrs"
                :error-messages="errors.firstNameAndLastName"
                label="Imię i nazwisko"
            />

            <v-text-field
                v-model="phone"
                v-bind="phoneAttrs"
                :error-messages="errors.phone"
                label="Numer telefonu"
            />

            <v-text-field
                v-model="email"
                v-bind="emailAttrs"
                :error-messages="errors.email"
                label="E-mail"
            />

            <v-select
                v-model="jobTitle"
                v-bind="jobTitleAttrs"
                :error-messages="errors.jobTitle"
                :items="jobTitles"
                label="Stanowisko"
            />

            <v-card color="blue-grey-darken-4" outlined class="mt-4 px-4 py-2">
                <v-card-title>Adres zamieszkania</v-card-title>
                <v-row>
                    <v-col cols="6">
                        <v-text-field
                            v-model="residentialAddressCountry"
                            v-bind="residentialAddressCountryAttrs"
                            :error-messages="errors['residentialAddress.country']"
                            label="Kraj"
                        />
                    </v-col>

                    <v-col cols="6">
                        <v-text-field
                            v-model="residentialAddressPostalCode"
                            v-bind="residentialAddressPostalCodeAttrs"
                            :error-messages="errors['residentialAddress.postalCode']"
                            label="Kod pocztowy"
                        />
                    </v-col>

                    <v-col cols="6">
                        <v-text-field
                            v-model="residentialAddressCity"
                            v-bind="residentialAddressCityAttrs"
                            :error-messages="errors['residentialAddress.city']"
                            label="Miasto"
                        />
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                            v-model="residentialAddressHouseNumber"
                            v-bind="residentialAddressHouseNumberAttrs"
                            :error-messages="errors['residentialAddress.houseNumber']"
                            label="Nr domu"
                        />
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                            v-model="residentialAddressApartmentNumber"
                            v-bind="residentialAddressApartmentNumberAttrs"
                            :error-messages="errors['residentialAddress.apartmentNumber']"
                            label="Nr lokalu"
                        />
                    </v-col>
                </v-row>
            </v-card>
            <v-checkbox
                v-model="hasMailingAddress"
                class="mt-4"
                v-bind="hasMailingAddressAttrs"
                label="Inny adres do korespondencji?"
                :error="undefined"
                hide-details
            />
            <template v-if="hasMailingAddress">
                <v-card outlined color="blue-grey-darken-4" class="px-4 py-2">
                    <v-card-title>Adres do korespondencji</v-card-title>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field
                                v-model="mailingAddressCountry"
                                v-bind="mailingAddressCountryAttrs"
                                :error-messages="errors['mailingAddress.country']"
                                label="Kraj"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                v-model="mailingAddressPostalCode"
                                v-bind="mailingAddressPostalCodeAttrs"
                                :error-messages="errors['mailingAddress.postalCode']"
                                label="Kod pocztowy"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                v-model="mailingAddressCity"
                                v-bind="mailingAddressCityAttrs"
                                :error-messages="errors['mailingAddress.city']"
                                label="Miasto"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                v-model="mailingAddressHouseNumber"
                                v-bind="mailingAddressHouseNumberAttrs"
                                :error-messages="errors['mailingAddress.houseNumber']"
                                label="Nr domu"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                v-model="mailingAddressApartmentNumber"
                                v-bind="mailingAddressApartmentNumberAttrs"
                                :error-messages="errors['mailingAddress.apartmentNumber']"
                                label="Nr lokalu"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-card>
            </template>

            <v-divider class="mt-4"></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn v-if="hasCloseButton" variant="plain" @mousedown="emit('close')">
                    Zamknij
                </v-btn>

                <v-btn color="primary" variant="tonal" type="submit" @mousedown="submit">
                    Zapisz
                </v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { boolean, object, string } from 'yup'
import { toTypedSchema } from '@vee-validate/yup'
import { JobTitle, type EmployeeData } from '@/types/employee'
import { isEmployeeData } from '@/types/guards/employee'

defineProps<{
    hasCloseButton?: boolean
}>()

const emit = defineEmits<{
    close: []
    submit: [employee: EmployeeData]
}>()

const jobTitles: JobTitle[] = Object.values(JobTitle)

const addressSchema = {
    country: string().required('Kraj jest wymagany'),
    postalCode: string().required('Kod pocztowy jest wymagany'),
    city: string().required('Miasto jest wymagane'),
    houseNumber: string().required('Numer domu jest wymagany'),
    apartmentNumber: string(),
}

const { handleSubmit, errors, defineField } = useForm({
    validationSchema: toTypedSchema(
        object({
            firstNameAndLastName: string().required('Imię i nazwisko jest wymagane'),
            email: string().required('E-mail jest wymagany').email('E-mail musi być poprawny'),
            phone: string(),
            jobTitle: string()
                .required('Stanowisko jest wymagane')
                .oneOf(jobTitles, 'Niepoprawna nazwa stanowiska'),
            residentialAddress: object(addressSchema).required('Adres zamieszkania jest wymagany'),
            hasMailingAddress: boolean(),
            mailingAddress: object(addressSchema).when('hasMailingAddress', {
                is: true,
                then: schema => schema.required(),
                otherwise: schema => schema.strip(),
            }),
        }),
    ),
})

const [firstNameAndLastName, firstNameAndLastNameAttrs] = defineField('firstNameAndLastName')
const [email, emailAttrs] = defineField('email')
const [phone, phoneAttrs] = defineField('phone')
const [jobTitle, jobTitleAttrs] = defineField('jobTitle')

// Residential address
const [residentialAddressCountry, residentialAddressCountryAttrs] = defineField(
    'residentialAddress.country',
)
const [residentialAddressPostalCode, residentialAddressPostalCodeAttrs] = defineField(
    'residentialAddress.postalCode',
)
const [residentialAddressCity, residentialAddressCityAttrs] = defineField('residentialAddress.city')
const [residentialAddressHouseNumber, residentialAddressHouseNumberAttrs] = defineField(
    'residentialAddress.houseNumber',
)
const [residentialAddressApartmentNumber, residentialAddressApartmentNumberAttrs] = defineField(
    'residentialAddress.apartmentNumber',
)

// Mailing address
const [hasMailingAddress, hasMailingAddressAttrs] = defineField('hasMailingAddress')
const [mailingAddressCountry, mailingAddressCountryAttrs] = defineField('mailingAddress.country')
const [mailingAddressPostalCode, mailingAddressPostalCodeAttrs] = defineField(
    'mailingAddress.postalCode',
)
const [mailingAddressCity, mailingAddressCityAttrs] = defineField('mailingAddress.city')
const [mailingAddressHouseNumber, mailingAddressHouseNumberAttrs] = defineField(
    'mailingAddress.houseNumber',
)
const [mailingAddressApartmentNumber, mailingAddressApartmentNumberAttrs] = defineField(
    'mailingAddress.apartmentNumber',
)

const submit = handleSubmit(values => {
    // Strip `hasMailingAddress` from output
    const { hasMailingAddress: _, ...payload } = values

    if (!isEmployeeData(payload)) {
        // dev‑only: log and throw so you immediately see the problem, if it ever occures
        console.error('[Form Submit] payload is not a valid EmployeeData:', payload)
        throw new Error('Form payload type mismatch - expected EmployeeData')
    }

    emit('submit', payload)
})
</script>
