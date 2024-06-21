<template>
     <ErrorMessage v-if="errored" :errorMessage="errorMessage"></ErrorMessage>
    <v-list lines="three">
        <v-list-item v-for="character in characters" :key="character.url"
            @click="updateSelectedCharacter(character.url)">
            <v-list-item-title>
                <div class="d-flex justify-space-between">
                    {{ character.name }}
                    <v-btn v-if="!character.liked" @click="addLikedCharacter(character)" density="compact"
                        icon="mdi-heart-outline"></v-btn>
                    <v-btn v-else @click="removeLikedCharacter(character)" density="compact" 
                        icon="mdi-heart"></v-btn>
                </div>
            </v-list-item-title>
            <v-list-item-subtitle>
                <p>Stars in {{ character.films.length }} film<span v-if="character.films.length > 1">s</span></p>
            </v-list-item-subtitle>
        </v-list-item>
    </v-list>
</template>

<script setup>
import { useLikedCharactersStore } from '@/stores/likedCharacters'
import { useSelectedCharactersStore } from '@/stores/selectedCharacter';
import { getFilmDetailsByCharacter } from '../services/films/FilmDetails.api';
import { ref } from 'vue';

const likedCharactersStore = useLikedCharactersStore();
const selectedCharacterStore = useSelectedCharactersStore();
const errored = ref(false);
const errorMessage = ref("");

const props = defineProps({
    characters: [],
})

async function updateSelectedCharacter(selectedCharacter) {
    let newSelectedCharacter = props.characters.find(x => x.url == selectedCharacter);
    await getFilmData(newSelectedCharacter);
    selectedCharacterStore.setSelectedCharacter(newSelectedCharacter)

}

async function getFilmData(selectedCharacter) {
    const [error, filmResponse] = await getFilmDetailsByCharacter(selectedCharacter);
    if (error) {
        handleError(error);
    }
    else {
        selectedCharacterStore.setSelectedCharacterFilms(filmResponse);
    }
}

function addLikedCharacter(characterToLike) {
    characterToLike.liked = true;
    likedCharactersStore.addLikedCharacter(characterToLike);
}

function removeLikedCharacter(characterToRemove) {
    characterToRemove.liked = false;
    likedCharactersStore.removeLikedCharacter(characterToRemove.url);
}

function handleError(error){
    console.error(error)
    errored.value = true;
    errorMessage.value = error.message;
  }
</script>