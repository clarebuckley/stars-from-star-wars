import { defineStore } from 'pinia'
import { Character } from '@/types/Character';

export const useLikedCharactersStore = defineStore('likedCharacters', {
  state: () => ({
    likedCharacters: [] as Character[],
    selectedCharacter: {}
  }),
  getters: {
    getLikedCharacters(state) {
      return this.likedCharacters;
    }
  },
  actions: {
    addLikedCharacter(character: Character) {
      this.likedCharacters.push(character);
    },
    removeLikedCharacter(characterUrl: string) {
      this.likedCharacters = this.likedCharacters.filter((character) => character.url !== characterUrl);
    },
    isLikedCharacter(characterUrl: string): boolean {
      return this.likedCharacters.some(x => x.url === characterUrl)
    }
  },
})