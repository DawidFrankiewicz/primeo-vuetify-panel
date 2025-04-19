<template>
    {{ address.country }}
    <br />
    {{ address.postalCode }}, {{ address.city }}
    <br />
    {{ address.houseNumber }}{{ address.apartmentNumber ? ' / ' + address.apartmentNumber : null }}
</template>
<script lang="ts" setup>
import type { Address } from '@/types/employee'

defineProps<{ address: Address }>()
</script>
