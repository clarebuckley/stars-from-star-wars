<template>
    <v-container>
      <v-row >
        <v-col cols="6">
          <ListComponent></ListComponent>
        </v-col>
        <v-col cols="6">
          <ListItemDetail></ListItemDetail>
        </v-col>
      </v-row>
    </v-container>
  </template>

  <script setup>
  import ListComponent from './ListComponent.vue';
  import ListItemDetail from './ListItemDetail.vue'
</script>