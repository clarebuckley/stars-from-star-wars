<template>
    <h2>Character review for [name goes here]</h2>

    <v-container fluid class="fluid">
        <v-row justify="center" class="row">

            <v-form ref="reviewForm" @submit.prevent="submitReview">
                <v-text-field 
                    v-model="userName" 
                    :rules="[v => !!v || 'Name is required']"
                    label="Your name" outlined required>
                </v-text-field>
                <v-date-input 
                    v-model="dateWatched" 
                    :rules="[v => new Date(v) < new Date() || 'Watched date can not be a date in the future']" 
                    label="Date watched"
                    outlined
                    required>
                </v-date-input>
                <v-rating 
                    v-model="rating" 
                    length="10">
                </v-rating>
                <v-text-field 
                    v-model="description" 
                    label="Description" 
                    persistent-placeholder
                    outlined>
                </v-text-field>
                <v-select 
                    v-model="films" 
                    :items="allFilms" 
                    :rules="[v => v.length > 0 || 'Please select at least one film']"
                    hint="Select all films that this review relates to"
                    label="Select" 
                    multiple 
                    persistent-hint 
                    required>
                </v-select>

                <v-btn color="primary" type="submit">
                    Submit review
                </v-btn>
            </v-form>
        </v-row>
    </v-container>
    <router-link :to="{ name: 'Character List' }">Back to character list</router-link>
</template>


<script lang="ts" setup>
  import { computed, ref } from "vue";
  import type { Review } from "../types/Review";

  const userName = ref("");
  const dateWatched = ref(new Date());
  const description = ref("");
  const rating = ref("");
  const films = ref<string[]>([]);
  const allFilms = ref(["film1", "film2"]);
  const reviewForm = ref(null);

  const review = computed<Review>(() => ({
    userName: userName.value,
    dateWatched: dateWatched.value,
    description: description.value,
    rating: rating.value,
    films: films.value
  }));

  async function submitReview(){
    const { valid } = await reviewForm.value.validate()
    if(valid){
        console.log(review.value)
    } 
  }
</script>
