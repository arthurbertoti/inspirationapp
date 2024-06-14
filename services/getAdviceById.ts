import { AxiosError } from "axios"
import { api } from "./api"
import { Advice, ErrorMessage, RequestResponse } from "@/models"

export async function getAdviceById(
  slip_id: number
): Promise<RequestResponse<Advice>> {
  try {
    const response = await api.get(`/advice/${slip_id}`)
    const data = response.data
    if ("slip" in data) return [data as Advice, null, null]
    else return [null, data as ErrorMessage, null]
  } catch (error) {
    return [null, null, error as AxiosError]
  }
}
