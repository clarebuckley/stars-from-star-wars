import axios from 'axios';
import { type Character } from '@/types/Character';

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
