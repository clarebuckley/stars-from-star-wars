import axios from 'axios';
// import type { Character } from '../../types/Character';
// import type {APIResponse} from '../../types/APIResponse';

const axiosClient = axios.create({
  baseURL: "https://swapi.dev/api/people"
});

export async function getAllCharacters(currentPage){
  try {
    const { data } = await axiosClient.get("/?page=" + currentPage);
    
    return [null, data];
  }
  catch(error) {
    return [error];
  }
}

//TODO: placeholder, work in progress
export async function getCharacterDetails(selectedCharacter){
  try {
    console.log(selectedCharacter)
    const { data } = await axiosClient.get("/?page=");
    
    return [null, data];
  }
  catch(error) {
    return [error];
  }
}