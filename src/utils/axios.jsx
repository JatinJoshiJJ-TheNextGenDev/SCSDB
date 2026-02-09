import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTM3MjQ3YzQ5NzQ2MDE3MWU3MmJiMDVkNGUwMzQ3MCIsIm5iZiI6MTc3MDM2NTM5MC41NzUsInN1YiI6IjY5ODVhMWNlZmViMGMxN2I4ODQ4ZGFkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fI4y_qWL69nLeJqNB7QDzoHHScajVJe9CJZKfcYplts'
  }
});

export default axiosInstance;
