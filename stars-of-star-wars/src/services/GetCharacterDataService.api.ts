import axios from 'axios';

const axiosClient = axios.create({
  baseURL: "https://swapi.dev/api/people"
});

export async function getAllCharacters(){
  try {
    const { data } = await axiosClient.get("");
    return [null, data.results];
  }
  catch(error) {
    return [error];
  }
}