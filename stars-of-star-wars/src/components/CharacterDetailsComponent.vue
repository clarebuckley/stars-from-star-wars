<template>
    <v-card v-if="!selectedCharacter" class="pa-2">
        <h1>No character selected</h1>
    </v-card>
    <v-card v-else class="pa-2">
        <h1>{{ selectedCharacter.name }}</h1>
        <p>Birth year: {{ selectedCharacter.birth_year }}</p>
        <p>Eye colour: {{ selectedCharacter.eye_color }}</p>
        <p>Gender: {{ selectedCharacter.gender }}</p>
        <p>Hair colour: {{ selectedCharacter.hair_color }}</p>
        <p>Mass: {{ selectedCharacter.mass }}kg</p>
        <p>Height: {{ selectedCharacter.height }}cm</p>

        <v-expansion-panels v-model="expanded">
            <v-expansion-panel :title="'Loading...'" v-if="dataLoading">
            </v-expansion-panel>
            <v-expansion-panel title="Films" v-if="selectedCharacter.films.length > 0" @click="getFilmData()">
                <v-expansion-panel-text v-for="film in selectedCharacterFilms" :key="film.episode_id">
                    <h2>{{ film.title }} (Episode {{ film.episode_id }})</h2>
                    <p>Release date: {{ film.release_date }}</p>
                    <p>Directed by {{ film.director }}, produced by {{ film.producer }}</p>
                </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel title="Homeworld" v-if="selectedCharacter.homeworld.length > 0"
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


        <p>Data last updated on: {{ selectedCharacter.edited }}</p>
    </v-card>
</template>



<script setup lang="ts">
import { getFilmDetailsByCharacter } from '../services/films/FilmDetails.api';
import { getPlanetDetails } from '../services/planets/PlanetDetails.api.ts';
import { ref, watch } from 'vue';

const dataLoading = ref(false);
const expanded = ref(null);

const props = defineProps({
    selectedCharacter: Object
})

const selectedCharacterFilms = ref([]);
const selectedCharacterHomeworld = ref([])

async function getFilmData() {
    dataLoading.value = true;
    const [error, filmResponse] = await getFilmDetailsByCharacter(props.selectedCharacter);
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
    const [error, planetResponse] = await getPlanetDetails(props.selectedCharacter.homeworld);
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

watch(() => props.selectedCharacter, (first, second) => {
    resetData();
});


</script>