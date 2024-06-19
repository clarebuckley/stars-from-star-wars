import { type PlanetDetails } from '@/types/PlanetDetails';
import { getCharacterDetail } from '@/services/characters/CharacterDetails.api'


export async function getPlanetDetails(planetUrl: string) {
  try {
    let homeworldData = await getCharacterDetail<PlanetDetails>(planetUrl);
    return [null, homeworldData.content];
  }
  catch (error) {
    console.error(error);
    return [error];
  }
}
