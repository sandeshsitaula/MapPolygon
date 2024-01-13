// axiosInstance.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  withCredentials: true, // Include credentials (cookies) in the request
  // Make sure this is correct
  // other Axios configuration options
});

export default instance;
