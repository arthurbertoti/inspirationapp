import { AxiosError } from "axios"
import { api } from "./api"
import { Advice } from "@/models"

type Response = [Advice, null] | [null, AxiosError]

export async function getAdvice(slip_id: number): Promise<Response> {
  try {
    const response = await api.get(`/${slip_id}`)
    const data = response.data
    return [data, null]
  } catch (err) {
    const error = err as AxiosError
    return [null, error]
  }
}
