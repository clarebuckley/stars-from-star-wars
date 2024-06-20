import axios from 'axios';
import { type Review } from '@/types/Review';

const axiosClient = axios.create({
  baseURL: "https://swapi.dev/api"
});

export async function createReview(newReview: Review) {
  try {
    const { data } = await axiosClient.post<Review>("/reviews", newReview);
    return [null, data];
  }
  catch (error) {
    return [error];
  }
}
