import * as rssParser from "react-native-rss-parser"
import { AxiosError } from "axios"
import { api } from "./api"
import { Advice } from "@/models"

type Response = [Advice, null] | [null, AxiosError]

export async function getDailyAdvice(): Promise<Response> {
  try {
    const response = await api.get("/daily_adviceslip.rss")
    const data = response.data
    const parsedData = rssParser.parse(data)
    const currentAdvice = (await parsedData).items[0]
    const regex = /https:\/\/adviceslip\.com\/#(\d+)/
    const idNumber = currentAdvice.description.match(regex)
    const advice: Advice = {
      slip: {
        id: idNumber ? (idNumber[1] as unknown as number) : 0,
        advice: currentAdvice.title,
      },
    }
    return [advice, null]
  } catch (error) {
    console.log(error)
    return [null, error as AxiosError]
  }
}
