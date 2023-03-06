import axios from "axios";

// de este service es donde se haran todas las llamadas al BE
const service = axios.create({
  baseURL: "http://localhost:5005/api"
})

export default service;