import axios from "axios";

const api = axios.create({
   baseURL: "http://localhost:3000", // endereço do seu backend Node
   headers: {
      "Content-Type": "application/json",
   },
});

export default api;
