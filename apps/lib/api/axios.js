import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  withCredentials: true,
});
// apps/lib/api.js  (or wherever you configure axios/fetch)
// Ping the backend on app load to wake it up
fetch("https://technest-cnxo.onrender.com/").catch(() => {}); // silent — just wakes the server

export default api;
