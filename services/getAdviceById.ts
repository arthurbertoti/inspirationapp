import { AxiosError } from "axios"
import { api } from "./api"
import { Advice, ErrorMessage } from "@/models"

type Response =
  | [Advice, null, null]
  | [null, ErrorMessage, null]
  | [null, null, AxiosError]

export async function getAdviceById(slip_id: number): Promise<Response> {
  try {
    const response = await api.get(`/${slip_id}`)
    const data = response.data
    if ("slip" in data) return [data as Advice, null, null]
    else return [null, data as ErrorMessage, null]
  } catch (error) {
    return [null, null, error as AxiosError]
  }
}