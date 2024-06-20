<template>
    <v-container class="review-container fluid" fluid >
    <h2>Character review for {{selectedCharacterStore.getSelectedCharacter.name}}</h2>
        <ErrorMessage v-if="errored" :errorMessage="errorMessage"></ErrorMessage>
        <v-row justify="center" class="row review-form-container">
            <v-form ref="reviewForm" @submit.prevent="submitReview">
                <v-text-field 
                    v-model="userName" 
                    id="user-name"
                    :rules="[v => !!v || 'Name is required']"
                    label="Your name" outlined required>
                </v-text-field>
                <v-date-input 
                    v-model="dateWatched" 
                    id="date-watched"
                    :rules="[v => new Date(v) < new Date() || 'Watched date can not be a date in the future']" 
                    label="Date watched"
                    outlined
                    required>
                </v-date-input>
                <v-rating 
                    v-model="rating" 
                    id="rating"
                    length="10">
                </v-rating>
                <v-textarea
                    v-model="description" 
                    id="description"
                    label="Description" 
                    persistent-placeholder
                    outlined>
                </v-textarea>
                <v-select 
                    v-model="films" 
                    id="films-dropdown"
                    :items="props.characterFilms" 
                    :rules="[v => v.length > 0 || 'Please select at least one film']"
                    hint="Select all films that this review relates to"
                    label="Select" 
                    multiple 
                    persistent-hint 
                    required>
                </v-select>

                <div class="navigation-container d-flex justify-space-between">
                  <router-link id="back-link" :to="{ name: 'Character List' }">< Back to character list</router-link>
                <v-btn color="primary" id="submit-review-btn" type="submit" :disabled="pageLoading">
                    Submit review
                </v-btn>
                </div>

            </v-form>
        </v-row>
    </v-container>

</template>


<script lang="ts" setup>
  import { computed, ref } from "vue";
  import type { Review } from "../types/Review";
  import { createReview } from '../services/reviews/Reviews.api';
  import ErrorMessage from "./ErrorMessage.vue";
  import { useSelectedCharactersStore } from "@/stores/selectedCharacter";

  const userName = ref("");
  const dateWatched = ref(new Date());
  const description = ref("");
  const rating = ref("");
  const films = ref<string[]>([]);
  const reviewForm = ref(null);
  const pageLoading = ref(false);
  const errored = ref(false);
  const errorMessage = ref("");
  const selectedCharacterStore = useSelectedCharactersStore();

  const props = defineProps({
    characterFilms: []
  })

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
        pageLoading.value = true;
        const [error] = await createReview(review.value);
        if (error) {
            handleError(error);
        }
    } 
  }

  function handleError(error: any){
    errored.value = true;
    errorMessage.value = error.message;
  }

</script>


<style scoped>
.navigation-container {
  padding-top: 20px;
}
.review-container{
    background-color: white;
    width: 700px;
    border-radius: 30px;
}

.review-form-container {
    padding: 20px;
}

@media only screen and (max-width: 700px) {
  /* For mobile phones: */
  .review-container {
    width: 100%;
    border-radius: 0;
  }
}
</style>