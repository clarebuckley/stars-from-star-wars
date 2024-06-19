import axios from 'axios';
import { APIResponse } from '@/types/APIResponse';

const axiosClient = axios.create({});

//Gets generic character detail using URL returned in the get character API response
export async function getCharacterDetail<T>(requestUrl: string): Promise<APIResponse<T>>{
  try {
    const { data } = await axiosClient.get(requestUrl);
    return {
      content: data,
      error: null
    };
  }
  catch(error) {
    return {
      content: {} as T,
      error: error
    };
  }
}
