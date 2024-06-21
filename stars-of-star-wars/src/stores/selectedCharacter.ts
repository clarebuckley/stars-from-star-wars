import { defineStore } from 'pinia'
import { Character } from '@/types/Character';

export const useSelectedCharactersStore = defineStore('selectedCharacter', {
  state: () => ({
    selectedCharacter: {},
    selectedCharacterFilms: []
  }),
  getters: {
    getSelectedCharacter(state) { 
      return this.selectedCharacter;
    },
    getSelectedCharacterFilms(state) { 
        return this.selectedCharacterFilms;
    },
    isCharacterSelected(state){
      return Object.keys(this.selectedCharacter).length !== 0
    }
  },
  actions: {
    setSelectedCharacter(character: Character){
      this.selectedCharacter = character;
    },
    setSelectedCharacterFilms(films: []){
        this.selectedCharacterFilms = films;
    }
  },
})