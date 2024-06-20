import { AxiosError } from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { getAllFavorites } from "./getAllFavorites"

import { ADVICE_COLLECTION } from "@/storage/storageConfig"

import { Advice, ErrorMessage, RequestResponse } from "@/models"

export async function postFavoriteAdvice(
  newAdvice: Advice
): Promise<RequestResponse<Advice>> {
  try {
    const storedAdvices = await getAllFavorites()
    const adviceAlreadyFavorite: boolean =
      storedAdvices?.some(
        (advice: Advice) => advice.slip.id === newAdvice.slip.id
      ) ?? false
    if (adviceAlreadyFavorite) {
      const errorMessage = "This advice has already been saved!"
      const errorObject: ErrorMessage = {
        message: {
          text: errorMessage,
          type: "error",
        },
      }
      return [null, errorObject, null]
    }
    const updatedAdvices = storedAdvices
      ? JSON.stringify([...storedAdvices, newAdvice])
      : JSON.stringify([newAdvice])
    await AsyncStorage.setItem(ADVICE_COLLECTION, updatedAdvices)
    return [newAdvice, null, null]
  } catch (error) {
    throw [null, null, error as AxiosError]
  }
}
