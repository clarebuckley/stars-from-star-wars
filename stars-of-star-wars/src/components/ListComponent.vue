<template>
    <div v-if="pageLoading">Loading...</div>
    <div v-else>
        <ErrorMessage v-if="errored" :errorMessage="errorMessage"></ErrorMessage>
        <v-row>
            <v-col cols="6">
            <v-card class="pa-2">
                <v-list lines="three">
                    <v-list-item 
                        v-for="character in characters" 
                        :key="character.url" 
                        :title="character.name"
                        @click="updateSelectedCharacter(character.url)">
                        <v-list-item-subtitle>
                            <p>Stars in {{ character.films.length }} films</p>
                        </v-list-item-subtitle>
                    </v-list-item>
                </v-list>
            </v-card>
            </v-col>
            <v-col cols="6">
                <v-card v-if="!selectedCharacter" class="pa-2">
                    <h1>No character selected</h1> 
                </v-card>
                <v-card v-else class="pa-2">
                    <h1>{{  selectedCharacter.name  }}</h1> 
                    <p>Birth year: {{ selectedCharacter.birth_year }}</p>
                    <p>Eye colour: {{ selectedCharacter.blue }}</p>
                    <p>Gender: {{ selectedCharacter.gender }}</p>
                    <p>Hair colour: {{ selectedCharacter.hair_color }}</p>
                    <p>Mass: {{ selectedCharacter.mass }}</p>
                    <p>Data last updated on: {{ selectedCharacter.edited }}</p>
                    <h2>Homeworld:</h2>
                    <h2>Species:</h2>
                    <h2>Starships:</h2>
                    <h2>Vehicles:</h2>
                </v-card>
            </v-col>
        </v-row>
        
        <div>Total characters: {{ characterCount }}</div>
        <div>Page {{ currentPage }} of {{ totalPages }}</div>
        <button @click="currentPage--" :disabled="currentPage === 1">Previous page</button>
        <button @click="currentPage++" :disabled="currentPage === totalPages">Next page</button>

    </div>
    

</template>


<script setup>
    import { getAllCharacters, getCharacterDetails } from '../services/characters/Characters.api.ts';
    import { ref, reactive, watch } from 'vue';
    import ErrorMessage from './ErrorMessage.vue';

    const characters = ref([]);
    const currentPage = ref(1);
    const totalPages = ref(0);
    const characterCount = ref(0);
    const selectedCharacter = ref(null);
    const errored = ref(false);
    const pageLoading = ref(true);
    const errorMessage = ref("");

    async function getData() {
        pageLoading.value = true;
        const [error, charactersResponse] = await getAllCharacters(currentPage.value);
        if (error) {
            handleError(error);
        }
        else {
            characters.value = charactersResponse.results;
            selectedCharacter.value = charactersResponse.results[0];
            characterCount.value = charactersResponse.count;
            totalPages.value = Math.ceil(charactersResponse.count / 10);
            pageLoading.value = false;
        }

    }

    async function updateSelectedCharacter(newSelectedCharacter){
        pageLoading.value = true;
        selectedCharacter.value = characters.value.find(x => x.url == newSelectedCharacter);
        const [error, characterResponse] = await getAllCharacters(selectedCharacter.value);
        if(error){
          handleError(error);
        }
        else {
            pageLoading.value = false;
        }
    }

    function handleError(error){
        console.error(error)
        errored.value = true;
        errorMessage.value = error.message;
        pageLoading.value = false;
    }

    getData()

    watch(currentPage, getData)

</script>