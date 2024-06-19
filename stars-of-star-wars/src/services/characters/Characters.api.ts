import axios from 'axios';
import { type Character } from '@/types/Character';
import { type FilmDetails } from '@/types/CharacterFilms';
import { getCharacterDetail } from '@/services/characters/CharacterDetails.api'

const axiosClient = axios.create({
  baseURL: "https://swapi.dev/api/people"
});

export async function getAllCharacters(currentPage: number) {
  try {
    const { data } = await axiosClient.get<Character>("/?page=" + currentPage);
    return [null, data];
  }
  catch (error) {
    return [error];
  }
}

export async function getCharacterFilmDetails(selectedCharacter: Character) {
  try {
    let filmDetails: FilmDetails[] = [];
    for await(var filmUrl of selectedCharacter.films) {
      let filmData = await getCharacterDetail<FilmDetails>(filmUrl);
      filmDetails.push(filmData.content)
    };
    return [null, filmDetails];
  }
  catch (error) {
    console.error(error);
    return [error];
  }
}

