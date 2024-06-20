<template>
    <h2>Character review for [name goes here]</h2>

    <v-container fluid class="fluid">
        <v-row justify="center" class="row">

            <v-form ref="reviewForm" @submit.prevent="submitReview">
                <v-text-field 
                    v-model="userName" 
                    label="Your name" outlined required>
                </v-text-field>
                <v-text-field 
                    v-model="dateWatched" 
                    label="Date watched" 
                    outlined 
                    required>
                </v-text-field>
                <v-rating 
                    v-model="rating" 
                    length="10">
                </v-rating>
                <v-text-field 
                    v-model="description" 
                    label="Description" 
                    outlined 
                    required>
                </v-text-field>
                <v-select 
                    v-model="films" 
                    :items="allFilms" 
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
  const dateWatched = ref("");
  const description = ref("");
  const rating = ref("");
  const films = ref([]);
  const allFilms = ref(["film1", "film2"]);

  const review = computed<Review>(() => ({
    userName: userName.value,
    dateWatched: dateWatched.value,
    description: description.value,
    rating: rating.value,
    films: films.value
  }));

  function submitReview(){
    //validate
    //make API request
    console.log(review.value)
  }
</script>
