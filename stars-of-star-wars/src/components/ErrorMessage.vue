<template>
  <v-alert
    color="error"
    title="Error"
    closable
  > 
    <p>{{ errorMessage }}</p>
    <p>Refresh the page and try again. If this error persists, please contact support.</p>
  </v-alert>
</template>

<script setup>
  const props = defineProps({
    errorMessage: String
  })
</script>