import { type Character } from '@/types/Character';
import { type FilmDetails } from '@/types/Films';
import { getCharacterDetail } from '@/services/characters/CharacterDetails.api'


export async function getFilmDetailsByCharacter(selectedCharacter: Character) {
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
  