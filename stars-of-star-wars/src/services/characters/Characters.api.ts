import axios from 'axios';
 import { type Character } from '@/types/Character';
 import { type CharacterFilms } from '@/types/CharacterFilms';
 import { getCharacterDetail } from '../../services/characters/CharacterDetails.api'

 //import type {APIResponse} from '../../types/APIResponse';

const axiosClient = axios.create({
  baseURL: "https://swapi.dev/api/people"
});

export async function getAllCharacters(currentPage: number){
  try {
    const { data } = await axiosClient.get<Character>("/?page=" + currentPage);
    return [null, data];
  }
  catch(error) {
    return [error];
  }
}

//TODO: placeholder, work in progress
export async function getCharacterDetails(selectedCharacter: Character){
  try {
    console.log(selectedCharacter.films[0])

    const [error, data] = await getCharacterDetail(selectedCharacter.films[0]);
    console.log(data)
  //  species
  //  starshhips
  //  vehicles
  //  films
   return [null, data];
  }
  catch(error) {
    return [error];
  }
}

