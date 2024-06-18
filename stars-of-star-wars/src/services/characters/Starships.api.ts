import axios from 'axios';
// import type {APIResponse} from '../../types/APIResponse';

const axiosClient = axios.create({
  baseURL: "https://swapi.dev/api/starships"
});

//TODO: placeholder, work in progress
export async function getStarship(starshipId){
  try {
    const { data } = await axiosClient.get("/" + starshipId);
    
    return [null, data];
  }
  catch(error) {
    return [error];
  }
}
