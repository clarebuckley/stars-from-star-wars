import axios from 'axios';

const axiosClient = axios.create({
  baseURL: ""
});

//Gets generic character detail using URL returned in the get character API response
export async function getCharacterDetail(requestUrl: string){
  try {
    const { data } = await axiosClient.get(requestUrl);
    
    return [null, data];
  }
  catch(error) {
    return [error];
  }
}
