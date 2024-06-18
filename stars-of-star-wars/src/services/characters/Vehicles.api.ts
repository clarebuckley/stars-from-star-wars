import axios from 'axios';
// import type {APIResponse} from '../../types/APIResponse';

const axiosClient = axios.create({
  baseURL: "https://swapi.dev/api/vehicles"
});

//TODO: placeholder, work in progress
export async function getVehicle(vehicleId){
  try {
    const { data } = await axiosClient.get("/" + vehicleId);
    
    return [null, data];
  }
  catch(error) {
    return [error];
  }
}
