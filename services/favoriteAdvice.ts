import AsyncStorage from "@react-native-async-storage/async-storage"

import { getAllFavorites } from "./getAllFavorites"

import { ADVICE_COLLECTION } from "@/storage/storageConfig"

import { Advice, AppError } from "@/models"

export async function saveAdvice(newAdvice: Advice) {
  try {
    const storedAdvices = await getAllFavorites()
    const adviceAlreadyFavorite: boolean =
      storedAdvices?.some((advice) => advice.slip.id === newAdvice.slip.id) ??
      false
    if (adviceAlreadyFavorite) {
      throw new AppError("This advice has already been saved!")
    }
    const updatedAdvices = storedAdvices
      ? JSON.stringify([...storedAdvices, newAdvice])
      : JSON.stringify([newAdvice])
    await AsyncStorage.setItem(ADVICE_COLLECTION, updatedAdvices)
  } catch (error) {
    throw error
  }
}
