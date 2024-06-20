<template>
    <v-card v-if="pageLoading" loading text="Loading..."></v-card>
    <div v-else>
        <ErrorMessage v-if="errored" :errorMessage="errorMessage"></ErrorMessage>
        <v-row>
            <v-col cols="6">
                <v-card class="pa-2 list liked-list-container">
                    <h2>Liked Characters</h2>
                    <p v-if="likedCharactersStore.getLikedCharacters.length == 0">You have not liked any characters. Use the heart icon to like a character.</p>
                    <ListItem :characters="likedCharactersStore.getLikedCharacters"></ListItem>
                </v-card>
                <v-card class="pa-2 list list-container">
                    <h2>All Characters</h2>
                    <ListItem :characters="characters"></ListItem>
                </v-card>

                <div class="d-flex justify-end pagination-details">
                    <div>Page {{ currentPage }} of {{ totalPages }}</div>
                </div>
                <div class="d-flex justify-end">
                    <v-btn color="secondary" @click="currentPage--" :disabled="currentPage === 1">Previous page</v-btn>
                    <v-btn color="secondary" @click="currentPage++" :disabled="currentPage === totalPages">Next page</v-btn>
                </div>

            </v-col>
            <v-col cols="6">
                <CharacterDetailsComponent :selectedCharacter="selectedCharacter"></CharacterDetailsComponent>
            </v-col>
        </v-row>
    </div>
</template>


<script setup>
import { getAllCharacters } from '../services/characters/Characters.api.ts';
import { ref, watch } from 'vue';
import ErrorMessage from './ErrorMessage.vue';
import ListItem from './ListItem.vue';
import CharacterDetailsComponent from './CharacterDetailsComponent.vue';
import { useLikedCharactersStore } from '@/stores/likedCharacters'
import { useSelectedCharactersStore } from '@/stores/selectedCharacter';

const characters = ref([]);
const currentPage = ref(1);
const totalPages = ref(0);
const characterCount = ref(0);
const errored = ref(false);
const pageLoading = ref(true);
const errorMessage = ref("");
const likedCharactersStore = useLikedCharactersStore();
const selectedCharacterStore = useSelectedCharactersStore();

async function getData() {
    pageLoading.value = true;
    const [error, charactersResponse] = await getAllCharacters(currentPage.value);
    if (error) {
        handleError(error);
    }
    else {
        characters.value = charactersResponse.results;
        selectedCharacterStore.setSelectedCharacter(charactersResponse.results[0]);
        characterCount.value = charactersResponse.count;
        totalPages.value = Math.ceil(charactersResponse.count / 10);
        pageLoading.value = false;
    }
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

<style scoped>

.list {
    overflow-y: scroll;
    h2{
        padding: 5px;
    }
}
.liked-list-container {
    max-height: 30vh;
    border-bottom: solid 1px black;
}

.list-container{
    max-height: 50vh;
}
.pagination-details {
    background-color: rgba(255, 255, 255, 0.9);
    font-size: 16px;
    padding-right: 10px;
}

</style>