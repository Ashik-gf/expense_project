import axios from "axios";

const instanceAxios = axios.create({
    baseURL: 'http://localhost:9000',
  });
  export default instanceAxios;