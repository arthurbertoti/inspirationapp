import axios from "axios"
import urls from "../urls"

export const api = axios.create({
  baseURL: urls.adviceApiURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})
