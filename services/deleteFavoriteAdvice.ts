import { AxiosError } from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { getAllFavorites } from "./getAllFavorites"

import { ADVICE_COLLECTION } from "@/storage/storageConfig"

import { Advice, ErrorMessage, RequestResponse } from "@/models"

export async function deleteFavoriteAdvice(
  advice: Advice
): Promise<RequestResponse<Advice>> {
  try {
    const storedAdvices = await getAllFavorites()
    const adviceAlreadyFavorite: boolean =
      storedAdvices?.some((advice) => advice.slip.id === advice.slip.id) ??
      false
    if (!adviceAlreadyFavorite) {
      const errorMessage = "This advice has NOT been saved!"
      const errorObject: ErrorMessage = {
        message: {
          text: errorMessage,
          type: "error",
        },
      }
      return [null, errorObject, null]
    }
    const updatedAdvices = storedAdvices
      ? storedAdvices.filter((item) => item.slip.id !== advice.slip.id)
      : []
    const stringifiedAdvices = JSON.stringify(updatedAdvices)

    await AsyncStorage.setItem(ADVICE_COLLECTION, stringifiedAdvices)

    return [advice, null, null]
  } catch (error) {
    throw [null, null, error as AxiosError]
  }
}
