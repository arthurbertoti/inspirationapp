import { AxiosError } from "axios"
import { decode } from "html-entities"

import { api } from "../"
import { Advice, ErrorMessage, RequestResponse } from "@/models"

export async function getAdviceById(
  slip_id: number
): Promise<RequestResponse<Advice>> {
  try {
    const response = await api.get(`/advice/${slip_id}`)
    const data = response.data
    if ("slip" in data) {
      const advice: Advice = {
        slip: {
          id: data.slip.id,
          advice: decode(data.slip.advice),
        },
      }
      return [advice, null, null]
    } else return [null, data as ErrorMessage, null]
  } catch (error) {
    return [null, null, error as AxiosError]
  }
}
