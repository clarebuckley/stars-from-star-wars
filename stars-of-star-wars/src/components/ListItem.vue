<template>
    <v-list lines="three">
        <v-list-item v-for="character in characters" :key="character.url"
            @click="updateSelectedCharacter(character.url)">
            <v-list-item-title>
                <div>
                    {{ character.name }}
                </div>
                <div>
                    <v-btn v-if="!character.liked" @click="addLikedCharacter(character)" density="compact"
                        icon="mdi-heart-outline"></v-btn>
                    <v-btn v-else @click="removeLikedCharacter(character)" density="compact" icon="mdi-heart"></v-btn>
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

const likedCharactersStore = useLikedCharactersStore();

const props = defineProps({
    characters: []
})

function updateSelectedCharacter(selectedCharacter) {
    let newSelectedCharacter = props.characters.find(x => x.url == selectedCharacter);
    likedCharactersStore.setSelectedCharacter(newSelectedCharacter)
    console.log(selectedCharacter)
}

function addLikedCharacter(characterToLike) {
    characterToLike.liked = true;
    likedCharactersStore.addLikedCharacter(characterToLike);
}

function removeLikedCharacter(characterToRemove) {
    characterToRemove.liked = false;
    likedCharactersStore.removeLikedCharacter(characterToRemove.url);
}
</script>