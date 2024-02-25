import axios from "axios";

export const contactHubWs = axios.create({
  baseURL: "https://contacthubws.onrender.com/",
  timeout: 8 * 1000,
});
