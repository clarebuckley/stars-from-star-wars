import axios from 'axios';
// import type {APIResponse} from '../../types/APIResponse';

const axiosClient = axios.create({
  baseURL: "https://swapi.dev/api/planets"
});

//TODO: placeholder, work in progress
export async function getPlanetDetails(planetId){
  try {
    const { data } = await axiosClient.get("/" + planetId);
    
    return [null, data];
  }
  catch(error) {
    return [error];
  }
}
