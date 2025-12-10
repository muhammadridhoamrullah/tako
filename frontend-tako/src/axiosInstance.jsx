import axios from "axios";
import { ENV } from "./utils/env";

const instance = axios.create({
  baseURL: ENV.API_BASE_URL,
});

export default instance;
