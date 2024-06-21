<template>
    <v-card v-if="!selectedCharacterStore.getSelectedCharacter" class="pa-2">
        <h2>No character selected</h2>
    </v-card>
    <v-card v-else class="pa-2">
        <h2>{{ selectedCharacterStore.getSelectedCharacter.name }}</h2>
        <p>Birth year: {{ selectedCharacterStore.getSelectedCharacter.birth_year }}</p>
        <p>Eye colour: {{ selectedCharacterStore.getSelectedCharacter.eye_color }}</p>
        <p>Gender: {{ selectedCharacterStore.getSelectedCharacter.gender }}</p>
        <p>Hair colour: {{ selectedCharacterStore.getSelectedCharacter.hair_color }}</p>
        <p>Mass: {{ selectedCharacterStore.getSelectedCharacter.mass }}kg</p>
        <p>Height: {{ selectedCharacterStore.getSelectedCharacter.height }}cm</p>

        <v-expansion-panels class="panels" v-model="expanded">
            <v-expansion-panel v-if="dataLoading" title="Loading..."></v-expansion-panel>
            <v-expansion-panel title="Films" v-if="selectedCharacterStore.getSelectedCharacter.films.length > 0">
                <v-expansion-panel-text v-for="film in selectedCharacterStore.getSelectedCharacterFilms" :key="film.episode_id">
                    <h3>{{ film.title }} (Episode {{ film.episode_id }})</h3>
                    <p>Release date: {{ film.release_date }}</p>
                    <p>Directed by {{ film.director }}, produced by {{ film.producer }}</p>
                </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel title="Homeworld" v-if="selectedCharacterStore.getSelectedCharacter.homeworld.length > 0"
                @click="getHomeworldData()">
                <v-expansion-panel-text>
                    <h3>The planet {{ selectedCharacterHomeworld.name }}</h3>
                    <p>Climate: {{ selectedCharacterHomeworld.climate }}</p>
                    <p>Terrain: {{ selectedCharacterHomeworld.terrain }}</p>
                    <p>Surface water: {{ selectedCharacterHomeworld.surface_water }}%</p>
                    <p>Home to {{ selectedCharacterHomeworld.population }} inhabitants.</p>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>

        <div class="d-flex justify-center">
            <v-btn color="primary" @click="navigateToReviewView()" :disabled="pageLoading">
                    Review character
            </v-btn>
        </div>
        <p>Data last updated on: {{ selectedCharacterStore.getSelectedCharacter.edited }}</p>
    </v-card>
</template>

<script setup>
import { getPlanetDetails } from '../services/planets/PlanetDetails.api.ts';
import { ref, watch } from 'vue';
import { useSelectedCharactersStore } from '@/stores/selectedCharacter';
import router from '@/router';

const dataLoading = ref(false);
const expanded = ref(null);
const errored = ref(false);
const selectedCharacterHomeworld = ref([])
const selectedCharacterStore = useSelectedCharactersStore();

console.log(selectedCharacterStore.selectedCharacterFilms)
async function getHomeworldData() {
    dataLoading.value = true;
    const [error, planetResponse] = await getPlanetDetails(selectedCharacterStore.getSelectedCharacter.homeworld);
    if (error) {
        handleError(error);
    }
    else {
        selectedCharacterHomeworld.value = planetResponse;
        dataLoading.value = false;
    }
}

function resetData() {
    selectedCharacterHomeworld.value = [];
    expanded.value = null;
}

function handleError(error) {
    console.error(error)
    errored.value = true;
    errorMessage.value = error.message;
    pageLoading.value = false;
}

async function navigateToReviewView(){
    router.push('/review/' + selectedCharacterStore.getSelectedCharacter.name)
}

watch(() => selectedCharacterStore.getSelectedCharacter, (first, second) => {
    resetData();
});
</script>

<style scoped>
h2, p, .panels {
    padding: 10px;
}
</style>