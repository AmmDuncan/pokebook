import axios from "axios";

export const api = axios.create();

api.interceptors.response.use((res) => res.data)