import axios from "axios";

const BaseURL = process.env.NEXT_PUBLIC_API_URL;

const instance = axios.create({
  baseURL: `${BaseURL}`,
});

export default instance;
