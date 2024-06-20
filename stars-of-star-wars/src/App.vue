<template>
  <v-app class="app-container">
    <v-main>
        <PageHeader></PageHeader>
        <RouterView></RouterView>
    </v-main>
  </v-app>
</template>

<script setup>
  import PageHeader from "./components/PageHeader.vue"
</script>

<style lang="scss">
@import "./styles/components/app.scss"
</style>