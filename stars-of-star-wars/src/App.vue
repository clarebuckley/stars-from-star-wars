<template>
  <v-app>
    <v-main>
      <PageHeader></PageHeader>
      <RouterView></RouterView>
    </v-main>
  </v-app>
</template>

<script setup>
  import PageHeader from "./components/PageHeader.vue"

</script>