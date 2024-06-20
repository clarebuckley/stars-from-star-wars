<template>
    {{name}}
    <router-link :to="{ name: 'Character List' }">Back to character list</router-link>
</template>

<script setup>
  const props = defineProps({
    name: String
  })
</script>