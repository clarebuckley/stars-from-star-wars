<template>
    <div v-if="pageLoading">Loading...</div>
    <div v-else>
        <ErrorMessage v-if="errored" :errorMessage="errorMessage"></ErrorMessage>
        <v-row>
            <v-col cols="6">
                <v-card class="pa-2">
                    <h2>Liked Characters</h2>
                    <p v-if="likedCharactersStore.getLikedCharacters.length == 0">You have not liked any characters. Use the heart icon to like a character.</p>
                    <v-list lines="three">
                        <v-list-item v-for="character in likedCharactersStore.getLikedCharacters" :key="character.url" :title="character.name"
                            @click="updateSelectedCharacter(character.url)">
                            <v-list-item-title>
                                <div>
                                    {{ character.name }}
                                </div>
                                <div> 
                                    <v-btn v-if="!character.liked" @click="addLikedCharacter(character)" density="compact" icon="mdi-heart-outline"></v-btn>
                                    <v-btn v-else @click="removeLikedCharacter(character)" density="compact" icon="mdi-heart"></v-btn>
                                </div>
                                
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                <p>Stars in {{ character.films.length }} film<span v-if="character.films.length > 1">s</span></p>
                            </v-list-item-subtitle>
                        </v-list-item>
                    </v-list>
                </v-card>
                <v-card class="pa-2">
                    <h2>All Characters</h2>
                    <v-list lines="three">
                        <v-list-item v-for="character in characters" :key="character.url" :title="character.name"
                            @click="updateSelectedCharacter(character.url)">
                            <v-list-item-title>
                                <div>
                                    {{ character.name }}
                                </div>
                                <div> 
                                    <v-btn v-if="!character.liked" @click="addLikedCharacter(character)" density="compact" icon="mdi-heart-outline"></v-btn>
                                    <v-btn v-else @click="removeLikedCharacter(character)" density="compact" icon="mdi-heart"></v-btn>
                                </div>
                                
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                <p>Stars in {{ character.films.length }} film<span v-if="character.films.length > 1">s</span></p>
                            </v-list-item-subtitle>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-col>
            <v-col cols="6">
                <CharacterDetailsComponent :selectedCharacter="selectedCharacter"></CharacterDetailsComponent>
            </v-col>
        </v-row>

        <div>Total characters: {{ characterCount }}</div>
        <div>Page {{ currentPage }} of {{ totalPages }}</div>
        <button @click="currentPage--" :disabled="currentPage === 1">Previous page</button>
        <button @click="currentPage++" :disabled="currentPage === totalPages">Next page</button>

    </div>


</template>


<script setup>
import { getAllCharacters } from '../services/characters/Characters.api.ts';
import { ref, watch } from 'vue';
import ErrorMessage from './ErrorMessage.vue';
import CharacterDetailsComponent from './CharacterDetailsComponent.vue';
import { useLikedCharactersStore } from '@/stores/likedCharacters'

const characters = ref([]);
const currentPage = ref(1);
const totalPages = ref(0);
const characterCount = ref(0);
const selectedCharacter = ref(null);
const errored = ref(false);
const pageLoading = ref(true);
const errorMessage = ref("");
const likedCharactersStore = useLikedCharactersStore();

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

function updateSelectedCharacter(newSelectedCharacter) {
    selectedCharacter.value = characters.value.find(x => x.url == newSelectedCharacter);
}

function addLikedCharacter(characterToLike){
    characterToLike.liked = true;
    likedCharactersStore.addLikedCharacter(characterToLike);
}

function removeLikedCharacter(characterToRemove){
    characterToRemove.liked = false;
    likedCharactersStore.removeLikedCharacter(characterToRemove.url);
}

function handleError(error) {
    console.error(error)
    errored.value = true;
    errorMessage.value = error.message;
    pageLoading.value = false;
}

getData()

watch(currentPage, getData)

</script>