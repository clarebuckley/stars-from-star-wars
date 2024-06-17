<template>
    <v-card class="pa-2">
        <v-list lines="three">
            <v-list-item
                v-for="n in 3"
                :key="n"
                :title="'Item ' + n"
                subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit">
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script>
import { getAllCharacters } from '../services/GetCharacterDataService.api.ts';

export default {
    props: {

    },
    data() {
        return {
            characters: null
        };
    },
    methods: {
        async getData() {
            const [error, characters] = await getAllCharacters();
            if (error) {
                console.error(error)
            }
            else {
                this.characters = characters;
                console.log(characters)
            }
        }

    },
    beforeMount() {
        this.getData();
    },
}
</script>