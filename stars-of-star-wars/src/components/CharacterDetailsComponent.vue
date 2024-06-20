<template>
    <v-card v-if="!likedCharactersStore.getSelectedCharacter" class="pa-2">
        <h1>No character selected</h1>
    </v-card>
    <v-card v-else class="pa-2">
        <h1>{{ likedCharactersStore.getSelectedCharacter.name }}</h1>
        <p>Birth year: {{ likedCharactersStore.getSelectedCharacter.birth_year }}</p>
        <p>Eye colour: {{ likedCharactersStore.getSelectedCharacter.eye_color }}</p>
        <p>Gender: {{ likedCharactersStore.getSelectedCharacter.gender }}</p>
        <p>Hair colour: {{ likedCharactersStore.getSelectedCharacter.hair_color }}</p>
        <p>Mass: {{ likedCharactersStore.getSelectedCharacter.mass }}kg</p>
        <p>Height: {{ likedCharactersStore.getSelectedCharacter.height }}cm</p>

        <v-expansion-panels v-model="expanded">
            <v-expansion-panel :title="'Loading...'" v-if="dataLoading">
            </v-expansion-panel>
            <v-expansion-panel title="Films" v-if="likedCharactersStore.getSelectedCharacter.films.length > 0" @click="getFilmData()">
                <v-expansion-panel-text v-for="film in selectedCharacterFilms" :key="film.episode_id">
                    <h2>{{ film.title }} (Episode {{ film.episode_id }})</h2>
                    <p>Release date: {{ film.release_date }}</p>
                    <p>Directed by {{ film.director }}, produced by {{ film.producer }}</p>
                </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel title="Homeworld" v-if="likedCharactersStore.getSelectedCharacter.homeworld.length > 0"
                @click="getHomeworldData()">
                <v-expansion-panel-text>
                    <h2>The planet {{ selectedCharacterHomeworld.name }}</h2>
                    <p>Climate: {{ selectedCharacterHomeworld.climate }}</p>
                    <p>Terrain: {{ selectedCharacterHomeworld.terrain }}</p>
                    <p>Surface water: {{ selectedCharacterHomeworld.surface_water }}%</p>
                    <p>Home to {{ selectedCharacterHomeworld.population }} inhabitants.</p>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>

        <router-link :to="{path: '/review/' + likedCharactersStore.getSelectedCharacter.name }">Review character</router-link>
        <p>Data last updated on: {{ likedCharactersStore.getSelectedCharacter.edited }}</p>
    </v-card>
</template>



<script setup>
import { getFilmDetailsByCharacter } from '../services/films/FilmDetails.api';
import { getPlanetDetails } from '../services/planets/PlanetDetails.api.ts';
import { ref, watch } from 'vue';
import { useLikedCharactersStore } from '@/stores/likedCharacters'

const dataLoading = ref(false);
const expanded = ref(null);
const errored = ref(false);

const selectedCharacterFilms = ref([]);
const selectedCharacterHomeworld = ref([])
const likedCharactersStore = useLikedCharactersStore();

async function getFilmData() {
    dataLoading.value = true;
    const [error, filmResponse] = await getFilmDetailsByCharacter(likedCharactersStore.getSelectedCharacter);
    selectedCharacterFilms.value = filmResponse;
    if (error) {
        handleError(error);
    }
    else {
        dataLoading.value = false;
    }
}

async function getHomeworldData() {
    dataLoading.value = true;
    const [error, planetResponse] = await getPlanetDetails(likedCharactersStore.getSelectedCharacter.homeworld);
    selectedCharacterHomeworld.value = planetResponse;
    if (error) {
        handleError(error);
    }
    else {
        dataLoading.value = false;
    }
}

function resetData() {
    selectedCharacterFilms.value = [];
    selectedCharacterHomeworld.value = [];
    expanded.value = null;
}

watch(() => likedCharactersStore.getSelectedCharacter, (first, second) => {
    resetData();
});

function handleError(error) {
    console.error(error)
    errored.value = true;
    errorMessage.value = error.message;
    pageLoading.value = false;
}



</script>